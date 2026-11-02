import path from "path";
import { spawn } from "child_process";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { CreateQuestionDTO, createQuestionSchema } from "../src/modules/questions/questions.dto";
import { QuestionExtractDTO } from "./types";
dotenv.config();

const GEMINI_KEY = process.env.GEMINI_KEY;
if (!GEMINI_KEY) {
    throw new Error(
        "GEMINI_KEY not found. Check your .env file exists and contains GEMINI_KEY=AIza..."
    );
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

// ─────────────────────────────────────────────────────────────────────
//  Prompt
//  Injected with year (extracted from first page).
//  Tells Gemini the exact output shape matching CreateQuestionDTO.
// ─────────────────────────────────────────────────────────────────────

const QUESTION_RULES = (year: number) => `
─────────────────────────────────────────────────────
OUTPUT SHAPE (each question):
─────────────────────────────────────────────────────
{
  "questionNumber": <integer printed before the question e.g. 1, 76, 121>,
  "question": "full question text here",
  "image": null,
  "options": ["option A text", "option B text", "option C text", "option D text", "option E text"],
  "answer": "A",
  "difficulty": "easy" | "medium" | "hard",
  "topic": "<topic from the list below>",
  "year": ${year}
}

NOTE: Do NOT include a "subject" field — it is computed from questionNumber automatically.
 
─────────────────────────────────────────────────────
QUESTION TEXT RULES:
─────────────────────────────────────────────────────
- NEVER include the question number (e.g. "1.", "12.", "75.") in the question field
- The question number only identifies which question it is — it is NOT part of the question text
- Include everything else: the full sentence, any given conditions, "then find...", "is equal to", etc.
- For math use unicode: x², √3, π, α, β, θ, γ, λ, μ, σ, ω, ∫, Σ, Δ, ∞, ≤, ≥, ∈, →
- For fractions write inline: (x+1)/(x-1), 3/4, sqrt(3)/2, 1/sqrt(2)
- For powers: x^2, e^x, 2^n, a^(n-1)
- For matrices write using nested arrays: [[a,b],[c,d]]
- For vectors write: a⃗ = 2î + 3ĵ + k̂
- If a question references a diagram that cannot be expressed as text, write "[diagram]" at the end of the question field
- Ignore lines that say "Correct Answer : Option X" — extract the answer letter from those but do not include the line in question text
- If the answer letter cannot be extracted and is "Question Cancelled" then ignore the question entirely (do not include it in the output)
 
─────────────────────────────────────────────────────
OPTIONS RULES:
─────────────────────────────────────────────────────
- "options" must always be an array of exactly 5 strings in order A→E
- Apply the same math formatting rules as above to option text
- Some options may be purely numeric, some may be expressions — extract exactly as shown
- If an option contains only a fraction like 1/4, write it as "1/4"
- If an option contains an interval like (-5/3, 2], write it exactly: "(-5/3, 2]"
 
─────────────────────────────────────────────────────
DIFFICULTY RULES:
─────────────────────────────────────────────────────
"easy":
- Direct formula application, single step
- Basic definitions (e.g. modulus of a complex number, simple probability)
- Straightforward arithmetic or substitution
- Examples: find n(A) from set products, simple GP term, tan15° + tan75°
 
"medium":
- Two or three steps, requires knowing a standard result
- Combining two concepts (e.g. chain rule + trig, binomial + algebra)
- Standard problems seen in NCERT exercises
- Examples: domain of composite functions, system of equations, integration by substitution
 
"hard":
- Multi-step reasoning, non-obvious approach
- Proof-based, requires insight or clever manipulation
- Rarely seen standard forms, edge cases
- Examples: proving no unique solution exists, direction cosine product sums, SHM phase difference
 
─────────────────────────────────────────────────────
TOPIC RULES:
─────────────────────────────────────────────────────
Assign exactly one topic from the lists below based on the primary concept tested.
 
MATHEMATICS topics (questions 1–75):
Sets and Relations | Functions | Complex Numbers | Sequences and Series |
Permutations and Combinations | Binomial Theorem | Matrices | Determinants |
Linear Inequalities | Trigonometric Functions | Inverse Trigonometric Functions |
Straight Lines | Circles | Parabola | Ellipse | Hyperbola |
Vectors | Three Dimensional Geometry | Limits and Continuity | Differentiation |
Applications of Derivatives | Integration | Definite Integrals |
Differential Equations | Linear Programming | Probability | Statistics
 
PHYSICS topics (questions 76–120):
Units and Measurement | Kinematics | Laws of Motion | Work Energy and Power |
Rotational Motion | Gravitation | Properties of Matter | Thermodynamics |
Kinetic Theory of Gases | Oscillations | Waves | Electrostatics |
Current Electricity | Magnetic Effects of Current | Electromagnetic Induction |
Alternating Current | Electromagnetic Waves | Optics | Dual Nature of Matter |
Atoms and Nuclei | Semiconductor Devices
 
CHEMISTRY topics (questions 121–150):
Solutions | Electrochemistry | Chemical Kinetics | Surface Chemistry |
General Principles of Isolation of Elements | p-Block Elements | d and f Block Elements |
Coordination Compounds | Haloalkanes and Haloarenes | Alcohols Phenols and Ethers |
Aldehydes Ketones and Carboxylic Acids | Amines | Biomolecules |
Polymers | Chemistry in Everyday Life | Solid State | Atomic Structure |
Chemical Bonding | Thermodynamics | Equilibrium | Redox Reactions |
Hydrogen | s-Block Elements | Basic Organic Chemistry


─────────────────────────────────────────────────────
EXAMPLES OF CORRECT OUTPUT:
─────────────────────────────────────────────────────
[
  {
    "questionNumber": 1,
    "question": "If n(A×B) = 160, n(B×C) = 80 and n(C×A) = 200, then n(A) =",
    "image": null,
    "options": ["10", "18", "16", "12", "20"],
    "answer": "E",
    "difficulty": "easy",
    "topic": "Sets and Relations",
    "year": ${year}
  },
  {
    "questionNumber": 78,
    "question": "If the velocity of a particle is given by v = 2.0î + 3.0tĵ ms⁻¹, the magnitude of acceleration is",
    "image": null,
    "options": ["5", "3", "2", "4", "6"],
    "answer": "B",
    "difficulty": "easy",
    "topic": "Kinematics",
    "year": ${year}
  }
]
 
If this page has no questions (blank page or only headers), return: []`;

function buildPrompt(year: number, hasNextPage: boolean = false): string {
    const contextNote = hasNextPage
        ? `
            ─────────────────────────────────────────────────────
            CONTEXT PAGE NOTE:
            ─────────────────────────────────────────────────────
            You are given TWO page images.
            - FIRST image  → primary page. Extract all questions that START here.
            - SECOND image → next page, provided as context only.
 
            Use the second image ONLY to:
            - Complete options that are cut off at the bottom of the first page
            - Get the correct answer letter if "Correct Answer : Option X" appears on the second page
            - Resolve any option values truncated on the first page
 
            Do NOT extract questions that start fresh on the second page — those belong to the next call.
        `
        : "";

    return `You are a document understanding system. Your task is to interpret this KEAM ${year} engineering entrance examination page and convert its contents into structured JSON for educational indexing and analysis.
            Represent the information contained in each question as a structured object.
    
            Return a JSON array of every question visible on this page.
            Output ONLY the raw JSON array — no explanation, no markdown fences, no extra text.
${contextNote}
${QUESTION_RULES(year)}`;
}

// Prompt for the first page — extracts year AND questions in one call
function buildFirstPagePrompt(year: number): string {
    return `You are extracting data from the first page of a KEAM engineering entrance exam paper. 

        STEP 1: Find the exam date. It appears as "Date of Test: DD-MM-YYYY" near the top. Extract the 4-digit year.
 
        STEP 2: Extract every question visible on this page using the rules below.
 
        Return your response in EXACTLY this format — YEAR line first, then the raw JSON array, nothing else:
        YEAR: <4-digit year>
        [...questions array...]
 
        You are also given the SECOND page image as context.
        Use it ONLY to complete questions or options cut off at the bottom of this first page.
        Do NOT extract questions that start fresh on the second page.
 
${QUESTION_RULES(year)}`;
}
// ─────────────────────────────────────────────────────────────────────
//  Convert PDF → base64 page images via Python
// ─────────────────────────────────────────────────────────────────────

function convertPDFToImages(pdfPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const py = spawn("python3", ["pdf_to_images.py", pdfPath]);

        let stdout = "";
        let stderr = "";

        py.stdout.on("data", (d: Buffer) => (stdout += d.toString()));
        py.stderr.on("data", (d: Buffer) => (stderr += d.toString()));

        py.on("close", (code: number) => {
            if (code !== 0) {
                return reject(new Error(`pdf_to_images.py failed: ${stderr}`));
            }
            try {
                const parsed = JSON.parse(stdout);
                if (parsed.error) return reject(new Error(parsed.error));
                resolve(parsed.pages as string[]);
            } catch {
                reject(new Error(`Failed to parse pdf_to_images output: ${stdout.slice(0, 200)}`));
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────────────
//  Parse + validate Gemini JSON response
// ─────────────────────────────────────────────────────────────────────

function getSubject(questionNumber: number): string {
    if (questionNumber <= 75)  return "m";
    if (questionNumber <= 120) return "p";
    return "c";
}

function parseAndValidate(raw: string, pageIndex: number): CreateQuestionDTO[] {
    const cleaned = raw.replace(/```json\s*|```/g, "").trim();

    let parsed: unknown;
    try {
        parsed = JSON.parse(cleaned);
    } catch {
        console.warn(`  Page ${pageIndex + 1}: invalid JSON — skipping`);
        return [];
    }

    if (!Array.isArray(parsed)) {
        console.warn(`  Page ${pageIndex + 1}: expected array, got ${typeof parsed} — skipping`);
        return [];
    }

    const valid: CreateQuestionDTO[] = [];
    for (const item of parsed) {
        if (!item || typeof item !== "object") continue;

        // Use questionNumber to set subject, then remove it
        // so Zod never sees it (it's not in the schema)
        const questionNumber = typeof item.questionNumber === "number"
            ? item.questionNumber
            : null;

        if (questionNumber !== null) {
            item.subject = getSubject(questionNumber);
        }

        delete item.questionNumber; // strip before Zod sees it

        const result = createQuestionSchema.safeParse(item);
        if (result.success) {
            valid.push(result.data);
        } else {
            const firstError = result.error.issues[0];
            console.warn(
                `  Page ${pageIndex + 1}: dropped Q${questionNumber ?? "?"} — ${firstError.path.join(".")}: ${firstError.message}`
            );
        }
    }

    return valid;
}
// function parseAndValidate(
//     raw: string,
//     pageIndex: number
// ): CreateQuestionDTO[] {
//     // Strip markdown fences if Gemini added them despite instructions
//     const cleaned = raw.replace(/```json\s*|```/g, "").trim();

//     let parsed: unknown;
//     try {
//         parsed = JSON.parse(cleaned);
//     } catch {
//         console.warn(`  Page ${pageIndex + 1}: invalid JSON from Gemini — skipping`);
//         return [];
//     }

//     if (!Array.isArray(parsed)) {
//         console.warn(`  Page ${pageIndex + 1}: expected array, got ${typeof parsed} — skipping`);
//         return [];
//     }

//     const valid: CreateQuestionDTO[] = [];
//     for (const item of parsed) {
//         const result = createQuestionSchema.safeParse(item);
//         if (result.success) {
//             valid.push(result.data);
//         } else {
//             // Log first error only to keep output readable
//             const firstError = result.error.issues[0];
//             console.warn(
//                 `  Page ${pageIndex + 1}: dropped question — ${firstError.path.join(".")}: ${firstError.message}`
//             );
//         }
//     }

//     return valid;
// }

// ─────────────────────────────────────────────────────────────────────
//  Process the first page (extracts year + questions together)
// ─────────────────────────────────────────────────────────────────────

// async function processFirstPage(
//     base64Image: string
// ): Promise<{ year: number; questions: CreateQuestionDTO[] }> {
//     const result = await model.generateContent([
//         FIRST_PAGE_PROMPT,
//         {
//             inlineData: {
//                 mimeType: "image/jpeg",
//                 data: base64Image,
//             },
//         },
//     ]);

//     const raw = result.response.text().trim();

//     // Extract year from "YEAR: 2025" line
//     const yearMatch = raw.match(/^YEAR:\s*(\d{4})/m);
//     if (!yearMatch) {
//         throw new Error(`Could not extract year from first page. Gemini said: ${raw.slice(0, 200)}`);
//     }
//     const year = parseInt(yearMatch[1]);

//     if (year < 1990 || year > new Date().getFullYear()) {
//         throw new Error(`Extracted year ${year} is out of expected range`);
//     }

//     // Everything after the YEAR line is the JSON array
//     const jsonPart = raw.replace(/^YEAR:\s*\d{4}\s*/m, "").trim();
//     const questions = parseAndValidate(jsonPart, 0);

//     return { year, questions };
// }

async function processFirstPage(
    pages: string[]
): Promise<{ year: number; questions: CreateQuestionDTO[] }> {
    const placeholderYear = new Date().getFullYear();

    const parts: (string | { inlineData: { mimeType: string; data: string } })[] = [
        buildFirstPagePrompt(placeholderYear),
        { inlineData: { mimeType: "image/jpeg", data: pages[0] } },
    ];

    if (pages.length > 1) {
        parts.push({ inlineData: { mimeType: "image/jpeg", data: pages[1] } });
    }

    const result = await model.generateContent(parts);
    const raw = result.response.text().trim();

    const yearMatch = raw.match(/^YEAR:\s*(\d{4})/m);
    if (!yearMatch) {
        throw new Error(
            `Could not extract year from first page. Gemini said: ${raw.slice(0, 200)}`
        );
    }

    const year = parseInt(yearMatch[1]);
    if (year < 1990 || year > new Date().getFullYear()) {
        throw new Error(`Extracted year ${year} is out of expected range`);
    }

    const jsonPart = raw.replace(/^YEAR:\s*\d{4}\s*/m, "").trim();
    const questions = parseAndValidate(jsonPart, 0);

    return { year, questions };
}

// ─────────────────────────────────────────────────────────────────────
//  Process a regular page (year already known)
// ─────────────────────────────────────────────────────────────────────

// async function processPage(
//     base64Image: string,
//     pageIndex: number,
//     year: number
// ): Promise<CreateQuestionDTO[]> {
//     const result = await model.generateContent([
//         buildPrompt(year),
//         {
//             inlineData: {
//                 mimeType: "image/jpeg",
//                 data: base64Image,
//             },
//         },
//     ]);

//     const raw = result.response.text().trim();
//     return parseAndValidate(raw, pageIndex);
// }

// processPage — remove next page context entirely
async function processPage(
    pages: string[],
    i: number,
    year: number
): Promise<CreateQuestionDTO[]> {
    const result = await model.generateContent([
        buildPrompt(year, false), // never send context page
        { inlineData: { mimeType: "image/jpeg", data: pages[i] } },
    ]);

    const raw = result.response.text().trim();
    return parseAndValidate(raw, i);
}

// ─────────────────────────────────────────────────────────────────────
//  Rate limiter — Gemini free tier: 15 requests/min
// ─────────────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

// 4 seconds between calls = 15 calls/min max, safe for free tier
const RATE_LIMIT_DELAY_MS = 4000;

// ─────────────────────────────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────────────────────────────

// export interface ExtractionResult {
//     questions: CreateQuestionDTO[];
//     year: number;
//     totalPages: number;
//     failedPages: number[];
// }

function deduplicateQuestions(questions: CreateQuestionDTO[]): CreateQuestionDTO[] {
    const map = new Map<string, CreateQuestionDTO>();

    for (const q of questions) {
        const optionsKey = [...q.options]
            .map(o => o.trim().toLowerCase().replace(/\s+/g, ""))
            .sort()
            .join("|");
        const key = `${q.answer}|${optionsKey}`;

        const existing = map.get(key);
        if (!existing) {
            map.set(key, q);
        }
        // If same key already exists, options are identical — keep first (no hallucination issue)
    }

    return Array.from(map.values());
}

// function deduplicateQuestions(questions: CreateQuestionDTO[]): CreateQuestionDTO[] {
//     const map = new Map<number, CreateQuestionDTO>();
//     for (const q of questions) {
//         if (!map.has(q.questionNumber)) {
//             map.set(q.questionNumber, q);
//         }
//     }
//     return Array.from(map.values()).sort((a, b) => a.questionNumber - b.questionNumber);
// }


export async function extractQuestions(pdfPath: string): Promise<QuestionExtractDTO> {
    console.log(`\nExtracting: ${path.basename(pdfPath)}`);

    console.log("Converting PDF to images...");
    const pages = await convertPDFToImages(pdfPath);
    // const pages = allPages.slice(34, 36);
    console.log(`  ${pages.length} pages`);

    const allQuestions: CreateQuestionDTO[] = [];
    const failedPages: number[] = [];

    // Step 2: Process first page — extracts year + questions together
    console.log("\nPage 1/" + pages.length + " (extracting year + questions)...");
    let year: number;
    try {
        const { year: extractedYear, questions } = await processFirstPage(pages);
        year = extractedYear;
        allQuestions.push(...questions);
        console.log(`  Year: ${year} | Questions: ${questions.length}`);
    } catch (err: unknown) {
        console.error(`  Page 1 failed: ${err instanceof Error ? err.message : "Unknown error"}`);
        failedPages.push(1);
        year = new Date().getFullYear();
        console.warn(`  Falling back to year: ${year}`);
    }


    await delay(RATE_LIMIT_DELAY_MS);

    // Step 3: Process remaining pages sequentially
    for (let i = 1; i < pages.length; i++) {
        process.stdout.write(`Page ${i + 1}/${pages.length}... `);

        try {
            const questions = await processPage(pages, i, year);
            allQuestions.push(...questions);
            console.log(`${questions.length} questions`);
        } catch (err: unknown) {
            console.error(`failed (${err instanceof Error ? err.message : "Unknown error"})`);
            failedPages.push(i + 1);
        }

        // Rate limit gap between every call except the last
        if (i < pages.length - 1) {
            await delay(RATE_LIMIT_DELAY_MS);
        }
    }

    const questions = deduplicateQuestions(allQuestions);
    const questionsWithDiagrams: CreateQuestionDTO[] = questions.filter(q => q.question.includes("[diagram]") || q.options.some(o => o.includes("Image")));

    const unique = questions.filter(q => !q.question.includes("[diagram]") && !q.options.some(o => o.includes("Image")));

    // const outPath = pdfPath.replace(".pdf", "_questions.json");
    // await fs.writeFile(
    //     outPath,
    //     JSON.stringify(
    //         { year, totalQuestions: unique.length, questions: unique },
    //         null,
    //         2
    //     )
    // );
    // await fs.writeFile(
    //     outPath.replace("_questions.json", "_diagrams_need_review.json"),
    //     JSON.stringify(
    //         { year, totalQuestions: questionsWithDiagrams.length, questions: questionsWithDiagrams },
    //         null,
    //         2
    //     )
    // );
    // console.log(`\nSaved → ${outPath}`);

    console.log(`${"─".repeat(50)}`);
    console.log(`✓ ${unique.length} questions extracted (year: ${year})`);
    if (failedPages.length > 0) {
        console.log(`⚠ Failed pages: ${failedPages.join(", ")}`);
    }
    return {
        questions: unique,
        questionsWithDiagrams,
        year,
        totalPages: pages.length,
        failedPages,
    };
}

// extractQuestions("data/Final_Engg5_28042025.pdf").catch((err) => {
//     console.error("Extraction failed:", err);
// });
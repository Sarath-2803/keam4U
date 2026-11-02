export function buildPrompt(year: number): string {
    return `You are extracting questions from a KEAM ${year} engineering entrance exam page.

Return a JSON array of every question visible on this page.
Output ONLY the raw JSON array — no explanation, no markdown fences, no extra text.

─────────────────────────────────────────────────────
OUTPUT SHAPE (each question):
─────────────────────────────────────────────────────
{
  "question": "full question text here",
  "image": null,
  "options": ["option A text", "option B text", "option C text", "option D text", "option E text"],
  "answer": "A",
  "difficulty": "easy" | "medium" | "hard",
  "topic": "<topic from the list below>",
  "year": ${year}
}

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
- Skip any question marked "Question Cancelled"

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
Assign based on the concept and number of steps required:

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
    "question": "If n(A×B) = 160, n(B×C) = 80 and n(C×A) = 200, then n(A) =",
    "image": null,
    "options": ["10", "18", "16", "12", "20"],
    "answer": "E",
    "difficulty": "easy",
    "topic": "Sets and Relations",
    "year": ${year}
  },
  {
    "question": "Let f(x) = x² - 10x - 19, x ∈ ℝ. Then the inverse image of 5, f⁻¹(5) =",
    "image": null,
    "options": ["{-2, -12}", "{-2, 12}", "{2, -12}", "{2, 12}", "ϕ"],
    "answer": "B",
    "difficulty": "medium",
    "topic": "Functions",
    "year": ${year}
  },
  {
    "question": "The modulus of the complex number (2√2 + i2√2)² is equal to",
    "image": null,
    "options": ["64", "4", "32", "8", "16"],
    "answer": "E",
    "difficulty": "easy",
    "topic": "Complex Numbers",
    "year": ${year}
  }
]

If this page has no questions (blank page or only headers), return: []`;
}

export const FIRST_PAGE_PROMPT = (year_hint?: number) => `You are extracting data from the first page of a KEAM engineering entrance exam paper.

STEP 1: Find the exam date. It appears near the top as "Date of Test: DD-MM-YYYY". Extract the 4-digit year.

STEP 2: Extract every question visible on this page using the same rules as below.

Return your response in EXACTLY this format — YEAR line first, then the JSON array, nothing else:
YEAR: <4-digit year>
[...questions...]

${year_hint ? `The year is likely ${year_hint} based on the filename.` : ""}

QUESTION EXTRACTION RULES (same as regular pages):

OUTPUT SHAPE:
{
  "question": "full question text — NO question number prefix",
  "image": null,
  "options": ["A text", "B text", "C text", "D text", "E text"],
  "answer": "A",
  "difficulty": "easy" | "medium" | "hard",
  "topic": "<topic>",
  "year": <4-digit year from the date>
}

CRITICAL — QUESTION NUMBER RULE:
The PDF shows questions as "1. If n(A×B) = 160..." — the "1." is just a label.
NEVER include "1." or "12." or any number-dot prefix in the question field.
The question text starts AFTER the number and period.

MATH FORMATTING:
- Unicode for symbols: x², √3, π, α, β, θ, ∫, Σ, ∞, ≤, ≥, ∈, →
- Fractions inline: (x+1)/(x-1), sqrt(3)/2
- Ignore "Correct Answer : Option X" lines — use the letter for the answer field only
- Skip questions marked "Question Cancelled"

DIFFICULTY: easy (1 step, direct formula) | medium (2-3 steps, standard result) | hard (multi-step, non-obvious)

MATHEMATICS TOPICS: Sets and Relations | Functions | Complex Numbers | Sequences and Series |
Permutations and Combinations | Binomial Theorem | Matrices | Determinants |
Linear Inequalities | Trigonometric Functions | Inverse Trigonometric Functions |
Straight Lines | Circles | Parabola | Ellipse | Hyperbola | Vectors |
Three Dimensional Geometry | Limits and Continuity | Differentiation |
Applications of Derivatives | Integration | Definite Integrals |
Differential Equations | Linear Programming | Probability | Statistics

PHYSICS TOPICS: Units and Measurement | Kinematics | Laws of Motion | Work Energy and Power |
Rotational Motion | Gravitation | Properties of Matter | Thermodynamics |
Kinetic Theory of Gases | Oscillations | Waves | Electrostatics |
Current Electricity | Magnetic Effects of Current | Electromagnetic Induction |
Alternating Current | Electromagnetic Waves | Optics | Dual Nature of Matter |
Atoms and Nuclei | Semiconductor Devices

CHEMISTRY TOPICS: Solutions | Electrochemistry | Chemical Kinetics | Coordination Compounds |
Haloalkanes and Haloarenes | Alcohols Phenols and Ethers |
Aldehydes Ketones and Carboxylic Acids | Amines | Biomolecules |
d and f Block Elements | p-Block Elements | Atomic Structure |
Chemical Bonding | Thermodynamics | Equilibrium | Redox Reactions | s-Block Elements

If no questions visible on this page, write:
YEAR: <year>
[]`;
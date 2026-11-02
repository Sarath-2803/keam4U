import type { Explanation, Question } from "~/types";

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export const EXPLANATION_SCHEMA = {
    type: "OBJECT",
    properties: {
        steps: {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    title: { type: "STRING" },
                    detail: { type: "STRING" },
                },
                required: ["title", "detail"],
            },
        },
        answer: { type: "STRING" },
        tip: { type: "STRING" },
    },
    required: ["steps", "answer"],
} as const;

export function correctAnswerText(question: Question): string {
    const index = question.answer.charCodeAt(0) - 65;
    const option = question.options[index];
    return option ? `${question.answer} — ${option}` : question.answer;
}

export function buildExplanationPrompt(question: Question): string {
    const options = question.options
        .map((option, index) => `${OPTION_LABELS[index]}) ${option}`)
        .join(", ");

    return `You are a KEAM exam tutor. Explain the solution to this question as a structured set of short steps.

Question: ${question.question}
Options: ${options}
Correct Answer: ${question.answer} (${correctAnswerText(question)})

Rules:
- Return 2-4 steps, each with a short title (maximum 6 words) and a one or two sentence detail.
- Use plain Unicode math (√, ², ³, ×, ÷, →, ≤, ≥, π, θ). Do NOT use LaTeX, backslashes, dollar signs, markdown, or code fences.
- Keep the language simple and suitable for a KEAM student.
- Include a short final answer (the value or option) and an optional one-sentence exam tip.`;
}

function plainMath(input: string): string {
    let text = input
        .replace(/```[a-zA-Z]*\n?/g, " ")
        .replace(/```/g, " ")
        .replace(/`/g, "")
        .replace(/\*\*|__/g, "")
        .replace(/^#{1,6}\s*/gm, "");

    let previous = "";
    while (previous !== text) {
        previous = text;
        text = text
            .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)")
            .replace(
                /\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g,
                "($1)/($2)"
            );
    }

    return text
        .replace(/\\left|\\right/g, "")
        .replace(/\\cdot|\\times/g, "×")
        .replace(/\\div/g, "÷")
        .replace(/\\pm/g, "±")
        .replace(/\\leq?/g, "≤")
        .replace(/\\geq?/g, "≥")
        .replace(/\\neq/g, "≠")
        .replace(/\\to|\\rightarrow/g, "→")
        .replace(/\\pi/g, "π")
        .replace(/\\theta/g, "θ")
        .replace(/\\alpha/g, "α")
        .replace(/\\beta/g, "β")
        .replace(/\\infty/g, "∞")
        .replace(/\\text\s*\{([^{}]*)\}/g, "$1")
        .replace(/\\mathrm\s*\{([^{}]*)\}/g, "$1")
        .replace(/\^\{([^{}]*)\}/g, "^$1")
        .replace(/_\{([^{}]*)\}/g, "_$1")
        .replace(/\\[,;!:]/g, " ")
        .replace(/\\([a-zA-Z]+)/g, "$1")
        .replace(/[{}]/g, "")
        .replace(/\$/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function splitIntoSteps(text: string): string[] {
    const blocks = text
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean);

    if (blocks.length > 1) return blocks;

    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

    if (sentences.length <= 1) return sentences;

    const groupSize = Math.ceil(sentences.length / 4);
    const grouped: string[] = [];

    for (let index = 0; index < sentences.length; index += groupSize) {
        grouped.push(sentences.slice(index, index + groupSize).join(" "));
    }

    return grouped;
}

export function parseExplanation(raw: string): Explanation | null {
    const cleaned = raw
        .replace(/```(?:json)?/gi, "")
        .replace(/```/g, "")
        .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) return null;

    let parsed: unknown;

    try {
        parsed = JSON.parse(cleaned.slice(start, end + 1));
    } catch {
        return null;
    }

    if (!parsed || typeof parsed !== "object") return null;

    const record = parsed as Record<string, unknown>;
    const rawSteps = Array.isArray(record.steps) ? record.steps : [];

    const steps = rawSteps
        .map((step) => {
            if (!step || typeof step !== "object") return null;

            const item = step as Record<string, unknown>;
            const title = plainMath(String(item.title ?? ""));
            const detail = plainMath(String(item.detail ?? ""));

            if (!title || !detail) return null;

            return { title, detail };
        })
        .filter((step): step is { title: string; detail: string } => !!step);

    if (steps.length === 0) return null;

    const answer =
        typeof record.answer === "string" ? plainMath(record.answer) : "";
    const tip =
        typeof record.tip === "string" && record.tip.trim()
            ? plainMath(record.tip)
            : undefined;

    return { steps, answer, tip };
}

export function fallbackExplanation(
    raw: string,
    question: Question
): Explanation {
    const cleaned = plainMath(raw);
    const parts = splitIntoSteps(cleaned);

    if (parts.length === 0) {
        return {
            steps: [
                {
                    title: "Solution",
                    detail: "No explanation could be generated for this question.",
                },
            ],
            answer: correctAnswerText(question),
        };
    }

    const steps = parts.slice(0, 4).map((detail, index, list) => {
        let title = `Step ${index + 1}`;

        if (list.length === 1) {
            title = "Solution";
        } else if (index === 0) {
            title = "Given";
        } else if (index === list.length - 1) {
            title = "Conclusion";
        }

        return { title, detail };
    });

    return {
        steps,
        answer: correctAnswerText(question),
    };
}

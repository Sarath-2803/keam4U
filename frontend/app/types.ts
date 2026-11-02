export type Question = {
    _id: string;
    question: string;
    options: string[];
    image?: string | null;
    answer: string;
    difficulty: "easy" | "medium" | "hard";
    year: number;
    subject: string;
    topic?: string;
};

export type ExplanationStep = {
    title: string;
    detail: string;
};

export type Explanation = {
    steps: ExplanationStep[];
    answer: string;
    tip?: string;
};

import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock,
    Flag,
    Lightbulb,
    RotateCcw,
    Send,
    Sparkles,
    X,
} from "lucide-react";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import axios from "axios";
import type { Route } from "./+types/practiseQuestion";
import type { Explanation, Question } from "~/types";
import {
    chapterKey,
    clearAttempt,
    loadAttempt,
    markQuestionCompleted,
    saveAttempt,
} from "~/utils/progress";
import {
    EXPLANATION_SCHEMA,
    buildExplanationPrompt,
    correctAnswerText,
    fallbackExplanation,
    parseExplanation,
} from "~/utils/explanation";

const OPTION_LABELS = ["A", "B", "C", "D", "E"] as const;

const difficultyStyles: Record<string, string> = {
    easy: "text-green-600",
    medium: "text-amber-600",
    hard: "text-red-600",
};

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function titleCase(slug: string): string {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function meta({ params }: Route.MetaArgs) {
    return [
        {
            title: `Practise Question — ${titleCase(
                params.subject ?? ""
            )} | KEAM4U`,
        },
        {
            name: "description",
            content:
                "Attempt a KEAM previous year question with a timer, instant feedback, and an AI-generated explanation.",
        },
    ];
}

export async function loader({ params, request }: any) {
    const url = new URL(request.url);
    const year = url.searchParams.get("year") ?? "2025";
    const { subject, chapter, questionId } = params;

    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/questions/${questionId}`
    );
    const question: Question = response.data.data;

    let questions: Question[] = [];

    try {
        const chapterResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/questions/${subject}/${chapter}`,
            { params: { year } }
        );
        questions = chapterResponse.data.data ?? [];
    } catch {
        questions = [];
    }

    if (!questions.some((item) => item._id === questionId)) {
        questions = [question, ...questions];
    }

    const currentIndex = questions.findIndex((item) => item._id === questionId);

    return {
        question,
        year,
        subject,
        chapterSlug: chapter,
        questions,
        currentIndex: Math.max(currentIndex, 0),
    };
}

export default function QuestionPage() {
    const {
        question,
        year,
        subject,
        chapterSlug,
        questions,
        currentIndex,
    } = useLoaderData() as {
        question: Question;
        year: string;
        subject: string;
        chapterSlug: string;
        questions: Question[];
        currentIndex: number;
    };

    const navigate = useNavigate();
    const chapterName = question.topic ?? titleCase(chapterSlug);

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < questions.length - 1;

    const goTo = (index: number) => {
        const target = questions[index];
        if (!target) return;
        navigate(
            `/pyqs/${subject}/${chapterSlug}/${target._id}?year=${year}`
        );
    };

    const [timerActive, setTimerActive] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [hydratedId, setHydratedId] = useState<string | null>(null);

    const [explanation, setExplanation] = useState<Explanation | null>(null);
    const [loadingExplanation, setLoadingExplanation] = useState(false);
    const [explanationError, setExplanationError] = useState(false);

    const [showReport, setShowReport] = useState(false);
    const [reportText, setReportText] = useState("");
    const [reportStatus, setReportStatus] = useState<
        "idle" | "sending" | "sent" | "error"
    >("idle");

    useEffect(() => {
        const saved = loadAttempt(question._id);
        setSelected(saved?.selected ?? null);
        setSubmitted(saved?.submitted ?? false);
        setElapsed(saved?.elapsed ?? 0);
        setTimerActive(!saved?.submitted && (saved?.elapsed ?? 0) === 0);
        setExplanation(null);
        setExplanationError(false);
        setShowReport(false);
        setReportText("");
        setReportStatus("idle");
        setHydratedId(question._id);
    }, [question._id]);

    useEffect(() => {
        if (!timerActive) return;

        const id = setInterval(() => setElapsed((value) => value + 1), 1000);
        return () => clearInterval(id);
    }, [timerActive]);

    useEffect(() => {
        if (hydratedId !== question._id) return;

        saveAttempt(question._id, { selected, submitted, elapsed });
    }, [hydratedId, question._id, selected, submitted, elapsed]);

    useEffect(() => {
        if (!submitted || hydratedId !== question._id) return;
        markQuestionCompleted(
            chapterKey(subject, chapterSlug, year),
            question._id
        );
    }, [submitted, hydratedId, question._id, subject, chapterSlug, year]);

    const handleTimerToggle = () => {
        if (submitted) return;
        setTimerActive((value) => !value);
    };

    const handleTimerReset = () => {
        setTimerActive(false);
        setElapsed(0);
    };

    const handleSubmit = () => {
        if (!selected) return;
        setSubmitted(true);
        setTimerActive(false);
    };

    const handleReset = () => {
        clearAttempt(question._id);
        setSelected(null);
        setSubmitted(false);
        setElapsed(0);
        setTimerActive(true);
        setExplanation(null);
        setExplanationError(false);
    };

    const isCorrect = submitted && selected === question.answer;

    const fetchExplanation = async () => {
        setLoadingExplanation(true);
        setExplanationError(false);

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    { text: buildExplanationPrompt(question) },
                                ],
                            },
                        ],
                        generationConfig: {
                            temperature: 0.2,
                            maxOutputTokens: 500,
                            responseMimeType: "application/json",
                            responseSchema: EXPLANATION_SCHEMA,
                        },
                    }),
                }
            );

            if (!response.ok) throw new Error("Explanation request failed");

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) throw new Error("No explanation returned");

            const parsed = parseExplanation(text);
            const result = parsed ?? fallbackExplanation(text, question);

            if (!result.answer) {
                result.answer = correctAnswerText(question);
            }

            setExplanation(result);
        } catch {
            setExplanationError(true);
        } finally {
            setLoadingExplanation(false);
        }
    };

    const handleReport = async () => {
        if (!reportText.trim()) return;
        setReportStatus("sending");

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/report`, {
                questionId: question._id,
                question: question.question,
                issue: reportText,
            });
            setReportStatus("sent");
            setReportText("");
            setTimeout(() => {
                setShowReport(false);
                setReportStatus("idle");
            }, 2000);
        } catch {
            setReportStatus("error");
        }
    };

    const optionStyles = (label: string) => {
        if (!submitted) {
            return selected === label
                ? "border-primary bg-primary-fixed/40 text-on-surface shadow-sm"
                : "border-transparent bg-surface-lowest text-on-surface hover:border-primary/30 hover:bg-primary-fixed/10";
        }
        if (label === question.answer) {
            return "border-secondary bg-secondary/10 text-on-surface";
        }
        if (label === selected) {
            return "border-red-400 bg-red-50 text-on-surface";
        }
        return "border-transparent bg-surface-lowest text-outline opacity-70";
    };

    const optionBadgeStyles = (label: string) => {
        if (!submitted) {
            return selected === label
                ? "bg-primary text-white"
                : "bg-surface-high text-on-surface-variant";
        }
        if (label === question.answer) return "bg-secondary text-white";
        if (label === selected) return "bg-red-500 text-white";
        return "bg-surface-high text-outline";
    };

    return (
        <div className="pb-8">
            <Breadcrumbs
                items={[
                    { label: "PYQs", to: "/pyqs" },
                    { label: subject, to: `/pyqs/${subject}` },
                    {
                        label: chapterName,
                        to: `/pyqs/${subject}/${chapterSlug}?year=${year}`,
                    },
                    { label: "Question" },
                ]}
            />

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {subject} · {year}
                    </p>
                    <h1 className="mt-2 text-2xl font-extrabold text-on-surface sm:text-3xl">
                        {chapterName}
                    </h1>
                    <p className="mt-1 flex items-center gap-2 text-sm text-on-surface-variant">
                        <span className="capitalize">
                            Difficulty:{" "}
                            <span
                                className={`font-bold ${
                                    difficultyStyles[
                                        question.difficulty?.toLowerCase()
                                    ] ?? "text-on-surface"
                                }`}
                            >
                                {question.difficulty}
                            </span>
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-2 self-start rounded-2xl bg-surface-lowest px-3 py-2 shadow-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="w-14 text-center font-mono text-lg font-bold tabular-nums text-on-surface">
                        {formatTime(elapsed)}
                    </span>
                    {!submitted ? (
                        <>
                            <button
                                type="button"
                                onClick={handleTimerToggle}
                                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                                    timerActive
                                        ? "bg-surface-high text-on-surface-variant hover:bg-surface-highest"
                                        : "bg-primary text-white hover:bg-primary-container"
                                }`}
                            >
                                {timerActive
                                    ? "Pause"
                                    : elapsed > 0
                                    ? "Resume"
                                    : "Start"}
                            </button>
                            {elapsed > 0 ? (
                                <button
                                    type="button"
                                    onClick={handleTimerReset}
                                    aria-label="Reset timer"
                                    className="flex h-7 w-7 items-center justify-center rounded-lg text-outline transition-colors hover:bg-surface-low hover:text-on-surface"
                                >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                </button>
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>

            {questions.length > 0 ? (
                <div className="mt-5 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => hasPrev && goTo(currentIndex - 1)}
                        disabled={!hasPrev}
                        className="inline-flex items-center gap-1 rounded-xl bg-surface-lowest px-3 py-2 text-sm font-semibold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Prev
                    </button>

                    <div className="flex-1">
                        <div className="flex items-center justify-between text-xs font-bold text-outline">
                            <span>
                                Question {currentIndex + 1} of{" "}
                                {questions.length}
                            </span>
                            <span>
                                {Math.round(
                                    ((currentIndex + 1) / questions.length) *
                                        100
                                )}
                                %
                            </span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-high">
                            <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{
                                    width: `${
                                        ((currentIndex + 1) /
                                            questions.length) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => hasNext && goTo(currentIndex + 1)}
                        disabled={!hasNext}
                        className="inline-flex items-center gap-1 rounded-xl bg-surface-lowest px-3 py-2 text-sm font-semibold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            ) : null}

            <div className="mt-5 rounded-3xl bg-surface-lowest p-5 shadow-sm sm:p-7">
                <p className="text-lg leading-relaxed text-on-surface sm:text-xl">
                    {currentIndex >= 0 ? `${currentIndex + 1}. ` : null}
                    {question.question}
                </p>
                {question.image ? (
                    <img
                        src={question.image}
                        alt="Question diagram"
                        className="mt-4 max-w-full rounded-2xl bg-surface-low object-contain p-2"
                    />
                ) : null}
            </div>

            <div className="mt-4 flex flex-col gap-3" role="group" aria-label="Answer options">
                {question.options.map((option, index) => {
                    const label = OPTION_LABELS[index];
                    return (
                        <button
                            key={label}
                            type="button"
                            disabled={submitted}
                            aria-pressed={selected === label}
                            onClick={() => !submitted && setSelected(label)}
                            className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-150 disabled:cursor-default ${optionStyles(
                                label
                            )}`}
                        >
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition-colors ${optionBadgeStyles(
                                    label
                                )}`}
                            >
                                {label}
                            </span>
                            <span className="flex-1 text-sm leading-snug sm:text-base">
                                {option}
                            </span>
                            {submitted && label === question.answer ? (
                                <Check className="h-5 w-5 shrink-0 text-secondary" />
                            ) : null}
                            {submitted &&
                            label === selected &&
                            label !== question.answer ? (
                                <X className="h-5 w-5 shrink-0 text-red-500" />
                            ) : null}
                        </button>
                    );
                })}
            </div>

            {submitted ? (
                <div
                    className={`mt-5 flex items-start gap-3 rounded-2xl px-5 py-4 ${
                        isCorrect
                            ? "bg-secondary/10 text-secondary"
                            : "bg-red-50 text-red-700"
                    }`}
                >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                        {isCorrect ? (
                            <Check className="h-5 w-5 text-secondary" />
                        ) : (
                            <Lightbulb className="h-5 w-5 text-red-500" />
                        )}
                    </span>
                    <div>
                        <p className="font-display text-base font-extrabold">
                            {isCorrect ? "Correct!" : "Not quite."}
                        </p>
                        {!isCorrect ? (
                            <p className="mt-0.5 text-sm">
                                Correct answer:{" "}
                                <span className="font-bold">
                                    {question.answer} —{" "}
                                    {
                                        question.options[
                                            question.answer.charCodeAt(0) - 65
                                        ]
                                    }
                                </span>
                            </p>
                        ) : null}
                    </div>
                </div>
            ) : null}

            {submitted ? (
                <div className="mt-4">
                    {!explanation ? (
                        <div>
                            <button
                                type="button"
                                onClick={fetchExplanation}
                                disabled={loadingExplanation}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-fixed/40 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary-fixed/70 disabled:opacity-60"
                            >
                                {loadingExplanation ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                                        Generating explanation...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        {explanationError
                                            ? "Try explanation again"
                                            : "Show explanation"}
                                    </>
                                )}
                            </button>
                            {explanationError ? (
                                <p className="mt-2 text-center text-xs font-medium text-red-600">
                                    Could not generate an explanation. Please
                                    try again.
                                </p>
                            ) : null}
                        </div>
                    ) : (
                        <div className="rounded-3xl bg-primary-fixed/30 p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    AI Explanation
                                </p>
                                <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                                    Step by step
                                </span>
                            </div>

                            <ol className="mt-5 space-y-3">
                                {explanation.steps.map((step, index) => (
                                    <li
                                        key={`${index}-${step.title}`}
                                        className="flex gap-3 rounded-2xl bg-surface-lowest/80 p-4"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">
                                            {index + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="font-display text-sm font-bold text-on-surface sm:text-base">
                                                {step.title}
                                            </p>
                                            <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                                                {step.detail}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-secondary/10 px-4 py-3">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                                <p className="text-sm text-on-surface">
                                    <span className="font-bold text-secondary">
                                        Final answer:{" "}
                                    </span>
                                    <span className="font-bold">
                                        {explanation.answer}
                                    </span>
                                </p>
                            </div>

                            {explanation.tip ? (
                                <div className="mt-3 flex items-start gap-2 rounded-2xl bg-tertiary-fixed/40 px-4 py-3">
                                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-tertiary" />
                                    <p className="text-sm text-on-surface">
                                        <span className="font-bold text-tertiary">
                                            Exam tip:{" "}
                                        </span>
                                        {explanation.tip}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            ) : null}

            <div className="sticky bottom-20 z-30 mt-6 rounded-2xl bg-surface/90 p-2 backdrop-blur md:static md:bg-transparent md:p-0">
                <div className="flex gap-3">
                    {!submitted ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!selected}
                            className={`flex-1 rounded-2xl py-3.5 text-sm font-bold transition-transform ${
                                selected
                                    ? "cta-gradient text-white shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95"
                                    : "cursor-not-allowed bg-surface-high text-outline"
                            }`}
                        >
                            Submit answer
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-surface-lowest py-3.5 text-sm font-bold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Try again
                            </button>
                            {hasNext ? (
                                <button
                                    type="button"
                                    onClick={() => goTo(currentIndex + 1)}
                                    className="cta-gradient inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95"
                                >
                                    Next question
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/pyqs/${subject}/${chapterSlug}?year=${year}`
                                        )
                                    }
                                    className="cta-gradient inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to questions
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="mt-8">
                {!showReport ? (
                    <button
                        type="button"
                        onClick={() => setShowReport(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 transition-colors hover:text-red-600"
                    >
                        <Flag className="h-3.5 w-3.5" />
                        Report an issue with this question
                    </button>
                ) : (
                    <div className="rounded-2xl bg-surface-lowest p-4 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-sm font-bold text-on-surface">
                                Report an issue
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowReport(false);
                                    setReportText("");
                                    setReportStatus("idle");
                                }}
                                aria-label="Close report form"
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-outline hover:bg-surface-low hover:text-on-surface"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <textarea
                            value={reportText}
                            onChange={(event) =>
                                setReportText(event.target.value)
                            }
                            placeholder="Describe the issue — wrong answer, incorrect options, typo..."
                            rows={3}
                            className="w-full resize-none rounded-xl bg-surface-low p-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={handleReport}
                                disabled={
                                    !reportText.trim() ||
                                    reportStatus === "sending"
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Send className="h-3.5 w-3.5" />
                                {reportStatus === "sending"
                                    ? "Sending..."
                                    : "Submit report"}
                            </button>
                            {reportStatus === "sent" ? (
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                                    <Check className="h-4 w-4" />
                                    Report sent
                                </span>
                            ) : null}
                            {reportStatus === "error" ? (
                                <span className="text-sm font-medium text-red-600">
                                    Failed to send. Try again.
                                </span>
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import axios from "axios";
import type { Route } from "./+types/questions";
import type { Question } from "~/types";
import { chapterKey, getCompletedQuestions } from "~/utils/progress";

const difficultyStyles: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-red-100 text-red-700",
};

function titleCase(str: string): string {
    const lowercaseWords = new Set([
        "and",
        "or",
        "of",
        "the",
        "a",
        "an",
        "in",
        "on",
        "at",
        "to",
        "for",
        "by",
    ]);

    return str
        .toLowerCase()
        .split("-")
        .map((word, index) => {
            if (index > 0 && lowercaseWords.has(word)) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}

export function meta({ params }: Route.MetaArgs) {
    const subject = titleCase(params.subject ?? "");
    const chapter = titleCase(params.chapter ?? "");

    return [
        { title: `${chapter} — ${subject} PYQs | KEAM4U` },
        {
            name: "description",
            content: `Practice ${chapter} previous year KEAM ${subject} questions with answers, difficulty levels, and instant explanations.`,
        },
    ];
}

export async function loader({ params, request }: any) {
    const url = new URL(request.url);
    const year = url.searchParams.get("year") ?? "2026";

    const subject = params.subject;
    const chapter = params.chapter;

    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/questions/${subject}/${chapter}`,
        {
            params: { year },
        }
    );

    return {
        questions: response.data.data ?? [],
        year,
        subject,
        chapterSlug: chapter,
        chapter: titleCase(chapter),
    };
}

export default function QuestionsPage() {
    const data = useLoaderData() as {
        questions: Question[];
        year: string;
        subject: string;
        chapterSlug: string;
        chapter: string;
    };

    const { questions, year, subject, chapter, chapterSlug } = data;

    const [completed, setCompleted] = useState<Set<string>>(new Set());

    useEffect(() => {
        setCompleted(
            new Set(getCompletedQuestions(chapterKey(subject, chapterSlug, year)))
        );
    }, [subject, chapterSlug, year]);

    return (
        <div>
            <Breadcrumbs
                items={[
                    { label: "PYQs", to: "/pyqs" },
                    { label: subject, to: `/pyqs/${subject}` },
                    { label: chapter },
                ]}
            />

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {subject} · {year}
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl">
                        {chapter}
                    </h1>
                    <p className="mt-2 text-on-surface-variant">
                        {questions.length > 0
                            ? `${questions.length} questions from the ${year} paper.`
                            : "No questions available for this year."}
                    </p>
                </div>
                <Link
                    to={`/pyqs/${subject}`}
                    className="inline-flex items-center gap-2 self-start rounded-xl bg-surface-lowest px-4 py-2.5 text-sm font-bold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Change year
                </Link>
            </div>

            {questions.length === 0 ? (
                <div className="mt-8 rounded-3xl bg-surface-lowest px-6 py-14 text-center shadow-sm">
                    <p className="font-display text-lg font-bold text-on-surface">
                        No questions found
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        There are no {chapter} questions for {year}. Try another
                        year or chapter.
                    </p>
                    <Link
                        to={`/pyqs/${subject}`}
                        className="cta-gradient mt-6 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white"
                    >
                        Back to chapters
                    </Link>
                </div>
            ) : (
                <div className="mt-6 flex flex-col gap-4">
                    {questions.map((q, index) => (
                        <Link
                            key={q._id}
                            to={`/pyqs/${subject}/${chapterSlug}/${q._id}?year=${year}`}
                            className="group flex gap-4 rounded-3xl bg-surface-lowest p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,64,161,0.1)]"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed/70 font-display text-sm font-extrabold text-primary">
                                {index + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="line-clamp-3 text-base leading-relaxed text-on-surface">
                                    {q.question}
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-[11px] font-bold capitalize ${
                                            difficultyStyles[
                                                q.difficulty?.toLowerCase()
                                            ] ??
                                            "bg-surface-low text-on-surface-variant"
                                        }`}
                                    >
                                        {q.difficulty}
                                    </span>
                                    <span className="rounded-full bg-surface-low px-3 py-1 text-[11px] font-bold text-on-surface-variant">
                                        {q.options.length} options
                                    </span>
                                    {completed.has(q._id) ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-bold text-secondary">
                                            <Check className="h-3 w-3" />
                                            Done
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-outline transition-all group-hover:translate-x-1 group-hover:text-primary" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

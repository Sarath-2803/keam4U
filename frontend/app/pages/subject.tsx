import { Link, useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { Breadcrumbs } from "~/components/Breadcrumbs";
import axios from "axios";
import type { Route } from "./+types/subject";

type Chapter = { topic: string; count: number };

function displayName(slug: string) {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function slugifyChapter(topic: string) {
    return topic.trim().replace(/\s+/g, "-");
}

export function meta({ params }: Route.MetaArgs) {
    const subject = displayName(params.subject ?? "");

    return [
        {
            title: `${subject} PYQs | KEAM4U Previous Year Questions`,
        },
        {
            name: "description",
            content: `Practice ${subject} previous year KEAM questions chapter-wise with year filters and topic-wise practice.`,
        },
    ];
}

export async function loader({ params }: any) {
    const subject = params.subject;

    const yearResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/questions/${subject}/year`
    );

    const years: number[] = yearResponse.data.data ?? [];

    let initialData: Chapter[] = [];

    if (years.length > 0) {
        const topicsResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/questions/${subject}/${years[0]}/topic`
        );
        initialData = topicsResponse.data.data ?? [];
    }

    return {
        subject: displayName(subject),
        years,
        initialData,
    };
}

async function fetchChaptersForYear(subject: string, year: string) {
    const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/questions/${subject}/${year}/topic`
    );
    return (response.data.data ?? []) as Chapter[];
}

export default function MathsPyqs() {
    const { subject, years, initialData } = useLoaderData() as {
        subject: string;
        years: number[];
        initialData: Chapter[];
    };

    const [selectedYear, setSelectedYear] = useState(
        years.length > 0 ? String(years[0]) : ""
    );
    const [chapters, setChapters] = useState<Chapter[]>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const filteredChapters = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return chapters;
        return chapters.filter((chapter) =>
            chapter.topic.toLowerCase().includes(q)
        );
    }, [chapters, query]);

    const totalQuestions = chapters.reduce(
        (sum, chapter) => sum + chapter.count,
        0
    );

    const handleYearChange = async (year: string) => {
        if (year === selectedYear) return;
        setSelectedYear(year);
        setLoading(true);
        setError(null);
        try {
            const res = await fetchChaptersForYear(subject, year);
            setChapters(res);
        } catch {
            setError("Could not load chapters for this year. Please try again.");
            setChapters([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Breadcrumbs
                items={[
                    { label: "PYQs", to: "/pyqs" },
                    { label: subject },
                ]}
            />

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {subject}
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl">
                        {subject} PYQs
                    </h1>
                    <p className="mt-2 text-on-surface-variant">
                        Select a year, then choose a chapter to start practising.
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="rounded-2xl bg-surface-lowest px-4 py-3 text-center shadow-sm sm:text-left">
                        <p className="font-display text-xl font-extrabold text-primary">
                            {chapters.length}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
                            Chapters
                        </p>
                    </div>
                    <div className="rounded-2xl bg-surface-lowest px-4 py-3 text-center shadow-sm sm:text-left">
                        <p className="font-display text-xl font-extrabold text-secondary">
                            {totalQuestions}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
                            Questions
                        </p>
                    </div>
                </div>
            </div>

            {/* Year selector */}
            <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    Select year
                </p>
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                    {years.map((year) => {
                        const active = String(year) === selectedYear;
                        return (
                            <button
                                key={year}
                                type="button"
                                onClick={() => handleYearChange(String(year))}
                                className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                                    active
                                        ? "cta-gradient text-white shadow-md shadow-primary/20"
                                        : "bg-surface-lowest text-on-surface-variant shadow-sm hover:bg-surface-low"
                                }`}
                            >
                                {year}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search */}
            <div className="relative mt-6">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" />
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={`Search ${subject.toLowerCase()} chapters...`}
                    className="w-full rounded-2xl bg-surface-lowest py-3.5 pl-12 pr-11 text-sm text-on-surface shadow-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {query ? (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-outline hover:bg-surface-low hover:text-on-surface"
                    >
                        <X className="h-4 w-4" />
                    </button>
                ) : null}
            </div>

            {/* Chapters */}
            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                        Chapters
                    </h2>
                    {query ? (
                        <p className="text-sm text-outline">
                            {filteredChapters.length} result
                            {filteredChapters.length === 1 ? "" : "s"}
                        </p>
                    ) : null}
                </div>

                {loading ? (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-28 animate-pulse rounded-3xl bg-surface-low"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="mt-4 rounded-3xl bg-error-container px-5 py-4 text-sm font-medium text-error">
                        {error}
                    </div>
                ) : filteredChapters.length === 0 ? (
                    <div className="mt-4 rounded-3xl bg-surface-lowest px-6 py-12 text-center shadow-sm">
                        <p className="font-display text-lg font-bold text-on-surface">
                            No chapters found
                        </p>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            {query
                                ? "Try a different search term."
                                : "There are no chapters available for this year."}
                        </p>
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredChapters.map((chapter, index) => (
                            <Link
                                key={chapter.topic}
                                to={`/pyqs/${subject}/${slugifyChapter(
                                    chapter.topic
                                )}?year=${selectedYear}`}
                                state={chapter.topic}
                                className="group flex flex-col justify-between rounded-3xl bg-surface-lowest p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,64,161,0.1)]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-fixed/70 text-xs font-extrabold text-primary">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="rounded-full bg-surface-low px-3 py-1 text-[11px] font-bold text-on-surface-variant">
                                        {chapter.count} Q
                                    </span>
                                </div>
                                <h3 className="mt-4 line-clamp-2 font-display text-lg font-bold leading-snug text-on-surface transition-colors group-hover:text-primary">
                                    {chapter.topic}
                                </h3>
                                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                                    Practise
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

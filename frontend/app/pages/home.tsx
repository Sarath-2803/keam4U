import { Link } from "react-router";
import {
    ArrowRight,
    Atom,
    BookOpen,
    Calculator,
    CheckCircle2,
    Clock,
    FlaskConical,
    GraduationCap,
    Layers,
    Lightbulb,
    Smartphone,
    Sparkles,
} from "lucide-react";
import type { Route } from "./+types/home";
import { SectionLabel } from "~/components/PageHeader";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "KEAM4U — Crack KEAM with Previous Year Questions" },
        {
            name: "description",
            content:
                "Practice KEAM previous year questions subject-wise and chapter-wise with timed attempts and instant AI explanations.",
        },
    ];
}

const subjects = [
    {
        name: "Mathematics",
        href: "/pyqs/mathematics",
        image: "/maths_banner.webp",
        icon: Calculator,
        blurb: "27 chapters · Functions to Integration",
    },
    {
        name: "Physics",
        href: "/pyqs/physics",
        image: "/physics_banner.webp",
        icon: Atom,
        blurb: "Mechanics, optics, modern physics",
    },
    {
        name: "Chemistry",
        href: "/pyqs/chemistry",
        image: "/chemistry_banner.webp",
        icon: FlaskConical,
        blurb: "Physical, organic & inorganic",
    },
] as const;

const features = [
    {
        icon: BookOpen,
        title: "Real papers",
        body: "Questions sourced directly from official KEAM papers from 2024 to 2026.",
    },
    {
        icon: Clock,
        title: "Built-in timer",
        body: "Time each question to build exam speed and track your improvement.",
    },
    {
        icon: Lightbulb,
        title: "AI explanations",
        body: "Get step-by-step explanations instantly after submitting your answer.",
    },
    {
        icon: Layers,
        title: "Chapter-wise",
        body: "Filter by subject and chapter to focus on your weak areas.",
    },
    {
        icon: CheckCircle2,
        title: "Instant feedback",
        body: "Know immediately if you're right or wrong with colour-coded results.",
    },
    {
        icon: Smartphone,
        title: "Works everywhere",
        body: "Optimised for mobile, tablet, and desktop. Practise anywhere.",
    },
] as const;

export default function HomePage() {
    return (
        <div className="pb-4">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-[2rem] bg-surface-lowest px-6 py-10 shadow-[0_20px_50px_rgba(0,64,161,0.06)] sm:px-10 sm:py-14 lg:px-14">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-2xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-secondary/10 blur-2xl"
                />

                <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                        <SectionLabel>KEAM4U</SectionLabel>
                        <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-on-surface sm:text-5xl lg:text-6xl">
                            Crack KEAM with{" "}
                            <span className="text-primary">previous year</span>{" "}
                            questions.
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
                            Subject-wise, chapter-wise practice from real KEAM
                            papers. Attempt questions, time yourself, and get
                            instant AI explanations.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/pyqs"
                                className="cta-gradient inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-95"
                            >
                                Start practising
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/pyqs"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-low px-7 py-3.5 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-high"
                            >
                                Browse subjects
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 rounded-3xl bg-surface-low/70 p-4 sm:gap-4 sm:p-5 lg:grid-cols-1">
                        {[
                            { value: "3", label: "Subjects" },
                            { value: "70+", label: "Chapters" },
                            { value: "1,500+", label: "Questions" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl bg-surface-lowest px-4 py-4 text-center shadow-sm lg:flex lg:items-center lg:justify-between lg:text-left"
                            >
                                <p className="font-display text-2xl font-extrabold text-primary lg:text-3xl">
                                    {stat.value}
                                </p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-outline lg:mt-0">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subjects */}
            <section className="mt-12">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <SectionLabel>Subjects</SectionLabel>
                        <h2 className="mt-2 text-2xl font-extrabold text-on-surface sm:text-3xl">
                            Pick a subject to begin
                        </h2>
                    </div>
                    <Link
                        to="/pyqs"
                        className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline sm:inline-flex"
                    >
                        View all
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {subjects.map((subject) => {
                        const Icon = subject.icon;
                        return (
                            <Link
                                key={subject.name}
                                to={subject.href}
                                className="group relative overflow-hidden rounded-3xl bg-surface-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,64,161,0.12)]"
                            >
                                <div className="h-40 overflow-hidden bg-surface-low">
                                    <img
                                        src={subject.image}
                                        alt={subject.name}
                                        loading="lazy"
                                        decoding="async"
                                        width={896}
                                        height={1200}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-display text-xl font-extrabold text-on-surface transition-colors group-hover:text-primary">
                                                {subject.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-on-surface-variant">
                                                {subject.blurb}
                                            </p>
                                        </div>
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                    </div>
                                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                                        Start practising
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Features */}
            <section className="mt-14 rounded-[2rem] bg-surface-low px-6 py-10 sm:px-10">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <div>
                        <SectionLabel>Why KEAM4U</SectionLabel>
                        <h2 className="mt-1 text-2xl font-extrabold text-on-surface sm:text-3xl">
                            Built for focused preparation
                        </h2>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="flex gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed/70 text-primary">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="font-bold text-on-surface">
                                        {feature.title}
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                                        {feature.body}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="cta-gradient mt-14 flex flex-col items-center rounded-[2rem] px-6 py-12 text-center text-white sm:px-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <GraduationCap className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">
                    Ready to start practising?
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                    Pick a subject and start with the first chapter. Every
                    attempt gets you closer to your target score.
                </p>
                <Link
                    to="/pyqs"
                    className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                >
                    Go to PYQs
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </section>
        </div>
    );
}

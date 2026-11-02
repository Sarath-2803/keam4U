import { Link } from "react-router";
import { ArrowRight, Atom, Calculator, FlaskConical } from "lucide-react";
import type { Route } from "./+types/pyqs";
import { PageHeader } from "~/components/PageHeader";

const subjects = [
    {
        name: "Mathematics",
        href: "/pyqs/mathematics",
        image: "/maths_banner.webp",
        icon: Calculator,
        blurb: "Functions, calculus, vectors & more",
    },
    {
        name: "Physics",
        href: "/pyqs/physics",
        image: "/physics_banner.webp",
        icon: Atom,
        blurb: "Mechanics, optics & modern physics",
    },
    {
        name: "Chemistry",
        href: "/pyqs/chemistry",
        image: "/chemistry_banner.webp",
        icon: FlaskConical,
        blurb: "Physical, organic & inorganic",
    },
] as const;

export function meta({}: Route.MetaArgs) {
    return [
        { title: "KEAM Previous Year Questions | KEAM4U" },
        {
            name: "description",
            content:
                "Practice KEAM previous year questions subject-wise and chapter-wise for Mathematics, Physics, and Chemistry.",
        },
    ];
}

export default function PyqsPage() {
    return (
        <div>
            <PageHeader
                eyebrow="Practice zone"
                title="Previous Year Questions"
                description="Practise real KEAM questions subject-wise and chapter-wise. Choose a subject to see its chapters and years."
            />

            <div className="mt-10">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    Subjects
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {subjects.map((subject) => {
                        const Icon = subject.icon;
                        return (
                            <Link
                                key={subject.name}
                                to={subject.href}
                                className="group relative overflow-hidden rounded-3xl bg-surface-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,64,161,0.12)]"
                            >
                                <div className="relative h-44 overflow-hidden bg-surface-low">
                                    <img
                                        src={subject.image}
                                        alt={subject.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="eager"
                                        fetchPriority="high"
                                        decoding="async"
                                        width={896}
                                        height={1200}
                                    />
                                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary shadow-sm backdrop-blur">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-display text-xl font-extrabold text-on-surface transition-colors group-hover:text-primary">
                                        {subject.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-on-surface-variant">
                                        {subject.blurb}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                                        View chapters
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

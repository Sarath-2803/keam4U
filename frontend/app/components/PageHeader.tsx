import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {children}
        </p>
    );
}

type PageHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
                {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
                <h1 className="mt-2 text-3xl font-extrabold leading-tight text-on-surface sm:text-4xl md:text-5xl">
                    {title}
                </h1>
                {description ? (
                    <p className="mt-3 text-base leading-relaxed text-on-surface-variant sm:text-lg">
                        {description}
                    </p>
                ) : null}
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
    );
}

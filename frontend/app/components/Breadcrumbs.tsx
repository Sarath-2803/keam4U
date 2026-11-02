import { ChevronLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

type BreadcrumbItem = {
    label: string;
    to?: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const showBack = location.pathname !== "/";

    return (
        <div className="mb-3 text-sm">
            {showBack ? (
                <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg font-semibold text-on-surface-variant transition-colors hover:text-primary"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </button>
            ) : null}

            <nav aria-label="Breadcrumb" className={showBack ? "mt-2" : ""}>
                <ol className="flex flex-wrap items-center gap-1.5 text-xs text-outline sm:text-sm">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li
                                key={`${item.label}-${index}`}
                                className="flex min-w-0 items-center gap-1.5"
                            >
                                {item.to && !isLast ? (
                                    <Link
                                        to={item.to}
                                        className="truncate capitalize transition-colors hover:text-primary hover:underline"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={`truncate capitalize ${
                                            isLast
                                                ? "font-semibold text-on-surface"
                                                : "text-on-surface-variant"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                )}
                                {!isLast ? (
                                    <span aria-hidden="true" className="text-outline-variant">
                                        /
                                    </span>
                                ) : null}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}

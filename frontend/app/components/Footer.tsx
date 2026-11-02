import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="mt-12 border-t border-outline-variant/30 bg-surface-low">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                <div>
                    <p className="font-display text-base font-extrabold tracking-tight text-on-surface">
                        KEAM<span className="text-primary">4U</span>
                    </p>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        Previous year questions, chapter by chapter.
                    </p>
                </div>
                <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-on-surface-variant">
                    <Link to="/" className="hover:text-primary">
                        Home
                    </Link>
                    <Link to="/pyqs" className="hover:text-primary">
                        Previous Year Questions
                    </Link>
                    <Link to="/pyqs/mathematics" className="hover:text-primary">
                        Mathematics
                    </Link>
                    <Link to="/pyqs/physics" className="hover:text-primary">
                        Physics
                    </Link>
                    <Link to="/pyqs/chemistry" className="hover:text-primary">
                        Chemistry
                    </Link>
                </nav>
            </div>
            <div className="border-t border-outline-variant/20 py-4 text-center text-xs text-outline">
                © {new Date().getFullYear()} KEAM4U. Built for KEAM aspirants.
            </div>
        </footer>
    );
}

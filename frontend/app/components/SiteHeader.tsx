import { NavLink } from "react-router";
import { ArrowRight, GraduationCap } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Previous Year Questions", to: "/pyqs" },
];

export function SiteHeader() {
  return (
    <header className="glass sticky top-0 z-40 border-b border-outline-variant/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2.5">
          <span className="cta-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-on-surface">
            KEAM<span className="text-primary">4U</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary-fixed/60 text-primary"
                    : "text-on-surface-variant hover:bg-surface-low hover:text-on-surface"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/pyqs"
          className="cta-gradient inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
        >
          Practice
          <ArrowRight className="h-4 w-4" />
        </NavLink>
      </div>
    </header>
  );
}

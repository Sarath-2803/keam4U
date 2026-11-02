import { Atom, BookOpen, Calculator, FlaskConical, Home } from "lucide-react";
import { NavLink } from "react-router";

const items = [
    { label: "Home", to: "/", icon: Home },
    { label: "Maths", to: "/pyqs/mathematics", icon: Calculator },
    { label: "Physics", to: "/pyqs/physics", icon: Atom },
    { label: "Chemistry", to: "/pyqs/chemistry", icon: FlaskConical },
    { label: "Practice", to: "/pyqs", icon: BookOpen },
];

export const Navigation = () => {
    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant/30 bg-white/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
            <ul className="mx-auto flex max-w-md items-center justify-between">
                {items.map(({ label, to, icon: Icon }) => (
                    <li key={label} className="flex-1">
                        <NavLink
                            to={to}
                            end={to === "/" || to === "/pyqs"}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                                    isActive
                                        ? "bg-primary-fixed/60 text-primary"
                                        : "text-outline hover:text-on-surface"
                                }`
                            }
                        >
                            <Icon className="h-5 w-5" />
                            <span>{label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

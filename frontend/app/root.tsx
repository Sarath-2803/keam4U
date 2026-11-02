import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Manrope:wght@400;500;600;700;800&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { title: "KEAM4U — Previous Year Questions for KEAM" },
  { name: "theme-color", content: "#0040a1" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="nBBKxQdvJkZYzs5F0JngN19x-77HTX-EI0998BHXL7M" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {message}
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-on-surface">
        Something went wrong
      </h1>
      <p className="mt-3 text-on-surface-variant">{details}</p>
      <a
        href="/"
        className="cta-gradient mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95"
      >
        Back to home
      </a>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto rounded-2xl bg-surface-low p-4 text-left text-xs text-on-surface-variant">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

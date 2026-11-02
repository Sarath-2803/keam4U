import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useLoaderData, useLocation, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ArrowRight, Atom, BookOpen, Calculator, Check, CheckCircle2, ChevronLeft, ChevronRight, Clock, Flag, FlaskConical, GraduationCap, Home, Layers, Lightbulb, RotateCcw, Search, Send, Smartphone, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links$1,
	meta: () => meta$5
});
var links$1 = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Manrope:wght@400;500;600;700;800&display=swap"
	}
];
var meta$5 = () => [{ title: "KEAM4U — Previous Year Questions for KEAM" }, {
	name: "theme-color",
	content: "#0040a1"
}];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "google-site-verification",
				content: "nBBKxQdvJkZYzs5F0JngN19x-77HTX-EI0998BHXL7M"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
				children: message
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-3 text-3xl font-extrabold text-on-surface",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 text-on-surface-variant",
				children: details
			}),
			/* @__PURE__ */ jsx("a", {
				href: "/",
				className: "cta-gradient mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-95",
				children: "Back to home"
			}),
			stack
		]
	});
});
//#endregion
//#region app/components/SiteHeader.tsx
var links = [{
	label: "Home",
	to: "/"
}, {
	label: "Previous Year Questions",
	to: "/pyqs"
}];
function SiteHeader() {
	return /* @__PURE__ */ jsx("header", {
		className: "glass sticky top-0 z-40 border-b border-outline-variant/40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ jsxs(NavLink, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ jsx("span", {
						className: "cta-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm",
						children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5" })
					}), /* @__PURE__ */ jsxs("span", {
						className: "font-display text-lg font-extrabold tracking-tight text-on-surface",
						children: ["KEAM", /* @__PURE__ */ jsx("span", {
							className: "text-primary",
							children: "4U"
						})]
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: links.map((link) => /* @__PURE__ */ jsx(NavLink, {
						to: link.to,
						end: link.to === "/",
						className: ({ isActive }) => `rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${isActive ? "bg-primary-fixed/60 text-primary" : "text-on-surface-variant hover:bg-surface-low hover:text-on-surface"}`,
						children: link.label
					}, link.to))
				}),
				/* @__PURE__ */ jsxs(NavLink, {
					to: "/pyqs",
					className: "cta-gradient inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95",
					children: ["Practice", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
				})
			]
		})
	});
}
//#endregion
//#region app/components/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "mt-12 border-t border-outline-variant/30 bg-surface-low",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
				className: "font-display text-base font-extrabold tracking-tight text-on-surface",
				children: ["KEAM", /* @__PURE__ */ jsx("span", {
					className: "text-primary",
					children: "4U"
				})]
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-on-surface-variant",
				children: "Previous year questions, chapter by chapter."
			})] }), /* @__PURE__ */ jsxs("nav", {
				className: "flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-on-surface-variant",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "hover:text-primary",
						children: "Home"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/pyqs",
						className: "hover:text-primary",
						children: "Previous Year Questions"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/pyqs/mathematics",
						className: "hover:text-primary",
						children: "Mathematics"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/pyqs/physics",
						className: "hover:text-primary",
						children: "Physics"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/pyqs/chemistry",
						className: "hover:text-primary",
						children: "Chemistry"
					})
				]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "border-t border-outline-variant/20 py-4 text-center text-xs text-outline",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" KEAM4U. Built for KEAM aspirants."
			]
		})]
	});
}
//#endregion
//#region app/components/Navigation.tsx
var items = [
	{
		label: "Home",
		to: "/",
		icon: Home
	},
	{
		label: "Maths",
		to: "/pyqs/mathematics",
		icon: Calculator
	},
	{
		label: "Physics",
		to: "/pyqs/physics",
		icon: Atom
	},
	{
		label: "Chemistry",
		to: "/pyqs/chemistry",
		icon: FlaskConical
	},
	{
		label: "Practice",
		to: "/pyqs",
		icon: BookOpen
	}
];
var Navigation = () => {
	return /* @__PURE__ */ jsx("nav", {
		className: "fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant/30 bg-white/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden",
		children: /* @__PURE__ */ jsx("ul", {
			className: "mx-auto flex max-w-md items-center justify-between",
			children: items.map(({ label, to, icon: Icon }) => /* @__PURE__ */ jsx("li", {
				className: "flex-1",
				children: /* @__PURE__ */ jsxs(NavLink, {
					to,
					end: to === "/" || to === "/pyqs",
					className: ({ isActive }) => `flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors ${isActive ? "bg-primary-fixed/60 text-primary" : "text-outline hover:text-on-surface"}`,
					children: [/* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }), /* @__PURE__ */ jsx("span", { children: label })]
				})
			}, label))
		})
	});
};
//#endregion
//#region app/app.tsx
var app_exports = /* @__PURE__ */ __exportAll({ default: () => app_default });
var app_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen flex-col bg-surface",
		children: [
			/* @__PURE__ */ jsx(SiteHeader, {}),
			/* @__PURE__ */ jsx("main", {
				className: "mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-10 lg:px-8 lg:pt-10",
				children: /* @__PURE__ */ jsx(Outlet, {})
			}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(Navigation, {})
		]
	});
});
//#endregion
//#region app/components/PageHeader.tsx
function SectionLabel({ children }) {
	return /* @__PURE__ */ jsx("p", {
		className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
		children
	});
}
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl",
			children: [
				eyebrow ? /* @__PURE__ */ jsx(SectionLabel, { children: eyebrow }) : null,
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 text-3xl font-extrabold leading-tight text-on-surface sm:text-4xl md:text-5xl",
					children: title
				}),
				description ? /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-base leading-relaxed text-on-surface-variant sm:text-lg",
					children: description
				}) : null
			]
		}), actions ? /* @__PURE__ */ jsx("div", {
			className: "shrink-0",
			children: actions
		}) : null]
	});
}
//#endregion
//#region app/pages/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$4
});
function meta$4({}) {
	return [{ title: "KEAM4U — Crack KEAM with Previous Year Questions" }, {
		name: "description",
		content: "Practice KEAM previous year questions subject-wise and chapter-wise with timed attempts and instant AI explanations."
	}];
}
var subjects$1 = [
	{
		name: "Mathematics",
		href: "/pyqs/mathematics",
		image: "/maths_banner.webp",
		icon: Calculator,
		blurb: "27 chapters · Functions to Integration"
	},
	{
		name: "Physics",
		href: "/pyqs/physics",
		image: "/physics_banner.webp",
		icon: Atom,
		blurb: "Mechanics, optics, modern physics"
	},
	{
		name: "Chemistry",
		href: "/pyqs/chemistry",
		image: "/chemistry_banner.webp",
		icon: FlaskConical,
		blurb: "Physical, organic & inorganic"
	}
];
var features = [
	{
		icon: BookOpen,
		title: "Real papers",
		body: "Questions sourced directly from official KEAM papers from 2024 to 2026."
	},
	{
		icon: Clock,
		title: "Built-in timer",
		body: "Time each question to build exam speed and track your improvement."
	},
	{
		icon: Lightbulb,
		title: "AI explanations",
		body: "Get step-by-step explanations instantly after submitting your answer."
	},
	{
		icon: Layers,
		title: "Chapter-wise",
		body: "Filter by subject and chapter to focus on your weak areas."
	},
	{
		icon: CheckCircle2,
		title: "Instant feedback",
		body: "Know immediately if you're right or wrong with colour-coded results."
	},
	{
		icon: Smartphone,
		title: "Works everywhere",
		body: "Optimised for mobile, tablet, and desktop. Practise anywhere."
	}
];
var home_default = UNSAFE_withComponentProps(function HomePage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "pb-4",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden rounded-[2rem] bg-surface-lowest px-6 py-10 shadow-[0_20px_50px_rgba(0,64,161,0.06)] sm:px-10 sm:py-14 lg:px-14",
				children: [
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-2xl"
					}),
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-secondary/10 blur-2xl"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(SectionLabel, { children: "KEAM4U" }),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-4 text-4xl font-extrabold leading-[1.05] text-on-surface sm:text-5xl lg:text-6xl",
								children: [
									"Crack KEAM with",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "text-primary",
										children: "previous year"
									}),
									" ",
									"questions."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-5 max-w-xl text-base leading-relaxed text-on-surface-variant sm:text-lg",
								children: "Subject-wise, chapter-wise practice from real KEAM papers. Attempt questions, time yourself, and get instant AI explanations."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ jsxs(Link, {
									to: "/pyqs",
									className: "cta-gradient inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-95",
									children: ["Start practising", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ jsx(Link, {
									to: "/pyqs",
									className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-low px-7 py-3.5 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-high",
									children: "Browse subjects"
								})]
							})
						] }), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-3 gap-3 rounded-3xl bg-surface-low/70 p-4 sm:gap-4 sm:p-5 lg:grid-cols-1",
							children: [
								{
									value: "3",
									label: "Subjects"
								},
								{
									value: "70+",
									label: "Chapters"
								},
								{
									value: "1,500+",
									label: "Questions"
								}
							].map((stat) => /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl bg-surface-lowest px-4 py-4 text-center shadow-sm lg:flex lg:items-center lg:justify-between lg:text-left",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-display text-2xl font-extrabold text-primary lg:text-3xl",
									children: stat.value
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-outline lg:mt-0",
									children: stat.label
								})]
							}, stat.label))
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(SectionLabel, { children: "Subjects" }), /* @__PURE__ */ jsx("h2", {
						className: "mt-2 text-2xl font-extrabold text-on-surface sm:text-3xl",
						children: "Pick a subject to begin"
					})] }), /* @__PURE__ */ jsxs(Link, {
						to: "/pyqs",
						className: "hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline sm:inline-flex",
						children: ["View all", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6 grid grid-cols-1 gap-5 md:grid-cols-3",
					children: subjects$1.map((subject) => {
						const Icon = subject.icon;
						return /* @__PURE__ */ jsxs(Link, {
							to: subject.href,
							className: "group relative overflow-hidden rounded-3xl bg-surface-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,64,161,0.12)]",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-40 overflow-hidden bg-surface-low",
								children: /* @__PURE__ */ jsx("img", {
									src: subject.image,
									alt: subject.name,
									loading: "lazy",
									decoding: "async",
									width: 896,
									height: 1200,
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
										className: "font-display text-xl font-extrabold text-on-surface transition-colors group-hover:text-primary",
										children: subject.name
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-on-surface-variant",
										children: subject.blurb
									})] }), /* @__PURE__ */ jsx("span", {
										className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary",
										children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
									})]
								}), /* @__PURE__ */ jsxs("span", {
									className: "mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary",
									children: ["Start practising", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
								})]
							})]
						}, subject.name);
					})
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-14 rounded-[2rem] bg-surface-low px-6 py-10 sm:px-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(SectionLabel, { children: "Why KEAM4U" }), /* @__PURE__ */ jsx("h2", {
						className: "mt-1 text-2xl font-extrabold text-on-surface sm:text-3xl",
						children: "Built for focused preparation"
					})] })]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3",
					children: features.map((feature) => {
						const Icon = feature.icon;
						return /* @__PURE__ */ jsxs("div", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed/70 text-primary",
								children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold text-on-surface",
								children: feature.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm leading-relaxed text-on-surface-variant",
								children: feature.body
							})] })]
						}, feature.title);
					})
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "cta-gradient mt-14 flex flex-col items-center rounded-[2rem] px-6 py-12 text-center text-white sm:px-10",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15",
						children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-7 w-7" })
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-5 text-2xl font-extrabold sm:text-3xl",
						children: "Ready to start practising?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 max-w-md text-sm leading-relaxed text-white/80 sm:text-base",
						children: "Pick a subject and start with the first chapter. Every attempt gets you closer to your target score."
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/pyqs",
						className: "mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-lg transition-transform hover:scale-[1.02] active:scale-95",
						children: ["Go to PYQs", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		]
	});
});
//#endregion
//#region app/pages/pyqs.tsx
var pyqs_exports = /* @__PURE__ */ __exportAll({
	default: () => pyqs_default,
	meta: () => meta$3
});
var subjects = [
	{
		name: "Mathematics",
		href: "/pyqs/mathematics",
		image: "/maths_banner.webp",
		icon: Calculator,
		blurb: "Functions, calculus, vectors & more"
	},
	{
		name: "Physics",
		href: "/pyqs/physics",
		image: "/physics_banner.webp",
		icon: Atom,
		blurb: "Mechanics, optics & modern physics"
	},
	{
		name: "Chemistry",
		href: "/pyqs/chemistry",
		image: "/chemistry_banner.webp",
		icon: FlaskConical,
		blurb: "Physical, organic & inorganic"
	}
];
function meta$3({}) {
	return [{ title: "KEAM Previous Year Questions | KEAM4U" }, {
		name: "description",
		content: "Practice KEAM previous year questions subject-wise and chapter-wise for Mathematics, Physics, and Chemistry."
	}];
}
var pyqs_default = UNSAFE_withComponentProps(function PyqsPage() {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(PageHeader, {
		eyebrow: "Practice zone",
		title: "Previous Year Questions",
		description: "Practise real KEAM questions subject-wise and chapter-wise. Choose a subject to see its chapters and years."
	}), /* @__PURE__ */ jsxs("div", {
		className: "mt-10",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant",
			children: "Subjects"
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-4 grid grid-cols-1 gap-5 md:grid-cols-3",
			children: subjects.map((subject) => {
				const Icon = subject.icon;
				return /* @__PURE__ */ jsxs(Link, {
					to: subject.href,
					className: "group relative overflow-hidden rounded-3xl bg-surface-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,64,161,0.12)]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative h-44 overflow-hidden bg-surface-low",
						children: [/* @__PURE__ */ jsx("img", {
							src: subject.image,
							alt: subject.name,
							className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
							loading: "eager",
							fetchPriority: "high",
							decoding: "async",
							width: 896,
							height: 1200
						}), /* @__PURE__ */ jsx("span", {
							className: "absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary shadow-sm backdrop-blur",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-extrabold text-on-surface transition-colors group-hover:text-primary",
								children: subject.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-on-surface-variant",
								children: subject.blurb
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary",
								children: ["View chapters", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						]
					})]
				}, subject.name);
			})
		})]
	})] });
});
//#endregion
//#region app/components/Breadcrumbs.tsx
function Breadcrumbs({ items }) {
	const navigate = useNavigate();
	const showBack = useLocation().pathname !== "/";
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-3 text-sm",
		children: [showBack ? /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "inline-flex items-center gap-1 rounded-lg font-semibold text-on-surface-variant transition-colors hover:text-primary",
			onClick: () => navigate(-1),
			children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }), "Back"]
		}) : null, /* @__PURE__ */ jsx("nav", {
			"aria-label": "Breadcrumb",
			className: showBack ? "mt-2" : "",
			children: /* @__PURE__ */ jsx("ol", {
				className: "flex flex-wrap items-center gap-1.5 text-xs text-outline sm:text-sm",
				children: items.map((item, index) => {
					const isLast = index === items.length - 1;
					return /* @__PURE__ */ jsxs("li", {
						className: "flex min-w-0 items-center gap-1.5",
						children: [item.to && !isLast ? /* @__PURE__ */ jsx(Link, {
							to: item.to,
							className: "truncate capitalize transition-colors hover:text-primary hover:underline",
							children: item.label
						}) : /* @__PURE__ */ jsx("span", {
							className: `truncate capitalize ${isLast ? "font-semibold text-on-surface" : "text-on-surface-variant"}`,
							children: item.label
						}), !isLast ? /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "text-outline-variant",
							children: "/"
						}) : null]
					}, `${item.label}-${index}`);
				})
			})
		})]
	});
}
//#endregion
//#region app/pages/subject.tsx
var subject_exports = /* @__PURE__ */ __exportAll({
	default: () => subject_default,
	loader: () => loader$2,
	meta: () => meta$2
});
function displayName(slug) {
	return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function slugifyChapter(topic) {
	return topic.trim().replace(/\s+/g, "-");
}
function meta$2({ params }) {
	const subject = displayName(params.subject ?? "");
	return [{ title: `${subject} PYQs | KEAM4U Previous Year Questions` }, {
		name: "description",
		content: `Practice ${subject} previous year KEAM questions chapter-wise with year filters and topic-wise practice.`
	}];
}
async function loader$2({ params }) {
	const subject = params.subject;
	const years = (await axios.get(`http://localhost:5000/api/v1/questions/${subject}/year`)).data.data ?? [];
	let initialData = [];
	if (years.length > 0) initialData = (await axios.get(`http://localhost:5000/api/v1/questions/${subject}/${years[0]}/topic`)).data.data ?? [];
	return {
		subject: displayName(subject),
		years,
		initialData
	};
}
async function fetchChaptersForYear(subject, year) {
	return (await axios.get(`http://localhost:5000/api/v1/questions/${subject}/${year}/topic`)).data.data ?? [];
}
var subject_default = UNSAFE_withComponentProps(function MathsPyqs() {
	const { subject, years, initialData } = useLoaderData();
	const [selectedYear, setSelectedYear] = useState(years.length > 0 ? String(years[0]) : "");
	const [chapters, setChapters] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState("");
	const filteredChapters = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return chapters;
		return chapters.filter((chapter) => chapter.topic.toLowerCase().includes(q));
	}, [chapters, query]);
	const totalQuestions = chapters.reduce((sum, chapter) => sum + chapter.count, 0);
	const handleYearChange = async (year) => {
		if (year === selectedYear) return;
		setSelectedYear(year);
		setLoading(true);
		setError(null);
		try {
			setChapters(await fetchChaptersForYear(subject, year));
		} catch {
			setError("Could not load chapters for this year. Please try again.");
			setChapters([]);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Breadcrumbs, { items: [{
			label: "PYQs",
			to: "/pyqs"
		}, { label: subject }] }),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
					children: subject
				}),
				/* @__PURE__ */ jsxs("h1", {
					className: "mt-2 text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl",
					children: [subject, " PYQs"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-on-surface-variant",
					children: "Select a year, then choose a chapter to start practising."
				})
			] }), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl bg-surface-lowest px-4 py-3 text-center shadow-sm sm:text-left",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-display text-xl font-extrabold text-primary",
						children: chapters.length
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[10px] font-bold uppercase tracking-widest text-outline",
						children: "Chapters"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl bg-surface-lowest px-4 py-3 text-center shadow-sm sm:text-left",
					children: [/* @__PURE__ */ jsx("p", {
						className: "font-display text-xl font-extrabold text-secondary",
						children: totalQuestions
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[10px] font-bold uppercase tracking-widest text-outline",
						children: "Questions"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-8",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant",
				children: "Select year"
			}), /* @__PURE__ */ jsx("div", {
				className: "no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1",
				children: years.map((year) => {
					return /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => handleYearChange(String(year)),
						className: `shrink-0 rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${String(year) === selectedYear ? "cta-gradient text-white shadow-md shadow-primary/20" : "bg-surface-lowest text-on-surface-variant shadow-sm hover:bg-surface-low"}`,
						children: year
					}, year);
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "relative mt-6",
			children: [
				/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-outline" }),
				/* @__PURE__ */ jsx("input", {
					type: "search",
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: `Search ${subject.toLowerCase()} chapters...`,
					className: "w-full rounded-2xl bg-surface-lowest py-3.5 pl-12 pr-11 text-sm text-on-surface shadow-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30"
				}),
				query ? /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setQuery(""),
					"aria-label": "Clear search",
					className: "absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-outline hover:bg-surface-low hover:text-on-surface",
					children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
				}) : null
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant",
					children: "Chapters"
				}), query ? /* @__PURE__ */ jsxs("p", {
					className: "text-sm text-outline",
					children: [
						filteredChapters.length,
						" result",
						filteredChapters.length === 1 ? "" : "s"
					]
				}) : null]
			}), loading ? /* @__PURE__ */ jsx("div", {
				className: "mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "h-28 animate-pulse rounded-3xl bg-surface-low" }, index))
			}) : error ? /* @__PURE__ */ jsx("div", {
				className: "mt-4 rounded-3xl bg-error-container px-5 py-4 text-sm font-medium text-error",
				children: error
			}) : filteredChapters.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "mt-4 rounded-3xl bg-surface-lowest px-6 py-12 text-center shadow-sm",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-display text-lg font-bold text-on-surface",
					children: "No chapters found"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-on-surface-variant",
					children: query ? "Try a different search term." : "There are no chapters available for this year."
				})]
			}) : /* @__PURE__ */ jsx("div", {
				className: "mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
				children: filteredChapters.map((chapter, index) => /* @__PURE__ */ jsxs(Link, {
					to: `/pyqs/${subject}/${slugifyChapter(chapter.topic)}?year=${selectedYear}`,
					state: chapter.topic,
					className: "group flex flex-col justify-between rounded-3xl bg-surface-lowest p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,64,161,0.1)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-fixed/70 text-xs font-extrabold text-primary",
								children: String(index + 1).padStart(2, "0")
							}), /* @__PURE__ */ jsxs("span", {
								className: "rounded-full bg-surface-low px-3 py-1 text-[11px] font-bold text-on-surface-variant",
								children: [chapter.count, " Q"]
							})]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-4 line-clamp-2 font-display text-lg font-bold leading-snug text-on-surface transition-colors group-hover:text-primary",
							children: chapter.topic
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary",
							children: ["Practise", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
						})
					]
				}, chapter.topic))
			})]
		})
	] });
});
//#endregion
//#region app/utils/progress.ts
var ATTEMPT_PREFIX = "keam4u:attempt:";
var COMPLETED_PREFIX = "keam4u:completed:";
function storageAvailable() {
	return typeof window !== "undefined" && !!window.localStorage;
}
function loadAttempt(questionId) {
	if (!storageAvailable()) return null;
	try {
		const raw = window.localStorage.getItem(ATTEMPT_PREFIX + questionId);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return {
			selected: parsed.selected ?? null,
			submitted: Boolean(parsed.submitted),
			elapsed: Number(parsed.elapsed) || 0
		};
	} catch {
		return null;
	}
}
function saveAttempt(questionId, state) {
	if (!storageAvailable()) return;
	try {
		window.localStorage.setItem(ATTEMPT_PREFIX + questionId, JSON.stringify(state));
	} catch {}
}
function clearAttempt(questionId) {
	if (!storageAvailable()) return;
	try {
		window.localStorage.removeItem(ATTEMPT_PREFIX + questionId);
	} catch {}
}
function chapterKey(subject, chapter, year) {
	return `${COMPLETED_PREFIX}${subject}/${chapter}/${year}`;
}
function getCompletedQuestions(key) {
	if (!storageAvailable()) return [];
	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function markQuestionCompleted(key, questionId) {
	if (!storageAvailable()) return;
	try {
		const completed = new Set(getCompletedQuestions(key));
		completed.add(questionId);
		window.localStorage.setItem(key, JSON.stringify([...completed]));
	} catch {}
}
//#endregion
//#region app/pages/questions.tsx
var questions_exports = /* @__PURE__ */ __exportAll({
	default: () => questions_default,
	loader: () => loader$1,
	meta: () => meta$1
});
var difficultyStyles$1 = {
	easy: "bg-green-100 text-green-700",
	medium: "bg-amber-100 text-amber-700",
	hard: "bg-red-100 text-red-700"
};
function titleCase$1(str) {
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
		"by"
	]);
	return str.toLowerCase().split("-").map((word, index) => {
		if (index > 0 && lowercaseWords.has(word)) return word;
		return word.charAt(0).toUpperCase() + word.slice(1);
	}).join(" ");
}
function meta$1({ params }) {
	const subject = titleCase$1(params.subject ?? "");
	const chapter = titleCase$1(params.chapter ?? "");
	return [{ title: `${chapter} — ${subject} PYQs | KEAM4U` }, {
		name: "description",
		content: `Practice ${chapter} previous year KEAM ${subject} questions with answers, difficulty levels, and instant explanations.`
	}];
}
async function loader$1({ params, request }) {
	const year = new URL(request.url).searchParams.get("year") ?? "2026";
	const subject = params.subject;
	const chapter = params.chapter;
	return {
		questions: (await axios.get(`http://localhost:5000/api/v1/questions/${subject}/${chapter}`, { params: { year } })).data.data ?? [],
		year,
		subject,
		chapterSlug: chapter,
		chapter: titleCase$1(chapter)
	};
}
var questions_default = UNSAFE_withComponentProps(function QuestionsPage() {
	const { questions, year, subject, chapter, chapterSlug } = useLoaderData();
	const [completed, setCompleted] = useState(/* @__PURE__ */ new Set());
	useEffect(() => {
		setCompleted(new Set(getCompletedQuestions(chapterKey(subject, chapterSlug, year))));
	}, [
		subject,
		chapterSlug,
		year
	]);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Breadcrumbs, { items: [
			{
				label: "PYQs",
				to: "/pyqs"
			},
			{
				label: subject,
				to: `/pyqs/${subject}`
			},
			{ label: chapter }
		] }),
		/* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("p", {
					className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
					children: [
						subject,
						" · ",
						year
					]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl",
					children: chapter
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-on-surface-variant",
					children: questions.length > 0 ? `${questions.length} questions from the ${year} paper.` : "No questions available for this year."
				})
			] }), /* @__PURE__ */ jsxs(Link, {
				to: `/pyqs/${subject}`,
				className: "inline-flex items-center gap-2 self-start rounded-xl bg-surface-lowest px-4 py-2.5 text-sm font-bold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), "Change year"]
			})]
		}),
		questions.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "mt-8 rounded-3xl bg-surface-lowest px-6 py-14 text-center shadow-sm",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-display text-lg font-bold text-on-surface",
					children: "No questions found"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-sm text-on-surface-variant",
					children: [
						"There are no ",
						chapter,
						" questions for ",
						year,
						". Try another year or chapter."
					]
				}),
				/* @__PURE__ */ jsx(Link, {
					to: `/pyqs/${subject}`,
					className: "cta-gradient mt-6 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white",
					children: "Back to chapters"
				})
			]
		}) : /* @__PURE__ */ jsx("div", {
			className: "mt-6 flex flex-col gap-4",
			children: questions.map((q, index) => /* @__PURE__ */ jsxs(Link, {
				to: `/pyqs/${subject}/${chapterSlug}/${q._id}?year=${year}`,
				className: "group flex gap-4 rounded-3xl bg-surface-lowest p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,64,161,0.1)]",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-fixed/70 font-display text-sm font-extrabold text-primary",
						children: index + 1
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("p", {
							className: "line-clamp-3 text-base leading-relaxed text-on-surface",
							children: q.question
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: `rounded-full px-3 py-1 text-[11px] font-bold capitalize ${difficultyStyles$1[q.difficulty?.toLowerCase()] ?? "bg-surface-low text-on-surface-variant"}`,
									children: q.difficulty
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "rounded-full bg-surface-low px-3 py-1 text-[11px] font-bold text-on-surface-variant",
									children: [q.options.length, " options"]
								}),
								completed.has(q._id) ? /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-bold text-secondary",
									children: [/* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }), "Done"]
								}) : null
							]
						})]
					}),
					/* @__PURE__ */ jsx(ArrowRight, { className: "mt-1 h-5 w-5 shrink-0 text-outline transition-all group-hover:translate-x-1 group-hover:text-primary" })
				]
			}, q._id))
		})
	] });
});
//#endregion
//#region app/utils/explanation.ts
var OPTION_LABELS$1 = [
	"A",
	"B",
	"C",
	"D",
	"E"
];
var EXPLANATION_SCHEMA = {
	type: "OBJECT",
	properties: {
		steps: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					title: { type: "STRING" },
					detail: { type: "STRING" }
				},
				required: ["title", "detail"]
			}
		},
		answer: { type: "STRING" },
		tip: { type: "STRING" }
	},
	required: ["steps", "answer"]
};
function correctAnswerText(question) {
	const index = question.answer.charCodeAt(0) - 65;
	const option = question.options[index];
	return option ? `${question.answer} — ${option}` : question.answer;
}
function buildExplanationPrompt(question) {
	const options = question.options.map((option, index) => `${OPTION_LABELS$1[index]}) ${option}`).join(", ");
	return `You are a KEAM exam tutor. Explain the solution to this question as a structured set of short steps.

Question: ${question.question}
Options: ${options}
Correct Answer: ${question.answer} (${correctAnswerText(question)})

Rules:
- Return 2-4 steps, each with a short title (maximum 6 words) and a one or two sentence detail.
- Use plain Unicode math (√, ², ³, ×, ÷, →, ≤, ≥, π, θ). Do NOT use LaTeX, backslashes, dollar signs, markdown, or code fences.
- Keep the language simple and suitable for a KEAM student.
- Include a short final answer (the value or option) and an optional one-sentence exam tip.`;
}
function plainMath(input) {
	let text = input.replace(/```[a-zA-Z]*\n?/g, " ").replace(/```/g, " ").replace(/`/g, "").replace(/\*\*|__/g, "").replace(/^#{1,6}\s*/gm, "");
	let previous = "";
	while (previous !== text) {
		previous = text;
		text = text.replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)").replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)");
	}
	return text.replace(/\\left|\\right/g, "").replace(/\\cdot|\\times/g, "×").replace(/\\div/g, "÷").replace(/\\pm/g, "±").replace(/\\leq?/g, "≤").replace(/\\geq?/g, "≥").replace(/\\neq/g, "≠").replace(/\\to|\\rightarrow/g, "→").replace(/\\pi/g, "π").replace(/\\theta/g, "θ").replace(/\\alpha/g, "α").replace(/\\beta/g, "β").replace(/\\infty/g, "∞").replace(/\\text\s*\{([^{}]*)\}/g, "$1").replace(/\\mathrm\s*\{([^{}]*)\}/g, "$1").replace(/\^\{([^{}]*)\}/g, "^$1").replace(/_\{([^{}]*)\}/g, "_$1").replace(/\\[,;!:]/g, " ").replace(/\\([a-zA-Z]+)/g, "$1").replace(/[{}]/g, "").replace(/\$/g, "").replace(/\s+/g, " ").trim();
}
function splitIntoSteps(text) {
	const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
	if (blocks.length > 1) return blocks;
	const sentences = text.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter(Boolean);
	if (sentences.length <= 1) return sentences;
	const groupSize = Math.ceil(sentences.length / 4);
	const grouped = [];
	for (let index = 0; index < sentences.length; index += groupSize) grouped.push(sentences.slice(index, index + groupSize).join(" "));
	return grouped;
}
function parseExplanation(raw) {
	const cleaned = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
	const start = cleaned.indexOf("{");
	const end = cleaned.lastIndexOf("}");
	if (start === -1 || end === -1 || end <= start) return null;
	let parsed;
	try {
		parsed = JSON.parse(cleaned.slice(start, end + 1));
	} catch {
		return null;
	}
	if (!parsed || typeof parsed !== "object") return null;
	const record = parsed;
	const steps = (Array.isArray(record.steps) ? record.steps : []).map((step) => {
		if (!step || typeof step !== "object") return null;
		const item = step;
		const title = plainMath(String(item.title ?? ""));
		const detail = plainMath(String(item.detail ?? ""));
		if (!title || !detail) return null;
		return {
			title,
			detail
		};
	}).filter((step) => !!step);
	if (steps.length === 0) return null;
	return {
		steps,
		answer: typeof record.answer === "string" ? plainMath(record.answer) : "",
		tip: typeof record.tip === "string" && record.tip.trim() ? plainMath(record.tip) : void 0
	};
}
function fallbackExplanation(raw, question) {
	const parts = splitIntoSteps(plainMath(raw));
	if (parts.length === 0) return {
		steps: [{
			title: "Solution",
			detail: "No explanation could be generated for this question."
		}],
		answer: correctAnswerText(question)
	};
	return {
		steps: parts.slice(0, 4).map((detail, index, list) => {
			let title = `Step ${index + 1}`;
			if (list.length === 1) title = "Solution";
			else if (index === 0) title = "Given";
			else if (index === list.length - 1) title = "Conclusion";
			return {
				title,
				detail
			};
		}),
		answer: correctAnswerText(question)
	};
}
//#endregion
//#region app/pages/practiseQuestion.tsx
var practiseQuestion_exports = /* @__PURE__ */ __exportAll({
	default: () => practiseQuestion_default,
	loader: () => loader,
	meta: () => meta
});
var OPTION_LABELS = [
	"A",
	"B",
	"C",
	"D",
	"E"
];
var difficultyStyles = {
	easy: "text-green-600",
	medium: "text-amber-600",
	hard: "text-red-600"
};
function formatTime(seconds) {
	return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}
function titleCase(slug) {
	return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function meta({ params }) {
	return [{ title: `Practise Question — ${titleCase(params.subject ?? "")} | KEAM4U` }, {
		name: "description",
		content: "Attempt a KEAM previous year question with a timer, instant feedback, and an AI-generated explanation."
	}];
}
async function loader({ params, request }) {
	const year = new URL(request.url).searchParams.get("year") ?? "2025";
	const { subject, chapter, questionId } = params;
	const question = (await axios.get(`http://localhost:5000/api/v1/questions/${questionId}`)).data.data;
	let questions = [];
	try {
		questions = (await axios.get(`http://localhost:5000/api/v1/questions/${subject}/${chapter}`, { params: { year } })).data.data ?? [];
	} catch {
		questions = [];
	}
	if (!questions.some((item) => item._id === questionId)) questions = [question, ...questions];
	const currentIndex = questions.findIndex((item) => item._id === questionId);
	return {
		question,
		year,
		subject,
		chapterSlug: chapter,
		questions,
		currentIndex: Math.max(currentIndex, 0)
	};
}
var practiseQuestion_default = UNSAFE_withComponentProps(function QuestionPage() {
	const { question, year, subject, chapterSlug, questions, currentIndex } = useLoaderData();
	const navigate = useNavigate();
	const chapterName = question.topic ?? titleCase(chapterSlug);
	const hasPrev = currentIndex > 0;
	const hasNext = currentIndex < questions.length - 1;
	const goTo = (index) => {
		const target = questions[index];
		if (!target) return;
		navigate(`/pyqs/${subject}/${chapterSlug}/${target._id}?year=${year}`);
	};
	const [timerActive, setTimerActive] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const [selected, setSelected] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [hydratedId, setHydratedId] = useState(null);
	const [explanation, setExplanation] = useState(null);
	const [loadingExplanation, setLoadingExplanation] = useState(false);
	const [explanationError, setExplanationError] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const [reportText, setReportText] = useState("");
	const [reportStatus, setReportStatus] = useState("idle");
	useEffect(() => {
		const saved = loadAttempt(question._id);
		setSelected(saved?.selected ?? null);
		setSubmitted(saved?.submitted ?? false);
		setElapsed(saved?.elapsed ?? 0);
		setTimerActive(!saved?.submitted && (saved?.elapsed ?? 0) === 0);
		setExplanation(null);
		setExplanationError(false);
		setShowReport(false);
		setReportText("");
		setReportStatus("idle");
		setHydratedId(question._id);
	}, [question._id]);
	useEffect(() => {
		if (!timerActive) return;
		const id = setInterval(() => setElapsed((value) => value + 1), 1e3);
		return () => clearInterval(id);
	}, [timerActive]);
	useEffect(() => {
		if (hydratedId !== question._id) return;
		saveAttempt(question._id, {
			selected,
			submitted,
			elapsed
		});
	}, [
		hydratedId,
		question._id,
		selected,
		submitted,
		elapsed
	]);
	useEffect(() => {
		if (!submitted || hydratedId !== question._id) return;
		markQuestionCompleted(chapterKey(subject, chapterSlug, year), question._id);
	}, [
		submitted,
		hydratedId,
		question._id,
		subject,
		chapterSlug,
		year
	]);
	const handleTimerToggle = () => {
		if (submitted) return;
		setTimerActive((value) => !value);
	};
	const handleTimerReset = () => {
		setTimerActive(false);
		setElapsed(0);
	};
	const handleSubmit = () => {
		if (!selected) return;
		setSubmitted(true);
		setTimerActive(false);
	};
	const handleReset = () => {
		clearAttempt(question._id);
		setSelected(null);
		setSubmitted(false);
		setElapsed(0);
		setTimerActive(true);
		setExplanation(null);
		setExplanationError(false);
	};
	const isCorrect = submitted && selected === question.answer;
	const fetchExplanation = async () => {
		setLoadingExplanation(true);
		setExplanationError(false);
		try {
			const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=AQ.Ab8RN6KeLiC1kAcozE5FV7Fg1TnROk9wxjp6KwrmDpHj9kj2Qg`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [{ parts: [{ text: buildExplanationPrompt(question) }] }],
					generationConfig: {
						temperature: .2,
						maxOutputTokens: 500,
						responseMimeType: "application/json",
						responseSchema: EXPLANATION_SCHEMA
					}
				})
			});
			if (!response.ok) throw new Error("Explanation request failed");
			const text = (await response.json())?.candidates?.[0]?.content?.parts?.[0]?.text;
			if (!text) throw new Error("No explanation returned");
			const result = parseExplanation(text) ?? fallbackExplanation(text, question);
			if (!result.answer) result.answer = correctAnswerText(question);
			setExplanation(result);
		} catch {
			setExplanationError(true);
		} finally {
			setLoadingExplanation(false);
		}
	};
	const handleReport = async () => {
		if (!reportText.trim()) return;
		setReportStatus("sending");
		try {
			await axios.post(`http://localhost:5000/api/v1/report`, {
				questionId: question._id,
				question: question.question,
				issue: reportText
			});
			setReportStatus("sent");
			setReportText("");
			setTimeout(() => {
				setShowReport(false);
				setReportStatus("idle");
			}, 2e3);
		} catch {
			setReportStatus("error");
		}
	};
	const optionStyles = (label) => {
		if (!submitted) return selected === label ? "border-primary bg-primary-fixed/40 text-on-surface shadow-sm" : "border-transparent bg-surface-lowest text-on-surface hover:border-primary/30 hover:bg-primary-fixed/10";
		if (label === question.answer) return "border-secondary bg-secondary/10 text-on-surface";
		if (label === selected) return "border-red-400 bg-red-50 text-on-surface";
		return "border-transparent bg-surface-lowest text-outline opacity-70";
	};
	const optionBadgeStyles = (label) => {
		if (!submitted) return selected === label ? "bg-primary text-white" : "bg-surface-high text-on-surface-variant";
		if (label === question.answer) return "bg-secondary text-white";
		if (label === selected) return "bg-red-500 text-white";
		return "bg-surface-high text-outline";
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "pb-8",
		children: [
			/* @__PURE__ */ jsx(Breadcrumbs, { items: [
				{
					label: "PYQs",
					to: "/pyqs"
				},
				{
					label: subject,
					to: `/pyqs/${subject}`
				},
				{
					label: chapterName,
					to: `/pyqs/${subject}/${chapterSlug}?year=${year}`
				},
				{ label: "Question" }
			] }),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("p", {
						className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
						children: [
							subject,
							" · ",
							year
						]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 text-2xl font-extrabold text-on-surface sm:text-3xl",
						children: chapterName
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 flex items-center gap-2 text-sm text-on-surface-variant",
						children: /* @__PURE__ */ jsxs("span", {
							className: "capitalize",
							children: [
								"Difficulty:",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: `font-bold ${difficultyStyles[question.difficulty?.toLowerCase()] ?? "text-on-surface"}`,
									children: question.difficulty
								})
							]
						})
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 self-start rounded-2xl bg-surface-lowest px-3 py-2 shadow-sm",
					children: [
						/* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-primary" }),
						/* @__PURE__ */ jsx("span", {
							className: "w-14 text-center font-mono text-lg font-bold tabular-nums text-on-surface",
							children: formatTime(elapsed)
						}),
						!submitted ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: handleTimerToggle,
							className: `rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${timerActive ? "bg-surface-high text-on-surface-variant hover:bg-surface-highest" : "bg-primary text-white hover:bg-primary-container"}`,
							children: timerActive ? "Pause" : elapsed > 0 ? "Resume" : "Start"
						}), elapsed > 0 ? /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: handleTimerReset,
							"aria-label": "Reset timer",
							className: "flex h-7 w-7 items-center justify-center rounded-lg text-outline transition-colors hover:bg-surface-low hover:text-on-surface",
							children: /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" })
						}) : null] }) : null
					]
				})]
			}),
			questions.length > 0 ? /* @__PURE__ */ jsxs("div", {
				className: "mt-5 flex items-center gap-4",
				children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => hasPrev && goTo(currentIndex - 1),
						disabled: !hasPrev,
						className: "inline-flex items-center gap-1 rounded-xl bg-surface-lowest px-3 py-2 text-sm font-semibold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40",
						children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }), "Prev"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-xs font-bold text-outline",
							children: [/* @__PURE__ */ jsxs("span", { children: [
								"Question ",
								currentIndex + 1,
								" of",
								" ",
								questions.length
							] }), /* @__PURE__ */ jsxs("span", { children: [Math.round((currentIndex + 1) / questions.length * 100), "%"] })]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-high",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-full rounded-full bg-primary transition-all",
								style: { width: `${(currentIndex + 1) / questions.length * 100}%` }
							})
						})]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => hasNext && goTo(currentIndex + 1),
						disabled: !hasNext,
						className: "inline-flex items-center gap-1 rounded-xl bg-surface-lowest px-3 py-2 text-sm font-semibold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low disabled:cursor-not-allowed disabled:opacity-40",
						children: ["Next", /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })]
					})
				]
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "mt-5 rounded-3xl bg-surface-lowest p-5 shadow-sm sm:p-7",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-lg leading-relaxed text-on-surface sm:text-xl",
					children: [currentIndex >= 0 ? `${currentIndex + 1}. ` : null, question.question]
				}), question.image ? /* @__PURE__ */ jsx("img", {
					src: question.image,
					alt: "Question diagram",
					className: "mt-4 max-w-full rounded-2xl bg-surface-low object-contain p-2"
				}) : null]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4 flex flex-col gap-3",
				role: "group",
				"aria-label": "Answer options",
				children: question.options.map((option, index) => {
					const label = OPTION_LABELS[index];
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						disabled: submitted,
						"aria-pressed": selected === label,
						onClick: () => !submitted && setSelected(label),
						className: `flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-150 disabled:cursor-default ${optionStyles(label)}`,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition-colors ${optionBadgeStyles(label)}`,
								children: label
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex-1 text-sm leading-snug sm:text-base",
								children: option
							}),
							submitted && label === question.answer ? /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 shrink-0 text-secondary" }) : null,
							submitted && label === selected && label !== question.answer ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5 shrink-0 text-red-500" }) : null
						]
					}, label);
				})
			}),
			submitted ? /* @__PURE__ */ jsxs("div", {
				className: `mt-5 flex items-start gap-3 rounded-2xl px-5 py-4 ${isCorrect ? "bg-secondary/10 text-secondary" : "bg-red-50 text-red-700"}`,
				children: [/* @__PURE__ */ jsx("span", {
					className: "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white",
					children: isCorrect ? /* @__PURE__ */ jsx(Check, { className: "h-5 w-5 text-secondary" }) : /* @__PURE__ */ jsx(Lightbulb, { className: "h-5 w-5 text-red-500" })
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-display text-base font-extrabold",
					children: isCorrect ? "Correct!" : "Not quite."
				}), !isCorrect ? /* @__PURE__ */ jsxs("p", {
					className: "mt-0.5 text-sm",
					children: [
						"Correct answer:",
						" ",
						/* @__PURE__ */ jsxs("span", {
							className: "font-bold",
							children: [
								question.answer,
								" —",
								" ",
								question.options[question.answer.charCodeAt(0) - 65]
							]
						})
					]
				}) : null] })]
			}) : null,
			submitted ? /* @__PURE__ */ jsx("div", {
				className: "mt-4",
				children: !explanation ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: fetchExplanation,
					disabled: loadingExplanation,
					className: "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-fixed/40 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary-fixed/70 disabled:opacity-60",
					children: loadingExplanation ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" }), "Generating explanation..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), explanationError ? "Try explanation again" : "Show explanation"] })
				}), explanationError ? /* @__PURE__ */ jsx("p", {
					className: "mt-2 text-center text-xs font-medium text-red-600",
					children: "Could not generate an explanation. Please try again."
				}) : null] }) : /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl bg-primary-fixed/30 p-5 sm:p-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary",
								children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }), "AI Explanation"]
							}), /* @__PURE__ */ jsx("span", {
								className: "rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary",
								children: "Step by step"
							})]
						}),
						/* @__PURE__ */ jsx("ol", {
							className: "mt-5 space-y-3",
							children: explanation.steps.map((step, index) => /* @__PURE__ */ jsxs("li", {
								className: "flex gap-3 rounded-2xl bg-surface-lowest/80 p-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white",
									children: index + 1
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-display text-sm font-bold text-on-surface sm:text-base",
										children: step.title
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm leading-relaxed text-on-surface-variant",
										children: step.detail
									})]
								})]
							}, `${index}-${step.title}`))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex items-start gap-2 rounded-2xl bg-secondary/10 px-4 py-3",
							children: [/* @__PURE__ */ jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-secondary" }), /* @__PURE__ */ jsxs("p", {
								className: "text-sm text-on-surface",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "font-bold text-secondary",
									children: ["Final answer:", " "]
								}), /* @__PURE__ */ jsx("span", {
									className: "font-bold",
									children: explanation.answer
								})]
							})]
						}),
						explanation.tip ? /* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex items-start gap-2 rounded-2xl bg-tertiary-fixed/40 px-4 py-3",
							children: [/* @__PURE__ */ jsx(Lightbulb, { className: "mt-0.5 h-4 w-4 shrink-0 text-tertiary" }), /* @__PURE__ */ jsxs("p", {
								className: "text-sm text-on-surface",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "font-bold text-tertiary",
									children: ["Exam tip:", " "]
								}), explanation.tip]
							})]
						}) : null
					]
				})
			}) : null,
			/* @__PURE__ */ jsx("div", {
				className: "sticky bottom-20 z-30 mt-6 rounded-2xl bg-surface/90 p-2 backdrop-blur md:static md:bg-transparent md:p-0",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex gap-3",
					children: !submitted ? /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: handleSubmit,
						disabled: !selected,
						className: `flex-1 rounded-2xl py-3.5 text-sm font-bold transition-transform ${selected ? "cta-gradient text-white shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95" : "cursor-not-allowed bg-surface-high text-outline"}`,
						children: "Submit answer"
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: handleReset,
						className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-surface-lowest py-3.5 text-sm font-bold text-on-surface-variant shadow-sm transition-colors hover:bg-surface-low",
						children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" }), "Try again"]
					}), hasNext ? /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => goTo(currentIndex + 1),
						className: "cta-gradient inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95",
						children: ["Next question", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					}) : /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => navigate(`/pyqs/${subject}/${chapterSlug}?year=${year}`),
						className: "cta-gradient inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), "Back to questions"]
					})] })
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8",
				children: !showReport ? /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setShowReport(true),
					className: "inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 transition-colors hover:text-red-600",
					children: [/* @__PURE__ */ jsx(Flag, { className: "h-3.5 w-3.5" }), "Report an issue with this question"]
				}) : /* @__PURE__ */ jsxs("div", {
					className: "rounded-2xl bg-surface-lowest p-4 shadow-sm",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold text-on-surface",
								children: "Report an issue"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									setShowReport(false);
									setReportText("");
									setReportStatus("idle");
								},
								"aria-label": "Close report form",
								className: "flex h-7 w-7 items-center justify-center rounded-lg text-outline hover:bg-surface-low hover:text-on-surface",
								children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ jsx("textarea", {
							value: reportText,
							onChange: (event) => setReportText(event.target.value),
							placeholder: "Describe the issue — wrong answer, incorrect options, typo...",
							rows: 3,
							className: "w-full resize-none rounded-xl bg-surface-low p-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/30"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: handleReport,
									disabled: !reportText.trim() || reportStatus === "sending",
									className: "inline-flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50",
									children: [/* @__PURE__ */ jsx(Send, { className: "h-3.5 w-3.5" }), reportStatus === "sending" ? "Sending..." : "Submit report"]
								}),
								reportStatus === "sent" ? /* @__PURE__ */ jsxs("span", {
									className: "inline-flex items-center gap-1 text-sm font-semibold text-secondary",
									children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }), "Report sent"]
								}) : null,
								reportStatus === "error" ? /* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium text-red-600",
									children: "Failed to send. Try again."
								}) : null
							]
						})
					]
				})
			})
		]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-Dq1AjZ9B.js",
		"imports": ["/assets/jsx-runtime-C8YDH_LC.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-B3f4ufbT.js",
			"imports": ["/assets/jsx-runtime-C8YDH_LC.js"],
			"css": ["/assets/root-C9cWGLb3.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"app": {
			"id": "app",
			"parentId": "root",
			"path": void 0,
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/app-LoT_r_UJ.js",
			"imports": [
				"/assets/jsx-runtime-C8YDH_LC.js",
				"/assets/arrow-right-BzmmhbTh.js",
				"/assets/flask-conical-B5kJy4co.js",
				"/assets/graduation-cap-Dxjd9b3O.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/home": {
			"id": "pages/home",
			"parentId": "app",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-B6vyxb3D.js",
			"imports": [
				"/assets/jsx-runtime-C8YDH_LC.js",
				"/assets/PageHeader-CZxHTC7Z.js",
				"/assets/arrow-right-BzmmhbTh.js",
				"/assets/flask-conical-B5kJy4co.js",
				"/assets/graduation-cap-Dxjd9b3O.js",
				"/assets/sparkles-DMLlMVoz.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/pyqs": {
			"id": "pages/pyqs",
			"parentId": "app",
			"path": "pyqs",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/pyqs-B0-cgu-z.js",
			"imports": [
				"/assets/jsx-runtime-C8YDH_LC.js",
				"/assets/PageHeader-CZxHTC7Z.js",
				"/assets/arrow-right-BzmmhbTh.js",
				"/assets/flask-conical-B5kJy4co.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/subject": {
			"id": "pages/subject",
			"parentId": "app",
			"path": "pyqs/:subject",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/subject-BgrMUYNk.js",
			"imports": [
				"/assets/jsx-runtime-C8YDH_LC.js",
				"/assets/Breadcrumbs-C3kZEk4E.js",
				"/assets/axios-h7ONgrtW.js",
				"/assets/arrow-right-BzmmhbTh.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/questions": {
			"id": "pages/questions",
			"parentId": "app",
			"path": "pyqs/:subject/:chapter",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/questions-CfjWmuoo.js",
			"imports": [
				"/assets/jsx-runtime-C8YDH_LC.js",
				"/assets/Breadcrumbs-C3kZEk4E.js",
				"/assets/progress-CEiuDRYw.js",
				"/assets/arrow-right-BzmmhbTh.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/practiseQuestion": {
			"id": "pages/practiseQuestion",
			"parentId": "app",
			"path": "pyqs/:subject/:chapter/:questionId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/practiseQuestion-BgbsLbY2.js",
			"imports": [
				"/assets/jsx-runtime-C8YDH_LC.js",
				"/assets/Breadcrumbs-C3kZEk4E.js",
				"/assets/progress-CEiuDRYw.js",
				"/assets/axios-h7ONgrtW.js",
				"/assets/arrow-right-BzmmhbTh.js",
				"/assets/sparkles-DMLlMVoz.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-d28cd886.js",
	"version": "d28cd886",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"unstable_passThroughRequests": false,
	"unstable_subResourceIntegrity": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"app": {
		id: "app",
		parentId: "root",
		path: void 0,
		index: void 0,
		caseSensitive: void 0,
		module: app_exports
	},
	"pages/home": {
		id: "pages/home",
		parentId: "app",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"pages/pyqs": {
		id: "pages/pyqs",
		parentId: "app",
		path: "pyqs",
		index: void 0,
		caseSensitive: void 0,
		module: pyqs_exports
	},
	"pages/subject": {
		id: "pages/subject",
		parentId: "app",
		path: "pyqs/:subject",
		index: void 0,
		caseSensitive: void 0,
		module: subject_exports
	},
	"pages/questions": {
		id: "pages/questions",
		parentId: "app",
		path: "pyqs/:subject/:chapter",
		index: void 0,
		caseSensitive: void 0,
		module: questions_exports
	},
	"pages/practiseQuestion": {
		id: "pages/practiseQuestion",
		parentId: "app",
		path: "pyqs/:subject/:chapter/:questionId",
		index: void 0,
		caseSensitive: void 0,
		module: practiseQuestion_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };

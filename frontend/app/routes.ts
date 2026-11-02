import { type RouteConfig, layout, index, route } from "@react-router/dev/routes";

export default [
  layout("app.tsx", [
    index("pages/home.tsx"),

    route("pyqs", "pages/pyqs.tsx"),
    route("pyqs/:subject", "pages/subject.tsx"),
    route("pyqs/:subject/:chapter", "pages/questions.tsx"),
    route(
      "pyqs/:subject/:chapter/:questionId",
      "pages/practiseQuestion.tsx"
    ),
  ]),
] satisfies RouteConfig;
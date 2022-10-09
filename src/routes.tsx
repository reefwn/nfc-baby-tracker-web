import { lazy } from "solid-js";

export const routes = [
  { path: "/", component: lazy(() => import("./pages/Home")) },
  { path: "/insert", component: lazy(() => import("./pages/Insert")) },
  {
    path: "/view",
    component: lazy(() => import("./pages/View")),
  },
];

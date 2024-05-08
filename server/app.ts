import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import { authRoute } from "./routes/auth.routes";
import { expensesRoute } from "./routes/expenses.routes";


const app = new Hono();

app.use('*', logger());

const apiRoutes = app.basePath("/api").route("/", authRoute).route("/expenses", expensesRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));


export type ApiRoutes = typeof apiRoutes;

export default app;
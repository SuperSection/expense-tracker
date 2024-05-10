import { createFileRoute } from "@tanstack/react-router";
import ExpensesPage from "@/pages/ExpensesPage";


export const Route = createFileRoute("/_authenticated/expenses")({
  component: ExpensesPage,
});

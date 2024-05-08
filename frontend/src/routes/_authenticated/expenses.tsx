import { createFileRoute } from "@tanstack/react-router";
import ExpensesPage from "@/pages/Expenses";


export const Route = createFileRoute("/_authenticated/expenses")({
  component: ExpensesPage,
});

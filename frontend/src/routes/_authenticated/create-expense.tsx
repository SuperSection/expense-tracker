import { createFileRoute } from "@tanstack/react-router";
import CreateExpensePage from "@/pages/CreateExpensePage";


export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpensePage,
});

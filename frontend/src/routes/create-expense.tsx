import { createFileRoute } from "@tanstack/react-router";
import { CreateExpenseForm } from "@/components/create-expense-form";


export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});


function CreateExpense() {
  return (
    <div className="p-2 max-w-screen-sm container m-auto">
      <CreateExpenseForm />
    </div>
  );
}

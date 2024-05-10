import { CreateExpenseForm } from "@/components/create-expense-form";


export default function CreateExpense() {
  return (
    <div className="max-w-screen-sm container m-auto">
      <h2 className="text-2xl font-medium text-center mb-8">Create Expense</h2>
      <CreateExpenseForm />
    </div>
  );
}

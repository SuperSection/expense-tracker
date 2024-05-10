import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";

import {
  createExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CreateExpense, createExpenseSchema } from "@server/shared/types";


export function CreateExpenseForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: "",
      amount: "",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }: { value: CreateExpense }) => {
      const existingExpenses = await queryClient.ensureQueryData(
        getAllExpensesQueryOptions
      );

      navigate({ to: "/expenses" });

      // loading state
      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });

      try {
        const newExpense = await createExpense(value);

        // success state
        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existingExpenses,
          expenses: [newExpense, ...existingExpenses.expenses],
        });

        toast("Expense Created", {
          description: `Successfully created new expense: ${newExpense.id}`,
        });

      } catch (error) {
        // error state
        toast("Failed to Create Expense", {
          description: `Server error! Try again to create an expense`,
        });

      } finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-y-4 max-w-xl m-auto"
    >
      <form.Field
        name="title"
        validators={{
          onChange: createExpenseSchema.shape.title,
        }}
        children={(field) => (
          <div>
            <Label className="text-base" htmlFor={field.name}>
              Title
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Title of your expense"
            />
            {field.state.meta.touchedErrors ? (
              <em className="text-sm text-red-500">
                {field.state.meta.touchedErrors}
              </em>
            ) : null}
          </div>
        )}
      />

      <form.Field
        name="amount"
        validators={{
          onChange: createExpenseSchema.shape.amount,
        }}
        children={(field) => (
          <div>
            <Label className="text-base" htmlFor={field.name}>
              Amount
            </Label>
            <Input
              type="number"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="0.00"
            />
            {field.state.meta.touchedErrors ? (
              <em className="text-sm text-red-500">
                {field.state.meta.touchedErrors}
              </em>
            ) : null}
          </div>
        )}
      />

      <form.Field
        name="date"
        validators={{
          onChange: createExpenseSchema.shape.date,
        }}
        children={(field) => (
          <div className="self-center">
            <Calendar
              mode="single"
              selected={new Date(field.state.value)}
              onSelect={(date) =>
                field.handleChange((date ?? new Date()).toISOString())
              }
              className="rounded-md border"
            />
            {field.state.meta.touchedErrors ? (
              <em>{field.state.meta.touchedErrors}</em>
            ) : null}
          </div>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Add Expense"}
          </Button>
        )}
      />
    </form>
  );
}

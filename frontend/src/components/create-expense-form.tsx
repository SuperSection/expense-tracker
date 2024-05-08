import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { api } from "@/lib/api";


export function CreateExpenseForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const response = await api.expenses.$post({ json: value });
      if (!response.ok) {
        throw new Error("Error creating expense!");
      }

      console.log(value);
      navigate({ to: "/expenses" });
    },
  });

  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-y-3"
    >
      <form.Field
        name="title"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>Title</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Title of your expense"
              className="mb-4"
            />
            {field.state.meta.touchedErrors ? (
              <em>{field.state.meta.touchedErrors}</em>
            ) : null}
          </>
        )}
      />

      <form.Field
        name="amount"
        children={(field) => (
          <>
            <Label htmlFor={field.name}>Amount</Label>
            <Input
              type="number"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              placeholder="Amount"
              className="mb-4"
            />
            {field.state.meta.touchedErrors ? (
              <em>{field.state.meta.touchedErrors}</em>
            ) : null}
          </>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-fit self-end"
          >
            {isSubmitting ? "..." : "Create Expense"}
          </Button>
        )}
      />
    </form>
  );
}

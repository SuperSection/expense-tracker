import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteExpense, getAllExpensesQueryOptions } from "@/lib/api";
import { Button } from "@/components/ui/button";


export function DeleteExpenseButton({ id }: { id: number }) {
  const queryClient = useQueryClient();


  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error deleting expense!", {
        description: `Failed to delete expense: ${id}. Try again later.`,
      });
    },
    onSuccess: () => {
      toast("Expense deleted!", {
        description: `Expense ${id} deleted successfully.`,
      });

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        })
      );
    },
  });


  return (
    <Button
      variant="outline"
      size="icon"
      disabled={deleteExpenseMutation.isPending}
      onClick={() => deleteExpenseMutation.mutate(id)}
    >
      {deleteExpenseMutation.isPending ? "..." : <Trash className="h-4 w-4" />}
    </Button>
  );
}

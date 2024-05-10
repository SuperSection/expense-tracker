import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/lib/api";
import { DeleteExpenseButton } from "./delete-expense-button";


export function ExpensesTable() {
  const { isPending, error, data } = useSuspenseQuery(getAllExpensesQueryOptions);

  const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions);

  if (error) return "An error has occured: " + error.message;


  return (
    <Table>
      <TableCaption>The list of all your expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loadingCreateExpense?.expense && (
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4" />
            </TableCell>
            <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
            <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
            <TableCell>
              {loadingCreateExpense?.expense.date.split("T")[0]}
            </TableCell>
            <TableCell>
              <Skeleton className="h-4" />
            </TableCell>
          </TableRow>
        )}
        {isPending
          ? Array(10)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))
          : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.date.split("T")[0]}</TableCell>
                <TableCell>
                  <DeleteExpenseButton id={expense.id} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}

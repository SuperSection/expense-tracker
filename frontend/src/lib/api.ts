import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { getAllExpenses } from "@/helpers/getAllExpenses";
import { type CreateExpense } from "@server/shared/types";


const client = hc<ApiRoutes>("/");

export const api = client.api;


export const userQueryOptions = queryOptions({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
});


export const getAllExpensesQueryOptions = queryOptions({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
    staleTime: 5 * 60 * 1000,
});


export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: () => {
    return {};
  },
  staleTime: Infinity,
});


export async function createExpense(value: CreateExpense) {
  const response = await api.expenses.$post({ json: value });
  if (!response.ok) {
    throw new Error("Error creating expense!");
  }

  const newExpense = await response.json();
  return newExpense;
}


export async function deleteExpense(id: number) {
  const response = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });
  if (!response.ok) {
    throw new Error("Error deleting expense!");
  }

  return true;
}
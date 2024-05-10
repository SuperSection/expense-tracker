import { api } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";

interface Expense {
    title: string;
    amount: string;
    date: string;
}

const navigate = useNavigate();

async function createNewExpense(value: Expense): Promise<void> {
    const response = await api.expenses.$post({ json: value });
    if (!response.ok) {
        throw new Error("Error creating expense!");
    }

    console.log(value);
    navigate({ to: "/expenses" });
}

export { createNewExpense };
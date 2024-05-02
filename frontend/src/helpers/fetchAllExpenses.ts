import { api } from "@/lib/api";


async function fetchAllExpenses() {
    const response = await api.expenses.$get();
    if (!response.ok) {
        throw new Error("Server error!");
    }
    const data = await response.json();
    return data;
}

export { fetchAllExpenses };
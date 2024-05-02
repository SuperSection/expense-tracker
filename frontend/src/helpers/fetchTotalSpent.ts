import { api } from "@/lib/api";


async function fetchTotalSpent() {
    const response = await api.expenses["total-spent"].$get();
    if (!response.ok) {
        throw new Error("Server error!");
    }
    const data = await response.json();
    return data;
}

export { fetchTotalSpent };
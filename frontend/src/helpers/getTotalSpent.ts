import { api } from "@/lib/api";


async function getTotalSpent() {
    const response = await api.expenses["total-spent"].$get();
    if (!response.ok) {
        throw new Error("Server error!");
    }
    const data = await response.json();
    return data;
}

export { getTotalSpent };
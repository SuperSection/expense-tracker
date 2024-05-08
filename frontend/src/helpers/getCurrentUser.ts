import { api } from "@/lib/api";


async function getCurrentUser() {
    const response = await api.me.$get()
    if (!response.ok) {
        throw new Error("Failed to get current user");
    }

    const data = await response.json();
    return data;
}

export { getCurrentUser };
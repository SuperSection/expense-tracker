import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

import { getCurrentUser } from "@/helpers/getCurrentUser";


const client = hc<ApiRoutes>("/");

export const api = client.api;


export const userQueryOptions = queryOptions({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
});
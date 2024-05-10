import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/HomePage";


export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

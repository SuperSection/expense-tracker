import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Home";


export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

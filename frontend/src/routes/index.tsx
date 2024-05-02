import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { fetchTotalSpent } from "@/helpers/fetchTotalSpent";


export const Route = createFileRoute("/")({
  component: Index,
});


function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: fetchTotalSpent,
  });

  if (error) return "An error has occured: " + error.message;

  return (
    <Card className="max-w-screen-sm m-auto dark">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.totalSpent}</CardContent>
    </Card>
  );
}

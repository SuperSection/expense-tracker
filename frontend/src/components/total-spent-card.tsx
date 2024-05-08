import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query"; 
import { getTotalSpent } from "@/helpers/getTotalSpent";


export function ShowcaseTotalSpent() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occured: " + error.message;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.totalSpent}</CardContent>
    </Card>
  );
}

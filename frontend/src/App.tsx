import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchTotalSpent } from "./hooks/useFetchTotalSpent";


function App() {
  const totalSpent = useFetchTotalSpent();

  return (
      <Card className="max-w-xl m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{totalSpent}</CardContent>
      </Card>
  );
}

export default App;
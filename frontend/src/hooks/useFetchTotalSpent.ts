import { useEffect, useState } from "react";


export function useFetchTotalSpent() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await fetch("/api/expenses/total-spent");
      const data = await response.json();
      console.log(data);
      setTotalSpent(data.totalSpent);
    }

    fetchTotalSpent();
  }, []);

  return totalSpent;
}

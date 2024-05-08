import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export function ProfileData() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "Loading your profile..."
  if (error) return "You're not logged in yet.";

  return (
    <div>
      <h2>Hello {data.user.family_name}</h2>
    </div>
  );
}

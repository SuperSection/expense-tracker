import { useQuery } from "@tanstack/react-query";

import { userQueryOptions } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function ProfileData() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "Loading your profile..."
  if (error) return "You're not logged in yet.";

  return (
    <div className="flex items-center gap-2.5">
      <Avatar>
        {data.user.picture && (
          <AvatarImage src={data.user.picture} alt={data.user.given_name} />
        )}
        <AvatarFallback>{data.user.given_name}</AvatarFallback>
      </Avatar>
      <p>
        {data.user.given_name} {data.user.family_name}
      </p>
    </div>
  );
}

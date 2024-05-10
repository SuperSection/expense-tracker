import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { ProfileData } from "@/components/profile-data";


export default function Profile() {
  return (
    <div className="p-2 flex justify-between">
      <ProfileData />
      <Button asChild>
        <Link href="/api/logout">Logout!</Link>
      </Button>
    </div>
  );
}
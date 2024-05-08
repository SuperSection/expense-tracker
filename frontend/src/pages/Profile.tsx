import { ProfileData } from "@/components/profile-data";


export default function Profile() {
  return (
    <div className="p-2 max-w-screen-sm m-auto">
      <ProfileData />
      <a href="/api/logout">Logout</a>
    </div>
  );
}
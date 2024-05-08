import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <div className="p-2 flex justify-around gap-6 max-w-2xl m-auto">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>
      <Link to="/create-expense" className="[&.active]:font-bold">
        Create
      </Link>
      <Link to="/profile" className="[&.active]:font-bold">
        Profile
      </Link>
    </div>
  );
}
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <div className="p-2 flex justify-between max-w-2xl m-auto items-baseline">
      <Link to="/">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </Link>
      <div className="p-2 flex justify-around gap-7">
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
    </div>
  );
}
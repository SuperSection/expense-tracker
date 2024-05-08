import {
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { type QueryClient } from "@tanstack/react-query";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Navbar } from "@/components/navbar";


interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});


function Root() {
  return (
    <div className="dark">
      <Navbar />
      <hr />
      <div className="p-2 gap-2 max-w-2xl mx-auto">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </div>
  );
}

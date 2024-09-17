import Login from "@/auth/Login";
import Register from "@/auth/Register";
import Protect from "@/layout/Protect";
import Home from "@/pages/home";
import Events from "@/pages/events";
import CreateEvent from "@/pages/events/Create";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const routes = createBrowserRouter([
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/register",
      Component: Register,
    },
    {
      path: "/",
      Component: Protect,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "events",
          Component: Events,
        },
        {
          path: "event/create",
          Component: CreateEvent,
        },
        {
          path: "event/update/:id",
          Component: CreateEvent,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Router;

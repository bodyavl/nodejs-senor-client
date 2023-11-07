import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Details from "../Pages/Details";

const router = createBrowserRouter([
  {
    index: true,
    errorElement: <p>Not Found</p>,
    element: <Home />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

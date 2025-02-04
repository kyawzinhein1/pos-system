import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./layout/Index";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Products from "./pages/Products";
import Error from "./components/Error";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/sale",
          element: <Sale />,
        },
        {
          path: "manage-products",
          element: <Products />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

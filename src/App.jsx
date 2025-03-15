import React from 'react'
import Listing from './components/Listing';
import Details from './components/Details';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Outlet from './components/Layout';
import Cart from './components/Cart';

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: "/:category_slug?",
          element: <Listing />
        },

        {
          path: "/details/:id",
          element: <Details />
        },

        {
          path: "cart",
          element: <Cart />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

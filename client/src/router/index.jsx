import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Landing from "../components/Landing";
import SignUpForm from "../components/SignUpForm";

export const routes = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Landing/>
      },
      {
        path: '/signup',
        element: <SignUpForm/>
      }
    ],
  }
]);

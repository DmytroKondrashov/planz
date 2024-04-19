import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Landing from "../components/Landing";
import SignUpForm from "../components/SignUpForm";
import AuthProvider from "../hooks/AuthProvider";

export const routes = createBrowserRouter([
  {
    element: <AuthProvider><Layout/></AuthProvider>,
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

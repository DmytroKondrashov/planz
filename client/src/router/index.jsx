import React from "react";
import { createBrowserRouter } from "react-router-dom";
import EditPlan from '../components/EditPlan'
import Layout from "../components/Layout";
import Landing from "../components/Landing";
import Lists from "../components/Lists";
import SignUpForm from "../components/SignUpForm";
import AuthProvider from "../hooks/AuthProvider";
import List from "../components/List";

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
      },
      {
        path: '/lists',
        element: <Lists/>
      },
      {
        path: '/list/:id',
        element: <List/>
      },
      {
        path: '/plan/:id',
        element: <EditPlan/>
      }
    ],
  }
]);

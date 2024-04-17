import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

export const routes = createBrowserRouter([
  {
    element: <Layout/>,
    children: [],
  }
]);
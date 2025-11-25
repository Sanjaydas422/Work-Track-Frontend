// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SignupPage /> },    // /auth
      { path: "login", element: <LoginPage /> },   // /auth/login
    ],
  },

  {
    path: "/",                 // <---- Layout route
    element: <Layout />,       // sidebar + navbar fixed
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Dashboard /> },   // /
      { path: "dashboard", element: "" }, // /dashboard

      // You will add more pages here later:
      // { path: "profile", element: <ProfilePage/> },
      // { path: "settings", element: <SettingsPage/> },
    ],
  },

  // unknown routes → redirect to "/"
  // { path: "*", element: <Navigate to="/" replace /> }
]);

const App = () => <RouterProvider router={router} />;
export default App;

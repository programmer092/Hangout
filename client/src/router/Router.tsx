import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UseAuthContext } from "../context/authUser";

const Login = React.lazy(() => import("../pages/Login"));
const Error = React.lazy(() => import("../pages/Error"));
const Register = React.lazy(() => import("../pages/Register"));
const ChatPage = React.lazy(() => import("../pages/ChatPage"));

export default function RouterProvider(): React.ReactElement {
  const { authUser } = UseAuthContext();
  return (
    <>
      <React.Suspense fallback={<>loading...</>}>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Navigate to="/chatpage" /> : <Login />}
          />
          <Route path="*" element={<Error />} />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/chatpage" /> : <Register />}
          />
          <Route
            path="/chatpage"
            element={authUser ? <ChatPage /> : <Navigate to="/" />}
          />
        </Routes>
      </React.Suspense>
    </>
  );
}

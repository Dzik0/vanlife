import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../providers/AuthProvider";

export default function ProtectedRoute() {
  const location = useLocation();
  const { loggedUser, loading } = useAuthContext();

  if (loading) {
    <p>Loading...</p>;
  }

  return loggedUser ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ auth: "Please login first!", from: location }}
      replace
    />
  );
}

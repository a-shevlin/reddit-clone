import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoute = () => {

  const location = useLocation();

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return "Loading...";
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
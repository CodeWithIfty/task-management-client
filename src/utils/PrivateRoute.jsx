import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "./context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <span className="loading loading-ring loading-md scale-150"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;

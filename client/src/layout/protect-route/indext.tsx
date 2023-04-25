import React from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, useNavigate } from "react-router-dom";
interface Props {
  children: JSX.Element;
  loginPath: string;
}
const ProtectedRoute: React.FC<Props> = ({ loginPath, children }) => {
  const isAuthenticated = useIsAuthenticated();

  console.log("red protect");

  if (Boolean(isAuthenticated())) {
    return <>{children}</>;
  } else {
  }
  return <Navigate replace to={loginPath} />;
};

export default ProtectedRoute;

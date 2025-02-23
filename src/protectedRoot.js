import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./authprovider";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/authpage" replace />;
};

export default ProtectedRoute;

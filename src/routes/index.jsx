import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnauthenticatedRoutes from "./UnauthencatedRoutes";

function Routes() {
  const { loged } = useContext(AuthContext);

  return loged ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
}

export default Routes;

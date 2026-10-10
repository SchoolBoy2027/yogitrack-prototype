
import React from "react";
import { Navigate, Outlet } from "react-router-dom";   //Outlet is a pass through if logged in
import { useAuth } from "./AuthContext";               //else go to Login screen     

function IsLoggedIn() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />;
}

export default IsLoggedIn;
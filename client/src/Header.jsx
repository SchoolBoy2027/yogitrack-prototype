import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import yogaLogo from './assets/icon.png'
import { useAuth } from "./AuthContext";

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate("/Login");
    };

    const handleLogin = () => {
        navigate("/Login");
    };

    const [isLoggedIn, setLogin] = useState(0)
    return (
        <>
            <div id="mainMenu" className="container-fluid fixed-top row" >
                    <div className="col-2 ">
                        <a href={user ? "/Dashboard" : undefined}>
                            <img src={yogaLogo} className="yogalogo rounded" alt="Missing" title="Return to Dashboard" />
                        </a>
                    </div>
                    <div className="col-8 ">
                       {user && `Hello, ${user.fname}!`} 
                    </div>
                    <div className="col-2">
                        <a
                            type="button"
                            className="btn btn-dark fs-5"
                            onClick={user ? handleLogout : handleLogin}
                        >
                            {user ? "Logout" : "Sign in"}
                        </a>
                    </div>
            </div>
       
        </>
    )
}

export default Header

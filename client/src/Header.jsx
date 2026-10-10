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

    const [isLoggedIn, setLogin] = useState(0)
    /*                                Is Logged in= {isLoggedIn}  was the button text below. 
    
    <header className=" overflow-auto" style={{ height: "10vh" }}>
    */
    return (
        <>
            <div id="mainMenu" className="container-fluid fixed-top row" >
                    <div className="col-2 ">
                        <a href="\Dashboard" >
                            <img src={yogaLogo} className="yogalogo rounded" alt="Missing" title="Return to Dashboard" />
                        </a>
                    </div>
                    <div className="col-8 ">
                    </div>
                    <div className="col-2">
                        <a
                            type="button"
                            className="btn btn-dark fs-5"
                            onClick={handleLogout}
                        >
                            Logout 
                        </a>
                    </div>
            </div>
       
        </>
    )
}

export default Header

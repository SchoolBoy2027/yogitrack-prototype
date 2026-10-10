
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    // -----------------------------
    // LOGIN
    // -----------------------------
    const login = (userData) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };


    // -----------------------------
    // LOGOUT
    // -----------------------------
    const logout = () => {

        // Remove logged-in user
        localStorage.removeItem("user");

        // Remove any other login-related information
        localStorage.removeItem("mustChangePassword");

        // Clear React user state
        setUser(null);
    };

      const checkLogin = () => {
        if (!user) {
            navigate("/Login");
            return false;
        }

        return true;
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


// -----------------------------
// USE AUTH
// -----------------------------
export function useAuth() {

    return useContext(AuthContext);
}


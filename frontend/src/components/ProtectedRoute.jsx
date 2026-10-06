import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../services/api";


function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);


    useEffect(() => {
        async function checkAuthentication() {
            const token = localStorage.getItem(
                "access_token"
            );

            if (!token) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            try {
                const user = await getCurrentUser(token);

                if (user.role === "admin") {
                    setAuthorized(true);
                } else {
                    localStorage.removeItem(
                        "access_token"
                    );

                    setAuthorized(false);
                }

            } catch (error) {
                localStorage.removeItem(
                    "access_token"
                );

                setAuthorized(false);

            } finally {
                setLoading(false);
            }
        }


        checkAuthentication();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Checking authentication...
            </div>
        );
    }


    if (!authorized) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }


    return children;
}


export default ProtectedRoute;
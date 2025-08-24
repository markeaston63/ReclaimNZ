import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { API_HOST } from '../config/apiConfig';

const ProtectedRoute = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = checking, true = logged in, false = not logged in
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const response = await fetch(`${API_HOST}/php_api/api/check_session.php`);
                const result = await response.json();
                setIsLoggedIn(result.isLoggedIn);
            } catch (error) {
                console.error("Failed to check session status:", error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkSessionStatus();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

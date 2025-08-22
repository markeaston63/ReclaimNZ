// src/components/Login.jsx

import React, { useState, useRef, useEffect } from 'react';
import { API_HOST } from '../config/apiConfig'; // Ensure API_HOST is imported here as well

const Login = ({ onLoginSuccess }) => {
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const loginRef = useRef(null); // Ref for click outside functionality

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setLoginStatus('Logging in...'); // Provide immediate feedback

        const formData = new FormData();
        formData.append('user_name', user_name);
        formData.append('password', password);

        try {
            // Use API_HOST for the login endpoint
            const response = await fetch(`${API_HOST}/php_api/api/login.php`, {
                method: 'POST',
                body: formData,
            });

            // IMPORTANT: First, get the response as plain text to inspect it
            const responseText = await response.text();
            console.log("Raw server response:", responseText); // Log the raw response

            try {
                // Then, try to parse it as JSON
                const result = JSON.parse(responseText);

                if (result.status === 'success') {
                    setLoginStatus('Login successful!');
                    onLoginSuccess(); // Notify parent
                    setShowForm(false); // Hide the form on successful login
                    setUsername(''); // Clear inputs
                    setPassword('');
                } else {
                    setLoginStatus(result.message);
                }
            } catch (jsonError) {
                // If JSON parsing fails, it means the server sent non-JSON content
                console.error("JSON parsing error:", jsonError);
                setLoginStatus(`Server returned invalid data: "${responseText.substring(0, 50)}..."`); // Show snippet
            }

        } catch (error) {
            console.error("Login error (network or other unexpected):", error);
            setLoginStatus('An error occurred during login. Please try again.');
        }
    };

    // Handle clicks outside the login form to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                setShowForm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Corrected: use handleClickOutside for removal
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={loginRef}>
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    // Adjusted padding, font size, icon size, and space to make the button smaller
                    className="bg-purple-700 text-white py-1.5 px-3 rounded-md hover:bg-purple-800 transition-all duration-300 ease-in-out shadow-xl text-xs flex items-center space-x-1 border-2 border-purple-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Log In</span>
                </button>
            ) : (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl p-4 z-20 border border-gray-200">
                    <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">User Login</h3>
                    <form onSubmit={handleLogin} className="flex flex-col space-y-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={user_name}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            aria-label="Username"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            aria-label="Password"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md text-sm"
                        >
                            Log In
                        </button>
                    </form>
                    {loginStatus && <p className="text-sm mt-3 text-center text-gray-700">{loginStatus}</p>}
                </div>
            )}
        </div>
    );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_HOST } from '../config/apiConfig';
import Login from './Login';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/' },
        {
            name: 'Reclaim',
            path: null,
            subMenu: [
                { name: 'Disclaimer', path: '/disclaimer' },
                { name: 'The Situation', path: '/situation' },
                { name: 'The Solution', path: '/solution' },
            ],
        },
        {
            name: 'Information',
            path: null,
            subMenu: [
                { name: 'Blog', path: '/blog' },
                { name: 'Q&A', path: '/qa' },
                { name: 'Links', path: '/links' },
                { name: 'Press', path: '/press' },
            ],
        },
        { name: 'Join', path: '/join' },
        { name: 'Donate', path: '/donate' },
        { name: 'Contact Us', path: '/contact' },
        // Admin menu item - only show when logged in
        ...(isLoggedIn ? [{ name: 'Admin', path: '/admin' }] : []),
    ];

    const isActive = (item) => {
        if (item.path === location.pathname) {
            return true;
        }
        if (item.subMenu) {
            return item.subMenu.some(subItem => subItem.path === location.pathname);
        }
        return false;
    };

    const handleSubMenuToggle = (index) => {
        if (window.innerWidth < 768) {
            setOpenSubMenu(openSubMenu === index ? null : index);
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsMenuOpen(false);
        setOpenSubMenu(null);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_HOST}/php_api/api/logout.php`, { method: 'POST' });
            const result = await response.json();

            if (result.status === 'success') {
                setIsLoggedIn(false);
                console.log('You have been logged out.');
            } else {
                console.error('Logout failed:', result.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const response = await fetch(`${API_HOST}/php_api/api/check_session.php`);
                const result = await response.json();
                if (result.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Failed to check session status:", error);
                setIsLoggedIn(false);
            }
        };
        checkSessionStatus();
    }, []);

    return (
        <header className="bg-gradient-to-r from-gray-100 to-gray-300 text-black py-6 shadow-xl">
            <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
                <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
                    <div className="h-20 w-20 bg-gray-300 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-500">
                        <span className="text-5xl font-serif font-bold text-black">R</span>
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-3xl font-bold leading-none text-black whitespace-nowrap">Reclaim NZ</span>
                        <span className="text-2xl font-medium leading-none text-black whitespace-nowrap">Enough is Enough!</span>
                    </div>
                </Link>

                <button
                    className="md:hidden text-black focus:outline-none p-2 rounded-md"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation - Updated */}
                <nav className="hidden md:flex items-center flex-grow justify-end space-x-4">
                    {/* Add a new div to wrap the menu items with the desired styling */}
                    <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
                        <ul className="flex space-x-4">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => item.subMenu && setOpenSubMenu(index)}
                                    onMouseLeave={() => item.subMenu && setOpenSubMenu(null)}
                                >
                                    {item.path ? (
                                        <Link
                                            to={item.path}
                                            className={`block py-2 px-4 rounded-full transition-all duration-300 ease-in-out text-black ${
                                                isActive(item)
                                                    ? 'bg-blue-600 text-white font-bold shadow-md'
                                                    : 'hover:bg-blue-300 hover:shadow-sm'
                                            }`}
                                            onClick={() => { setIsMenuOpen(false); setOpenSubMenu(null); }}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                className={`flex items-center justify-between w-full py-2 px-4 rounded-full transition-all duration-300 ease-in-out text-black ${
                                                    isActive(item)
                                                        ? 'bg-blue-600 text-white font-bold shadow-md'
                                                        : 'bg-blue-100 hover:bg-blue-300 hover:shadow-sm'
                                                }`}
                                                onClick={() => handleSubMenuToggle(index)}
                                            >
                                                {item.name}
                                                <svg
                                                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                                                        (openSubMenu === index && window.innerWidth >= 768) ? 'rotate-180' : ''
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </button>
                                            {item.subMenu && openSubMenu === index && (
                                                <ul
                                                    className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-48"
                                                >
                                                    {item.subMenu.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                to={subItem.path}
                                                                className={`block py-2 px-6 transition-all duration-300 ease-in-out text-black ${
                                                                    location.pathname === subItem.path
                                                                        ? 'bg-blue-300 font-bold'
                                                                        : 'hover:bg-blue-100'
                                                                }`}
                                                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); setOpenSubMenu(null); }}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Login/Logout section for desktop (remains outside the new panel) */}
                    <div className="flex items-center">
                        {!isLoggedIn ? (
                            <Login onLoginSuccess={handleLoginSuccess} />
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-red-700 text-white py-1.5 px-3 rounded-md hover:bg-red-800 transition-all duration-300 ease-in-out shadow-xl text-xs flex items-center space-x-1 border-2 border-red-900"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H3zm6.586 10.586a1 1 0 010-1.414L12.172 9l-2.586-2.586a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Log Out</span>
                            </button>
                        )}
                    </div>
                </nav>
            </div>

            {/* Mobile Navigation Menu - Updated */}
            {isMenuOpen && (
                <nav className="md:hidden w-full px-4">
                    {/* Add a new div to wrap the mobile menu items with the desired styling */}
                    <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
                        <ul className="flex flex-col space-y-2">
                            {menuItems.map((item, index) => (
                                <li key={index} className="relative">
                                    {item.path ? (
                                        <Link
                                            to={item.path}
                                            className={`block py-2 px-4 rounded-full transition-all duration-300 ease-in-out text-black ${
                                                isActive(item)
                                                    ? 'bg-blue-600 text-white font-bold shadow-md'
                                                    : 'hover:bg-blue-300 hover:shadow-sm'
                                            }`}
                                            onClick={() => { setIsMenuOpen(false); setOpenSubMenu(null); }}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                className={`flex items-center justify-between w-full py-2 px-4 rounded-full transition-all duration-300 ease-in-out text-black ${
                                                    isActive(item)
                                                        ? 'bg-blue-600 text-white font-bold shadow-md'
                                                        : 'bg-blue-100 hover:bg-blue-300 hover:shadow-sm'
                                                }`}
                                                onClick={() => handleSubMenuToggle(index)}
                                            >
                                                {item.name}
                                                <svg
                                                    className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                                                        openSubMenu === index ? 'rotate-180' : ''
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </button>
                                            {item.subMenu && openSubMenu === index && (
                                                <ul className="pl-6 mt-2 space-y-1">
                                                    {item.subMenu.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                to={subItem.path}
                                                                className={`block py-2 px-4 rounded-full transition-all duration-300 ease-in-out text-black ${
                                                                    location.pathname === subItem.path
                                                                        ? 'bg-blue-300 font-bold'
                                                                        : 'hover:bg-blue-100'
                                                                }`}
                                                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); setOpenSubMenu(null); }}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                            {/* Login/Logout section for mobile (remains inside the panel but separate) */}
                            <li className="flex items-center pt-4">
                                {!isLoggedIn ? (
                                    <Login onLoginSuccess={handleLoginSuccess} />
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-700 text-white py-1.5 px-3 rounded-md hover:bg-red-800 transition-all duration-300 ease-in-out shadow-xl text-xs flex items-center space-x-1 border-2 border-red-900"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H3zm6.586 10.586a1 1 0 010-1.414L12.172 9l-2.586-2.586a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>Log Out</span>
                                    </button>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
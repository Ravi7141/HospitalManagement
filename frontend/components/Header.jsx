'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import ShinyText from './ShinyText';

const Header = ({ title }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const getInitials = () => {
        if (user?.username) {
            return user.username.substring(0, 2).toUpperCase();
        }
        return 'AD';
    };

    const getRoleColor = () => {
        switch (user?.role) {
            case 'ADMIN': return '#8B5CF6';
            case 'DOCTOR': return '#3B82F6';
            case 'PATIENT': return '#10B981';
            default: return '#8B5CF6';
        }
    };

    return (
        <header className="header">
            <h1>{title}</h1>
            <div className="header-right">
                <ThemeToggle />
                <div className="header-info">
                    <ShinyText text="MediCare Hospital" speed={3} className="header-shiny" />
                    <p>Management System</p>
                </div>

                {/* Profile Dropdown */}
                <div className="profile-dropdown-container" ref={dropdownRef}>
                    <button
                        className="header-avatar"
                        onClick={() => setShowDropdown(!showDropdown)}
                        style={{ background: getRoleColor() }}
                    >
                        {getInitials()}
                    </button>

                    {showDropdown && (
                        <div className="profile-dropdown">
                            <div className="dropdown-header">
                                <div className="dropdown-avatar" style={{ background: getRoleColor() }}>
                                    {getInitials()}
                                </div>
                                <div className="dropdown-user-info">
                                    <span className="dropdown-username">{user?.username || 'Guest'}</span>
                                    <span className="dropdown-role">{user?.role || 'User'}</span>
                                </div>
                            </div>

                            <div className="dropdown-divider"></div>

                            <button className="dropdown-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Profile
                            </button>

                            <button className="dropdown-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                Settings
                            </button>

                            <div className="dropdown-divider"></div>

                            <button className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

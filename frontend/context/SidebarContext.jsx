'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('sidebarCollapsed');
        if (saved !== null) {
            setIsCollapsed(saved === 'true');
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
            // Update CSS variable
            document.documentElement.style.setProperty(
                '--sidebar-width',
                isCollapsed ? '70px' : '200px'
            );
        }
    }, [isCollapsed, mounted]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    if (!mounted) return null;

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}

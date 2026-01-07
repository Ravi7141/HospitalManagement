'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

// Pages that should NOT show the sidebar (public pages)
const publicRoutes = ['/', '/login', '/register'];

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isPublicRoute) {
        // For public pages, render without sidebar
        return <>{children}</>;
    }

    // For authenticated pages, render with sidebar layout
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

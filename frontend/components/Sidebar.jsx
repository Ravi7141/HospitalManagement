'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

const Sidebar = () => {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar } = useSidebar();

    const isActive = (path) => pathname === path;

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {isCollapsed ? (
                    // When collapsed: show expand button in place of logo
                    <button className="sidebar-expand-icon" onClick={toggleSidebar} title="Expand Sidebar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                ) : (
                    // When expanded: show logo and collapse button
                    <>
                        <div className="sidebar-logo">
                            <div className="sidebar-logo-icon">🏥</div>
                            <div className="sidebar-logo-text">
                                <h1>MediCare</h1>
                                <p>HMS</p>
                            </div>
                        </div>
                        <button className="sidebar-toggle" onClick={toggleSidebar} title="Collapse Sidebar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            <nav className="sidebar-nav">
                <Link href="/dashboard" className={isActive('/dashboard') ? 'active' : ''} title="Dashboard">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    {!isCollapsed && 'Dashboard'}
                </Link>

                <Link href="/patients" className={isActive('/patients') ? 'active' : ''} title="Patients">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {!isCollapsed && 'Patients'}
                </Link>

                <Link href="/doctors" className={isActive('/doctors') ? 'active' : ''} title="Doctors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    {!isCollapsed && 'Doctors'}
                </Link>

                <Link href="/departments" className={isActive('/departments') ? 'active' : ''} title="Departments">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    {!isCollapsed && 'Departments'}
                </Link>

                <Link href="/appointments" className={isActive('/appointments') ? 'active' : ''} title="Appointments">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {!isCollapsed && 'Appointments'}
                </Link>

                <Link href="/insurance" className={isActive('/insurance') ? 'active' : ''} title="Insurance">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    {!isCollapsed && 'Insurance'}
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;

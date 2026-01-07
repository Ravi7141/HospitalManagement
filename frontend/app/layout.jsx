import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
    title: 'MediCare HMS - Hospital Management System',
    description: 'MediCare Hospital Management System - Manage patients, doctors, appointments, departments, and insurance efficiently.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <SidebarProvider>
                        <LayoutWrapper>
                            {children}
                        </LayoutWrapper>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
    showHeader?: boolean;
    subNavigation?: React.ReactNode;
    variant?: 'dashboard' | 'public';
    isLoading?: boolean;
}

export default function Layout({ children }: LayoutProps) {
    // The admin panel (Admin.tsx and StoreAdmin.tsx) handles its own full-screen 
    // layouts natively (sidebar, main content scrolling, etc). 
    // This file is kept purely to satisfy the existing imports without breaking the layout.
    return <>{children}</>;
}
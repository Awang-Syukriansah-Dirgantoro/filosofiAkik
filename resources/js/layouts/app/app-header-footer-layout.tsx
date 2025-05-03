import { AppContent } from '@/components/app-content';
import AppFooterMain from '@/components/app-footer-main';
import { AppHeaderMain } from '@/components/app-header-main';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

interface Category {
    id: number;
    name: string;
}

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    categories?: Category[];
}

interface AppHeaderFooterLayoutProps extends PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], categories?: Category[] }> {
    info?: {
        address?: string;
        phone_number?: string;
        facebook?: string;
        instagram?: string;
        tiktok?: string;
        twitter?: string;
        tag_line?: string;
        sub_tag_line?: string;
        about?: string;
    },
}

export default function AppHeaderFooterLayout({ children, breadcrumbs, info, categories }: AppHeaderFooterLayoutProps) {
    return (
        <AppShell>
            <AppHeaderMain breadcrumbs={breadcrumbs} categories={categories || []} />
            <AppContent>{children}</AppContent>
            <AppFooterMain info={info || {}} />
        </AppShell>
    );
}

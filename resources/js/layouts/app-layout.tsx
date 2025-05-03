import AppLayoutTemplate from '@/layouts/app/app-header-footer-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface Category {
    id: number;
    name: string;
}

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
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
    };
    categories: Category[];
}

export default ({ children, breadcrumbs, info, categories, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate
        breadcrumbs={breadcrumbs}
        info={info}
        categories={categories || []}
        {...props}
    >
        {children}
    </AppLayoutTemplate>
);

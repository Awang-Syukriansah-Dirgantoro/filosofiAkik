import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import AppLogoIcon from '@/components/app-logo-icon';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'About', href: '/about' },
];

interface Category {
    id: number;
    name: string;
}

interface AboutPageProps {
    categories: Category[];
    info:{
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
}

export default function AboutPage(props: AboutPageProps) {
    const { categories, info } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs} info={info} categories={categories}>
            <Head title="About - Filosofi Akik" />
            <div className="flex flex-col gap-5 md:px-[200px] mx-3">
                <div className='h-[300px] w-full flex place-items-center'>
                    <AppLogoIcon className='h-full w-full object-contain' />
                </div>
                <h1 className="text-2xl font-bold text-yellow-300 mb-2">About</h1>
                <div className="text-lg text-white mb-4 whitespace-pre-line">{info.about}</div>
            </div>
        </AppLayout>
    );
} 
import AppHeroMain from '@/components/app-hero-main';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import CategoryList from '@/components/category-list';
import AkikCard from '@/components/akik-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

interface Product {
    id: number;
    nama: string;
    alias: string;
    badge: string;
    stock: number;
    view: number;
    price: number;
    priceUsd: number;
    limited: boolean;
    negoable: boolean;
    image: string[];
    categories: { id: number; name: string }[];
}

interface Category {
    id: number;
    name: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PageProps {
    products: {
        data: Product[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    carousel: {
        id: number;
        path: string;
    }[];
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

export default function Home(props: PageProps) {
    const { products, categories, info, carousel } = props;
    console.log(info);
    
    return (
        <AppLayout breadcrumbs={breadcrumbs} categories={categories} info={info}>
            <Head title="Home - Filosofi Akik Rumahnya Batu Akik" />
            <div className="flex h-fit flex-col gap-3 rounded-xl p-4">
                <AppHeroMain info={info} carousel={carousel}/>
                <div className="grid grid-cols-4 gap-3 mt-4">
                    {/* Kategori di kiri */}
                    <div className="hidden md:block">
                        <CategoryList categories={categories} />
                    </div>
                    {/* Grid Card */}
                    <div className="flex-1 col-span-4 md:col-span-3">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {products.data.map((product) => (
                                <AkikCard
                                    key={product.id}
                                    id={product.id}
                                    image={product.image && product.image.length > 0 ? product.image[0] : 'placeholder.png'}
                                    title={product.nama}
                                    subtitle={product.alias}
                                    price={product.price}
                                    priceUsd={product.priceUsd}
                                    stock={product.stock}
                                    isLimited={product.limited}
                                    negotiable={product.negoable}
                                    type={product.badge}
                                    views={product.view}
                                    mineral={product.categories && product.categories.length > 0 ? product.categories[0].name : ''}
                                />
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="flex text-black justify-center mt-8">
                            <div className="flex gap-2">
                                {products.links.map((link, idx) => {
                                    let label = link.label;
                                    if (label === 'Next &raquo;') label = '›';
                                    else if (label === '&laquo; Previous') label = '‹';
                                    else if (label === 'Next') label = '›';
                                    else if (label === 'Previous') label = '‹';
                                    else if (label === '&laquo; First') label = '«';
                                    else if (label === 'First') label = '«';
                                    else if (label === 'Last') label = '»';
                                    else if (label === '&raquo; Last') label = '»';
                                    return (
                                        <button
                                            key={idx}
                                            disabled={!link.url}
                                            className={`px-3 py-1 rounded ${link.active ? 'bg-yellow-400 font-bold' : 'bg-gray-300'}`}
                                            dangerouslySetInnerHTML={{ __html: label }}
                                            onClick={() => link.url && router.visit(link.url)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

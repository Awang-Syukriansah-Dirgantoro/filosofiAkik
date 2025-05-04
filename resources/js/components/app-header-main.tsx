import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage, Head, router } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'About',
        href: '/about',
        icon: Folder,
    },
    {
        title: 'Explore',
        href: '/',
        icon: BookOpen,
    },
];

interface Category {
    id: number;
    name: string;
}

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    categories?: Category[];
}

export function AppHeaderMain({ breadcrumbs = [], categories = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    // const { auth } = page.props;
    const getInitials = useInitials();
    // const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Sinkronkan search state dengan query string
    useEffect(() => {
        if (page.props.search !== undefined) {
            setSearch(page.props.search as string);
        } else {
            setSearch('');
        }
    }, [page.props.search]);

    // useEffect(() => {
    //     fetch('/api/categories')
    //         .then((res) => res.json())
    //         .then((data) => setCategories(data));
    // }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.visit('/', { data: { search, category: selectedCategory }, preserveState: true });
    };

    const handleCategory = (cat: any) => {
        setSelectedCategory(cat.slug || cat.id);
        router.visit('/', { data: { search, category: cat.slug || cat.id }, preserveState: true });
    };

    const handleAllCategory = () => {
        setSelectedCategory('');
        router.visit('/', { data: { search }, preserveState: true });
    };

    return (
        <>
            <div className="sticky top-0 z-50 border-sidebar-border/80 border-b bg-[#0C0C0C] drop-shadow-[0_5px_5px_rgba(246,196,75,1)]">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium">
                                                    {/* {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />} */}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className={cn(
                                                    // navigationMenuTriggerStyle(),
                                                    'flex items-center space-x-2 font-medium',
                                                )}>
                                                    Category
                                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="#F6C44B" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <a href="#" onClick={handleAllCategory} className="block px-4 py-2 hover:bg-yellow-100 text-white font-semibold hover:text-black">
                                                        All Category
                                                    </a>
                                                    {categories.length === 0 ? (
                                                        <div className="px-4 py-2 text-sm text-gray-400">Loading...</div>
                                                    ) : (
                                                        categories.map((cat: any) => (
                                                            <a key={cat.id} href={`/category/${cat.slug}`} className="block px-4 py-2 hover:bg-yellow-100 text-white font-semibold hover:text-black">
                                                                {cat.name}
                                                            </a>
                                                        ))
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        {/* <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div> */}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Search Bar */}
                    <div className="flex flex-1 justify-center">
                        <form onSubmit={handleSearch} className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full rounded-full px-6 py-2 text-lg font-semibold focus:outline-none"
                                style={{ background: '#fff', color: '#222' }}
                            />
                            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#181818] rounded-full p-2">
                                <Search className="text-[#F6C44B]" />
                            </button>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <>
                                        {/* <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                page.url === item.href && activeItemStyles,
                                                'h-9 cursor-pointer px-3',
                                            )}
                                        >
                                            {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                            {item.title}
                                        </Link>
                                        {page.url === item.href && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )}
                                    </NavigationMenuItem> */}
                                    </>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            {/* <Button variant="ghost" size="icon" className="group h-9 w-9 cursor-pointer">
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button> */}
                            <div className="hidden lg:flex">
                                {rightNavItems.map((item) => (
                                    <>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                // page.url === item.href && activeItemStyles,
                                                `h-9 cursor-pointer px-3 font-semibold text-[#F6C44B] font-['Roboto']`,
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                        {/* {page.url === item.href && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )} */}
                                    </>
                                ))}
                                {/* Dropdown Category */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger className={cn(
                                        navigationMenuTriggerStyle(),
                                        `h-9 cursor-pointer px-3 font-semibold text-[#F6C44B] font-['Roboto'] flex items-center`,
                                    )}>
                                        Category
                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="#F6C44B" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <a href="#" onClick={handleAllCategory} className="block px-4 py-2 hover:bg-yellow-100 text-white font-semibold hover:text-black">
                                            All Category
                                        </a>
                                        {categories.length === 0 ? (
                                            <div className="px-4 py-2 text-sm text-gray-400">Loading...</div>
                                        ) : (
                                            categories.map((cat: any) => (
                                                <button key={cat.id} onClick={() => handleCategory(cat)} className="block w-full text-left px-4 py-2 hover:bg-yellow-100 text-white font-semibold hover:text-black">
                                                    {cat.name}
                                                </button>
                                            ))
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Yellow Line */}
                {/* <div className="h-1 w-full bg-gradient-to-r from-[#F6C44B] via-[#F6C44B] to-transparent" /> */}
            </div>
            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}

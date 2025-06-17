import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    number: string;
    date: string;
    weight: string;
    diameter: string;
    cut: string;
    shape: string;
    color: string;
    comments: string;
    origin: string;
    description: string;
    image: string[];
    categories: { id: number; name: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

interface Category {
    id: number;
    name: string;
}

interface PageProps {
    products: Product;
    categories: Category[];
    info: {
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

declare global {
    interface Window {
        APP_URL: string;
    }
}

const APP_URL = typeof window !== 'undefined' ? (window.APP_URL || "127.0.0.1:8000") : "127.0.0.1:8000";

const isVideoFile = (url: string) => {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

export default function DetailPage(props: PageProps) {
    const { products, categories, info } = props;
    const [showDetail, setShowDetail] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [carouselGaleryIndex, setCarouselGaleryIndex] = useState(0);

    // console.log(APP_URL);

    const formattedDate = products.date ? new Date(products.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
        : '';


    const handlePrev = () => {
        setCarouselIndex((prev) => (prev === 0 ? (products.image.length - 1) : prev - 1));
    };
    const handleNext = () => {
        setCarouselIndex((prev) => (prev === products.image.length - 1 ? 0 : prev + 1));
    };

    if (!products) {
        return <div>Product data not found.</div>;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} info={info} categories={categories}>
            <Head title="Detail - Filosofi Akik Rumahnya Batu Akik" />
            <div className='align-center justify-center relative flex flex-col m-3 bg-[#0C0C0C]'
            >
                <div className='grid grid-cols-2 mb-2'>
                    <div>
                        <button className='text-white font-[28px] z-10 cursor-pointer'
                            onClick={() => window.history.back()}
                            aria-label="Back"
                        >
                            <FaArrowLeft />
                        </button>
                    </div>
                    <div className='flex w-full justify-end'>
                        {/* <button className='rounded-full bg-[#F6C44B] text-black font-[700] z-10 w-fit cursor-pointer py-[5px] px-[15px]'>
                            Buy Now
                        </button> */}
                        <a
                            href={`https://wa.me/${info?.phone_number?.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hi, I want to buy this product: ${products.nama}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='rounded-full bg-[#F6C44B] text-black font-[700] z-10 w-fit cursor-pointer py-[5px] px-[15px]'
                        >
                            Buy Now
                        </a>
                    </div>
                </div>
                {/* Initial layout */}
                <div className='hidden md:block'>
                    <div className='grid grid-cols-12 gap-3 h-[400px]'>
                        <div className='col-span-6 relative h-[400px] z-10'>
                            <div className={`absolute inset-0 transition-all duration-500 ease-in-out 
                                ${showDetail ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                {isVideoFile(products.image[0]) ? (
                                    <video
                                        src={`${APP_URL}/storage/${products.image[0]}`}
                                        className="rounded-md row-start-1 w-full h-full shadow-[0_2px_16px_rgba(0,0,0,0.2)] object-cover"
                                        controls
                                        playsInline
                                        muted
                                    />
                                ) : (
                                    <img
                                        src={products.image && products.image.length > 0 ? `${APP_URL}/storage/${products.image[0]}` : `${APP_URL}/storage/placeholder.png`}
                                        alt={products.nama || 'Product'}
                                        className={`rounded-md row-start-1 w-full h-full shadow-[0_2px_16px_rgba(0,0,0,0.2)] ${products.image && products.image.length > 0 ? 'object-cover' : "object-contain"}`}
                                    />
                                )}
                            </div>
                            <div className={`flex justify-center absolute inset-0 transition-all duration-500 ease-in-out 
                                ${showDetail ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                {isVideoFile(products.image[carouselIndex]) ? (
                                    <video
                                        src={`${APP_URL}/storage/${products.image[carouselIndex]}`}
                                        className="absolute rounded-md w-full h-full object-cover"
                                        controls
                                        playsInline
                                        muted
                                    />
                                ) : (
                                    <img
                                        src={products.image && products.image.length > 0 ? `${APP_URL}/storage/${products.image[carouselIndex]}` : `${APP_URL}/storage/placeholder.png`}
                                        alt={products.nama || 'Product'}
                                        className={`absolute rounded-md w-full h-full ${products.image && products.image.length > 0 ? 'object-cover' : "object-contain"}`}
                                    />
                                )}
                                {products.image && products.image.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrev}
                                            className='absolute rounded-full w-[40px] bg-black/[0.4] z-[2] h-[40px] justify-center flex place-items-center cursor-pointer text-[24px] left-[16px] self-center'
                                            aria-label="Prev"
                                        >
                                            <FaArrowLeft />
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className='absolute rounded-full w-[40px] bg-black/[0.4] z-[2] h-[40px] justify-center flex place-items-center cursor-pointer text-[24px] right-[16px] self-center'
                                            aria-label="Next"
                                        >
                                            <FaArrowRight />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='col-span-6 relative z-0'>
                            <div className={`grid grid-cols-6 grid-rows-2 p-0 m-0 justify-center gap-3 h-[400px] absolute inset-0 transition-all duration-500 ease-in-out 
                                ${showDetail ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <div className='col-span-5 justify-center'>
                                    {isVideoFile(products.image[1]) ? (
                                        <video
                                            src={`${APP_URL}/storage/${products.image[1]}`}
                                            className="w-full h-full rounded-md object-cover"
                                            controls
                                            playsInline
                                            muted
                                        />
                                    ) : (
                                        <img
                                            src={products.image && products.image.length > 1 ? `${APP_URL}/storage/${products.image[1]}` : `${APP_URL}/storage/placeholder.png`}
                                            alt="thumb-1"
                                            className={`w-full h-full rounded-md ${products.image && products.image.length > 1 ? 'object-cover' : "object-contain"}`}
                                        />
                                    )}
                                </div>
                                <div className={`row-span-2 flex content-center justify-center transition-all duration-500 ease-in-out ${showDetail ? 'opacity-0 -translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                                    <button className='flex place-items-center place-self-center bg-[#F6C44B] text-black justify-center w-[48px] h-[48px] rounded-full text-[24px] cursor-pointer'
                                        onClick={() => setShowDetail(true)}
                                        aria-label="Next"
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>
                                <div className='col-span-5 justify-center'>
                                    <div className='relative w-full h-full'>
                                        {isVideoFile(products.image[2]) ? (
                                            <video
                                                src={`${APP_URL}/storage/${products.image[2]}`}
                                                className="w-full h-full rounded-md brightness-75 object-cover"
                                                controls
                                                playsInline
                                                muted
                                            />
                                        ) : (
                                            <img
                                                src={products.image && products.image.length > 2 ? `${APP_URL}/storage/${products.image[2]}` : `${APP_URL}/storage/placeholder.png`}
                                                alt="thumb-2"
                                                className={`w-full h-full rounded-md brightness-75 ${products.image && products.image.length > 2 ? 'object-cover' : "object-contain"}`}
                                            />
                                        )}
                                        <div className='absolute top-0 left-0 w-full h-full flex place-items-center justify-center font-[700] text-[24px] rounded-md cursor-pointer'
                                            onClick={() => setShowGallery(true)}
                                        >
                                            + See More
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`grid grid-cols-6 p-0 m-0 flex justify-center gap-3 h-[400px] absolute inset-0 transition-all duration-500 ease-in-out 
                                ${showDetail ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                                <div className='flex content-center justify-center'>
                                    <button
                                        onClick={() => {
                                            setShowDetail(false)
                                            setCarouselIndex(0)
                                        }}
                                        className='flex place-items-center place-self-center bg-[#F6C44B] text-black justify-center w-[48px] h-[48px] rounded-full text-[24px] cursor-pointer font-bold'
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className='relative col-span-5'>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        {products.categories && products.categories.length > 0 && products.categories.map((tag) => (
                                            <span
                                                key={tag.name}
                                                style={{
                                                    background: '#F6C44B',
                                                    color: '#222',
                                                    borderRadius: 8,
                                                    padding: '2px 12px',
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="font-['Outfit']" style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>{products.nama}</h1>
                                    <div className="font-['Outfit']" style={{ color: '#FFA726', fontSize: 32, fontWeight: 800, margin: '3px 0 1px 0' }}>
                                        Rp {products.price.toLocaleString('id-ID')}
                                    </div>
                                    <div className="font-['Outfit']" style={{ color: '#FFA726', fontSize: 28, fontWeight: 800, margin: '1px 0 10px 0' }}>
                                        {products.priceUsd && `$ ${products.priceUsd.toLocaleString('id-ID')}`}
                                    </div>
                                    <div className="font-['Roboto']" style={{ fontSize: 17, marginBottom: 16, lineHeight: 1.7 }}>
                                        <div><b>No / Date</b> : {products.number} / {formattedDate}</div>
                                        <div><b>Weight</b> : {products.weight} Gram</div>
                                        <div><b>Dim (Mm)</b> : {products.diameter}</div>
                                        <div><b>Cut</b> : {products.cut}</div>
                                        <div><b>Shape</b> : {products.shape}</div>
                                        <div><b>Colour</b> : {products.color}</div>
                                        <div><b>Comments</b> : {products.comments}</div>
                                        <div><b>Origin</b> : {products.origin}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:hidden block flex flex-col gap-3'>
                    <div className='relative flex h-[400px]'>
                        {isVideoFile(products.image[carouselIndex]) ? (
                            <video
                                src={`${APP_URL}/storage/${products.image[carouselIndex]}`}
                                className="absolute rounded-md w-full h-full object-cover"
                                controls
                                playsInline
                                muted
                            />
                        ) : (
                            <img
                                src={products.image && products.image.length > 0 ? `${APP_URL}/storage/${products.image[carouselIndex]}` : `${APP_URL}/storage/placeholder.png`}
                                alt={products.nama || 'Product'}
                                className={`absolute rounded-md w-full h-full ${products.image && products.image.length > 0 ? 'object-cover' : "object-contain"}`}
                            />
                        )}
                        {products.image && products.image.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className='absolute rounded-full w-[40px] bg-black/[0.4] z-[2] h-[40px] justify-center flex place-items-center cursor-pointer text-[24px] left-[16px] self-center'
                                    aria-label="Prev"
                                >
                                    <FaArrowLeft />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className='absolute rounded-full w-[40px] bg-black/[0.4] z-[2] h-[40px] justify-center flex place-items-center cursor-pointer text-[24px] right-[16px] self-center'
                                    aria-label="Next"
                                >
                                    <FaArrowRight />
                                </button>
                            </>
                        )}
                    </div>
                    <div className='relative'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            {products.categories && products.categories.length > 0 && products.categories.map((tag) => (
                                <span
                                    key={tag.name}
                                    style={{
                                        background: '#F6C44B',
                                        color: '#222',
                                        borderRadius: 8,
                                        padding: '2px 12px',
                                        fontSize: 14,
                                        fontWeight: 600,
                                    }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-['Outfit']" style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>{products.nama}</h1>
                        <div className="font-['Outfit']" style={{ color: '#FFA726', fontSize: 32, fontWeight: 800, margin: '8px 0 16px 0' }}>
                            Rp {products.price.toLocaleString('id-ID')}
                        </div>
                        <div className="font-['Outfit']" style={{ color: '#FFA726', fontSize: 28, fontWeight: 800, margin: '8px 0 16px 0' }}>
                            {products.priceUsd && `$ ${products.priceUsd.toLocaleString('id-ID')}`}
                        </div>
                        <div className="font-['Roboto']" style={{ fontSize: 17, marginBottom: 16, lineHeight: 1.7 }}>
                            <div><b>No / Date</b> : {products.number} / {formattedDate}</div>
                            <div><b>Weight</b> : {products.weight} Gram</div>
                            <div><b>Dim (Mm)</b> : {products.diameter}</div>
                            <div><b>Cut</b> : {products.cut}</div>
                            <div><b>Shape</b> : {products.shape}</div>
                            <div><b>Colour</b> : {products.color}</div>
                            <div><b>Comments</b> : {products.comments}</div>
                            <div><b>Origin</b> : {products.origin}</div>
                        </div>
                    </div>
                </div>

                <div className='my-3'>
                    <div className="font-['Outfit']" style={{ fontWeight: 700, marginBottom: 4 }}>Filosofi</div>
                    <div className="font-['Roboto'] break-words text-justify" style={{ fontSize: 15, marginBottom: 24 }}>
                        {products.description}
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        {/* <button
                            style={{
                                padding: '10px 28px',
                                fontSize: 16,
                                borderRadius: 8,
                                border: 'none',
                                background: '#F6C44B',
                                color: '#222',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        >
                            Buy Now
                        </button> */}
                        <a
                            href={`https://wa.me/${info?.phone_number?.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hi, I want to buy this product: ${products.nama}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '10px 28px',
                                fontSize: 16,
                                borderRadius: 8,
                                border: 'none',
                                background: '#F6C44B',
                                color: '#222',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        // className='rounded-full bg-[#F6C44B] text-black font-[700] z-10 w-fit cursor-pointer py-[5px] px-[15px]'
                        >
                            Buy Now
                        </a>
                        {/* <button
                            style={{
                                padding: '10px 28px',
                                fontSize: 16,
                                borderRadius: 8,
                                border: '1px solid #F6C44B',
                                background: '#222',
                                color: '#F6C44B',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        >
                            Ask More
                        </button> */}
                        <a
                            href={`https://wa.me/${info?.phone_number?.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hi, I'd like to ask more about: ${products.nama}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '10px 28px',
                                fontSize: 16,
                                borderRadius: 8,
                                border: '1px solid #F6C44B',
                                background: '#222',
                                color: '#F6C44B',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        // className='mt-2 rounded-full bg-green-500 text-white font-[700] w-fit cursor-pointer py-[5px] px-[15px]'
                        >
                            Ask More
                        </a>
                    </div>
                </div>
                {/* Modal galeri gambar hanya jika showGallery */}
                {showGallery && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.85)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Tombol Close */}
                        <button
                            onClick={() => {
                                setShowGallery(false)
                                setCarouselIndex(0)
                            }}
                            style={{
                                position: 'absolute',
                                top: 32,
                                right: 48,
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                fontSize: 36,
                                cursor: 'pointer',
                                zIndex: 1100,
                            }}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        {/* Grid Gambar */}
                        {/* <div
                            style={{
                                background: '#222',
                                borderRadius: 24,
                                padding: 32,
                                maxWidth: 900,
                                maxHeight: '80vh',
                                overflowY: 'auto',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: 24,
                            }}
                        >
                            {products.image && products.image.length > 0 ? (
                                products.image.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={`${APP_URL}/storage/${img}`}
                                        alt={`gallery-${idx}`}
                                        style={{
                                            width: '100%',
                                            height: 220,
                                            objectFit: 'contain',
                                            background: '#111',
                                            borderRadius: 16,
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                                        }}
                                    />
                                ))
                            ) : (
                                <img src={`${APP_URL}/storage/placeholder.png`} alt="default" style={{ width: '100%', height: 220, objectFit: 'contain', background: '#111', borderRadius: 16 }} />
                            )}
                        </div> */}
                        <div className='relative flex h-[90%] w-[90%]'>
                            {isVideoFile(products.image[carouselIndex]) ? (
                                <video
                                    src={`${APP_URL}/storage/${products.image[carouselIndex]}`}
                                    className="absolute rounded-md w-full h-full object-contain"
                                    controls
                                    playsInline
                                    muted
                                />
                            ) : (
                                <img
                                    src={products.image && products.image.length > 0 ? `${APP_URL}/storage/${products.image[carouselIndex]}` : `${APP_URL}/storage/placeholder.png`}
                                    alt={products.nama || 'Product'}
                                    className="absolute rounded-md w-full h-full object-contain"
                                />
                            )}
                            {products.image && products.image.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className='absolute rounded-full w-[40px] bg-black/[0.4] z-[2] h-[40px] justify-center flex place-items-center cursor-pointer text-[24px] left-[16px] self-center'
                                        aria-label="Prev"
                                    >
                                        <FaArrowLeft />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className='absolute rounded-full w-[40px] bg-black/[0.4] z-[2] h-[40px] justify-center flex place-items-center cursor-pointer text-[24px] right-[16px] self-center'
                                        aria-label="Next"
                                    >
                                        <FaArrowRight />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

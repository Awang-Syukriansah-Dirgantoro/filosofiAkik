import { Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

const categories = ['Jewellery', 'Collectibles', 'Art Gallery'];

// Sample product images - replace these with your actual image paths
const productImages = [
    '/storage/contoh-1.jpeg',
    '/storage/contoh-2.jpg',
    '/storage/contoh-3.jpg',
    '/storage/contoh-4.jpg',
    '/storage/contoh-5.jpg',
    '/storage/contoh-6.jpg',
    '/storage/contoh-7.jpg',
    '/storage/contoh-8.jpg',
    '/storage/contoh-9.jpg',
];

interface PageProps {
    info:{
        tag_line?: string;
        sub_tag_line?: string;
        address?: string;
        phone_number?: string;
        facebook?: string;
        instagram?: string;
        tiktok?: string;
        twitter?: string;
    };
}

export default function AppHeroMain(props: PageProps) {
  const [search, setSearch] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { info } = props;

  useEffect(() => {
    // Auto-rotate images every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit('/', { data: { search }, preserveState: true });
  };

  return (
    <section className="w-full text-white flex flex-col items-center py-12">
      <h1 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-center mb-2">
        {info?.tag_line ? info.tag_line : "IL Meglio Del Meglio Piu Uno"}
      </h1>
      {/* {info.sub_tag_line && (
        <p className="text-xl md:text-2xl font-medium text-center mb-2 text-yellow-200">
          {info.sub_tag_line}
        </p>
      )} */}
      <p className="text-lg md:text-xl font-semibold font-['Outfit'] text-center mb-4">
        {info?.sub_tag_line ? info.sub_tag_line : "“Yang Terbaik Dari Yang Terbaik Ditambah Satu”"}
      </p>
      <div className="text-center text-[#F6C44B] font-['Roboto'] text-lg mb-8">
        {categories.map((cat, idx) => (
          <span key={cat}>
            {cat}
            {idx < categories.length - 1 && <span className="mx-1">,</span>}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex items-center bg-white rounded-full px-2 py-1 shadow-md">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 text-lg font-semibold bg-transparent outline-none text-gray-700 text-xl px-5 placeholder-gray-500"
        />
        <button type="submit" className="ml-2 bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center">
            <Search className="text-[#F6C44B]" />
        </button>
      </form>

      {/* Product Carousel */}
      <div className="w-full max-w-2xl mt-4 h-[40vh] relative overflow-hidden rounded-lg">
        <div 
          className="w-full h-full transition-transform duration-700 ease-in-out flex"
          style={{
            transform: `translateX(-${(currentImageIndex * 100) / productImages.length}%)`,
            width: `${productImages.length * 100}%`
          }}
        >
          {productImages.map((image, index) => (
            <div 
              key={index}
              className="w-full h-full flex-shrink-0 relative"
              style={{ width: `${100 / productImages.length}%` }}
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const categories = ['Jewellery', 'Collectibles', 'Art Gallery'];

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

  const { info } = props;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.visit('/', { data: { search }, preserveState: true });
  };

  return (
    <section className="w-full text-white flex flex-col items-center py-12">
      <h1 className="text-4xl md:text-5xl font-outfit font-bold text-center mb-2">
        {info?.tag_line ? info.tag_line : "IL Meglio Del Meglio Piu Uno"}
      </h1>
      {/* {info.sub_tag_line && (
        <p className="text-xl md:text-2xl font-medium text-center mb-2 text-yellow-200">
          {info.sub_tag_line}
        </p>
      )} */}
      <p className="text-lg md:text-xl font-semibold text-center mb-4">
        {info?.sub_tag_line ? info.sub_tag_line : "“Yang Terbaik Dari Yang Terbaik Ditambah Satu”"}
      </p>
      <div className="text-center text-yellow-100 text-lg mb-8">
        {categories.map((cat, idx) => (
          <span key={cat}>
            {cat}
            {idx < categories.length - 1 && <span className="mx-1">,</span>}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex items-center bg-white rounded-full px-6 py-3 shadow-md">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 text-lg font-semibold bg-transparent outline-none text-gray-700 text-xl placeholder-gray-500"
        />
        <button type="submit" className="ml-2 bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center">
            <Search className="text-[#FFE656]" />
        </button>
      </form>
    </section>
  );
};

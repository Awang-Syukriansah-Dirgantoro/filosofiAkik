import React from 'react';
import { router } from '@inertiajs/react';

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const handleCategory = (cat: Category) => {
    router.visit('/', { data: { category: cat.id }, preserveState: true });
  };

  const handleAllCategory = () => {
    router.visit('/', { preserveState: true });
  };

  return (
    <div className="bg-[#F6C44B] text-black font-['Outfit'] rounded-xl p-4 min-h-[500px]">
      <h2 className="font-bold text-lg mb-4">Kategori</h2>
      <ul className="space-y-2">
        <li className="hover:text-blue-600 cursor-pointer font-semibold" onClick={handleAllCategory}>All Category</li>
        {categories.map((cat) => (
          <li key={cat.id} className="hover:text-blue-600 cursor-pointer" onClick={() => handleCategory(cat)}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
} 
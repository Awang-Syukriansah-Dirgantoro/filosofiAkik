import React from 'react';
import { Icon } from './icon';
import { Eye, ShoppingBag } from 'lucide-react';
import { router } from '@inertiajs/react';

interface AkikCardProps {
  image: string;
  title: string;
  subtitle?: string;
  price: number;
  stock?: number;
  negotiable?: boolean;
  isLimited?: boolean;
  views?: number;
  type?: string;
  mineral?: string;
  id?: number;
}

export default function AkikCard({
  image,
  title,
  subtitle,
  price,
  stock,
  negotiable = false,
  isLimited = false,
  views = 100,
  type = 'Collector Item',
  mineral = 'Chrysocolla Chalcedony',
  id,
}: AkikCardProps) {
  // console.log(title, subtitle);

  return (
    <div
      className="bg-white rounded-xl shadow p-2 flex flex-col gap-2 w-full min-h-[320px] border-2 border-[#FFE656] cursor-pointer hover:shadow-lg transition"
      onClick={() => id && router.visit(`/product/${id}`)}
    >
      <div className="relative h-2/4">
        <img src={`storage/${image}`} alt={title} className="rounded-lg w-full h-full object-cover" />
        <span className="absolute top-2 right-2 bg-[#F3C624] text-black text-xs font-bold px-2 py-1 rounded">{stock == 0 ? "Out Of Stock" : type}</span>
      </div>
      <div className="flex-1 flex flex-col gap-1 justify-between my-2">
        <div className='flex flex-col gap-1'>
          <div className="font-semibold text-sm md:text-lg text-black">{title}</div>
          {subtitle && <div className="text-xs text-green-700">({subtitle})</div>}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {isLimited && <span className="text-black flex gap-1 align-center"><Icon iconNode={ShoppingBag} className="size-4 opacity-80 group-hover:opacity-100" /> {isLimited ? "Limited Edition" : stock}</span>}
            <span className="text-black flex gap-1 align-center"><Icon iconNode={Eye} className="size-4 opacity-80 group-hover:opacity-100" /> {views}</span>
          </div>
        </div>
        {/* <div className="text-xs text-green-700">({mineral})</div> */}
        <div>
          {negotiable && <div className="text-xs text-black">Negotiable</div>}
          <div className="text-base md:text-lg font-bold text-red-600">Rp. {price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
} 
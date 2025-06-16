import React from 'react';
import { Icon } from './icon';
import { Eye, ShoppingBag } from 'lucide-react';
import { router } from '@inertiajs/react';

interface AkikCardProps {
  image: string;
  title: string;
  subtitle?: string;
  price: number;
  priceUsd: number;
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
  priceUsd,
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
      className="bg-gradient-to-b from-[#F6C44B] from-55% to-white to-75% rounded-xl shadow p-2 flex flex-col gap-1 w-full min-h-[320px] max-h-[400px] cursor-pointer hover:shadow-lg transition"
      onClick={() => id && router.visit(`/product/${id}`)}
    >
      <div className="relative h-[60%]">
        <img src={`storage/${image}`} alt={title} className="bg-black rounded-lg w-full h-full object-cover shadow-xl" />
        {(type || stock == 0) && <span className="absolute top-0 right-0 bg-[#F3C624] text-black text-sm md:text-base font-bold px-2 py-1 rounded-bl rounded-tr-lg">{stock == 0 ? "Out Of Stock" : type}</span>}
      </div>
      <div className="flex-1 flex flex-col gap-1 justify-between my-2 font-['Roboto']">
        <div className='flex flex-col gap-1'>
          <div className="font-bold text-sm md:text-xl text-black font-['Outfit']">{title}</div>
          {subtitle && <div className="text-xs text-green-700">({subtitle})</div>}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {isLimited && <span className="text-black flex gap-1 align-center"><Icon iconNode={ShoppingBag} className="size-4 opacity-80 group-hover:opacity-100" /> {isLimited ? "Limited Edition" : stock}</span>}
            <span className="text-black flex gap-1 align-center"><Icon iconNode={Eye} className="size-4 opacity-80 group-hover:opacity-100" /> {views}</span>
          </div>
        </div>
        {/* <div className="text-xs text-green-700">({mineral})</div> */}
        <div>
          {negotiable && <div className="text-xs md:text-sm text-black font-bold">Negotiable</div>}
          <div className="text-base md:text-lg font-bold text-red-600">Rp. {price.toLocaleString()}</div>
          {priceUsd && <div className="text-sm md:text-base font-bold text-red-600">$ {priceUsd.toLocaleString()}</div>}
        </div>
      </div>
    </div>
  );
} 
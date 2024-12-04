"use client";

import React from 'react';
import { categories } from '@/data/vocabulary';
import { useRouter } from 'next/navigation';

export default function CategorySelector() {
  const router = useRouter();

  const onSelectCategory = (category: string) => {
    router.push(`/test-vocab?category=${category}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className='bg-gradient-to-b from-slate-100 to-gray-200 p-8 rounded-lg'>
        <h2 className="text-2xl font-extrabold mb-8 text-gray-800">เลือกหมวดหมู่คำศัพท์</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-95 active:bg-blue-700 focus:outline-none"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

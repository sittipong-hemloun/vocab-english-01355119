"use client";

import React from "react";
import { categories } from "@/data/vocabulary";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CategorySelector() {
  const router = useRouter();

  const onSelectCategory = (category: string) => {
    router.push(`/test-vocab?category=${category}`);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-xl border bg-gradient-to-b from-blue-50 to-indigo-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Select a Vocabulary Category
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-95 active:bg-yellow-600 focus:outline-none relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{category}</span>
              {/* Add decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 opacity-30 blur-xl z-0"></div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import CategorySelector from '@/components/CategorySelector';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="container mx-auto text-center relative z-10">
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Vocabulary Test
      </motion.h1>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
      >
        <CategorySelector />
      </motion.div>

      {/* GitHub Link */}
      <motion.a
        href="https://github.com/sittipong-hemloun/vocab-english-01355119"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 text-lg font-semibold text-gray-400 hover:text-gray-300 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
      >
        Visit my GitHub
      </motion.a>
    </div>
  );
}

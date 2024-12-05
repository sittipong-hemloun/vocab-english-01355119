"use client";

import CategorySelector from '@/components/CategorySelector';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import PromptPayImg from '@/public/promptpay.jpg';

export default function Home() {
  const [showDonationQR, setShowDonationQR] = useState(false);

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

      <motion.p
        className="text-lg font-medium text-gray-300 mb-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        For practicing English vocabulary in Essential English Reading Skills (01355119)
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
      >
        <CategorySelector />
      </motion.div>

      {/* Donation Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
      >
        <button
          onClick={() => setShowDonationQR(!showDonationQR)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center mx-auto space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Support me with a coffee</span>
        </button>

        {showDonationQR && (
          <motion.div
            className="mt-4 bg-white p-4 rounded-lg shadow-lg inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
              <Image
                src={PromptPayImg}
                alt="PromptPay QR Code"
                width={256}
                height={256}
                className="object-contain mx-auto rounded-lg"
              />
              <div className="mt-2">
                <p className="text-gray-800 font-semibold">09835677789</p>
                <p className="text-gray-800 font-semibold">สิทธิพงค์ เหมล้วน</p>
              </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
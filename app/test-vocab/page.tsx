'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import VocabTest from '@/components/VocabTest'

function SearchVocab() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  console.log('Category:', category)
  return <VocabTest category={category} />
}

export default function TestVocab() {
  const router = useRouter()

  const handleGoBack = () => {
    router.push('/') // นำผู้ใช้กลับไปยังหน้าหลัก
  }

  return (
    <div>
      {/* ปุ่มย้อนกลับ */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300 z-50"
      >
        ⬅️ Back to Home
      </button>
      <div className='min-h-screen flex items-center justify-center relative'>
        <Suspense>
          <div className='max-w-md mx-auto px-4'>
            <SearchVocab />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

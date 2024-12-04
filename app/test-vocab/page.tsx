'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import VocabTest from '@/components/VocabTest'

function SearchVocab() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  console.log('Category:', category)
  return (
    <VocabTest category={category} />
  )
}

export default function TestVocab() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Suspense>
        <div className='max-w-md mx-auto px-2'>
        <SearchVocab />
        </div>
      </Suspense>
    </div>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'

import VocabTest from '@/components/VocabTest'
import React from 'react'

export default function TestVocab() {


  const searchParams = useSearchParams()

  const category = searchParams.get('category')
  console.log('Category:', category)

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <VocabTest category={category} />
    </div>
  )
}

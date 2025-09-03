import Colors from '@/components/Brand/Colors'
import Logo from '@/components/Brand/Logo'
import Naming from '@/components/Brand/Naming'
import Screenshots from '@/components/Brand/Screenshots'
import Sidebar from '@/components/Brand/Sidebar'
import WordMark from '@/components/Brand/WordMark'
import React from 'react'

const page = () => {
  return (
    <div className='grid-section relative overflow-clip px-4 border-grid-border [.grid-section_~_&]:border-t-0 border-y border-t-0'>
        <div className="relative z-0 mx-auto max-w-[1200px] border-grid-border border-x grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)]">
            <Sidebar />
            <div className='divide-y divide-grid-border text-center'>
                <Naming />
                <WordMark />
                <Logo />
                <Colors />
                <Screenshots />
            </div>
        </div>
      
    </div>
  )
}

export default page

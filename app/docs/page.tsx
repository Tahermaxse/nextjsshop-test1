import Figma from '@/app/docs/Docs/Figma'
import FolderStrutre from '@/app/docs/Docs/ForlderStutured'
import GetStarted from '@/app/docs/Docs/GetStarted'
import Sidebar from '@/app/docs/Docs/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='grid-section relative overflow-clip px-4 border-grid-border [.grid-section_~_&]:border-t-0 border-y border-t-0'>
        <div className="relative z-0 mx-auto max-w-[1200px] border-grid-border border-x grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)]">
           <Sidebar />
            <div className='divide-y divide-grid-border text-center'>
              <GetStarted />
              <FolderStrutre />
              <Figma />
            </div>
        </div>
      
    </div>
  )
}

export default page

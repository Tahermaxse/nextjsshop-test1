import React from 'react'
import { Breadcrumb06 } from './breadcrumb'

const Demo06 = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-5 bg-inherit dark:bg-zinc-950'>
      <Breadcrumb06
      locations={[
        { name: "United States", href: "#" },
        { name: "California", href: "#" },
        { name: "San Francisco", href: "#", current: true },
      ]}
      />
    </div>
  )
}

export default Demo06

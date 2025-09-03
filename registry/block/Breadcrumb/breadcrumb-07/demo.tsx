import React from 'react'
import { Breadcrumb07 } from './breadcrumb'

const Demo07 = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-5 bg-inherit dark:bg-zinc-950'>
      <Breadcrumb07
        tags={[
            { name: "design", href: "#", count: 128 },
            { name: "ui", href: "#", count: 86 },
            { name: "ux", href: "#", count: 54 },
            { name: "inspiration", href: "#", count: 32 },
          ]}
      />
    </div>
  )
}

export default Demo07

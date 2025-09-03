import React from 'react'
import { Breadcrumb04 } from './breadcrumb'

const Demo04 = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4 bg-inherit dark:bg-zinc-950'>
      <Breadcrumb04
       filters={[
        { id: "category", name: "Category", value: "Electronics" },
        { id: "price", name: "Price", value: "$100-$200" },
        { id: "color", name: "Color", value: "Black" },
      ]}
      />
    </div>
  )
}

export default Demo04

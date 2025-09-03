import React from 'react'
import { Breadcrumb08 } from './breadcrumb'

const Demo08 = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-5 bg-inherit dark:bg-zinc-950'>
      <Breadcrumb08
        items={[
            {
              label: "Products",
              href: "#",
              children: [
                { label: "Electronics", href: "#" },
                { label: "Clothing", href: "#" },
                { label: "Home & Garden", href: "#" },
              ],
            },
            {
              label: "Electronics",
              href: "#",
              children: [
                { label: "Smartphones", href: "#" },
                { label: "Laptops", href: "#" },
                { label: "Accessories", href: "#" },
              ],
            },
            {
              label: "Smartphones",
              current: true,
            },
          ]}
      />
    </div>
  )
}

export default Demo08

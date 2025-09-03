import React from 'react'
import { Breadcrumb05 } from './breadcrumb'

const Demo05 = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-5 bg-inherit dark:bg-zinc-950'>
      <Breadcrumb05
        steps={[
            { id: "01", name: "Cart", status: "complete" },
            { id: "02", name: "Shipping", status: "current" },
            { id: "03", name: "Payment", status: "upcoming" },
            { id: "04", name: "Confirmation", status: "upcoming" },
          ]}
      />
    </div>
  )
}

export default Demo05

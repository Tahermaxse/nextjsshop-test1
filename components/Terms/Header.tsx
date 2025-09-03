import React from 'react'

const Header = ({ title }: { title: string }) => {
    return (
        <div className="grid-section relative overflow-clip px-4 border-grid-border [.grid-section_~_&]:border-t-0 border-b">
            <div className="relative z-0 mx-auto max-w-grid-width border-grid-border">
                <div className="pointer-events-none absolute inset-0 border-x border-grid-border [mask-image:linear-gradient(transparent,black)]" />
                <div className="relative mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
                    <h1 className="mt-5 text-center font-display text-4xl font-medium text-neutral-900 dark:text-neutral-100 sm:text-5xl sm:leading-[1.15]">
                        {title}
                    </h1>
                </div>
            </div>
        </div>

    )
}

export default Header

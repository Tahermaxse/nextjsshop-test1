import React from "react";
import Link from "next/link";
import { BiRightArrow } from "react-icons/bi";
import { ChevronRight } from "lucide-react";

const items = [
  {
		id: 1,
		name: 'Accordion',
		href: '/components/free/accordion',
		imageLight:
			'/blocks/Accordion-light.png',
		imageDark:
			'/blocks/Accordion-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 2,
		name: 'Auth Card',
		href: '/components/free/authcard',
		imageLight:
			'/blocks/Authcard-light.png',
		imageDark:
			'/blocks/Authcard-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 3,
		name: 'Breadcrumb',
		href: '/components/free/breadcrumb',
		imageLight:
			'/blocks/Breadcrumb-light.png',
		imageDark:
			'/blocks/Breadcrumb-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 4,
		name: 'Button',
		href: '/components/free/button',
		imageLight:
			'/blocks/Button-light.png',
		imageDark:
			'/blocks/Button-dark.png',
		componentsCount: '08 Components',
	},
	{
		id: 5,
		name: 'Command Menu',
		href: '/components/free/commandmenu',
		imageLight:
			'/blocks/Commandmenu-light.png',
		imageDark:
			'/blocks/Commandmenu-dark.png',
		componentsCount: '02 Components',
	},
	{
		id: 6,
		name: 'Date Picker',
		href: '/components/free/datepicker',
		imageLight:"/blocks/Datepicker-light.png",
		imageDark:"/blocks/Datepicker-dark.png",
		componentsCount: '03 Components',
	},
	{
		id: 7,
		name: 'Dailog',
		href: '/components/free/dialog',
		imageLight:"/blocks/Dialog-light.png",
		imageDark:"/blocks/Dialog-dark.png",
		componentsCount: '09 Components',
	},
	{
		id: 8,
		name: 'Drawer',
		href: '/components/free/drawer',
		imageLight:"/blocks/Drawer-light.png",
		imageDark:"/blocks/Drawer-dark.png",
		componentsCount: '04 Components',
	},
  // Add more items as needed
];

const Blocks = () => {
  return (
    <div className="container mx-auto max-w-[1200px]">
      <div className="w-full px-4 py-8 sm:py-10 md:py-12 lg:py-16 xl:pb-20 bg-background">
        <div className="container max-w-[1200px] mx-auto space-y-8">
          <div className="space-y-4 max-w-3xl">
            <p className="text-md sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Free Blocks
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold tracking-tight text-foreground">
              Beautiful UI components built with{" "}
              <span className="text-primary">Tailwind CSS</span> and{" "}
              <span className="text-primary">React</span>.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
              A collection of copy-and-paste components for quickly building
              application UIs.
            </p>
          </div>
        </div>

        {/* Components grid with blur mask effect */}
        <div className="relative my-16">
          {/* Components grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="space-y-3 text-center">
                <Link
                  className="peer inline-flex overflow-hidden rounded-lg border border-border dark:border-zinc-700/80 sm:flex"
                  href={item.href}
                >
                  <img
                    alt={`${item.name} components`}
                    loading="lazy"
                    width="268"
                    height="198"
                    decoding="async"
                    data-nimg="1"
                    className="w-full dark:hidden"
                    srcSet={`${item.imageLight} 1x, ${item.imageLight} 2x`}
                    src={item.imageLight}
                    style={{ color: "transparent" }}
                  />

                  <img
                    alt={`${item.name} components dark`}
                    loading="lazy"
                    width="268"
                    height="198"
                    decoding="async"
                    data-nimg="1"
                    className="hidden w-full dark:block"
                    srcSet={`${item.imageDark} 1x, ${item.imageDark} 2x`}
                    src={item.imageDark}
                    style={{ color: "transparent" }}
                  />
                </Link>
                <div className="mb-0.5 peer-hover:[&_a]:underline">
                  <h2>
                    <Link
                      className="text-sm font-medium hover:underline"
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </h2>
                  <p className="text-[13px] text-muted-foreground">
                    {item.componentsCount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Blur mask and button overlay - positioned to cover just the bottom portion of the grid */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end">
            {/* Gradient blur mask - covering approximately the bottom row of cards */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent"></div>

            {/* Button - positioned above the gradient but still within the card area */}
            <Link
              href="/components/free"
              className="relative z-10 mb-6 mx-auto block w-fit"
            >
              <div className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 flex rounded-lg items-center gap-1 sm:gap-2 from-zinc-700 to-zinc-600 text-zinc-50 
  bg-gradient-to-t border border-b-2 border-zinc-950/40 shadow-md shadow-zinc-950/20 
  ring-1 ring-inset ring-white/25 
  transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.05)] 
  dark:border-x-0 dark:border-t-0 dark:border-zinc-950/50  dark:ring-white/5 dark:from-zinc-800 dark:to-zinc-700">
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  Browse All - Components & Blocks
                </span>
                <ChevronRight className="ml-0.5 sm:ml-1 hidden xs:inline" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blocks;

import Link from "next/link";
import React from "react";

interface HeaderProps {
  name: string;
}
const Header = ({ name }: HeaderProps) => {
  return (
    <div className="overflow-x-hidden">
      <div className="container max-w-[1200px] mx-auto ">
        <div className="mb-3 dark:text-white flex items-center gap-1.5 text-[0.875rem] leading-[1.25rem] tracking-[-0.006em] font-normal text-gray-500 xl:mb-4 xl:gap-2.5 xl:text-[1rem] xl:leading-[1.5rem] xl:tracking-[-0.011em]">
          <Link href="/components/free">Free</Link>
          <div>/</div>
          <div className="font-medium text-gray-700 dark:text-white">{name}</div>
        </div>
        <h1 className="dark:text-white text-[34px]/[40px] font-550 -tracking-[0.02em] text-gray-900 xl:text-[36px]/[44px] xl:-tracking-[0.015em]">
          {name}
        </h1>
        <div className="-mx-6 mb-8 mt-11 flex h-1 items-center opacity-80 md:mx-0 md:mb-12 md:mt-14 xl:-mx-8">
          <div className="h-px w-full bg-gray-200 dark:bg-[#222125]"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;

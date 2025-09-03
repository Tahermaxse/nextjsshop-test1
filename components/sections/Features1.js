import React from "react";

const Features1 = () => {
  return (
    <div>
      <div className="container mb-[72px] mt-10 md:my-24 max-w-[1200px] mx-auto">
        <div className="relative flex flex-col justify-center gap-6 md:flex-row md:py-7 xl:gap-8 before:absolute before:left-0 before:top-0 before:hidden before:h-px before:w-full before:bg-gray-200 md:before:block after:absolute after:bottom-0 after:left-0 after:hidden after:h-px after:w-full after:bg-gray-200 md:after:block">
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -top-1 -left-px hidden md:block"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -right-px -top-1 hidden md:block"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -bottom-1 -left-px hidden md:block"
          />
          <img
            src="https://alignui.com/images/landing/dot.png"
            width={9}
            height={9}
            alt=""
            className="absolute z-30 min-h-[9px] min-w-[9px] -bottom-1 -right-px hidden md:block"
          />
          <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 shrink-0 text-purple-600"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 10 5.5 5.5m6.5-.25v-2.5A9.25 9.25 0 1 1 3.657 8m11.093 4a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 0 1 5.5 0"
              />
            </svg>
            <div className="md:mt-4">
              <div className="text-[16px] leading-[24px] tracking-[-0.01em] font-medium text-gray-800">
                10X Faster Development
              </div>
              <div className="mt-1 text-[14px] leading-[20px] tracking-[-0.006em] text-gray-600 md:max-w-64">
                Speed up your development with ready-to-use components
              </div>
            </div>
          </div>
          <div className="hidden w-px bg-gray-200 md:block" />
          <div
            className="h-px w-full text-gray-300 md:hidden"
            style={{
              background:
                "linear-gradient(90deg, currentcolor 4px, transparent 4px) 50% 50% / 8px 1px repeat-x",
            }}
          />
          <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 shrink-0 text-green-600"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 9.5 10.5 15l-2-2m12.75-1a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0"
              />
            </svg>
            <div className="md:mt-4">
              <div className="text-[16px] leading-[24px] tracking-[-0.01em] font-medium text-gray-800">
                Pre-built Templates
              </div>
              <div className="mt-1 text-[14px] leading-[20px] tracking-[-0.006em] text-gray-600 md:max-w-64">
                Kickstart your project with sector-specific designs.
              </div>
            </div>
          </div>
          <div className="hidden w-px bg-gray-200 md:block" />
          <div
            className="h-px w-full text-gray-300 md:hidden"
            style={{
              background:
                "linear-gradient(90deg, currentcolor 4px, transparent 4px) 50% 50% / 8px 1px repeat-x",
            }}
          />
          <div className="flex flex-1 items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 shrink-0 text-[rgb(251,107,35)]"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8.25 3.75h-1.5a2 2 0 0 0-2 2V10a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4.25a2 2 0 0 0 2 2h1.5m7.5-16.5h1.5a2 2 0 0 1 2 2V10a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4.25a2 2 0 0 1-2 2h-1.5"
              />
            </svg>
            <div className="md:mt-4">
              <div className="text-[16px] leading-[24px] tracking-[-0.01em] font-medium text-gray-800">
                30% Less Code
              </div>
              <div className="mt-1 text-[14px] leading-[20px] tracking-[-0.006em] text-gray-600 md:max-w-64">
                Create cleaner, more maintainable projects effortlessly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features1;

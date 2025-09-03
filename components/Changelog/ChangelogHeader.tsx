import React from "react";

const ChangelogHeader = () => {
  return (
    <section className="grow relative">
      <div className="px-6 lg:px-16 [&:has(.full-content-width)]:px-0 md:whitespace-pre-wrap hide-breaks md:show-breaks max-w-content mx-auto relative z-[1]">
        <div className="flex justify-center">
          <div className="w-screen shrink-0">
            <div className="max-w-[calc(1208px+((100vw-1208px)/2))] ml-auto pl-6 md:pl-9 items-end flex lg:gap-4 xl:gap-16 flex-col-reverse md:flex-row md:h-[281px]">
              <div className="flex flex-col gap-3 py-8 w-full md:w-auto md:shrink-0">
                <div
                  className="flex gap-2 items-center text-medium-plus text-ui-fg-base dark:text-zinc-100"
                  style={{
                    opacity: 1,
                    filter: "blur(0px)",
                    willChange: "auto",
                    transform: "none",
                  }}
                >
                  <img
                    alt="icon"
                    width={16}
                    height={16}
                    className="w-4 h-4 dark:invert"
                    src="https://medusajs.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2FTimelineIcon.34cb4d16.png&w=32&q=75"
                    style={{ color: "transparent" }}
                  />
                  <p className="dark:text-zinc-100">Changelog</p>
                </div>
                <h1 className="text-ui-fg-base dark:text-zinc-100 text-headers-h3 show-breaks">
                  <span
                    className="inline-block"
                    style={{
                      opacity: 1,
                      filter: "blur(0px)",
                      willChange: "auto",
                      transform: "none",
                    }}
                  >
                    New updates&nbsp;
                  </span>
                  <br />
                  <span
                    className="inline-block"
                    style={{
                      opacity: 1,
                      filter: "blur(0px)",
                      willChange: "auto",
                      transform: "none",
                    }}
                  >
                    and improvements&nbsp;
                  </span>
                </h1>
              </div>
              <div className="w-screen flex flex-col justify-end h-[290px] md:w-auto md:h-full grow">
                <div
                  className="h-full"
                  style={{
                    opacity: 1,
                    filter: "blur(0px)",
                    willChange: "auto",
                    transform: "none",
                  }}
                >
                  <img
                    alt="hero image"
                    width={1150}
                    height={480}
                    sizes="894px"
                    className="md:hidden h-full object-cover object-left-bottom"
                    src="/images/changelog/changelog-head.png"
                    style={{ color: "transparent" }}
                  />
                  <img
                    alt="hero image"
                    width={894}
                    height={281}
                    className="hidden md:block h-full object-left-bottom"
                    sizes="894px"
                    src="/images/changelog/changelog-head.png"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="border-t border-theme-border-base dark:border-zinc-800 w-full h-[2px] bg-white dark:bg-zinc-900 md:hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-theme-border-base dark:border-zinc-800 w-full h-[2px] bg-white dark:bg-zinc-900 absolute bottom-0 z-[1]" />
    </section>
  );
};

export default ChangelogHeader;

import Header from "@/components/Contact/Header";
import React from "react";

const page = () => {
  return (
    <>
    <Header title="About Us" description="Learn more about our mission, values, and the team behind Nextjsshop."/>
    <div className="grid-section relative overflow-clip px-4 border-grid-border [.grid-section_~_&]:border-t-0 border-y">
  <div className="relative z-0 mx-auto max-w-[1200px] border-grid-border border-x py-28 px-2.5 text-lg lg:px-20">
    <div className="absolute inset-x-4 bottom-8 top-4 sm:inset-x-16 sm:top-16">
      <svg
        className="pointer-events-none absolute inset-0 text-neutral-200/80 dark:invert"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="dots-:S1:"
            x={-1}
            y={-1}
            width={12}
            height={12}
            patternUnits="userSpaceOnUse"
          >
            <rect x={1} y={1} width={2} height={2} fill="currentColor" />
          </pattern>
        </defs>
        <rect fill="url(#dots-:S1:)" width="100%" height="100%" />
      </svg>
    </div>
    <div className="relative">
      <div className="mx-auto w-full max-w-xl px-4 text-center">
        <h2 className="text-balance font-display text-3xl font-medium text-neutral-900 dark:text-zinc-300 sm:text-4xl">
          What is Nextjsshop?
        </h2>
        <div className="prose mt-8 text-balance text-lg text-neutral-700 [&_a]:text-neutral-700 [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-2 [&_a]:hover:text-neutral-900">
          <p>
            Nextjsshop is a modern UI template and component marketplace,
            designed to empower developers and designers to build faster,
            cleaner, and more flexible frontends.
          </p>
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center px-4 text-center">
        <button
  className="not-prose group relative mx-auto block w-full max-w-screen-md overflow-hidden rounded-lg bg-neutral-100"
  style={{ aspectRatio: "1280 / 720" }}
>
  <img
    alt="Nextjsshop Home Page"
    loading="lazy"
    decoding="async"
    data-nimg="fill"
    className="blur-0 object-cover"
    src="https://ik.imagekit.io/nextjsshop/Docs/Step_1_Template.png?updatedAt=1752678895269"
    style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      inset: 0,
      color: "transparent"
    }}
  />
  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent sm:h-32" />
</button>

        <h3 className="mt-14 max-w-[600px] text-pretty font-display text-3xl font-medium dark:text-zinc-300 text-neutral-900">
          We're on a mission to simplify frontend development for everyone.
        </h3>
        <div className="mt-6 max-w-lg space-y-6 text-pretty text-base text-neutral-500">
          <p>
            We offer production-ready, customizable components that fit seamlessly
            into any project. Say goodbye to scattered design files and
            repetitive boilerplate. With Nextjsshop, you can plug in beautifully
            crafted UI and focus on what truly matters building.
          </p>
          <p>
            Whether you're working in light mode, dark mode, minimal, or bold
            Nextjsshop gives you the freedom to build your way.
          </p>
          <p>
            Handling high-paying clients? Use our templates and components,
            tailor them to your project, and deliver faster without
            compromising on quality or creativity.
          </p>
          <p>
            Build smart. Deliver fast. Then enjoy your weekend. ✨
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
};

export default page;

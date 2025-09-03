"use client";
import Product from "@/components/ui/Product";
import AvatarCircles from "@/components/ui/avatar-circles";
import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiShadcnui, SiTypescript, SiZod } from "react-icons/si";
const avatars = [
  {
    imageUrl: "https://ik.imagekit.io/nextjsshop/startups-logo/1.webp",
  },
  {
    imageUrl: "https://ik.imagekit.io/nextjsshop/startups-logo/2.webp",
  },
  {
    imageUrl: "https://ik.imagekit.io/nextjsshop/startups-logo/3.webp",
  },
  {
    imageUrl: "https://ik.imagekit.io/nextjsshop/startups-logo/4.webp",
  },
  {
    imageUrl: "https://ik.imagekit.io/nextjsshop/startups-logo/5.webp",
  },
  {
    imageUrl: "https://ik.imagekit.io/nextjsshop/startups-logo/6.webp",
  },
];

const links = [
  {
    href: "https://react.dev/",
    className: "text-sky-300",
    svg: <FaReact className="w-8 h-8 fill-current" />,
  },
  {
    href: "https://nextjs.org/",
    className: "text-black transition dark:text-white",
    svg: <RiNextjsFill className="w-8 h-8 fill-current" />,
  },
  {
    href: "https://tailwindcss.com/",
    className: "text-sky-500",
    svg: <RiTailwindCssFill className="w-8 h-8 fill-current" />,
  },
  {
    href: "https://tailwindcss.com/",
    className: "text-black  dark:text-white",
    svg: <SiShadcnui className="w-7 h-7 fill-current" />,
  },
  {
    href: "https://typescriptlang.org/",
    className: "text-[#3178c6]",
    svg: <SiTypescript className="w-8 h-8 fill-current" />,
  },
  {
    href: "https://tanstack.com/",
    className: "text-sky-500",
    svg: <img src="/images/tanstack.png" className="w-8 h-8 fill-current" alt="Tanstack Logo" />,
  },
  {
    href: "https://zod.dev/",
    className: "text-sky-500",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 fill-current"
        width="200"
        height="200"
        viewBox="0 0 256 203"
      >
        <defs>
          <filter
            id="logosZod0"
            width="105.2%"
            height="106.5%"
            x="-2.2%"
            y="-2.8%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="1"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
              stdDeviation="2"
            />
            <feColorMatrix
              in="shadowBlurOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0"
            />
          </filter>
          <path
            id="logosZod1"
            fill="#000"
            d="M200.42 0H53.63L0 53.355l121.76 146.624l9.714-10.9L252 53.857L200.42 0Zm-5.362 12.562l39.84 41.6l-112.8 126.558L17 54.162l41.815-41.6h136.243Z"
          />
        </defs>
        <g transform="translate(2 1.51)">
          <path
            fill="#18253F"
            d="M58.816 12.522h136.278l39.933 41.691l-112.989 126.553L16.957 54.213z"
          />
          <path
            fill="#274D82"
            d="M149.427 150.875H96.013l-24.124-29.534l68.364-.002l.002-4.19h39.078z"
          />
          <path
            fill="#274D82"
            d="M223.56 42.323L76.178 127.414l-19.226-24.052l114.099-65.877l-2.096-3.631l30.391-17.546zm-78.964-29.759L33.93 76.457L16.719 54.972l74.095-42.779z"
          />
          <use filter="url(#logosZod0)" href="#logosZod1" />
          <use fill="#3068B7" href="#logosZod1" />
        </g>
      </svg>
    ),
  },
];
const Hero = () => {
  return (
    <div className="relative xl:gap-10 mt-12 md:mb-20 max-w-[1200px] mx-auto text-left p-5 ">
      <div>
        <span className="text-xs flex gap-1 px-4 border border-green-300 w-fit py-2 rounded-full my-2 bg-gradient-to-tr from-white via-white to-green-50 text-green-500 mb-5 cursor-pointer dark:bg-gradient-to-tr dark:from-gray-800 dark:via-gray-900 dark:to-green-900 dark:text-green-300 dark:border-green-700">
          <span className="text-green-300 dark:text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          The most extensive and varied library of components available.
        </span>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="items-center divide-x-[1px] cursor-pointer w-fit border rounded-xl block md:hidden"
        >
          <svg
            width={250}
            height={54}
            viewBox="0 0 250 54"
            className="grayscale"
          >
            <g transform="translate(-130.000000, -73.000000)">
              <g transform="translate(130.000000, 73.000000)">
                <text
                  fontFamily="Helvetica-Bold, Helvetica"
                  fontSize={9}
                  fontWeight="bold"
                  fill="#4B587C"
                >
                  <tspan x={53} y={20}>
                    PRODUCT HUNT
                  </tspan>
                </text>
                <text
                  fontFamily="Helvetica-Bold, Helvetica"
                  fontSize={16}
                  fontWeight="bold"
                  fill="#4B587C"
                >
                  <tspan x={52} y={40}>
                    #? Product of the Day
                  </tspan>
                </text>
                <g transform="translate(17.000000, 13.000000)">
                  <path
                    d="M4.33,16.364 L0.328,24.9 C0.202,25.158 0.335,25.32 0.755,25.24 L4.013,24.532 C4.07755234,24.5094173 4.14861896,24.5149617 4.20888789,24.5472826 C4.26915683,24.5796035 4.31309537,24.6357337 4.33,24.702 L5.797,27.709 C5.937,28.033 6.099,28.099 6.225,27.842 L10.485,18.908 L4.33,16.364 Z M16.67,16.364 L20.672,24.9 C20.805,25.158 20.665,25.32 20.245,25.24 L16.987,24.532 C16.9224353,24.5100506 16.8516562,24.5158869 16.7915589,24.5481157 C16.7314616,24.5803445 16.687439,24.6360738 16.67,24.702 L15.203,27.709 C15.063,28.033 14.908,28.099 14.775,27.842 L10.515,18.908 L16.67,16.364 Z"
                    fill="#DE7818"
                    fillRule="nonzero"
                  />
                  <path
                    d="M9.298,21.392 C9.298,21.399 9.284,21.392 9.269,21.392 C7.03578049,21.1442528 4.94208026,20.1826237 3.299,18.65 C3.291,18.642 3.269,18.635 3.276,18.627 L3.46,18.237 C3.468,18.222 3.482,18.259 3.49,18.267 C5.067,19.733 7.257,20.655 9.497,20.927 C9.505,20.927 9.52,20.927 9.52,20.935 L9.298,21.392 Z"
                    fill="#B35454"
                  />
                  <circle fill="#9B9B9B" cx="10.5" cy="10.489" r="10.489" />
                  <circle fill="#949494" cx="10.5" cy="10.489" r="9.045" />
                  <circle fill="#B6B6B6" cx="10.75" cy="10.75" r="8.75" />
                  {/* <path
                    d="M7.19,9.018 L7.19,9.054 L9.159,9.054 L9.159,9.013 C9.159,8.315 9.663,7.823 10.389,7.823 C11.086,7.823 11.544,8.239 11.544,8.86 C11.544,9.358 11.227,9.786 9.984,10.934 L7.314,13.448 L7.314,14.884 L13.741,14.884 L13.741,13.208 L10.178,13.208 L10.178,13.097 L11.573,11.813 C13.073,10.477 13.623,9.645 13.623,8.708 C13.623,7.214 12.358,6.2 10.465,6.2 C8.503,6.2 7.19,7.337 7.19,9.018 Z"
                    fill="#EFEFEF"
                  /> */}
                  <path
                    d="M12.97,3.089 C16.3260745,3.89113363 18.7213186,6.85251327 18.8041673,10.3021205 C18.8870161,13.7517278 16.6366978,16.8246793 13.323,17.787 C15.358,16.232 16.707,13.578 16.707,10.563 C16.707,7.379 15.203,4.6 12.969,3.089 L12.97,3.089 Z"
                    fillOpacity="0.2"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M11.702,21.392 C11.709,21.399 11.724,21.392 11.731,21.392 C14.024,21.104 16.131,20.182 17.717,18.664 C17.724,18.657 17.746,18.65 17.739,18.642 L17.554,18.252 C17.547,18.237 17.532,18.274 17.524,18.281 C15.947,19.748 13.751,20.655 11.503,20.927 C11.495,20.927 11.48,20.927 11.48,20.935 L11.702,21.392 Z"
                    fill="#B35454"
                  />
                </g>
              </g>
            </g>
          </svg>
          <svg
            width={250}
            height={54}
            viewBox="0 0 250 54"
            className="pl-5 grayscale hidden md:block"
          >
            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
              <g transform="translate(-130.000000, -73.000000)">
                <g transform="translate(130.000000, 73.000000)">
                  <text
                    fontFamily="Helvetica-Bold, Helvetica"
                    fontSize={9}
                    fontWeight="bold"
                    fill="#4B587C"
                  >
                    <tspan x={53} y={20}>
                      #3 PRODUCT OF THE WEEK
                    </tspan>
                  </text>
                  <text
                    fontFamily="Helvetica-Bold, Helvetica"
                    fontSize={16}
                    fontWeight="bold"
                    fill="#4B587C"
                  >
                    <tspan x={52} y={40}>
                      Developer Tools
                    </tspan>
                  </text>
                  false
                  <g transform="translate(11.000000, 12.000000)">
                    <path
                      d="M31,15.5 C31,24.0603917 24.0603917,31 15.5,31 C6.93960833,31 0,24.0603917 0,15.5 C0,6.93960833 6.93960833,0 15.5,0 C24.0603917,0 31,6.93960833 31,15.5"
                      fill="#4B587C"
                    />
                    <path
                      d="M17.4329412,15.9558824 L17.4329412,15.9560115 L13.0929412,15.9560115 L13.0929412,11.3060115 L17.4329412,11.3060115 L17.4329412,11.3058824 C18.7018806,11.3058824 19.7305882,12.3468365 19.7305882,13.6308824 C19.7305882,14.9149282 18.7018806,15.9558824 17.4329412,15.9558824 M17.4329412,8.20588235 L17.4329412,8.20601152 L10.0294118,8.20588235 L10.0294118,23.7058824 L13.0929412,23.7058824 L13.0929412,19.0560115 L17.4329412,19.0560115 L17.4329412,19.0558824 C20.3938424,19.0558824 22.7941176,16.6270324 22.7941176,13.6308824 C22.7941176,10.6347324 20.3938424,8.20588235 17.4329412,8.20588235"
                      fill="#FFFFFF"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </a>
        <div className="grid md:grid-cols-2 items-start">
          <div>
            <h1 className="text-5xl pb-8 md:pb-3 leading-3 md:leading-none overflow-visible md:text-8xl font-bold text-transparent bg-clip-text bg-[radial-gradient(circle_at_0_0,_#d1ffbc,_#0ae448_50%,_#0ae448_100%)]">
              Design
              <img
                src="svgs/eye.svg"
                alt="eye"
                className="ml-2 h-20 w-20 inline-block relative"
              />
              Made Easy.
            </h1>
            <Product />
          </div>
          <div>
            <h1 className="text-2xl font-mono max-w-2xl text-gray-500 dark:text-zinc-400">
              We design exceptional, user-friendly components and templates,
              ensuring they&apos;re built with the best technologies.
            </h1>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-5 py-2 my-5">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link.className}
                  >
                    {link.svg}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <Link href="/templates">
              <button className="button after:border-green-500 group relative inline-block cursor-pointer overflow-hidden rounded-lg px-10 py-3 font-bold text-lg text-green-500   after:absolute after:inset-0 after:rounded-lg after:border capitalize bg-green-200 text-black shadow-button-gray  disabled:bg-green-25 disabled:text-green-300 disabled:shadow-none dark:bg-green-800 dark:text-white dark:hover:bg-green-700 dark:disabled:bg-green-700 dark:disabled:text-green-500">
                Get Started
              </button>
              </Link>
            </div>
            <div className="flex items-center my-5 max-w-fit cursor-pointer">
              <div className="flex items-center">
                <AvatarCircles numPeople={99} avatarUrls={avatars} />
              </div>
              <div className="ml-2">
                <svg
                  width={100}
                  height={20}
                  viewBox="0 0 100 20"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0001 14.3915L15.1501 17.4998L13.7834 11.6415L18.3334 7.69984L12.3417 7.1915L10.0001 1.6665L7.65841 7.1915L1.66675 7.69984L6.21675 11.6415L4.85008 17.4998L10.0001 14.3915Z"
                    fill="#FFA20D"
                  />
                  <path
                    d="M30.0001 14.3915L35.1501 17.4998L33.7834 11.6415L38.3334 7.69984L32.3417 7.1915L30.0001 1.6665L27.6584 7.1915L21.6667 7.69984L26.2167 11.6415L24.8501 17.4998L30.0001 14.3915Z"
                    fill="#FFA20D"
                  />
                  <path
                    d="M50.0001 14.3915L55.1501 17.4998L53.7834 11.6415L58.3334 7.69984L52.3417 7.1915L50.0001 1.6665L47.6584 7.1915L41.6667 7.69984L46.2167 11.6415L44.8501 17.4998L50.0001 14.3915Z"
                    fill="#FFA20D"
                  />
                  <path
                    d="M70.0001 14.3915L75.1501 17.4998L73.7834 11.6415L78.3334 7.69984L72.3417 7.1915L70.0001 1.6665L67.6584 7.1915L61.6667 7.69984L66.2167 11.6415L64.8501 17.4998L70.0001 14.3915Z"
                    fill="#FFA20D"
                  />
                  <path
                    d="M90.0001 14.3915L95.1501 17.4998L93.7834 11.6415L98.3334 7.69984L92.3417 7.1915L90.0001 1.6665L87.6584 7.1915L81.6667 7.69984L86.2167 11.6415L84.8501 17.4998L90.0001 14.3915Z"
                    fill="#FFA20D"
                  />
                </svg>
                <p className="text-xs text-left leading-[1.3] mt-1">
                  <b>965</b> Startups are launching faster
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl" />
    </div>
  );
};

export default Hero;

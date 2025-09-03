import Link from "next/link";
import React from "react";

interface CardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const cardData: CardProps[] = [
  {
    icon: (
      <svg
        width={18}
        height={18}
        className="size-10 dark:invert [&_*]:stroke-1"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.75 10.125C7.37132 10.125 7.875 9.62132 7.875 9C7.875 8.37868 7.37132 7.875 6.75 7.875C6.12868 7.875 5.625 8.37868 5.625 9C5.625 9.62132 6.12868 10.125 6.75 10.125Z"
          fill="black"
        />
        <path
          d="M11.25 10.125C11.8713 10.125 12.375 9.62132 12.375 9C12.375 8.37868 11.8713 7.875 11.25 7.875C10.6287 7.875 10.125 8.37868 10.125 9C10.125 9.62132 10.6287 10.125 11.25 10.125Z"
          fill="black"
        />
        <path
          d="M3.75 3.75L9 3.9L14.25 3.75L16.5 11.25L14.25 13.8H3.75L1.125 11.25L3.75 3.75Z"
          fill="black"
          fillOpacity="0.3"
        />
        <path
          d="M11.6247 13.125L12.3747 14.625C12.3747 14.625 15.5022 13.6275 16.4997 12C16.4997 11.25 16.8972 5.8875 14.2497 4.125C13.1247 3.375 11.2497 3 11.2497 3L10.4997 4.5H8.99968H7.49968L6.77218 3C6.77218 3 4.89718 3.375 3.77218 4.125C1.12468 5.8875 1.52218 11.25 1.52218 12C2.51968 13.6275 5.64718 14.625 5.64718 14.625L6.39718 13.125"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.125 12C7.875 13.875 10.125 13.875 13.875 12"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Community",
    description:
      "Join our developer community to connect, ask questions, and share ideas.",
    buttonText: "Join Community",
    buttonLink: "#",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        className="size-10 dark:invert [&_*]:stroke-1"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.3"
          d="M9 1.5C13.1422 1.5 16.5 4.85775 16.5 9C16.5 13.1422 13.1422 16.5 9 16.5H3C2.60218 16.5 2.22064 16.342 1.93934 16.0607C1.65804 15.7794 1.5 15.3978 1.5 15V9C1.5 4.85775 4.85775 1.5 9 1.5Z"
          fill="black"
        />
        <path
          d="M11.25 7.5H6.75C6.55884 7.50021 6.37498 7.57341 6.23597 7.70464C6.09697 7.83586 6.01332 8.01521 6.00212 8.20605C5.99092 8.39688 6.05301 8.58478 6.1757 8.73137C6.29839 8.87796 6.47243 8.97217 6.66225 8.99475L6.75 9H11.25C11.4412 8.99979 11.625 8.92659 11.764 8.79536C11.903 8.66414 11.9867 8.48479 11.9979 8.29395C12.0091 8.10312 11.947 7.91522 11.8243 7.76863C11.7016 7.62204 11.5276 7.52783 11.3377 7.50525L11.25 7.5ZM9 10.5H6.75C6.55109 10.5 6.36032 10.579 6.21967 10.7197C6.07902 10.8603 6 11.0511 6 11.25C6 11.4489 6.07902 11.6397 6.21967 11.7803C6.36032 11.921 6.55109 12 6.75 12H9C9.19891 12 9.38968 11.921 9.53033 11.7803C9.67098 11.6397 9.75 11.4489 9.75 11.25C9.75 11.0511 9.67098 10.8603 9.53033 10.7197C9.38968 10.579 9.19891 10.5 9 10.5Z"
          fill="black"
        />
      </svg>
    ),
    title: "Support",
    description:
      "Chat with us about product support, resolve billing questions, or provide feedback.",
    buttonText: "Get support",
    buttonLink: "/contact/support",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        className="size-10 dark:invert [&_*]:stroke-1"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.3"
          d="M9 3C5.6925 3 3 5.6925 3 9C3 12.3075 5.6925 15 9 15C12.3075 15 15 12.3075 15 9C15 5.6925 12.3075 3 9 3ZM9.75 13.5H8.25V12H9.75V13.5ZM9.75 11.25H8.25C8.25 8.8125 10.5 9 10.5 7.5C10.5 6.675 9.825 6 9 6C8.175 6 7.5 6.675 7.5 7.5H6C6 5.8425 7.3425 4.5 9 4.5C10.6575 4.5 12 5.8425 12 7.5C12 9.375 9.75 9.5625 9.75 11.25Z"
          fill="black"
        />
        <path
          d="M8.25 12H9.75V13.5H8.25V12ZM9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15ZM9 4.5C7.3425 4.5 6 5.8425 6 7.5H7.5C7.5 6.675 8.175 6 9 6C9.825 6 10.5 6.675 10.5 7.5C10.5 9 8.25 8.8125 8.25 11.25H9.75C9.75 9.5625 12 9.375 12 7.5C12 5.8425 10.6575 4.5 9 4.5Z"
          fill="black"
        />
      </svg>
    ),
    title: "Faqs",
    description: "Find quick answers to the most common questions. From setup to customization, we’ve got you covered.",
    buttonText: "View Faqs",
    buttonLink: "/resources/faqs",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        className="size-10 dark:invert [&_*]:stroke-1"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3319 5.49512C12.4317 5.38425 12.5714 5.31755 12.7204 5.30967C12.8693 5.30179 13.0153 5.35339 13.1262 5.45312L14.4289 6.62612C14.9817 7.12337 15.4392 7.53512 15.7542 7.90862C16.0842 8.30237 16.3197 8.72462 16.3197 9.24662C16.3197 9.76787 16.0849 10.1901 15.7542 10.5831C15.4392 10.9574 14.9817 11.3699 14.4289 11.8664L13.1262 13.0394C13.0713 13.0888 13.0072 13.127 12.9375 13.1516C12.8679 13.1763 12.794 13.187 12.7203 13.1831C12.6465 13.1793 12.5742 13.1609 12.5075 13.1291C12.4408 13.0973 12.381 13.0527 12.3316 12.9977C12.2821 12.9428 12.244 12.8787 12.2193 12.8091C12.1946 12.7394 12.1839 12.6656 12.1878 12.5918C12.1917 12.518 12.21 12.4457 12.2418 12.379C12.2736 12.3123 12.3183 12.2526 12.3732 12.2031L13.6459 11.0579C14.2369 10.5261 14.6352 10.1654 14.8932 9.85937C15.1407 9.56462 15.1947 9.39287 15.1947 9.24662C15.1947 9.09962 15.1407 8.92787 14.8932 8.63312C14.6352 8.32637 14.2369 7.96637 13.6459 7.43462L12.3732 6.28937C12.3182 6.23996 12.2735 6.18019 12.2416 6.11348C12.2097 6.04677 12.1913 5.97442 12.1874 5.90058C12.1835 5.82674 12.1942 5.75286 12.2188 5.68316C12.2435 5.61346 12.2817 5.54931 12.3312 5.49437M5.62619 6.28937C5.73708 6.18952 5.80377 6.0497 5.81157 5.90068C5.81938 5.75166 5.76767 5.60564 5.66781 5.49475C5.56796 5.38386 5.42814 5.31717 5.27912 5.30936C5.1301 5.30156 4.98408 5.35327 4.87319 5.45312L3.57044 6.62612C3.01769 7.12337 2.56019 7.53512 2.24519 7.90862C1.91519 8.30237 1.67969 8.72462 1.67969 9.24662C1.67969 9.76787 1.91444 10.1901 2.24519 10.5831C2.56019 10.9574 3.01769 11.3699 3.57044 11.8664L4.87319 13.0394C4.9281 13.0888 4.99221 13.127 5.06186 13.1516C5.13151 13.1763 5.20533 13.187 5.27912 13.1831C5.35291 13.1793 5.42521 13.1609 5.4919 13.1291C5.5586 13.0973 5.61837 13.0527 5.66781 12.9977C5.71726 12.9428 5.7554 12.8787 5.78006 12.8091C5.80473 12.7394 5.81544 12.6656 5.81157 12.5918C5.80771 12.518 5.78935 12.4457 5.75754 12.379C5.72573 12.3123 5.6811 12.2526 5.62619 12.2031L4.35344 11.0579C3.76244 10.5261 3.36419 10.1654 3.10619 9.85937C2.85869 9.56462 2.80469 9.39287 2.80469 9.24662C2.80469 9.09962 2.85869 8.92787 3.10619 8.63312C3.36419 8.32637 3.76244 7.96637 4.35344 7.43462L5.62619 6.28937Z"
          fill="black"
        />
        <path
          opacity="0.5"
          d="M10.6363 3.20752C10.7802 3.24619 10.9029 3.34042 10.9775 3.46951C11.052 3.59861 11.0723 3.75201 11.0338 3.89602L8.05326 15.0185C8.0341 15.0899 8.00108 15.1568 7.95607 15.2154C7.91107 15.2739 7.85496 15.3231 7.79096 15.36C7.6617 15.4346 7.50812 15.4547 7.36401 15.416C7.2199 15.3773 7.09705 15.283 7.02251 15.1537C6.94796 15.0245 6.92782 14.8709 6.96651 14.7268L9.94701 3.60427C9.96615 3.5329 9.99917 3.46601 10.0442 3.4074C10.0892 3.3488 10.1453 3.29964 10.2093 3.26273C10.2733 3.22581 10.3439 3.20187 10.4172 3.19227C10.4905 3.18267 10.5649 3.18834 10.6363 3.20752Z"
          fill="black"
        />
      </svg>
    ),
    title: "Developer Docs",
    description:
      "Get started with our developer documentation. Learn how to use our components and templates effectively.",
    buttonText: "Read docs",
    buttonLink: "/docs",
  },
];

const Card: React.FC = () => {
  return (
    <div className="grid-section relative overflow-clip px-4 border-zinc-200 dark:border-zinc-700 [.grid-section_~_&]:border-t-0 border-y">
      <div className="relative z-0 mx-auto max-w-[1200px] border-zinc-200 dark:border-zinc-700 border-x">
        <div className="grid grid-cols-1 gap-px bg-zinc-200 dark:bg-[#09090b] md:grid-cols-2">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="relative space-y-8 bg-white dark:bg-[#09090b] p-8 sm:p-12 border-r border-b border-zinc-200 dark:border-zinc-700"
            >
              {card.icon}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-zinc-100">
                  {card.title}
                </h2>
                <p className="mt-2 max-w-sm text-pretty text-base text-neutral-500 dark:text-zinc-400">
                  {card.description}
                </p>
              </div>
              <div>
                <Link
                  className="rounded-lg mx-auto max-w-fit border py-2 text-sm font-medium shadow-sm transition-all hover:ring-4 hover:ring-zinc-200 dark:hover:ring-zinc-600 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:hover:ring-0 disabled:border-neutral-200 border-black dark:border-zinc-200 bg-black dark:bg-zinc-200 text-white dark:text-zinc-900 hover:bg-neutral-800 dark:hover:bg-zinc-100 px-4"
                  href={card.buttonLink}
                >
                  {card.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;

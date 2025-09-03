import React from "react";

const TwitterCard = ({ user, content, avatarUrl, twitterHandle, highlightedText }) => {
  // Function to highlight the text in the content
  const highlightContent = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi')); // Split by highlighted text
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="text-green-500 font-sm p-1 rounded-md bg-inherit  dark:text-green-500">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white border-light-200 border  dark:bg-[#ffffff08] dark:border-none overflow-hidden rounded-lg break-inside-avoid w-full mb-4 relative p-2 dark:text-white">
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl  text-dark  dark:text-white">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
          />
          <div className="h-fit">
            <h3 className="text-sm font-bold mb-0 w-full">{user}</h3>
            <p className="text-xs opacity-70">@{twitterHandle}</p>
          </div>
        </div>
        <svg
          viewBox="328 355 335 276"
          className="absolute top-5 right-5 w-4 h-4"
          height={24}
          width={24}
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M 630, 425 A 195, 195 0 0 1 331, 600 A 142, 142 0 0 0 428, 570 A 70, 70 0 0 1 370, 523 A 70, 70 0 0 0 401, 521 A 70, 70 0 0 1 344, 455 A 70, 70 0 0 0 372, 460 A 70, 70 0 0 1 354, 370 A 195, 195 0 0 0 495, 442 A 67, 67 0 0 1 611, 380 A 117, 117 0 0 0 654, 363 A 65, 65 0 0 1 623, 401 A 117, 117 0 0 0 662, 390 A 65, 65 0 0 1 630, 425 Z"
            fill="#1da1f2"
          />
        </svg>
      </div>
      <div className="px-4 py-4 text-dark dark:text-white">
        <p className="text-md">{highlightContent(content, highlightedText)}</p>
      </div>
    </div>
  );
};

export default TwitterCard;

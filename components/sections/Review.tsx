import React from "react";
import TwitterCard from "@/components/ui/TwitterCard";

const Review = () => {
  const reviews = [
    {
      user: "Peter Mick",
      content:
        "Absolutely love Mintlify UI, as a solo founder it cuts down my development by hours if not days!",
      avatarUrl:
        "https://pbs.twimg.com/profile_images/1490075268928655364/L-PTx3nW_400x400.jpg",
      twitterHandle: "ThePeterMick",
      highlightedText: "Mintlify UI", // Highlight this text
    },
    {
      user: "Devluc",
      content:
        "Awesome web templates and components library. Time saver for web developers.",
      avatarUrl:
        "https://ph-avatars.imgix.net/1933721/original.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=100&h=100&fit=crop&dpr=1",
      twitterHandle: "devluc",
      highlightedText: "web templates", // Highlight this text
    },
    {
      user: "Naveh Mevorach",
      content:
        "I've been an early user of MintlifyUI, and the components are top-notch. The speed of new releases is impressive, and I'm genuinely excited about this library.",
      avatarUrl:
        "https://ph-avatars.imgix.net/2647623/original.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=100&h=100&fit=crop&dpr=1",
      twitterHandle: "naveh_mevorach",
      highlightedText: "MintlifyUI", // Highlight this text
    },
    {
      user: "Michael Walter",
      content:
        "Mintlify UI is genuinely one of the best tools available to backend Dev's who struggle to make pretty ui 🎉",
      avatarUrl:
        "https://pbs.twimg.com/profile_images/1646766572600541184/Q2YuprHH_400x400.jpg",
      twitterHandle: "mikevdev",
      highlightedText: "Mintlify UI", // Highlight this text
    },
    {
      user: "Axel Amer",
      content:
        "Just bumped into Mintlifyui on twitter, as a former ux designer I love it! I love the quality of the components, I've seen a few libraries with many components but I would never use them because the components are outdated. I could definitely use @Mintlify_ui.",
      avatarUrl: "/testimonials/1.jpg",
      twitterHandle: "axelamer",
      highlightedText: "Mintlifyui", // Highlight this text
    },
  ];

  return (
    <div className="container mx-auto mt-20 px-2 max-w-[1200px] ">
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-muted">
            <img src="/svgs/love.svg" className="inline mr-2 dark:invert" />
            Wall of love
          </span>
        </div>
        <h1 className="text-center max-w-4xl mx-auto text-2xl font-bold xl:text-5xl xl:px-5">
          Loved by hundreds
        </h1>
        <p className="text-center max-w-4xl mx-auto text-md text-dark-300 mt-3 mb-5">
          We are proud to have helped hundreds of developers and designers
          around the world.
        </p>
      </div>
      <div className="max-w-7xl mx-auto gap-4 lg:columns-3 md:columns-2 sm:columns-1 p-2">
        {reviews.map((review, index) => (
          <TwitterCard
            key={index}
            user={review.user}
            content={review.content}
            avatarUrl={review.avatarUrl}
            twitterHandle={review.twitterHandle}
            highlightedText={review.highlightedText}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;

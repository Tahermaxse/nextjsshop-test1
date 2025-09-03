import ChangelogHeader from "@/components/Changelog/ChangelogHeader";
import ChangelogCard from "@/components/Changelog/ChangelogCard";
import React from "react";

const page = () => {
  return (
    <div className="relative flex flex-grow">
      <h1 className="sr-only">
        Changelog
      </h1>
      <div className="overflow-hidden flex flex-col grow">
        <ChangelogHeader />
        <div className="grow relative">
          <div className="px-6 lg:px-16 [&:has(.full-content-width)]:px-0 md:whitespace-pre-wrap hide-breaks md:show-breaks max-w-content mx-auto relative z-[1]">
            <div className="flex flex-col">
              <ChangelogCard
                date="July 18, 2025"
                title="v1.0.0 - Initial Release"
                description={`This release unlocks and publishes all free UI blocks for public access.

Key highlights include:
- Access to a growing library of professionally designed free blocks
- Components optimized for responsiveness and performance
- Copy-paste ready code for faster development workflows
- Support for Tailwind CSS and modern design standards

Developer experience improvements:
- Enhanced folder structure for easier block discovery
- Consistent naming and formatting across all blocks
- Live preview support for faster iteration

No breaking changes in this release.`}
                imageUrl="https://ik.imagekit.io/nextjsshop/changelog/free-blocks-nextjsshop-v1.png"
                imageAlt="Cover for release v2.8.3"
                imageLink="/components/free"
                authors={[
                  {
                    name: "Taher Hathi",
                    handle: "taher_max_",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/138603168?s=400&u=96ef6f2056ae8afa6b920fda6c5d48d46aab557e&v=4",
                    profileUrl: "https://x.com/taher_max_",
                  },
                  {
                    name: "Karansinh Chauhan",
                    handle: "__karansinh__",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/77052840?v=4",
                    profileUrl: "https://x.com/__karansinh__",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

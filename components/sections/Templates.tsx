import React from "react";
import { getRecentTemplates } from "@/lib/api";
import { type Template } from "@/lib/types";
import { TemplateGrid } from "@/app/templates/components/TemplateGrid";
import Link from "next/link";
import { unstable_cache } from 'next/cache';
import { ChevronRight } from "lucide-react";

const Templates = async () => {
  async function fetchTemplates() {
    try {
      // Using unstable_cache for ISR
      const getCachedTemplates = unstable_cache(
        async () => {
          const data = await getRecentTemplates();
          return Array.isArray(data) ? data : [];
        },
        ['recent-templates'],
        { revalidate: 3600 } // Revalidate every hour (3600 seconds)
      );
      
      return await getCachedTemplates();
    } catch (error) {
      console.error("Error fetching recent templates:", error);
      // Return empty array as fallback
      return [];
    }
  }

  const TemplatesData = await fetchTemplates();

  return (
    <div>
      <div>
        <div className="max-w-[1200px] mx-auto p-4 mt-6 ">
          <div className="w-full md:max-w-2xl">
            <p className="text-md sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Templates
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl my-2 font-bold">
              Stunning Templates ready for launch
            </h2>
            <p className="section__description mt-5 mb-5 text-base sm:text-lg md:text-xl">
              Discover fully adaptable components, ideal for enhancing your
              Tailwind projects. Customize them extensively to match your unique
              requirements.
            </p>
          </div>
          <div className="mx-auto mt-8 mb-6">
            <TemplateGrid templates={TemplatesData} loading={false} />
          </div>
          <Link href="/templates">
            <button className="button flex items-center float-right mb-10 group relative inline-block font-bold cursor-pointer overflow-hidden rounded-lg px-6 py-2 sm:px-8 sm:py-2.5 md:px-10 md:py-3 text-sm sm:text-base md:text-lg text-white from-green-600 to-green-500 text-white bg-gradient-to-t border border-b-2 border-green-900/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)]">
              Explore Templates
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Templates;

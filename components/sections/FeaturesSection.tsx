import React from "react";
import {
  LayoutGrid,
  Monitor,
  Figma,
  Box,
  Smartphone,
  Code,
  Moon,
  Type,
  Accessibility,
} from "lucide-react";

const features = [
  {
    icon: <LayoutGrid className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "180+ Components",
    description: "180+ versatile UI elements for rapid development.",
  },
  {
    icon: <Monitor className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "Production Ready",
    description: "Pre-optimized code for instant project deployment.",
  },
  {
    icon: <Figma className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "Figma File",
    description: "Comprehensive design kit for seamless UI/UX workflow.",
  },
  {
    icon: <Box className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "Customizable",
    description: "Highly flexible system for unique brand expression.",
  },
  {
    icon: <Smartphone className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "Responsive",
    description: "Adaptive layouts for multi-device compatibility.",
  },
  {
    icon: <Code className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "Easy for Devs",
    description: "Intuitive framework for rapid and efficient development.",
  },
  {
    icon: <Moon className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "Dark Mode",
    description: "Effortless integration for enhanced user experience.",
  },
  {
    icon: <Type className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "TypeScript",
    description: "Strong typing for enhanced code maintainability.",
  },
  {
    icon: <Accessibility className="size-[18px] shrink-0 text-[#F05023] md:size-6" />,
    title: "Accessible",
    description: "WCAG-compliant design for inclusive user access.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="px-2 mt-20 md:px-2.5 container mx-auto max-w-[1200px]">
      <div
        className="relative z-10 overflow-hidden rounded-2xl pb-2 pt-6 md:py-12 xl:rounded-[28px] xl:py-20"
        style={{
          background: "linear-gradient(rgb(28, 28, 28) 0%, rgb(20, 20, 20) 100%)",
          boxShadow:
            "rgba(31, 31, 31, 0.01) 0px 16px 8px, rgba(31, 31, 31, 0.04) 0px 12px 6px, rgba(31, 31, 31, 0.07) 0px 4px 4px, rgba(31, 31, 31, 0.08) 0px 1.5px 3px, rgb(15, 15, 15) 0px 0px 0px 1px, rgba(255, 255, 255, 0.12) 0px 1px 2px inset",
        }}
      >
        <div className="container relative z-20 mt-3 md:mt-4">
          <div className="flex flex-col items-start gap-3 md:items-center md:gap-4 md:text-center">
            <h2 className="text-[28px]/[36px] font-550 -tracking-[0.02em] text-ln-gray-0 xl:text-[48px]/[56px] xl:-tracking-[0.025em]">
              What's inside AlignUI?
            </h2>
            <p className="w-full max-w-[564px] text-ln-paragraph-sm text-ln-gray-500 md:text-ln-gray-600 xl:text-ln-paragraph-lg">
              500+ <span className="font-medium text-ln-gray-400 md:text-ln-gray-500">flexible</span> components with{" "}
              <span className="font-medium text-ln-gray-400 md:text-ln-gray-500">developer-friendly</span>, comprehensive
              codebase for rapid development.
            </p>
          </div>
          <div className="relative mt-4 grid divide-y divide-white/[.08] border-t border-white/[.08] md:mt-12 md:grid-cols-2 md:gap-6 md:divide-y-0 md:border-0 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-14">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 py-4 md:flex-col md:items-center md:gap-0 md:p-4 md:text-center">
                {feature.icon}
                <div className="md:mt-5">
                  <div className="text-ln-label-sm text-ln-gray-0 md:text-ln-label-md">{feature.title}</div>
                  <div className="mt-1 w-full text-pretty text-ln-paragraph-xs text-ln-gray-600 md:max-w-[272px] md:text-ln-paragraph-sm">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
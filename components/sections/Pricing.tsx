"use client";

import {
  Sparkles,
  MapPin,
  Signature,
  CircleDashed,
  Layers,
  Code2,
  MessageSquare,
  Framer,
  MonitorSmartphone,
  Laptop,
  Circle,
  Plus,
  CircleAlert,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { RiNextjsLine } from "react-icons/ri";
import { useState } from "react";
import QuoteRequestModal from "../modals/QuoteRequestModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useCurrency } from "@/hooks/useCurrency";

export default function Pricing() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const handleQuoteRequest = async () => {
    if (status === "loading") return;

    if (!session) {
      // Redirect to sign in with callback
      await signIn(undefined, { callbackUrl: window.location.href });
      return;
    }

    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <section
        aria-label="Pricing"
        className="min-h-[200px] bg-gray-50 dark:bg-black py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-left mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-normal mb-4 tracking-tight dark:text-white">
              Pricing
            </h1>
            <p className="text-base sm:text-lg text-left text-gray-600 dark:text-zinc-400 max-w-3xl font-medium">
              Built by creators, for creators thoughtfully designed templates
              and components to jumpstart your next project.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Landing Page Card */}
            <div className="bg-[#e8e8e8] dark:bg-zinc-900 overflow-visible relative rounded-3xl border-[10px] border-[#e8e8e8] dark:border-zinc-900">
              <div className="bg-white dark:bg-zinc-800 rounded-[17px] p-5 shadow-[0_2.670571239557758px_0.8011713718673273px_-0.5625px_#0000000d,0_6.329725394512934px_1.8989176183538803px_-1.125px_#0000000d,0_11.546073393108962px_3.463822017932689px_-1.6875px_#0000000d,0_19.195323837680917px_5.758597151304276px_-2.25px_#0000000c,0_30.998882827911004px_9.299664848373302px_-2.8125px_#0000000b,0_50.74209549580147px_15.222628648740441px_-3.375px_#0000000a,0_87.37446190375515px_26.212338571126544px_-3.9375px_#00000007,0_159px_47.7px_-4.5px_#00000002]">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 dark:border-zinc-700 flex items-center justify-center dark:bg-zinc-800">
                      <Sparkles className="h-5 w-5 dark:text-white" />
                    </div>
                    <div className="mt-2 px-3 py-1 bg-[#E5F5FF] dark:bg-blue-950 text-[#009DFF] rounded-full text-xs font-medium">
                      Nextjs
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">
                    Landing Page
                  </h2>
                  <span className="text-lg font-bold dark:text-white">
                    {formatPrice(49)}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CircleAlert className="inline-block ml-2 h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            This is our starting price. The final <br />
                            cost may increase or decrease depending <br /> on
                            your design, number of sections, animations, and
                            more.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Have a Figma design? We’ll bring it to life in Next.js.
                </p>

                <div className="border-t border-gray-100 dark:border-zinc-700 my-6" />

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Single page
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Reuable components
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Multiple iterations
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Discord communication
                    </span>
                  </li>
                </ul>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=hathitaher83@gmail.com&su=Studio%20Project%20Inquire%20-%20Landing%20Page&body=Hey%20Taher,%0D%0A%0D%0AWe%27re%20interested%20in%20having%20a%20landing%20page%20designed%20and%20would%20love%20to%20discuss%20the%20details%20with%20you.%0D%0A%0D%0A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full py-3 from-black to-black/50 bg-gradient-to-t border border-b-2 border-black/40 shadow-md shadow-black/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] dark:from-white dark:to-white/50 text-white dark:text-black rounded-[32px] font-medium text-sm">
                    Get Landing Page
                  </button>
                </a>
              </div>

              <div className="mt-6 p-4 border-zinc-500 border-[2px] border-dashed rounded-[17px] bg-[#e8e8e8] dark:bg-zinc-900">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-lg border border-gray-200 dark:border-zinc-700 flex items-center justify-center bg-black">
                    <RiNextjsLine className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold dark:text-white">
                    NextJS Development
                  </span>
                  <span className="ml-auto font-bold dark:text-white">
                    +{formatPrice(20)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Need extra components? We can build them in Next.js for an
                  additional fee.
                </p>
                <button className="w-full py-3 border border-gray-200 dark:border-zinc-700 rounded-[32px] text-sm font-medium bg-white dark:bg-zinc-800 dark:text-white">
                  Development
                </button>
              </div>
            </div>

            {/* Full Website Card */}
            <div className="h-[675px] bg-[#e8e8e8] dark:bg-zinc-900 overflow-visible relative rounded-3xl border-[10px] border-[#e8e8e8] dark:border-zinc-900 mb-8 md:mb-0">
              <div className="bg-white dark:bg-zinc-800 rounded-[17px] p-5 shadow-[0_2.670571239557758px_0.8011713718673273px_-0.5625px_#0000000d,0_6.329725394512934px_1.8989176183538803px_-1.125px_#0000000d,0_11.546073393108962px_3.463822017932689px_-1.6875px_#0000000d,0_19.195323837680917px_5.758597151304276px_-2.25px_#0000000c,0_30.998882827911004px_9.299664848373302px_-2.8125px_#0000000b,0_50.74209549580147px_15.222628648740441px_-3.375px_#0000000a,0_87.37446190375515px_26.212338571126544px_-3.9375px_#00000007,0_159px_47.7px_-4.5px_#00000002]">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 dark:border-zinc-700 flex items-center justify-center dark:bg-zinc-800">
                      <img
                        src="/svgs/fullwebsite.svg"
                        className="h-5 w-5 dark:invert"
                        alt="Full Website"
                      />
                    </div>
                    <div className="px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                      NextJS Build
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">
                    Full Website
                  </h2>
                  <span className="text-lg font-bold dark:text-white"></span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Have a Figma file? We’ll build the full website frontend and
                  backend included.
                </p>

                <div className="border-t border-gray-100 dark:border-zinc-700 my-6" />

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Multiple pages
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Nextjs build
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Reuable components
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code2 className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Custom code
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Multiple iterations
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Discord communication
                    </span>
                  </li>
                </ul>

                <a
                  href="mailto:hathitaher83@gmail.com?subject=Studio%20Project%20Inquire%20-%20Full%20Website&body=Hey%20Taher,%0D%0A%0D%0AWe%27re%20interested%20in%20having%20a%20full%20website%20designed%20and%20developed%20and%20would%20love%20to%20discuss%20the%20details%20with%20you.%0D%0A%0D%0A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full py-3 from-black to-black/50 bg-gradient-to-t border border-b-2 border-black/40 shadow-md shadow-black/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] dark:from-white dark:to-white/50 text-white dark:text-black rounded-[32px] font-medium text-sm">
                    Get Full Website
                  </button>
                </a>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-3 mb-2 bg-[#fcfcfcb3] dark:bg-zinc-800/70 p-4 rounded-[17px]">
                  <div className="w-[41px] h-[41px] rounded-lg border bg-black border-gray-200 dark:border-zinc-700 flex items-center justify-center">
                    <RiNextjsLine className="h-4 w-4 text-white" />
                  </div>
                  <div className="block">
                    <span className="block font-bold dark:text-white">
                      NextJS Development
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Included
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 px-3 text-center">
                <p className="leading-[1.3em] text-sm text-gray-600 dark:text-gray-400">
                  The price may vary depending on the total number of pages;
                  current pricing covers ~ 4-5 pages.
                </p>
              </div>
            </div>

            {/* Custom Card */}
            <div className="bg-[#212121] dark:bg-zinc-800 border-[#dbdbdb] dark:border-zinc-900 border-[10px] text-white rounded-[32px] p-5 h-[500px] col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffffff14] flex items-center justify-center border-zinc-800 ">
                    <CircleDashed className="h-6 w-6" />
                  </div>
                </div>
                <span className="text-lg font-bold"></span>
              </div>

              <h2 className="text-xl font-bold mb-4">Custom</h2>
              <p className="text-gray-400 text-sm mb-6">
                Seeking a different scope of work? We're offering a variety of
                other services.
              </p>

              <div className="border-t border-gray-800 my-6" />

              <div className="space-y-4 mb-6 lg:mb-8">
                <div className="flex items-center gap-3 bg-[#ffffff14] p-2 rounded-lg">
                  <RiNextjsLine className="h-5 w-5" />
                  <span>
                    Everything included <span className="text-gray-400"></span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Plus className="w-4 h-4" />
                  <span>Web apps</span>
                </div>
                <div className="flex items-center gap-3">
                  <Plus className="w-4 h-4" />
                  <span>Desktop apps</span>
                </div>
                <div className="flex items-center gap-3">
                  <Plus className="w-4 h-4" />
                  <span>Mobile apps</span>
                </div>
              </div>

              <button
                onClick={handleQuoteRequest}
                className="w-full py-3 bg from-white to-white/50 bg-gradient-to-t border border-b-2 border-black/40 shadow-md shadow-black/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] text-black rounded-[32px] font-medium text-sm "
              >
                {status === "loading" ? "Loading..." : "Request Quote"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="bg-gray-50 dark:bg-black pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 border-[#e6e6e6] dark:border-zinc-900 border-[10px] rounded-[24px]">

          <div className="bg-[#fcfcfc] dark:bg-zinc-800 rounded-[17px] p-5">
            <div className="flex items-center gap-8 mb-6">
              <div className="w-12 h-12 bg-[#f5f5f5] dark:bg-zinc-700 rounded-xl border border-gray-200 dark:border-zinc-700 flex items-center justify-center">
                <Signature className="w-6 h-6" />
              </div>
              <div className="flex px-3 py-1 border-[1px] border-gray-200 dark:border-zinc-700 text-black dark:text-white rounded-sm text-xs font-medium">
                NextJS EXPERT
              </div>
            </div>

            <div className="md:flex justify-between items-center">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-[22px] font-bold dark:text-white">
                  Hire on Contra instead
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-[280px] text-sm sm:text-[15px]">
                  Trusted by 20,000+ teams from creative agencies to high growth
                  tech companies.
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="mt-8 px-6 py-3  from-[#5751F0] to-[#443fc1] text-white bg-gradient-to-t border border-b-2 border-blue-900/40 shadow-md shadow-blue-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] rounded-full font-medium text-sm whitespace-nowrap ">
                      Hire on Contra
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming Soon!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          
          <div className="bg-[#212121] dark:bg-zinc-800 text-white rounded-[17px] p-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#4a4a4a] w-12 h-12 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
            </div>

            <div className="md:flex justify-between items-center">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-[22px] font-bold">
                  Can't decide? Let's talk
                </h2>
                <p className="text-gray-300 max-w-[280px] text-sm sm:text-[15px]">
                  We're flexible, so if you don't feel like having a call we can
                  take it async.
                </p>
              </div>
              <div className="flex gap-3 mt-8">
                <button className="px-6 py-3 from-[#4a4a4a] to-[#6f6f6f] bg-gradient-to-t border border-b-2 border-[#4a4a4a]/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] text-white rounded-full font-medium text-sm transition-colors whitespace-nowrap">
                  Book a call
                </button>
                <button className="px-6 py-3 from-[#4a4a4a] to-[#6f6f6f] bg-gradient-to-t border border-b-2 border-[#4a4a4a]/40 shadow-md shadow-green-900/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] text-white rounded-full font-medium text-sm transition-colors">
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        userEmail={session?.user?.email}
        userName={session?.user?.name}
      />
    </>
  );
}

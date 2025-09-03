import { HelpCircle } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion" // Assuming shadcn components are in this path

const faqData = [
  {
    category: "Code",
    questions: [
      {
        question: "Which version of Tailwind is being used?",
        answer: "We use the latest stable Tailwind CSS version (v4.1), fully optimized for utility-first workflows and performance.",
      },
      {
        question: "Which version of React is being used?",
        answer: "All components and templates are built with React 18, ensuring compatibility with Next.js 14+ App Router. React 19 support will be added after official release.",
      },
      {
        question: "Are these components TypeScript or JavaScript?",
        answer: "All components are written in TypeScript for better developer experience, type safety, and scalability.",
      },
      {
        question: "Can I use these components with Vue, Svelte, or other frameworks?",
        answer: "No. All components are built specifically for React (Next.js). They are not compatible with Vue, Svelte, or other frameworks.",
      },
      {
        question: "Can I copy-paste code or do I need to install something?",
        answer: "You can directly copy-paste the code into your Next.js project or extract reusable components. There’s no dependency on external packages or installation.",
      },
      {
        question: "Do you offer dark mode and responsive support?",
        answer: "Yes, all components are fully responsive and come with dark mode support out of the box using Tailwind’s dark class strategy.",
      },
      {
        question: "Do you provide code snippets in JavaScript too?",
        answer: "Currently, we only provide TypeScript-based components. However, you can easily convert them to JavaScript if needed.",
      },
    ],
  },
  {
    category: "License",
    questions: [
      {
        question: "What license do the components and templates use?",
        answer: "All templates and components come with a commercial license. You can use them in unlimited personal and commercial projects, but redistribution or resale is not allowed.",
      },
      {
        question: "Can I use the components in client projects?",
        answer: "Yes! You can use the templates and components in unlimited client projects as long as you don’t resell them as-is.",
      },
      {
        question: "Is there a limit on the number of projects I can use the components in?",
        answer: "No, there are no limits. Once purchased, you're free to use them in as many personal or client projects as you like.",
      },
    ],
  },
];


const FAQSection = () => {
  return (
    <div className="bg-gray-50 dark:bg-black/90 p-8">
      <div className="container  md:mt-0 mx-auto max-w-[1200px] px-4">
        <div className="mt-10 mb-12 ">
          <div className="flex flex-col items-start gap-9 md:items-center xl:flex-row xl:items-start xl:gap-6">
            {/* Left Section */}
            <div className="flex shrink-0 flex-col items-start md:items-center xl:block xl:w-[368px]">
              <div className="hidden text-ln-label-md text-ln-gray-500 xl:block">F.A.Q</div>
              <div className="xl:hidden">
                <div className="flex h-7 items-center gap-1.5 rounded-[9px] bg-ln-gray-0 pl-1.5 pr-2.5 text-ln-label-sm text-ln-gray-700 shadow-ln-subheading xl:h-8 xl:pl-2 xl:pr-3">
                  <HelpCircle className="size-[18px] text-ln-gray-400" />
                  F.A.Q
                </div>
              </div>
              <div className="mt-4 text-[28px]/[36px] font-550 -tracking-[0.02em] text-ln-gray-900 md:text-ln-title-h4 xl:mt-2 xl:text-[40px]/[48px]">
                Frequently Asked Questions.
              </div>
              <p className="mt-3 text-ln-paragraph-md text-ln-gray-600">
                Get <span className="font-medium text-ln-gray-800">answers</span> to{" "}
                <span className="font-medium text-ln-gray-800">commonly</span> asked questions.
              </p>
            </div>

            {/* Right Section */}
            <div className="flex w-full min-w-0 flex-1 flex-col gap-10 xl:gap-14">
              {faqData.map((category, index) => (
                <div key={index} className="flex flex-col gap-3 xl:gap-5">
                  <div className="text-ln-label-sm text-ln-gray-500 xl:text-ln-label-md">{category.category}</div>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`item-${index}-${idx}`}
                        className="data-[state=open]:bg-green-50 data-[state=open]:dark:bg-green-950/50 data-[state=open]:border data-[state=open]:border-dashed data-[state=open]:border-green-300 data-[state=open]:dark:border-green-600 data-[state=open]:rounded-lg data-[state=open]:p-4"
                      >
                        <AccordionTrigger className="group flex w-full items-center gap-2 text-left text-ln-label-sm text-ln-gray-900 dark:text-gray-100 xl:text-ln-label-md">
                          <div className="flex-1">{item.question}</div>
                        </AccordionTrigger>
                        <AccordionContent className="text-ln-paragraph-sm text-ln-gray-600 dark:text-gray-300">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQSection

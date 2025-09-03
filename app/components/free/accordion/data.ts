import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'
import AccordionComponent1 from "@/registry/block/Accordion/accordion-01/accordion"
import AccordionComponent2 from "@/registry/block/Accordion/accordion-02/accordion"
import AccordionComponent3 from "@/registry/block/Accordion/accordion-03/accordion"
import AccordionComponent4 from "@/registry/block/Accordion/accordion-04/accordion"
import AccordionComponent5 from "@/registry/block/Accordion/accordion-05/accordion"
import AccordionComponent6 from "@/registry/block/Accordion/accordion-06/accordion"
import AccordionComponent7 from "@/registry/block/Accordion/accordion-07/accordion"
import AccordionComponent8 from "@/registry/block/Accordion/accordion-08/accordion"

const AccordionContent01 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-01/accordion.tsx'));
const AccordionContent02 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-02/accordion.tsx'));
const AccordionContent03 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-03/accordion.tsx'));
const AccordionContent04 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-04/accordion.tsx'));
const AccordionContent05 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-05/accordion.tsx'));
const AccordionContent06 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-06/accordion.tsx'));
const AccordionContent07 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-07/accordion.tsx'));
const AccordionContent08 = getFileContent(path.join(process.cwd(), 'registry/block/Accordion/accordion-08/accordion.tsx'));

export const Accordion = [
    {
        id: 1,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent01
            },
        ],
        component: AccordionComponent1,
        heading: "Accordion 01",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-01.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-01.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-01.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-01.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-01.json",
        },
    },
    {
        id: 2,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent02
            },
        ],
        component: AccordionComponent2,
        heading: "Accordion 02",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-02.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-02.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-02.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-02.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-02.json",
        },
    },
    {
        id: 3,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent03
            },
        ],
        component: AccordionComponent3,
        heading: "Accordion 03",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-03.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-03.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-03.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-03.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-03.json",
        },
    },
    {
        id: 4,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent04
            },
        ],
        component: AccordionComponent4,
        heading: "Accordion 04",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-04.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-04.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-04.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-04.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-04.json",
        },
    },
    {
        id: 5,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent05
            },
        ],
        component: AccordionComponent5,
        heading: "Accordion 05",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-05.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-05.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-05.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-05.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-05.json",
        },
    },
    {
        id: 6,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent06
            },
        ],
        component: AccordionComponent6,
        heading: "Accordion 06",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-06.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-06.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-06.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-06.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-06.json",
        },
    },
    {
        id: 7,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent07
            },
        ],
        component: AccordionComponent7,
        heading: "Accordion 07",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-07.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-07.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-07.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-07.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-07.json",
        },
    },
    {
        id: 8,
        files: [
            {
                name: 'accordion.tsx',
                content: AccordionContent08
            },
        ],
        component: AccordionComponent8,
        heading: "Accordion 08",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/accordion-08.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-08.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/accordion-08.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/accordion-08.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/accordion-08.json",
        },
    }
];
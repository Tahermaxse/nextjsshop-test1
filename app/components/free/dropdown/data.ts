import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

import DropdownComponent01 from "@/registry/block/Dropdown/dropdown-01/dropdown"
import DropdownComponent02 from "@/registry/block/Dropdown/dropdown-02/dropdown"
import DropdownComponent03 from "@/registry/block/Dropdown/dropdown-03/dropdown"
import DropdownComponent04 from "@/registry/block/Dropdown/dropdown-04/dropdown"
import DropdownComponent05 from "@/registry/block/Dropdown/dropdown-05/dropdown"

import Demo06 from "@/registry/block/Dropdown/dropdown-06/demo"

import DropdownComponent07 from "@/registry/block/Dropdown/dropdown-07/dropdown"
import DropdownComponent08 from "@/registry/block/Dropdown/dropdown-08/dropdown"
import DropdownComponent09 from "@/registry/block/Dropdown/dropdown-09/dropdown"
import DropdownComponent10 from "@/registry/block/Dropdown/dropdown-10/dropdown"

const DropdownContent01 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-01/dropdown.tsx'));
const DropdownContent02 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-02/dropdown.tsx'));
const DropdownContent03 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-03/dropdown.tsx'));
const DropdownContent04 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-04/dropdown.tsx'));
const DropdownContent05 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-05/dropdown.tsx'));

const DropdownContent06 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-06/dropdown.tsx'));
const DemoContent06 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-06/demo.tsx'));

const DropdownContent07 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-07/dropdown.tsx'));
const DemoContent07 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-07/demo.tsx'));

const DropdownContent08 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-08/dropdown.tsx'));
const DropdownContent09 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-09/dropdown.tsx'));
const DropdownContent10 = getFileContent(path.join(process.cwd(), 'registry/block/Dropdown/dropdown-10/dropdown.tsx'));

export const Dropdown = [
    {
        id: 1,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent01,
            },
        ],
        component: DropdownComponent01,
        heading: "Dropdown 01",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-01.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-01.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-01.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-01.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-01.json",
        },
    },
    {
        id: 2,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent02,
            },
        ],
        component: DropdownComponent02,
        heading: "Dropdown 02",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-02.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-02.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-02.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-02.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-02.json",
        },
    },
    {
        id: 3,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent03,
            },
        ],
        component: DropdownComponent03,
        heading: "Dropdown 03",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-03.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-03.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-03.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-03.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-03.json",
        },
    },
    {
        id: 4,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent04,
            },
        ],
        component: DropdownComponent04,
        heading: "Dropdown 04",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-04.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-04.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-04.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-04.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-04.json",
        },
    },
    {
        id: 5,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent05,
            },
        ],
        component: DropdownComponent05,
        heading: "Dropdown 05",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-05.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-05.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-05.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-05.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-05.json",
        },
    },
    {
        id: 6,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent06,
            },
            {
                name: 'demo.tsx',
                content: DemoContent06,
            }
        ],
        component: Demo06,
        heading: "Dropdown 06",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-06.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-06.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-06.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-06.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-06.json",
        },
    },
    {
        id: 7,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent07,
            },
            {
                name: 'demo.tsx',
                content: DemoContent07,
            },
        ],
        component: DropdownComponent07,
        heading: "Dropdown 07",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-07.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-07.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-07.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-07.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-07.json",
        },
    },
    {
        id: 8,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent08,
            },
        ],
        component: DropdownComponent08,
        heading: "Dropdown 08",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-08.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-08.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-08.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-08.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-08.json",
        },
    },
    {
        id: 9,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent09,
            },
        ],
        component: DropdownComponent09,
        heading: "Dropdown 09",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-09.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-09.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-09.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-09.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-09.json",
        },
    },
    {
        id: 10,
        files: [
            {
                name: 'dropdown.tsx',
                content: DropdownContent10,
            },
        ],
        component: DropdownComponent10,
        heading: "Dropdown 10",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dropdown-10.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-10.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/dropdown-10.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dropdown-10.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/dropdown-10.json",
        },
    }
];
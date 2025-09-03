import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

import RadioButton01 from "@/registry/block/RadioButton/radiobutton-01/radiobutton"
import RadioButton02 from "@/registry/block/RadioButton/radiobutton-02/radiobutton"
import RadioButton03 from "@/registry/block/RadioButton/radiobutton-03/radiobutton"
import RadioButton04 from "@/registry/block/RadioButton/radiobutton-04/radiobutton"
import RadioButton05 from "@/registry/block/RadioButton/radiobutton-05/radiobutton"
import RadioButton06 from "@/registry/block/RadioButton/radiobutton-06/radiobutton"
import RadioButton07 from "@/registry/block/RadioButton/radiobutton-07/radiobutton"
import RadioButton08 from "@/registry/block/RadioButton/radiobutton-08/radiobutton"
import RadioButton09 from "@/registry/block/RadioButton/radiobutton-09/radiobutton"
import RadioButton10 from "@/registry/block/RadioButton/radiobutton-10/radiobutton"

const RadioButtonContent01 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-01/radiobutton.tsx'));
const RadioButtonContent02 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-02/radiobutton.tsx'));
const RadioButtonContent03 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-03/radiobutton.tsx'));
const RadioButtonContent04 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-04/radiobutton.tsx'));
const RadioButtonContent05 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-05/radiobutton.tsx'));
const RadioButtonContent06 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-06/radiobutton.tsx'));
const RadioButtonContent07 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-07/radiobutton.tsx'));
const RadioButtonContent08 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-08/radiobutton.tsx'));
const RadioButtonContent09 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-09/radiobutton.tsx'));
const RadioButtonContent10 = getFileContent(path.join(process.cwd(), 'registry/block/RadioButton/radiobutton-10/radiobutton.tsx'));

export const radio = [
    {
        id: 1,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent01,
            },
        ],
        component: RadioButton01,
        heading: "Radio Button 01",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-01.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-01.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-01.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-01.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-01.json",
        },
    },
    {
        id: 2,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent02,
            },
        ],
        component: RadioButton02,
        heading: "Radio Button 02",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-02.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-02.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-02.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-02.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-02.json",
        },
    },
    {
        id: 3,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent03,
            },
        ],
        component: RadioButton03,
        heading: "Radio Button 03",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-03.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-03.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-03.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-03.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-03.json",
        },
    },
    {
        id: 4,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent04,
            },
        ],
        component: RadioButton04,
        heading: "Radio Button 04",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-04.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-04.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-04.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-04.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-04.json",
        },
    },
    {
        id: 5,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent05,
            },
        ],
        component: RadioButton05,
        heading: "Radio Button 05",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-05.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-05.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-05.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-05.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-05.json",
        },
    },
    {
        id: 6,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent06,
            },
        ],
        component: RadioButton06,
        heading: "Radio Button 06",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-06.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-06.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-06.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-06.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-06.json",
        },
    },
    {
        id: 7,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent07,
            },
        ],
        component: RadioButton07,
        heading: "Radio Button 07",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-07.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-07.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-07.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-07.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-07.json",
        },
    },
    {
        id: 8,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent08,
            },
        ],
        component: RadioButton08,
        heading: "Radio Button 08",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-08.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-08.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-08.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-08.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-08.json",
        },
    },
    {
        id: 9,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent09,
            },
        ],
        component: RadioButton09,
        heading: "Radio Button 09",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-09.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-09.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-09.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-09.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-09.json",
        },
    },
    {
        id: 10,
        files: [
            {
                name: 'radiobutton.tsx',
                content: RadioButtonContent10,
            },
        ],
        component: RadioButton10,
        heading: "Radio Button 10",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/radiobutton-10.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-10.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/radiobutton-10.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/radiobutton-10.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/radiobutton-10.json",
        },
    },
];
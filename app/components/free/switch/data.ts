import Switch01 from  "@/registry/block/Switch/switch-01/switch"
import Switch02 from  "@/registry/block/Switch/switch-02/switch"
import Switch03 from  "@/registry/block/Switch/switch-03/switch"

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const switch01Content = getFileContent(path.join(process.cwd(), 'registry/block/Switch/switch-01/switch.tsx'))
const switch02Content = getFileContent(path.join(process.cwd(), 'registry/block/Switch/switch-02/switch.tsx'))
const switch03Content = getFileContent(path.join(process.cwd(), 'registry/block/Switch/switch-03/switch.tsx'))

export const switchh = [
  {
    id: 1,
    files: [
      {
        name: 'switch.tsx',
        content: switch01Content
      },
    ],
    component: Switch01,
    heading: "Switch 01",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/switch-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/switch-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/switch-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/switch-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/switch-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'switch.tsx',
        content: switch02Content
      },
    ],
    component: Switch02,
    heading: "Switch 02",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/switch-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/switch-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/switch-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/switch-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/switch-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'switch.tsx',
        content: switch03Content
      },
    ],
    component: Switch03,
    heading: "Switch 03",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/switch-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/switch-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/switch-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/switch-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/switch-03.json",
    },
  },
];

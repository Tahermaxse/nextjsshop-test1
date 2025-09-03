import Demo from  "@/registry/block/Drawer/drawer-01/demo"
import Demo02 from  "@/registry/block/Drawer/drawer-02/demo"
import Demo03 from  "@/registry/block/Drawer/drawer-03/demo"
import Demo04 from  "@/registry/block/Drawer/drawer-04/demo"


import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const drawer01Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-01/drawer.tsx'))
const Demo1Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-01/demo.tsx'))

const drawer02Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-02/drawer.tsx'))
const Demo2Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-02/demo.tsx'))

const drawer03Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-03/drawer.tsx'))
const Demo3Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-03/demo.tsx'))

const drawer04Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-04/drawer.tsx'))
const Demo4Content = getFileContent(path.join(process.cwd(), 'registry/block/Drawer/drawer-04/demo.tsx'))

export const drawer = [
  {
    id: 1,
    files: [
      {
        name: 'drawer.tsx',
        content: drawer01Content
      },
      {
        name: 'demo.tsx',
        content: Demo1Content
      },
    ],
    component: Demo,
    heading: "Drawer 01",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/drawer-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/drawer-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/drawer-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'drawer.tsx',
        content: drawer02Content
      },
      {
        name: 'demo.tsx',
        content: Demo2Content
      },
    ],
    component: Demo02,
    heading: "Drawer 02",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/drawer-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/drawer-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/drawer-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'drawer.tsx',
        content: drawer03Content
      },
      {
        name: 'demo.tsx',
        content: Demo3Content
      },
    ],
    component: Demo03,
    heading: "Drawer 03",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/drawer-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/drawer-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/drawer-03.json",
    },
  },
  {
    id: 4,
    files: [
      {
        name: 'drawer.tsx',
        content: drawer04Content
      },
      {
        name: 'demo.tsx',
        content: Demo4Content
      },
    ],
    component: Demo04,
    heading: "Drawer 04",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/drawer-04.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-04.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/drawer-04.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/drawer-04.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/drawer-04.json",
    },
  },
];

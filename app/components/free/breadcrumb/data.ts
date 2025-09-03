import Demo01 from "@/registry/block/Breadcrumb/breadcrumb-01/demo"
import Demo02 from "@/registry/block/Breadcrumb/breadcrumb-02/demo"
import Demo03 from "@/registry/block/Breadcrumb/breadcrumb-03/demo"
import Demo04 from "@/registry/block/Breadcrumb/breadcrumb-04/demo"
import Demo05 from "@/registry/block/Breadcrumb/breadcrumb-05/demo"
import Demo06 from "@/registry/block/Breadcrumb/breadcrumb-06/demo"
import Demo07 from "@/registry/block/Breadcrumb/breadcrumb-07/demo"
import Demo08 from "@/registry/block/Breadcrumb/breadcrumb-08/demo"


import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const Breadcrumb01Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-01/breadcrumb.tsx'))
const Demo01Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-01/demo.tsx'))

const Breadcrumb02Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-02/breadcrumb.tsx'))
const Demo02Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-02/demo.tsx'))

const Breadcrumb03Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-03/breadcrumb.tsx'))
const Demo03Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-03/demo.tsx'))

const Breadcrumb04Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-04/breadcrumb.tsx'))
const Demo04Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-04/demo.tsx'))

const Breadcrumb05Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-05/breadcrumb.tsx'))
const Demo05Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-05/demo.tsx'))

const Breadcrumb06Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-06/breadcrumb.tsx'))
const Demo06Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-06/demo.tsx'))

const Breadcrumb07Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-07/breadcrumb.tsx'))
const Demo07Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-07/demo.tsx'))

const Breadcrumb08Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-08/breadcrumb.tsx'))
const Demo08Content = getFileContent(path.join(process.cwd(), 'registry/block/Breadcrumb/breadcrumb-08/demo.tsx'))
export const breadcrumb = [
  {
    id:1,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb01Content
      },
      {
        name: 'demo.tsx',
        content: Demo01Content
      },
    ],
    component: Demo01,
    heading: "Navigation Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-01.json",
    },
  },
  {
    id:2,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb02Content
      },
      {
        name: 'demo.tsx',
        content: Demo02Content
      },
    ],
    component: Demo02,
    heading: "File Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-02.json",
    },
  },
  {
    id:3,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb03Content
      },
      {
        name: 'demo.tsx',
        content: Demo03Content
      },
    ],
    component: Demo03,
    heading: "Hierarchical Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-03.json",
    },
  },
  {
    id:4,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb04Content
      },
      {
        name: 'demo.tsx',
        content: Demo04Content
      },
    ],
    component: Demo04,
    heading: "Filter Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-04.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-04.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-04.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-04.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-04.json",
    },
  },
  {
    id:5,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb05Content
      },
      {
        name: 'demo.tsx',
        content: Demo05Content
      },
    ],
    component: Demo05,
    heading: "Step Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-05.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-05.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-05.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-05.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-05.json",
    },
  },
  {
    id:6,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb06Content
      },
      {
        name: 'demo.tsx',
        content: Demo06Content
      },
    ],
    component: Demo06,
    heading: "Location Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-06.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-06.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-06.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-06.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-06.json",
    },
  },
  {
    id:7,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb07Content
      },
      {
        name: 'demo.tsx',
        content: Demo07Content
      },
    ],
    component: Demo07,
    heading: "Tags Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-07.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-07.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-07.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-07.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-07.json",
    },
  },
  {
    id:8,
    files: [
      {
        name: 'breadcrumb.tsx',
        content: Breadcrumb08Content
      },
      {
        name: 'demo.tsx',
        content: Demo08Content
      },
    ],
    component: Demo08,
    heading: "Dropdown Breadcrumb",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/breadcrumb-08.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-08.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/breadcrumb-08.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/breadcrumb-08.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/breadcrumb-08.json",
    },
  },
];

import { Demo01 } from  "@/registry/block/Dialog/dialog-01/demo"
import  Demo02  from  "@/registry/block/Dialog/dialog-02/demo"
import Demo03 from "@/registry/block/Dialog/dialog-03/demo"
import Demo04 from "@/registry/block/Dialog/dialog-04/demo"
import Demo05 from "@/registry/block/Dialog/dialog-05/demo"
import Demo06 from "@/registry/block/Dialog/dialog-06/demo"
import Demo07 from "@/registry/block/Dialog/dialog-07/demo"
import Demo08 from "@/registry/block/Dialog/dialog-08/demo"
import Demo09 from "@/registry/block/Dialog/dialog-09/demo"

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const dailog01Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-01/dialog.tsx'))
const Demo1Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-01/demo.tsx'))
const dailog02Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-02/dailog.tsx'))
const Demo2Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-02/demo.tsx'))
const dailog03Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-03/dialog.tsx'))
const Demo3Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-03/demo.tsx'))
const dailog04Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-04/dialog.tsx'))
const Demo4Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-04/demo.tsx'))
const dailog05Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-05/dialog.tsx'))
const Demo5Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-05/demo.tsx'))
const dailog06Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-06/dailog.tsx'))
const Demo6Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-06/demo.tsx'))
const dailog07Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-07/dialog.tsx'))
const Demo7Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-07/demo.tsx'))
const dailog08Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-08/dailog.tsx'))
const Demo8Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dialog-08/demo.tsx'))
const dailog09Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dailog-09/dialog.tsx'))
const Demo9Content = getFileContent(path.join(process.cwd(), 'registry/block/Dialog/dailog-09/demo.tsx'))


export const dailog = [
  {
    id: 1,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog01Content
      },
      {
        name: 'demo.tsx',
        content: Demo1Content
      },
    ],
    component: Demo01,
    heading: "Dialog 01",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog02Content
      },
      {
        name: 'demo.tsx',
        content: Demo2Content
      },
    ],
    component: Demo02,
    heading: "Dialog 02",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog03Content
      },
      {
        name: 'demo.tsx',
        content: Demo3Content
      },
    ],
    component: Demo03,
    heading: "Dialog 03",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-03.json",
    },
  },
  {
    id: 4,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog04Content
      },
      {
        name: 'demo.tsx',
        content: Demo4Content
      },
    ],
    component: Demo04,
    heading: "Dialog 04",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-04.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-04.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-04.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-04.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-04.json",
    },
  },
  {
    id: 5,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog05Content
      },
      {
        name: 'demo.tsx',
        content: Demo5Content
      },
    ],
    component: Demo05,
    heading: "Dialog 05",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-05.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-05.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-05.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-05.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-05.json",
    },
  },
  {
    id: 6,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog06Content
      },
      {
        name: 'demo.tsx',
        content: Demo6Content
      },
    ],
    component: Demo06,
    heading: "Dialog 06",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-06.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-06.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-06.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-06.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-06.json",
    },
  },
  {
    id: 7,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog07Content
      },
      {
        name: 'demo.tsx',
        content: Demo7Content
      },
    ],
    component: Demo07,
    heading: "Dialog 07",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-07.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-07.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-07.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-07.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-07.json",
    },
  },
  {
    id: 8,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog08Content
      },
      {
        name: 'demo.tsx',
        content: Demo8Content
      },
    ],
    component: Demo08,
    heading: "Dialog 08",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-08.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-08.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-08.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-08.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-08.json",
    },
  },
  {
    id: 9,
    files: [
      {
        name: 'dialog.tsx',
        content: dailog09Content
      },
      {
        name: 'demo.tsx',
        content: Demo9Content
      },
    ],
    component: Demo09,
    heading: "Dialog 09",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/dialog-09.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-09.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/dialog-09.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/dialog-09.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/dialog-09.json",
    },
  },
];

import AuthCard01 from "@/registry/block/AuthCard/authcard-01/authcard"
import AuthCard02 from "@/registry/block/AuthCard/authcard-02/authcard"
import AuthCard03 from "@/registry/block/AuthCard/authcard-03/authcard"
import AuthCard04 from "@/registry/block/AuthCard/authcard-04/authcard"
import AuthCard05 from "@/registry/block/AuthCard/authcard-05/authcard"
import AuthCard06 from "@/registry/block/AuthCard/authcard-06/authcard"
import AuthCard07 from "@/registry/block/AuthCard/authcard-07/authcard"
import AuthCard08 from "@/registry/block/AuthCard/authcard-08/authcard"

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const authcard01Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-01/authcard.tsx'))
const authcard02Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-02/authcard.tsx'))
const authcard03Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-03/authcard.tsx'))
const authcard04Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-04/authcard.tsx'))
const authcard05Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-05/authcard.tsx'))
const authcard06Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-06/authcard.tsx'))
const authcard07Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-07/authcard.tsx'))
const authcard08Content = getFileContent(path.join(process.cwd(), 'registry/block/AuthCard/authcard-08/authcard.tsx'))


export const authcard = [
  {
    id: 1,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard01Content
      },
     
    ],
    component: AuthCard01,
    heading: "Auth Card 01",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard02Content
      },
     
    ],
    component: AuthCard02,
    heading: "Auth Card 02",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard03Content
      },
     
    ],
    component: AuthCard03,
    heading: "Auth Card 03",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-03.json",
    },
  },
  {
    id: 4,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard04Content
      },
     
    ],
    component: AuthCard04,
    heading: "Auth Card 04",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-04.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-04.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-04.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-04.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-04.json",
    },
  },
  {
    id: 5,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard05Content
      },
     
    ],
    component: AuthCard05,
    heading: "Auth Card 05",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-05.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-05.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-05.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-05.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-05.json",
    },
  },
  {
    id: 6,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard06Content
      },
     
    ],
    component: AuthCard06,
    heading: "Auth Card 06",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-06.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-06.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-06.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-06.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-06.json",
    },
  },
  {
    id: 7,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard07Content
      },
     
    ],
    component: AuthCard07,
    heading: "Auth Card 07",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-07.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-07.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-07.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-07.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-07.json",
    },
  },
  {
    id: 8,
    files: [
      {
        name: 'authcard.tsx',
        content: authcard08Content
      },
     
    ],
    component: AuthCard08,
    heading: "Auth Card 08",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/authcard-08.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-08.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/authcard-08.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/authcard-08.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/authcard-08.json",
    },
  },
];

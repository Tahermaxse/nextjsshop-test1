import Button01 from "@/registry/block/Button/button-01/button"
import Button02 from "@/registry/block/Button/button-02/button"
import Button03 from "@/registry/block/Button/button-03/button"
import Button04 from "@/registry/block/Button/button-04/button"
import Button05 from "@/registry/block/Button/button-05/button"
import Button06 from "@/registry/block/Button/button-06/button"



import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const Button01Content = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-01/button.tsx'))
const Button01Css = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-01/Button.css'))

const Button02Content = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-02/button.tsx'))
const Button02Css = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-02/Button.css'))

const Button03Content = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-03/button.tsx'))
const Button03Css = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-03/Button.css'))

const Button04Content = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-04/button.tsx'))
const Button04Css = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-04/Button.css'))

const Button05Content = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-05/button.tsx'))
const Button05Css = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-05/Button.css'))

const Button06Content = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-06/button.tsx'))
const Button06Css = getFileContent(path.join(process.cwd(), 'registry/block/Button/button-06/Button.css'))

export const button = [
  {
    id:1,
    files: [
      {
        name: 'button.tsx',
        content: Button01Content
      },
      {
        name: 'Button.css',
        content: Button01Css
      },
    ],
    component: Button01,
    heading: "Pixel Bolt",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/button-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/button-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/button-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/button-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/button-01.json",
    },
  },
  {
    id:2,
    files: [
      {
        name: 'button.tsx',
        content: Button02Content
      },
      {
        name: 'Button.css',
        content: Button02Css
      },
    ],
    component: Button02,
    heading: "Pixel Tetris",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/button-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/button-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/button-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/button-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/button-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'button.tsx',
        content: Button03Content
      },
      {
        name: 'Button.css',
        content: Button03Css
      },
    ],
    component: Button03,
    heading: "Pixel Broke",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/button-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/button-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/button-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/button-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/button-03.json",
    },
  },
  {
    id: 4,
    files: [
      {
        name: 'button.tsx',
        content: Button04Content
      },
      {
        name: 'Button.css',
        content: Button04Css
      },
    ],
    component: Button04,
    heading: "Nothing Plop",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/button-04.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/button-04.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/button-04.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/button-04.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/button-04.json",
    },
  },
  {
    id: 5,
    files: [
      {
        name: 'button.tsx',
        content: Button05Content
      },
      {
        name: 'Button.css',
        content: Button05Css
      },
    ],
    component: Button05,
    heading: "Arrow Dots",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/button-05.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/button-05.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/button-05.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/button-05.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/button-05.json",
    },
  },
  {
    id: 6,
    files: [
      {
        name: 'button.tsx',
        content: Button06Content
      },
      {
        name: 'Button.css',
        content: Button06Css
      },
    ],
    component: Button06,
    heading: "Sneacky",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/button-06.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/button-06.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/button-06.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/button-06.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/button-06.json",
    },
  },
];

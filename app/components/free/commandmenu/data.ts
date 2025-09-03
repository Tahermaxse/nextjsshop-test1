import Demo from  "@/registry/block/CommandMenu/commandmenu-01/demo"
import Demo02 from  "@/registry/block/CommandMenu/commandmenu-02/demo"

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const commandMenuContent = getFileContent(path.join(process.cwd(), 'registry/block/CommandMenu/commandmenu-01/command-menu.tsx'))
const commandMenu02Content = getFileContent(path.join(process.cwd(), 'registry/block/CommandMenu/commandmenu-02/command-menu.tsx'))
const Demo02Content = getFileContent(path.join(process.cwd(), 'registry/block/CommandMenu/commandmenu-02/demo.tsx'))



export const commandmenu = [
  {
    id: 1,
    files: [
      {
        name: 'command-menu.tsx',
        content: commandMenuContent
      },
      {
        name: 'demo.tsx',
        content: `// Your styles code here`
      },
      {
        name: 'dialog.tsx',
        content: `// Your index.html code here`
      },
      {
        name: 'use-mobile.tsx',
        content: `// Your index.html code here`
      }
    ],
    component: Demo,
    heading: "Command Menu 01",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/commandmenu-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/commandmenu-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/commandmenu-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/commandmenu-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/commandmenu-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'command-menu.tsx',
        content: commandMenu02Content
      },
      {
        name: 'demo.tsx',
        content: Demo02Content
      },
    ],
    component: Demo02,
    heading: "Command Menu 02",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/commandmenu-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/commandmenu-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/commandmenu-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/commandmenu-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/commandmenu-02.json",
    },
  },

];




// {
//   id: 1,
//   files: [
//     {
//       name: 'command-menu.tsx',
//       content: `// Your demo component code here`
//     },
//     {
//       name: 'demo.tsx',
//       content: `// Your styles code here`
//     },
//     {
//       name: 'dialog.tsx',
//       content: `// Your index.html code here`
//     },
//     {
//       name: 'use-mobile.tsx',
//       content: `// Your index.html code here`
//     }
//   ],
//   component: Demo,
//   heading: "Command Menu 01",
//   customCommandMap: {
//     npm:
//       "npm install react-hook-form lucide-react zod @hookform/resolvers @tanstack/react-query axios",
//     yarn:
//       "yarn install react-hook-form lucide-react zod @hookform/resolvers @tanstack/react-query axios",
//     pnpm:
//       "pnpm install react-hook-form lucide-react zod @hookform/resolvers @tanstack/react-query axios",
//     bun:
//       "bun install react-hook-form lucide-react zod @hookform/resolvers @tanstack/react-query axios",
//   },
// },

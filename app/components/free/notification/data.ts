import Demo01 from "@/registry/block/Notification/notification-01/demo"
import Demo02 from "@/registry/block/Notification/notification-02/demo"
import Demo03 from "@/registry/block/Notification/notification-03/demo"

import Notification04 from "@/registry/block/Notification/notification-04/notification"
import Notification05 from "@/registry/block/Notification/notification-05/notification"
import Notification06 from "@/registry/block/Notification/notification-06/notification"
import Notification07 from "@/registry/block/Notification/notification-07/notification"
import Notification08 from "@/registry/block/Notification/notification-08/notification"
import Notification09 from "@/registry/block/Notification/notification-09/notification"
import Notification10 from "@/registry/block/Notification/notification-10/notification"

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const notification01Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-01/notification.tsx'))
const Demo1Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-01/demo.tsx'))

const notification02Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-02/notification.tsx'))
const Demo2Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-02/demo.tsx'))

const notification03Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-03/notification.tsx'))
const Demo3Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-03/demo.tsx'))

const notification04Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-04/notification.tsx'))
const notification05Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-05/notification.tsx'))
const notification06Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-06/notification.tsx'))
const notification07Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-07/notification.tsx'))
const notification08Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-08/notification.tsx'))
const notification09Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-09/notification.tsx'))
const notification10Content = getFileContent(path.join(process.cwd(), 'registry/block/Notification/notification-10/notification.tsx'))

export const notification = [
  {
    id: 1,
    files: [
      {
        name: 'notification.tsx',
        content: notification01Content
      },
      {
        name: 'demo.tsx',
        content: Demo1Content
      },
    ],
    component: Demo01,
    heading: "Notification 01",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'notification.tsx',
        content: notification02Content
      },
      {
        name: 'demo.tsx',
        content: Demo2Content
      },
    ],
    component: Demo02,
    heading: "Notification 02",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'notification.tsx',
        content: notification03Content
      },
      {
        name: 'demo.tsx',
        content: Demo3Content
      },
    ],
    component: Demo03,
    heading: "Notification 03",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-03.json",
    },
  },
  {
    id: 4,
    files: [
      {
        name: 'notification.tsx',
        content: notification04Content
      },
    ],
    component: Notification04,
    heading: "Notification 04",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-04.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add  https://nextjsshop.com/r/notification-04.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-04.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-04.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-04.json",
    }
  },
  {
    id: 5,
    files: [
      {
        name: 'notification.tsx',
        content: notification05Content
      },
    ],
    component: Notification05,
    heading: "Notification 05",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-05.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add  https://nextjsshop.com/r/notification-05.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-05.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-05.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-05.json",
    }
  },
  {
    id: 6,
    files: [
      {
        name: 'notification.tsx',
        content: notification06Content
      },
    ],
    component: Notification06,
    heading: "Notification 06",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-06.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add  https://nextjsshop.com/r/notification-06.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-06.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-06.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-06.json",
    }
  },
  {
    id: 7,
    files: [
      {
        name: 'notification.tsx',
        content: notification07Content
      },
    ],
    component: Notification07,
    heading: "Notification 07",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-07.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add  https://nextjsshop.com/r/notification-07.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-07.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-047json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-07.json",
    }
  },
  {
    id: 8,
    files: [
      {
        name: 'notification.tsx',
        content: notification08Content
      },
    ],
    component: Notification08,
    heading: "Notification 08",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-08.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add  https://nextjsshop.com/r/notification-08.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-08.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-08.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-08.json",
    }
  },
  {
    id: 9,
    files: [
      {
        name: 'notification.tsx',
        content: notification09Content
      },
    ],
    component: Notification09,
    heading: "Notification 09",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-09.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add  https://nextjsshop.com/r/notification-09.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-09.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-09.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-09.json",
    }
  },
  {
    id: 10,
    files: [
      {
        name: 'notification.tsx',
        content: notification10Content
      },
    ],
    component: Notification10,
    heading: "Notification 10",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/notification-10.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add  https://nextjsshop.com/r/notification-10.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/notification-10.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/notification-10.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/notification-10.json",
    }
  }
];

import Demo01 from "@/registry/block/ProfileCard/profilecard-01/demo"
import Demo02 from "@/registry/block/ProfileCard/profilecard-02/demo"
import Demo03 from "@/registry/block/ProfileCard/profilecard-03/demo"
import Demo04 from "@/registry/block/ProfileCard/profilecard-04/demo"
import Demo05 from "@/registry/block/ProfileCard/profilecard-05/demo"
import Demo06 from "@/registry/block/ProfileCard/profilecard-06/demo"
import Demo07 from "@/registry/block/ProfileCard/profilecard-07/demo"
import Demo08 from "@/registry/block/ProfileCard/profilecard-08/demo"
import Demo09 from "@/registry/block/ProfileCard/profilecard-09/demo"
import Demo10 from "@/registry/block/ProfileCard/profilecard-10/demo"

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const Profile01Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-01/profilecard.tsx'))
const Demo01Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-01/demo.tsx'))

const Profile02Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-02/profilecard.tsx'))
const Demo02Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-02/demo.tsx'))

const Profile03Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-03/profilecard.tsx'))
const Demo03Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-03/demo.tsx'))

const Profile04Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-04/profilecard.tsx'))
const Demo04Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-04/demo.tsx'))

const Profile05Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-05/profilecard.tsx'))
const Demo05Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-05/demo.tsx'))

const Profile06Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-06/profilecard.tsx'))
const Demo06Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-06/demo.tsx'))

const Profile07Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-07/profilecard.tsx'))
const Demo07Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-07/demo.tsx'))

const Profile08Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-08/profilecard.tsx'))
const Demo08Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-08/demo.tsx'))

const Profile09Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-09/profilecard.tsx'))
const Demo09Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-09/demo.tsx'))

const Profile10Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-10/profilecard.tsx'))
const Demo10Content = getFileContent(path.join(process.cwd(), 'registry/block/ProfileCard/profilecard-10/demo.tsx'))

export const profilecard = [
  {
    id: 1,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile01Content
      },
      {
        name: 'demo.tsx',
        content: Demo01Content
      }

    ],
    component: Demo01,
    heading: "Profile Card 01",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-01.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-01.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-01.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-01.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile02Content
      },
      {
        name: 'demo.tsx',
        content: Demo02Content
      }

    ],
    component: Demo02,
    heading: "Profile Card 02",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-02.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-02.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-02.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-02.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile03Content
      },
      {
        name: 'demo.tsx',
        content: Demo03Content
      }

    ],
    component: Demo03,
    heading: "Profile Card 03",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-03.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-03.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-03.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-03.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-03.json",
    },
  },
  {
    id: 4,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile04Content
      },
      {
        name: 'demo.tsx',
        content: Demo04Content
      }

    ],
    component: Demo04,
    heading: "Profile Card 04",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-04.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-04.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-04.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-04.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-04.json",
    },
  },
  {
    id: 5,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile05Content
      },
      {
        name: 'demo.tsx',
        content: Demo05Content
      }

    ],
    component: Demo05,
    heading: "Profile Card 05",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-05.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-05.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-05.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-05.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-05.json",
    },
  },
  {
    id: 6,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile06Content
      },
      {
        name: 'demo.tsx',
        content: Demo06Content
      }

    ],
    component: Demo06,
    heading: "Profile Card 06",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-06.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-06.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-06.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-06.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-06.json",
    },
  },
  {
    id: 7,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile07Content
      },
      {
        name: 'demo.tsx',
        content: Demo07Content
      }

    ],
    component: Demo07,
    heading: "Profile Card 07",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-07.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-07.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-07.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-07.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-07.json",
    },
  },
  {
    id: 8,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile08Content
      },
      {
        name: 'demo.tsx',
        content: Demo08Content
      }

    ],
    component: Demo08,
    heading: "Profile Card 08",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-08.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-08.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-08.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-08.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-08.json",
    },
  },
  {
    id: 9,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile09Content
      },
      {
        name: 'demo.tsx',
        content: Demo09Content
      }

    ],
    component: Demo09,
    heading: "Profile Card 09",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-09.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-09.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-09.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-09.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-09.json",
    },
  },
  {
    id: 10,
    files: [
      {
        name: 'profilecard.tsx',
        content: Profile10Content
      },
      {
        name: 'demo.tsx',
        content: Demo10Content
      }

    ],
    component: Demo10,
    heading: "Profile Card 10",
    v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/profilecard-10.json",
    customCommandMap: {
      npm:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-10.json",
      yarn:
        "npx shadcn@latest add https://nextjsshop.com/r/profilecard-10.json",
      pnpm:
        "pnpm dlx shadcn@latest add https://nextjsshop.com/r/profilecard-10.json",
      bun:
        "bunx --bun shadcn@latest add https://nextjsshop.com/r/profilecard-10.json",
    },
  },
];

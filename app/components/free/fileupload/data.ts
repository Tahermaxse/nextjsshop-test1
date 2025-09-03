import Demo01 from "@/registry/block/FileUpload/fileupload-01/demo";
import Demo02 from "@/registry/block/FileUpload/fileupload-02/demo";

import FileUpload03 from "@/registry/block/FileUpload/fileupload-03/fileupload";
import FileUpload04 from "@/registry/block/FileUpload/fileupload-04/fileupload";

import Demo05 from "@/registry/block/FileUpload/fileupload-05/demo";
import Demo06 from "@/registry/block/FileUpload/fileupload-06/demo";

import FileUpload07 from "@/registry/block/FileUpload/fileupload-07/fileupload";
import FileUpload08 from "@/registry/block/FileUpload/fileupload-08/fileupload";
import FileUpload09 from "@/registry/block/FileUpload/fileupload-09/fileupload";
import FileUpload10 from "@/registry/block/FileUpload/fileupload-10/fileupload";

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'

const FileContent01 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-01/fileupload.tsx'))
const DemoContent01 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-01/demo.tsx'))

const FileContent02 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-02/fileupload.tsx'))
const DemoContent02 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-02/demo.tsx'))

const FileContent03 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-03/fileupload.tsx'))

const FileContent04 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-04/fileupload.tsx'))

const FileContent05 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-05/fileupload.tsx'))
const DemoContent05 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-05/demo.tsx'))

const FileContent06 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-06/fileupload.tsx'))
const DemoContent06 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-06/demo.tsx'))

const FileContent07 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-07/fileupload.tsx'))

const FileContent08 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-08/fileupload.tsx'))

const FileContent09 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-09/fileupload.tsx'))

const FileContent10 = getFileContent(path.join(process.cwd(), 'registry/block/FileUpload/fileupload-10/fileupload.tsx'))

export const fileupload = [
    {
        id: 1,
        files: [
            {
                name: 'drawer.tsx',
                content: FileContent01
            },
            {
                name: 'demo.tsx',
                content: DemoContent01
            },
        ],
        component: Demo01,
        heading: "File Upload 01",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-01.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-01.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-01.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-01.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-01.json",
        },
    },
    {
        id: 2,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent02
            },
            {
                name: 'demo.tsx',
                content: DemoContent02
            },
        ],
        component: Demo02,
        heading: "File Upload 02",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-02.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-02.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-02.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-02.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-02.json",
        },
    },
    {
        id: 3,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent03
            },
        ],
        component: FileUpload03,
        heading: "File Upload 03",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-03.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-03.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-03.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-03.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-03.json",
        }
    },
    {
        id: 4,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent04
            },
        ],
        component: FileUpload04,
        heading: "File Upload 04",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-04.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-04.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-04.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-04.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-04.json",
        }
    },
    {
        id: 5,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent05
            },
            {
                name: 'Demo.tsx',
                content: DemoContent05
            },
        ],
        component: Demo05,
        heading: "File Upload 05",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-05.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-05.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-05.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-05.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-05.json",
        }
    },
    {
        id: 6,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent06
            },
            {
                name: 'Demo.tsx',
                content: DemoContent06
            },
        ],
        component: Demo06,
        heading: "File Upload 06",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-06.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-06.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-06.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-06.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-06.json",
        }
    },
    {
        id: 7,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent07
            },
        ],
        component: FileUpload07,
        heading: "File Upload 07",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-07.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-07.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-07.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-07.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-07.json",
        }
    },
    {
        id: 8,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent08
            },
        ],
        component: FileUpload08,
        heading: "File Upload 08",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-08.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-08.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-08.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-08.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-08.json",
        }
    },
    {
        id: 9,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent09
            },
        ],
        component: FileUpload09,
        heading: "File Upload 09",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-09.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-09.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-09.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-09.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-09.json",
        }
    },
    {
        id: 10,
        files: [
            {
                name: 'fileupload.tsx',
                content: FileContent10
            },
        ],
        component: FileUpload10,
        heading: "File Upload 10",
        v0: "https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/fileupload-10.json",
        customCommandMap: {
            npm:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-10.json",
            yarn:
                "npx shadcn@latest add https://nextjsshop.com/r/fileupload-10.json",
            pnpm:
                "pnpm dlx shadcn@latest add https://nextjsshop.com/r/fileupload-10.json",
            bun:
                "bunx --bun shadcn@latest add https://nextjsshop.com/r/fileupload-10.json",
        }
    }
];

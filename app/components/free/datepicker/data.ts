import Demo from "@/registry/block/Datepicker/datepicker-01/demo";
import Demo02 from "@/registry/block/Datepicker/dtepicker-02/demo";
import { DateRangePickerDialog } from "@/registry/block/Datepicker/datepicker-03/date-picker";

import { getFileContent } from "@/app/components/free/getfilecontent"
import path from 'path'
const datepicker01Content = getFileContent(path.join(process.cwd(), 'registry/block/Datepicker/datepicker-01/demo.tsx'))
const datepicker02Content = getFileContent(path.join(process.cwd(), 'registry/block/Datepicker/dtepicker-02/date-picker.tsx'))
const datepicker02demoContent = getFileContent(path.join(process.cwd(), 'registry/block/Datepicker/dtepicker-02/demo.tsx'))
const datepicker03Content = getFileContent(path.join(process.cwd(), 'registry/block/Datepicker/datepicker-03/date-picker.tsx'))


export const datepicker = [
  {
    id: 1,
    code: datepicker01Content,
    component: Demo,
    heading: "Date Picker 01",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/datepicker-01.json",
    customCommandMap: {
      npm:
      "npx shadcn@latest add https://nextjsshop.com/r/datepicker-01.json",
    yarn:
      "npx shadcn@latest add https://nextjsshop.com/r/datepicker-01.json",
    pnpm:
      "pnpm dlx shadcn@latest add https://nextjsshop.com/r/datepicker-01.json",
    bun:
      "bunx --bun shadcn@latest add https://nextjsshop.com/r/datepicker-01.json",
    },
  },
  {
    id: 2,
    files: [
      {
        name: 'datepicker.tsx',
        content: datepicker02Content
      },
      {
        name: 'demo.tsx',
        content: datepicker02demoContent
      },
    ],
    component: Demo02,
    heading: "Date Picker 02",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/datepicker-02.json",
    customCommandMap: {
      npm:
      "npx shadcn@latest add https://nextjsshop.com/r/datepicker-02.json",
    yarn:
      "npx shadcn@latest add https://nextjsshop.com/r/datepicker-02.json",
    pnpm:
      "pnpm dlx shadcn@latest add https://nextjsshop.com/r/datepicker-02.json",
    bun:
      "bunx --bun shadcn@latest add https://nextjsshop.com/r/datepicker-02.json",
    },
  },
  {
    id: 3,
    files: [
      {
        name: 'datepicker.tsx',
        content: datepicker03Content
      },
    ],
    component: DateRangePickerDialog,
    heading: "Date Picker 03",
    v0:"https://v0.dev/chat/api/open?url=https://nextjsshop.com/r/datepicker-01.json",
    customCommandMap: {
      npm:
      "npx shadcn@latest add https://nextjsshop.com/r/datepicker-03.json",
    yarn:
      "npx shadcn@latest add https://nextjsshop.com/r/datepicker-03.json",
    pnpm:
      "pnpm dlx shadcn@latest add https://nextjsshop.com/r/datepicker-03.json",
    bun:
      "bunx --bun shadcn@latest add https://nextjsshop.com/r/datepicker-03.json",
    },
  },

];

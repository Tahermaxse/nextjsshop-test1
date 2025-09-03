import { CommandMenu01 } from "./command-menu"

export default function Demo() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Command Menu Demo</h1>
        </div>
        <div className="w-full">
          <CommandMenu01 />
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Press <kbd className="rounded border bg-muted px-1.5 font-mono">⌘K</kbd> to open the command menu
        </div>
      </div>
    </div>
  )
}

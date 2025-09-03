import { CommandMenu02 } from "@/registry/block/CommandMenu/commandmenu-02/command-menu";

export default function Demo02() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-inherit dark:bg-inherit">
        <div className="w-full max-w-[640px] mx-auto">
          <div className="flex justify-between mb-4 items-center">
            <p className="text-sm text-muted-foreground">
              Press <kbd className="px-1 py-0.5 text-xs border rounded bg-muted">⌘K</kbd> to open the command menu
            </p>
          </div>
          <CommandMenu02 />
        </div>
      </main>
  )
}


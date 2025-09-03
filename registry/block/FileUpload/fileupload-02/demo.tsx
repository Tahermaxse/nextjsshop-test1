import { FileUpload02 } from "@/registry/block/FileUpload/fileupload-02/fileupload"

export default function Demo02() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">File Upload Component</h1>
        <FileUpload02 />
      </div>
    </main>
  )
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog04 } from "./dialog";
import { useToast } from "@/hooks/use-toast";

export default function Demo04() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    toast({
      title: "Workspace deleted",
      description: "The workspace 'Acme' has been permanently deleted.",
    });
    setOpen(false);
  };

  const handleGoToHome = () => {
    toast({
      title: "Navigating to Home",
      description: "You would be redirected to the home page.",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-md mx-auto">
        <Button onClick={() => setOpen(true)}>
          Open Delete Workspace Dialog
        </Button>

        <Dialog04
          open={open}
          onOpenChange={setOpen}
          workspaceName="Acme"
          workspaceDetails={{
            pipelines: 4,
            tests: 21,
            commits: 173,
          }}
          onDelete={handleDelete}
          onGoToHome={handleGoToHome}
        />
      </div>
    </main>
  );
}

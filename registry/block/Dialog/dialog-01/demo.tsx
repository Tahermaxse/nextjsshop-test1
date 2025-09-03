import { Dialog01 } from "./dialog";
import { Button } from "@/components/ui/button";
export const Demo01 = () => {
    return (
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-xl font-bold">Share Dialog</h2>
        <p className="text-muted-foreground text-center max-w-md">
          A dialog for sharing content via social media or copying a link
        </p>
        
        <Dialog01
          title="Share this page"
          description="Share this content with your friends and colleagues"
          contentUrl="https://example.com/shared-page"
          contentTitle="Amazing Content - Check this out!"
          trigger={<Button>Share Content</Button>}
        />
      </div>
    );
  };
import React from "react";
import Header from "../header";
import PreviewTabs from "../TabComponent";
import { ScriptCopyBtn } from "@/components/ui/script-copy-btn";
import { drawer } from "./data";

const Page = () => {
  return (
    <div className="container max-w-[1200px] mx-auto px-4 py-12">
      <Header name="Drawer" />

      {drawer.map(
        ({ id, component: Component, files,v0, heading, customCommandMap }) => (
          <div key={id} className="mb-8">
            <PreviewTabs
              component={<Component />}
              files={files}
              heading={heading}
              v0={v0}
            />

            <h2 className="text-lg font-bold mt-8">Installation</h2>
            <div className="mt-4">
              <ScriptCopyBtn
                showMultiplePackageOptions={true}
                codeLanguage="shell"
                lightTheme="nord"
                darkTheme="dracula"
                commandMap={customCommandMap}
              />
            </div>
            <div
              className="my-12 h-1 w-full text-gray-400 opacity-80 md:my-[72px]"
              style={{
                background:
                  "linear-gradient(90deg, currentColor 4px, transparent 4px) 50% 50% / 10px 1px repeat no-repeat",
              }}
              role="separator"
            />
          </div>
        ),
      )}
    </div>
  );
};

export default Page;

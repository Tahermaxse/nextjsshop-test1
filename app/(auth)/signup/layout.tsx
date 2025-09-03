import { viewport, siteConfig, generatePageSEO } from "@/config/site";
import { Metadata,  } from "next";

export {viewport};
export const metadata: Metadata = generatePageSEO(
  "Signup",
  siteConfig.description,
  "/signup"
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

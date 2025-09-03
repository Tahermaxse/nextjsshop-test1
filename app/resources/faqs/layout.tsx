import { viewport, siteConfig, generatePageSEO } from "@/config/site";
import { Metadata } from "next";

export { viewport };

export const metadata: Metadata = generatePageSEO(
  "Faqs",
  siteConfig.description,
  "/resources/faqs"
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

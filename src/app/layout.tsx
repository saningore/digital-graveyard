import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Digital Graveyard | Archive abandoned projects",
  description: "A resting place for unfinished software and the lessons it left behind.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main className="min-h-[calc(100vh-150px)]">{children}</main><Footer /></body></html>;
}

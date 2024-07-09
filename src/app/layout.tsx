import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { BlogProvider } from "@/context/blogContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Publish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <BlogProvider>{children}</BlogProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "./providers/SWRProvider";
import ToasterProvider from "./providers/ToasterProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "교양 뭐 듣지?",
  description: "대학생들의 교양 선택에 도움을 드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SWRProvider>
          <ToasterProvider />
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}

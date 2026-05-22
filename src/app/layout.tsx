import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "숭실대 컴퓨터학부 시험기간 시뮬레이션",
  description: "비주얼 노벨 스타일 OOP 3차전 시험기간 시뮬레이션 — GPTAddict, CoffeeLover, Bokhaksaeng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Russo_One, Chakra_Petch } from "next/font/google";
import "./globals.css";

const russoOne = Russo_One({
  weight: "400",
  variable: "--font-title",
  subsets: ["latin"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Last of Us — Sobreviver. Resistir. Persistir.",
  description:
    "Explore o mundo pós-apocalíptico de The Last of Us. Personagens, história, inimigos e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${russoOne.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

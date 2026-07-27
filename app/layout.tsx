import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sentient = localFont({
  src: "../public/fonts/Sentient-Bold.woff2",
  variable: "--font-sensient",
  display: "swap",
});

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcos Martins | Editor de Vídeo",
  description: "Portfólio de edição de vídeo e motion design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sentient.variable} ${satoshi.variable} font-satoshi bg-neutral-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
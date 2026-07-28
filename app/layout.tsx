import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://seusite.com.br"), // Substitua pelo seu domínio real
  title: {
    default: "Marcos Martins | Editor de Vídeo & Motion Design",
    template: "%s | Marcos Martins",
  },
  description: "Portfólio de Marcos Martins. Narrativa, edição de vídeo e comunicação visual focada em experiências digitais impactantes.",
  keywords: ["Edição de Vídeo", "Motion Design", "Filmmaker", "Portfólio", "Audiovisual", "São Paulo"],
  authors: [{ name: "Marcos Martins" }],
  creator: "Marcos Martins",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seusite.com.br",
    title: "Marcos Martins | Editor de Vídeo",
    description: "Portfólio de edição de vídeo, motion design e storytelling visual.",
    siteName: "Marcos Martins Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Marcos Martins Portfolio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Martins | Editor de Vídeo",
    description: "Portfólio de edição de vídeo, motion design e storytelling visual.",
    images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${sentient.variable} ${satoshi.variable} font-satoshi bg-neutral-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
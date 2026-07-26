import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://machomeats.com"),
  title: {
    default: "Macho Meats — No Meat No Life",
    template: "%s | Macho Meats",
  },
  description:
    "Handmade Nigerian kilishi and dambu nama. Sun-dried, fire-roasted, six ingredients, no preservatives. Order on WhatsApp.",
  openGraph: {
    siteName: "Macho Meats",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-olive-deep font-body antialiased">
        <CartProvider>
          <Nav />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

import "@/public/css/globals.css";
import Footer from "@/components/Footer";
import ToasterNotify from "@/components/Toaster";
import siteMetadata from "@/lib/metadata";
import { Lexend } from "next/font/google";

export const metadata = siteMetadata;

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={lexend.variable}>
      <body>
        {children}
        <ToasterNotify />
        <Footer />
      </body>
    </html>
  );
}

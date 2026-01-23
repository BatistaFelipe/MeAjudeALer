import "public/css/globals.css";
import { Globe, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "MeAjudeALer | Leitor acessível para pessoas com dislexia",
  description:
    "Ferramenta de leitura otimizada acessível para pessoas com dislexia.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <footer className="py-12 text-center bg-background">
          <div className="flex flex-col items-center gap-4 text-gray-500 text-sm">
            <p className="flex items-center gap-2">
              <Heart size={16} className="text-red-400" />
              Ferramenta gratuita e livre de anúncios.
            </p>

            <div className="flex gap-6">
              <Link
                href="https://github.com/BatistaFelipe/MeAjudeALer"
                target="_blank"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Image
                  src="/images/github.svg"
                  alt="GitHub"
                  className="w-5 h-5 "
                  width={20}
                  height={20}
                />
                GitHub
              </Link>
              <Link
                href="https://felipebatista.dev/"
                target="_blank"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Globe size={18} /> felipebatista.dev
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

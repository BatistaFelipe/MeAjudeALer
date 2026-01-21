import "public/css/globals.css";
import { Globe, Heart } from "lucide-react";

export const metadata = {
  title: "MeAjudeALer | Leitor acessível para pessoas com dislexia",
  description:
    "Ferramenta de leitura otimizada acessível para pessoas com dislexia.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayoutRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <footer className="mt-12 py-8 border-t border-gray-100 text-center">
          <div className="flex flex-col items-center gap-4 text-gray-500 text-sm">
            <p className="flex items-center gap-2">
              <Heart size={16} className="text-red-400" />
              Ferramenta gratuita e livre de anúncios.
            </p>

            <div className="flex gap-6">
              <a
                href="https://github.com/BatistaFelipe/MeAjudeALer"
                target="_blank"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <img
                  src="/images/github.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                />
                GitHub
              </a>
              <a
                href="https://felipebatista.dev/"
                target="_blank"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Globe size={18} /> felipebatista.dev
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

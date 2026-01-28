import { Globe, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
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
  );
}

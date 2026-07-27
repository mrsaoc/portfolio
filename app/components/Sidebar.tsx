"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-fit flex-shrink-0 flex flex-col justify-between sticky top-[240px] mt-[120px] h-[calc(100vh-260px)]">
      <div>
        <h1 className="font-sensient text-[40px] leading-[0.9] text-neutral-950 tracking-tight mb-10">
          marcos<br />martins
        </h1>
        
        <nav className="bg-neutral-100 p-5 rounded-2xl flex flex-col gap-6 w-fit">
          <ul className="flex flex-col gap-2 text-[16px] font-medium">
            <li>
              <Link 
                href="/" 
                className={`transition-colors ${
                  pathname === "/" 
                    ? "text-neutral-800" 
                    : "text-neutral-400 hover:text-neutral-800"
                }`}
              >
                films
              </Link>
            </li>
            <li>
              <Link 
                href="/info" 
                className={`transition-colors ${
                  pathname === "/info" 
                    ? "text-neutral-800" 
                    : "text-neutral-400 hover:text-neutral-800"
                }`}
              >
                info
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`transition-colors ${
                  pathname === "/contact" 
                    ? "text-neutral-800" 
                    : "text-neutral-400 hover:text-neutral-800"
                }`}
              >
                contact
              </Link>
            </li>
          </ul>
          
          <div className="flex items-center gap-3 mt-2">
            <a href="https://wa.me/5513996988700?text=Ol%C3%A1%2C%20Marcos!%20Tenho%20interesse%20no%20seu%20trabalho%20de%20edi%C3%A7%C3%A3o%20de%20v%C3%ADdeo." target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
              <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={16} height={16} />
            </a>
            <a href="https://instagram.com/mrsaoc" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
              <Image src="/icons/instagram.svg" alt="Instagram" width={16} height={16} />
            </a>
            <a href="mailto:mrsaocwork@gmail.com" className="opacity-40 hover:opacity-100 transition-opacity">
              <Image src="/icons/gmail.svg" alt="Gmail" width={16} height={16} />
            </a>
            <a href="https://www.behance.net/mrsaoc" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
              <Image src="/icons/behance.svg" alt="Behance" width={16} height={16} />
            </a>
          </div>
        </nav>
      </div>

      <div className="bg-neutral-100 px-4 py-2 rounded-full w-fit">
        <span className="text-[10px] text-neutral-400">© mrsaoc 2026</span>
      </div>
    </aside>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fecha o menu mobile automaticamente ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  return (
    <>
      {/* CABEÇALHO MOBILE (Visível apenas em telas pequenas) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-neutral-50/90 backdrop-blur-md z-40 flex items-center justify-between px-4 border-b border-neutral-200/50">
        <Link href="/" className="font-sensient text-[24px] leading-none text-neutral-950 tracking-tight">
          marcos<br />martins
        </Link>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 bg-neutral-100 rounded-full active:scale-95 transition-transform"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6L18 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* OVERLAY DO MENU MOBILE */}
      <div className={`lg:hidden fixed inset-0 bg-neutral-50 z-30 transition-all duration-300 ease-in-out flex flex-col px-8 pt-24 pb-12 ${
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        
        {/* Conteúdo Centralizado */}
        <div className="flex-1 flex flex-col justify-center">
          <nav className="flex flex-col gap-8 text-[32px] font-medium tracking-tight">
            <Link href="/" className={`transition-colors ${pathname === "/" ? "text-neutral-950" : "text-neutral-400"}`}>films</Link>
            <Link href="/info" className={`transition-colors ${pathname === "/info" ? "text-neutral-950" : "text-neutral-400"}`}>info</Link>
            <Link href="/contact" className={`transition-colors ${pathname === "/contact" ? "text-neutral-950" : "text-neutral-400"}`}>contact</Link>
          </nav>
          
          <div className="flex items-center gap-6 mt-12">
            <a href="https://wa.me/5513996988700" target="_blank" rel="noopener noreferrer" className="opacity-60">
              <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
            </a>
            <a href="https://instagram.com/mrsaoc" target="_blank" rel="noopener noreferrer" className="opacity-60">
              <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="mailto:mrsaocwork@gmail.com" className="opacity-60">
              <Image src="/icons/gmail.svg" alt="Gmail" width={24} height={24} />
            </a>
            <a href="https://www.behance.net/mrsaoc" target="_blank" rel="noopener noreferrer" className="opacity-60">
              <Image src="/icons/behance.svg" alt="Behance" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Rodapé Mobile */}
        <div className="w-full flex justify-start">
          <div className="bg-neutral-100 px-4 py-2 rounded-full w-fit">
            <span className="text-[10px] text-neutral-400">© mrsaoc 2026</span>
          </div>
        </div>

      </div>

      {/* SIDEBAR DESKTOP (Oculto no Mobile, Visível em lg) */}
      <aside className="hidden lg:flex w-fit flex-shrink-0 flex-col justify-between sticky top-[240px] mt-[120px] h-[calc(100vh-260px)] animate-fade-in-up z-10">
        <div>
          <h1 className="font-sensient text-[40px] leading-[0.9] text-neutral-950 tracking-tight mb-10">
            marcos<br />martins
          </h1>
          
          <nav className="bg-neutral-100 p-5 rounded-2xl flex flex-col gap-6 w-fit">
            <ul className="flex flex-col gap-2 text-[16px] font-medium">
              <li>
                <Link href="/" className={`transition-colors ${pathname === "/" ? "text-neutral-800" : "text-neutral-400 hover:text-neutral-800"}`}>
                  films
                </Link>
              </li>
              <li>
                <Link href="/info" className={`transition-colors ${pathname === "/info" ? "text-neutral-800" : "text-neutral-400 hover:text-neutral-800"}`}>
                  info
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`transition-colors ${pathname === "/contact" ? "text-neutral-800" : "text-neutral-400 hover:text-neutral-800"}`}>
                  contact
                </Link>
              </li>
            </ul>
            
            <div className="flex items-center gap-3 mt-2">
              <a href="https://wa.me/5513996988700" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-all duration-200">
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={16} height={16} />
              </a>
              <a href="https://instagram.com/mrsaoc" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-all duration-200">
                <Image src="/icons/instagram.svg" alt="Instagram" width={16} height={16} />
              </a>
              <a href="mailto:mrsaocwork@gmail.com" className="opacity-40 hover:opacity-100 transition-all duration-200">
                <Image src="/icons/gmail.svg" alt="Gmail" width={16} height={16} />
              </a>
              <a href="https://www.behance.net/mrsaoc" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-all duration-200">
                <Image src="/icons/behance.svg" alt="Behance" width={16} height={16} />
              </a>
            </div>
          </nav>
        </div>

        <div className="bg-neutral-100 px-4 py-2 rounded-full w-fit">
          <span className="text-[10px] text-neutral-400">© mrsaoc 2026</span>
        </div>
      </aside>
    </>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "./components/Sidebar";

const mockVideos = [
  { id: 1, author: "Jordan Smith", title: "Exciting Journeys", subtitle: "Enigma", src: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop" },
  { id: 2, author: "Taylor Brown", title: "Escapades", subtitle: "Puzzle", src: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop" },
  { id: 3, author: "Chris Lee", title: "Thrilling", subtitle: "Riddle", src: "https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?q=80&w=800&auto=format&fit=crop" },
  { id: 4, author: "Morgan White", title: "Wondrous Travels", subtitle: "Conundrum", src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop" },
  { id: 5, author: "Jamie Green", title: "Incredible Quests", subtitle: "Mystification", src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop" },
  { id: 6, author: "Riley Gray", title: "Fantastic Journeys", subtitle: "Whodunit", src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop" },
  { id: 7, author: "Casey Blue", title: "Epic Adventures", subtitle: "Secret", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
  { id: 8, author: "Skylar Red", title: "Vibrant Ventures", subtitle: "Mystery Box", src: "https://images.unsplash.com/photo-1518998053401-a436906a4b1b?q=80&w=800&auto=format&fit=crop" },
];

export default function Home() {
  const [isVerticalResolution, setIsVerticalResolution] = useState(true);

  return (
    <div className="w-full bg-neutral-50 flex justify-center">
      <main className="w-full max-w-[1440px] min-h-screen px-4 lg:px-[320px] pt-[120px] pb-20 flex items-start gap-[20px]">
        
        <Sidebar />

        {/* Conteúdo Principal (Showreel) */}
        <section className="flex-1 w-full min-w-0">
          
          {/* Controle de Resolução */}
          <div className="flex justify-start mb-[8px]">
            <button 
              onClick={() => setIsVerticalResolution(!isVerticalResolution)}
              className="bg-neutral-100 p-3 rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center group"
              aria-label="Alternar formato dos vídeos"
            >
              <Image 
                src="/icons/resolution.svg" 
                alt="Alterar Resolução" 
                width={20} 
                height={20}
                className="opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          {/* Grid de Mídias */}
          <div 
            className={`grid gap-[8px] transition-all duration-500 ${
              isVerticalResolution ? "grid-cols-4" : "grid-cols-2"
            }`}
          >
            {mockVideos.map((video) => (
              <div key={video.id} className="flex flex-col group cursor-pointer bg-neutral-100 rounded-2xl overflow-hidden">
                <div 
                  className={`relative w-full overflow-hidden rounded-2xl bg-neutral-200 transition-all duration-500 ${
                    isVerticalResolution ? "aspect-[9/16]" : "aspect-video"
                  }`}
                >
                  <Image 
                    src={video.src}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="flex flex-col items-center justify-center text-center pt-3 pb-4 px-2">
                  <span className="text-[10px] text-neutral-400">{video.author}</span>
                  <h3 className="text-[16px] font-medium text-neutral-800 leading-tight mt-1">{video.title}</h3>
                  <span className="text-[10px] text-neutral-600 mt-1">{video.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
          
        </section>
      </main>
    </div>
  );
}
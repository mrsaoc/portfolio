"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Sidebar from "./components/Sidebar";

const mockVideos = [
  { id: 1, author: "Jordan Smith", title: "Exciting Journeys", subtitle: "Enigma", thumbnail: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, author: "Taylor Brown", title: "Escapades", subtitle: "Puzzle", thumbnail: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, author: "Chris Lee", title: "Thrilling", subtitle: "Riddle", thumbnail: "https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, author: "Morgan White", title: "Wondrous Travels", subtitle: "Conundrum", thumbnail: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 5, author: "Jamie Green", title: "Incredible Quests", subtitle: "Mystification", thumbnail: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 6, author: "Riley Gray", title: "Fantastic Journeys", subtitle: "Whodunit", thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 7, author: "Casey Blue", title: "Epic Adventures", subtitle: "Secret", thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 8, author: "Skylar Red", title: "Vibrant Ventures", subtitle: "Mystery Box", thumbnail: "https://images.unsplash.com/photo-1518998053401-a436906a4b1b?q=80&w=800&auto=format&fit=crop", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export default function Home() {
  const [isVerticalResolution, setIsVerticalResolution] = useState(true);
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null);

  // Estados do Custom Video Player
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  // Controla o scroll do body quando o modal abre
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
      setIsPlaying(true);
    } else {
      document.body.style.overflow = "auto";
      setIsPlaying(false);
      setProgress(0);
    }
  }, [selectedVideo]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const bar = e.currentTarget;
      const clickX = e.clientX - bar.getBoundingClientRect().left;
      const newTime = (clickX / bar.offsetWidth) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const isGlobalHoverActive = hoveredVideoId !== null;

  return (
    <>
      <div className="w-full bg-neutral-50 flex justify-center">
        <main className="w-full max-w-[1440px] min-h-screen px-4 lg:px-[320px] pt-[120px] pb-20 flex items-start gap-[20px]">
          
          <Sidebar className={isGlobalHoverActive ? "blur-[2px] opacity-60 transition-all duration-300" : "transition-all duration-300"} />

          {/* Conteúdo Principal (Showreel) */}
          <section className="flex-1 w-full min-w-0 opacity-0 animate-fade-in-up [animation-delay:150ms]">
            
            {/* Controle de Resolução */}
            <div className={`flex justify-start mb-[8px] transition-all duration-300 ${isGlobalHoverActive ? "blur-[2px] opacity-60" : ""}`}>
              <button 
                onClick={() => setIsVerticalResolution(!isVerticalResolution)}
                className="bg-neutral-100 p-3 rounded-xl hover:bg-neutral-200 active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-pointer"
                aria-label="Alternar formato dos vídeos"
              >
                <Image 
                  src="/icons/resolution.svg" 
                  alt="Alterar Resolução" 
                  width={20} 
                  height={20}
                  className={`opacity-40 group-hover:opacity-100 transition-all duration-300 ${!isVerticalResolution ? "rotate-90" : "rotate-0"}`}
                />
              </button>
            </div>

            {/* Grid de Mídias */}
            <div 
              className={`grid gap-[8px] transition-all duration-500 ${
                isVerticalResolution ? "grid-cols-4" : "grid-cols-2"
              }`}
            >
              {mockVideos.map((video) => {
                const isHovered = hoveredVideoId === video.id;
                const isOtherHovered = isGlobalHoverActive && !isHovered;

                return (
                  <div 
                    key={video.id} 
                    onMouseEnter={() => setHoveredVideoId(video.id)}
                    onMouseLeave={() => setHoveredVideoId(null)}
                    onClick={() => setSelectedVideo(video)}
                    className={`flex flex-col group cursor-pointer bg-neutral-100 rounded-2xl overflow-hidden transition-all duration-300 ease-out
                      ${isHovered ? "scale-105 shadow-2xl z-10 bg-neutral-50" : "scale-100 z-0"}
                      ${isOtherHovered ? "blur-[2px] opacity-60 scale-[0.98]" : ""}
                    `}
                  >
                    <div 
                      className={`relative w-full overflow-hidden rounded-2xl bg-neutral-200 transition-all duration-500 ${
                        isVerticalResolution ? "aspect-[9/16]" : "aspect-video"
                      }`}
                    >
                      <Image 
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className={`object-cover transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
                      />
                    </div>
                    
                    <div className="flex flex-col items-center justify-center text-center pt-3 pb-4 px-2">
                      <span className="text-[10px] text-neutral-400">{video.author}</span>
                      <h3 className="text-[16px] font-medium text-neutral-800 leading-tight mt-1">{video.title}</h3>
                      <span className="text-[10px] text-neutral-600 mt-1">{video.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </section>
        </main>
      </div>

      {/* Modal de Vídeo Customizado */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-xl animate-fade-in p-4 lg:p-12"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Container do Player (Orientação Dinâmica) */}
          <div 
            className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col group transition-all duration-500 ${
              isVerticalResolution ? "w-full max-w-[400px] aspect-[9/16]" : "w-full max-w-[1024px] aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Vídeo Nativo */}
            <video 
              ref={videoRef}
              src={selectedVideo.videoSrc}
              className={`w-full h-full cursor-pointer ${isVerticalResolution ? "object-cover" : "object-contain"}`}
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              autoPlay
            />

            {/* Controles Customizados Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-4">
              
              {/* Timeline */}
              <div 
                className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer overflow-hidden flex items-center"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Botões e Informações */}
              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-6">
                  {/* Play / Pause */}
                  <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
                    {isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2 group/volume">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all duration-300 accent-white h-1 bg-white/30 rounded-full cursor-pointer appearance-none"
                    />
                  </div>
                </div>

                {/* Título do Vídeo no Player */}
                <div className="text-right">
                  <h4 className="text-white text-sm font-medium">{selectedVideo.title}</h4>
                  <span className="text-white/60 text-xs">{selectedVideo.author}</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
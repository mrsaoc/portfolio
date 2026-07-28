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

function VideoCard({ video, isVerticalResolution, onClick }: { video: typeof mockVideos[0], isVerticalResolution: boolean, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    // Apenas ativa no hover de mouse (evita conflitos em touch screens)
    if (window.matchMedia("(hover: hover)").matches) {
      setIsHovered(true);
      if (hoverVideoRef.current) {
        hoverVideoRef.current.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverVideoRef.current) {
      hoverVideoRef.current.pause();
      hoverVideoRef.current.currentTime = 0;
      hoverVideoRef.current.muted = true;
    }
    setProgress(0);
    setIsMuted(true);
  };

  const handleTimeUpdate = () => {
    if (hoverVideoRef.current) {
      const currentProgress = (hoverVideoRef.current.currentTime / hoverVideoRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (hoverVideoRef.current && hoverVideoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      hoverVideoRef.current.currentTime = percentage * hoverVideoRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  const toggleCardMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (hoverVideoRef.current) {
      hoverVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="flex flex-col group cursor-pointer bg-neutral-100 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl z-0 hover:z-10 relative"
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
          className={`object-cover transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
        
        <video
          ref={hoverVideoRef}
          src={video.videoSrc}
          muted={isMuted}
          loop
          playsInline
          disablePictureInPicture
          onTimeUpdate={handleTimeUpdate}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />

        <button
          onClick={toggleCardMute}
          onMouseDown={(e) => e.stopPropagation()}
          className={`absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all duration-300 z-20 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div 
          className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent cursor-pointer transition-opacity duration-300 z-10 flex items-end ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleTimelineClick}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="w-full h-1 bg-white/30">
            <div 
              className="h-full bg-white transition-all duration-75 ease-linear pointer-events-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center pt-3 pb-4 px-2 bg-neutral-100">
        <span className="text-[10px] text-neutral-400">{video.author}</span>
        <h3 className="text-[16px] font-medium text-neutral-800 leading-tight mt-1">{video.title}</h3>
        <span className="text-[10px] text-neutral-600 mt-1">{video.subtitle}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [isVerticalResolution, setIsVerticalResolution] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null);

  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalProgress, setModalProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
      setIsPlaying(true);
    } else {
      document.body.style.overflow = "auto";
      setIsPlaying(false);
      setModalProgress(0);
    }
  }, [selectedVideo]);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleModalTimeUpdate = () => {
    if (modalVideoRef.current) {
      const currentProgress = (modalVideoRef.current.currentTime / modalVideoRef.current.duration) * 100;
      setModalProgress(currentProgress);
    }
  };

  const handleModalProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (modalVideoRef.current) {
      const bar = e.currentTarget;
      const clickX = e.clientX - bar.getBoundingClientRect().left;
      const newTime = (clickX / bar.offsetWidth) * modalVideoRef.current.duration;
      modalVideoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (modalVideoRef.current) {
      modalVideoRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <div className="w-full bg-neutral-50 flex justify-center">
        {/* PT-24 garante espaço para o cabeçalho mobile; LG:PT-[120px] para o layout original */}
        <main className="w-full max-w-[1440px] min-h-screen px-4 lg:px-[320px] pt-28 lg:pt-[120px] pb-20 flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[20px]">
          
          <Sidebar />

          <section className="flex-1 w-full min-w-0 opacity-0 animate-fade-in-up [animation-delay:150ms]">
            
            <div className="flex justify-end lg:justify-start mb-[16px] lg:mb-[8px]">
              <button 
                onClick={() => setIsVerticalResolution(!isVerticalResolution)}
                className="bg-neutral-100 p-3 rounded-xl hover:bg-neutral-200 active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-pointer shadow-sm lg:shadow-none"
                aria-label="Alternar formato dos vídeos"
              >
                <Image 
                  src="/icons/resolution.svg" 
                  alt="Alterar Resolução" 
                  width={20} 
                  height={20}
                  className={`opacity-60 lg:opacity-40 group-hover:opacity-100 transition-all duration-300 ${!isVerticalResolution ? "rotate-90" : "rotate-0"}`}
                />
              </button>
            </div>

            {/* GRID RESPONSIVO: 
                Mobile Vertical: 2 colunas, Mobile Horizontal: 1 coluna 
                Desktop Vertical: 4 colunas, Desktop Horizontal: 2 colunas */}
            <div 
              className={`grid gap-[12px] lg:gap-[8px] transition-all duration-500 ${
                isVerticalResolution 
                  ? "grid-cols-2 lg:grid-cols-4" 
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {mockVideos.map((video) => (
                <VideoCard 
                  key={video.id}
                  video={video}
                  isVerticalResolution={isVerticalResolution}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
            
          </section>
        </main>
      </div>

      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/90 backdrop-blur-xl animate-fade-in p-4 lg:p-12"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col group transition-all duration-500 ${
              isVerticalResolution 
                ? "w-full max-w-[400px] aspect-[9/16]" 
                : "w-full max-w-[1024px] aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <video 
              ref={modalVideoRef}
              src={selectedVideo.videoSrc}
              disablePictureInPicture
              className={`w-full h-full cursor-pointer ${isVerticalResolution ? "object-cover" : "object-contain"}`}
              onClick={togglePlay}
              onTimeUpdate={handleModalTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              autoPlay
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/80 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-4">
              
              <div 
                className="w-full h-2 lg:h-1.5 bg-white/30 rounded-full cursor-pointer overflow-hidden flex items-center"
                onClick={handleModalProgressClick}
              >
                <div 
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${modalProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 lg:gap-6">
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

                  <div className="hidden lg:flex items-center gap-2 group/volume">
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
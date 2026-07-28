"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Video = {
  id: number;
  author: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  videoSrc: string;
};

// Utilitário para Feedback Tátil
const vibrate = (ms: number) => {
  if (typeof window !== "undefined" && navigator.vibrate) {
    navigator.vibrate(ms);
  }
};

function VideoCard({ video, isVerticalResolution, onClick }: { video: Video, isVerticalResolution: boolean, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
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
    vibrate(30);
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
    vibrate(40);
    if (hoverVideoRef.current) {
      hoverVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => { vibrate(50); onClick(); }}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Reproduzir vídeo: ${video.title}`}
      className="flex flex-col group cursor-pointer bg-neutral-100 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900 z-0 hover:z-10 relative"
    >
      <div 
        className={`relative w-full overflow-hidden rounded-2xl bg-neutral-200 transition-all duration-500 ${
          isVerticalResolution ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <Image 
          src={video.thumbnail}
          alt={`Thumbnail de ${video.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />

        <button
          onClick={toggleCardMute}
          onMouseDown={(e) => e.stopPropagation()}
          className={`absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all duration-300 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div 
          className={`absolute bottom-0 left-0 right-0 h-12 lg:h-8 bg-gradient-to-t from-black/40 to-transparent cursor-pointer transition-opacity duration-300 z-10 flex items-end pb-2 lg:pb-0 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleTimelineClick}
          onMouseDown={(e) => e.stopPropagation()}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Progresso do vídeo"
        >
          <div className="w-full h-1.5 lg:h-1 bg-white/30">
            <div 
              className="h-full bg-white transition-all duration-75 ease-linear pointer-events-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center pt-3 pb-4 px-2 bg-neutral-100">
        <span className="text-[10px] text-neutral-500 font-medium tracking-wide uppercase">{video.author}</span>
        <h3 className="text-[16px] font-bold text-neutral-900 leading-tight mt-1">{video.title}</h3>
        <span className="text-[11px] text-neutral-600 mt-1">{video.subtitle}</span>
      </div>
    </article>
  );
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [isVerticalResolution, setIsVerticalResolution] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalProgress, setModalProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
      setIsPlaying(true);
      modalContainerRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
      setIsPlaying(false);
      setModalProgress(0);
    }
  }, [selectedVideo]);

  const togglePlay = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    vibrate(40);
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
    vibrate(30);
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

  const closePlayer = () => {
    vibrate(40);
    setSelectedVideo(null);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePlayer();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <section className="flex-1 w-full min-w-0 opacity-0 animate-fade-in-up [animation-delay:150ms]">
        <div className="flex justify-end lg:justify-start mb-[16px] lg:mb-[8px]">
          <button 
            onClick={() => { vibrate(50); setIsVerticalResolution(!isVerticalResolution); }}
            className="bg-neutral-100 p-3 rounded-xl hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900 active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-pointer shadow-sm lg:shadow-none"
            aria-pressed={isVerticalResolution}
            aria-label={isVerticalResolution ? "Mudar para visualização horizontal" : "Mudar para visualização vertical"}
          >
            <Image 
              src="/icons/resolution.svg" 
              alt="" 
              width={20} 
              height={20}
              className={`opacity-60 lg:opacity-40 group-hover:opacity-100 transition-all duration-300 ${!isVerticalResolution ? "rotate-90" : "rotate-0"}`}
            />
          </button>
        </div>

        <div 
          className={`grid gap-[12px] lg:gap-[8px] transition-all duration-500 ${
            isVerticalResolution 
              ? "grid-cols-2 lg:grid-cols-4" 
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {videos.map((video) => (
            <VideoCard 
              key={video.id}
              video={video}
              isVerticalResolution={isVerticalResolution}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </section>

      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/95 backdrop-blur-xl animate-fade-in p-4 lg:p-12"
          onClick={closePlayer}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            ref={modalContainerRef}
            tabIndex={-1}
            className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col group transition-all duration-500 focus-visible:outline-none ${
              isVerticalResolution 
                ? "w-full max-w-[400px] aspect-[9/16]" 
                : "w-full max-w-[1024px] aspect-video"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closePlayer}
              className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fechar player de vídeo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-4">
              <div 
                className="w-full h-3 lg:h-1.5 bg-white/30 rounded-full cursor-pointer overflow-hidden flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={handleModalProgressClick}
                onKeyDown={(e) => { if(e.key === 'Enter') handleModalProgressClick(e as any) }}
                tabIndex={0}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={modalProgress}
                aria-label="Progresso do vídeo"
              >
                <div 
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${modalProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 lg:gap-6">
                  <button 
                    onClick={togglePlay} 
                    className="text-white hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full p-1"
                    aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  <div className="hidden lg:flex items-center gap-2 group/volume">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white" aria-hidden="true">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      aria-label="Controle de Volume"
                      className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all duration-300 accent-white h-1 bg-white/30 rounded-full cursor-pointer appearance-none focus-visible:w-20 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    />
                  </div>
                </div>

                <div className="text-right">
                  <h4 id="modal-title" className="text-white text-sm font-bold">{selectedVideo.title}</h4>
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{selectedVideo.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
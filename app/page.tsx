import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";

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
  return (
    <div className="w-full bg-neutral-50 flex justify-center">
      <main className="w-full max-w-[1440px] min-h-screen px-4 lg:px-[320px] pt-28 lg:pt-[120px] pb-20 flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[20px]">
        <Sidebar />
        
        {/* Renderiza a matriz de dados nativamente no servidor e injeta no cliente */}
        <VideoGrid videos={mockVideos} />
      </main>
    </div>
  );
}
import Image from "next/image";
import Sidebar from "../components/Sidebar";

export default function Contact() {
  return (
    <div className="w-full bg-neutral-50 flex justify-center">
      <main className="w-full max-w-[1440px] min-h-screen px-4 lg:px-[320px] pt-[120px] pb-20 flex items-start gap-[20px]">
        
        <Sidebar />

        {/* Conteúdo Principal (Contact) */}
        <section className="flex-1 w-full min-w-0 opacity-0 animate-fade-in-up [animation-delay:150ms]">
          
          {/* Título da Seção */}
          <h2 className="text-[40px] font-bold text-neutral-950 mb-[12px] tracking-tight">
            Get in touch!
          </h2>
          
          {/* Card de Contato com Altura Fixada */}
          <div className="bg-neutral-100 rounded-3xl flex overflow-hidden h-[312px]">
            <div className="p-[24px] flex-1 flex flex-col gap-[20px] justify-center">
              
              <div className="group w-fit">
                <p className="text-[20px] font-medium leading-[1.1] text-neutral-800 mb-1 transition-colors group-hover:text-neutral-950">
                  Whatsapp
                </p>
                <a href="https://wa.me/5513996988700?text=Ol%C3%A1%2C%20Marcos!%20Tenho%20interesse%20no%20seu%20trabalho%20de%20edi%C3%A7%C3%A3o%20de%20v%C3%ADdeo." target="_blank" rel="noopener noreferrer" className="inline-block text-[16px] font-normal text-neutral-600 hover:text-neutral-900 group-hover:translate-x-1 active:scale-[0.98] transition-all duration-200">
                  +55 (13) 99698-8700
                </a>
              </div>
              
              <div className="group w-fit">
                <p className="text-[20px] font-medium leading-[1.1] text-neutral-800 mb-1 transition-colors group-hover:text-neutral-950">
                  Instagram
                </p>
                <a href="https://instagram.com/mrsaoc" target="_blank" rel="noopener noreferrer" className="inline-block text-[16px] font-normal text-neutral-600 hover:text-neutral-900 group-hover:translate-x-1 active:scale-[0.98] transition-all duration-200">
                  @mrsaoc
                </a>
              </div>
              
              <div className="group w-fit">
                <p className="text-[20px] font-medium leading-[1.1] text-neutral-800 mb-1 transition-colors group-hover:text-neutral-950">
                  Gmail
                </p>
                <a href="mailto:mrsaocwork@gmail.com" className="inline-block text-[16px] font-normal text-neutral-600 hover:text-neutral-900 group-hover:translate-x-1 active:scale-[0.98] transition-all duration-200">
                  mrsaocwork@gmail.com
                </a>
              </div>
              
              <div className="group w-fit">
                <p className="text-[20px] font-medium leading-[1.1] text-neutral-800 mb-1 transition-colors group-hover:text-neutral-950">
                  Behance
                </p>
                <a href="https://www.behance.net/mrsaoc" target="_blank" rel="noopener noreferrer" className="inline-block text-[16px] font-normal text-neutral-600 hover:text-neutral-900 group-hover:translate-x-1 active:scale-[0.98] transition-all duration-200">
                  www.behance.net/mrsaoc
                </a>
              </div>
              
            </div>
            
            {/* Imagem */}
            <div className="w-[185px] relative flex-shrink-0 bg-neutral-200">
              <Image 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" 
                alt="Marcos Martins Contact" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
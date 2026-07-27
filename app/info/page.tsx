import Image from "next/image";
import Sidebar from "../components/Sidebar";

export default function Info() {
  return (
    <div className="w-full bg-neutral-50 flex justify-center">
      <main className="w-full max-w-[1440px] min-h-screen px-4 lg:px-[320px] pt-[120px] pb-20 flex items-start gap-[20px]">
        
        <Sidebar />

        {/* Conteúdo Principal (Info) */}
        <section className="flex-1 w-full min-w-0">
          
          {/* Seção de Biografia */}
          <h2 className="text-[40px] font-bold text-neutral-950 mb-[12px] tracking-tight">
            Marcos is
          </h2>
          
          <div className="bg-neutral-100 rounded-3xl flex overflow-hidden mb-12">
            <div className="p-[24px] flex-1">
              <p className="text-[20px] leading-[1.1] text-neutral-800">
                When I was young, I decided that no matter what I did in life, it would involve a computer in front of me. A digital nerd from Brazil, I&apos;ve always had a passion for narrative storytelling and creative technology. At 22 years old, I continue exploring the intersection between storytelling, editing, and digital media, always focused on creating impactful experiences through visual communication.
                <br /><br />
                To me, story is always the strongest part of any edit, and I strive to ensure it is being told as effectively as possible across any medium.
              </p>
            </div>
            
            {/* Imagem de Perfil */}
            <div className="w-[185px] relative flex-shrink-0 bg-neutral-200">
              <Image 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" 
                alt="Marcos Martins" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>

          {/* Seção de Clientes */}
          <h2 className="text-[40px] font-bold text-neutral-950 mb-[12px] tracking-tight">
            Clients:
          </h2>
          
          <div className="bg-neutral-100 rounded-3xl p-[24px] flex flex-col gap-[16px]">
            <div className="flex items-center justify-between flex-wrap gap-[16px]">
              <Image src="/icons/affiliacore.svg" alt="AffiliaCore" width={140} height={48} className="h-[48px] w-auto mix-blend-multiply opacity-80" />
              <Image src="/icons/nocratomarketing.svg" alt="Nocrato Marketing" width={140} height={48} className="h-[48px] w-auto mix-blend-multiply opacity-80" />
              <Image src="/icons/agenciaaxxon.svg" alt="Agência Axxon" width={140} height={48} className="h-[48px] w-auto mix-blend-multiply opacity-80" />
              <Image src="/icons/produtorapromise.svg" alt="Produtora Promise" width={140} height={48} className="h-[48px] w-auto mix-blend-multiply opacity-80" />
              <Image src="/icons/drmarcioalmeida.svg" alt="Dr Márcio Almeida" width={140} height={48} className="h-[48px] w-auto mix-blend-multiply opacity-80" />
              <Image src="/icons/drafabianafreitas.svg" alt="Dra Fabiana Freitas" width={140} height={48} className="h-[48px] w-auto mix-blend-multiply opacity-80" />
            </div>
            
            <p className="text-[12px] text-neutral-400">
              AffiliaCore, Nocrato Marketing, Agência Axxon, Produtora Promise, Dr Márcio Almeida, Dra Fabiana Freitas
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}
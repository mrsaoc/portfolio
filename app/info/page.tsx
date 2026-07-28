import Image from "next/image";
import Sidebar from "../components/Sidebar";

export default function Info() {
  return (
    <div className="w-full bg-neutral-50 flex justify-center">
      <main className="w-full max-w-[1440px] min-h-screen px-4 lg:px-[320px] pt-28 lg:pt-[120px] pb-20 flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[20px]">
        
        <Sidebar />

        <section className="flex-1 w-full min-w-0 opacity-0 animate-fade-in-up [animation-delay:150ms]">
          
          <h2 className="text-[32px] lg:text-[40px] font-bold text-neutral-950 mb-[12px] tracking-tight">
            Marcos is
          </h2>
          
          {/* BLOCO BIOGRÁFICO: Stacks no mobile, lado a lado no desktop */}
          <div className="bg-neutral-100 rounded-3xl flex flex-col-reverse lg:flex-row overflow-hidden mb-12">
            <div className="p-6 lg:p-[24px] flex-1">
              <p className="text-[18px] lg:text-[20px] leading-[1.3] lg:leading-[1.1] text-neutral-800">
                When I was young, I decided that no matter what I did in life, it would involve a computer in front of me. A digital nerd from Brazil, I&apos;ve always had a passion for narrative storytelling and creative technology. At 22 years old, I continue exploring the intersection between storytelling, editing, and digital media, always focused on creating impactful experiences through visual communication.
                <br /><br />
                To me, story is always the strongest part of any edit, and I strive to ensure it is being told as effectively as possible across any medium.
              </p>
            </div>
            
            <div className="w-full lg:w-[185px] h-[300px] lg:h-auto relative flex-shrink-0 bg-neutral-200">
              <Image 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" 
                alt="Marcos Martins" 
                fill 
                className="object-cover object-top" 
              />
            </div>
          </div>

          <h2 className="text-[32px] lg:text-[40px] font-bold text-neutral-950 mb-[12px] tracking-tight">
            Clients:
          </h2>
          
          <div className="bg-neutral-100 rounded-3xl p-6 lg:p-[24px] flex flex-col gap-[16px]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:items-center lg:justify-between flex-wrap gap-[16px] lg:gap-4">
              <Image src="/icons/affiliacore.svg" alt="AffiliaCore" width={140} height={48} className="h-[32px] lg:h-[48px] w-auto mix-blend-multiply opacity-60 pointer-events-none" />
              <Image src="/icons/nocratomarketing.svg" alt="Nocrato Marketing" width={140} height={48} className="h-[32px] lg:h-[48px] w-auto mix-blend-multiply opacity-60 pointer-events-none" />
              <Image src="/icons/agenciaaxxon.svg" alt="Agência Axxon" width={140} height={48} className="h-[32px] lg:h-[48px] w-auto mix-blend-multiply opacity-60 pointer-events-none" />
              <Image src="/icons/produtorapromise.svg" alt="Produtora Promise" width={140} height={48} className="h-[32px] lg:h-[48px] w-auto mix-blend-multiply opacity-60 pointer-events-none" />
              <Image src="/icons/drmarcioalmeida.svg" alt="Dr Márcio Almeida" width={140} height={48} className="h-[32px] lg:h-[48px] w-auto mix-blend-multiply opacity-60 pointer-events-none" />
              <Image src="/icons/drafabianafreitas.svg" alt="Dra Fabiana Freitas" width={140} height={48} className="h-[32px] lg:h-[48px] w-auto mix-blend-multiply opacity-60 pointer-events-none" />
            </div>
            
            <p className="text-[12px] text-neutral-400 mt-4 lg:mt-0">
              AffiliaCore, Nocrato Marketing, Agência Axxon, Produtora Promise, Dr Márcio Almeida, Dra Fabiana Freitas
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}
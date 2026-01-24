
import React from 'react';

const Pottery3DStudio: React.FC = () => {
  return (
    <section id="xuong-3d" className="scroll-mt-24 py-16">
      <div className="relative bg-brand-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-clay/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center">
          {/* Content Side */}
          <div className="lg:w-1/2 p-10 md:p-20 space-y-8">
            <div className="inline-flex items-center gap-3">
              <span className="px-3 py-1 bg-brand-clay text-white text-[10px] font-bold uppercase tracking-widest rounded-full">New Experience</span>
              <span className="text-brand-sand/50 text-xs font-bold tracking-widest uppercase">Công nghệ tương tác</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Xưởng Nặn Gốm <br/>
              <span className="text-brand-clay italic">Không gian 3D</span>
            </h2>
            
            <p className="text-brand-sand/70 text-lg leading-relaxed font-light">
              Lần đầu tiên, di sản gốm Mỹ Thiện được số hóa trong môi trường 3D sinh động. Bạn có thể xoay, nặn và tạo hình khối đất sét ảo ngay trên trình duyệt, cảm nhận sự tinh tế của từng đường nét trước khi bắt đầu thực hành thực tế.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://nan-gom.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-white text-brand-dark font-bold py-4 px-10 rounded-full transition-all hover:bg-brand-clay hover:text-white shadow-xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Trải nghiệm 3D ngay
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
              <div className="flex items-center gap-3 px-2 text-brand-sand/40 text-sm italic">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Tương thích tốt trên mobile & PC
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="lg:w-1/2 w-full p-8 lg:p-12">
            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-brand-clay/20 via-brand-dark to-black rounded-3xl border border-white/10 overflow-hidden group">
              {/* Floating UI Elements for 3D feel - Now with clean background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                   <div className="absolute inset-0 border-2 border-brand-clay/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                   <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                   <div className="absolute inset-8 border-2 border-brand-clay/10 rounded-full animate-[pulse_4s_ease-in-out_infinite]"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl md:text-9xl drop-shadow-[0_0_35px_rgba(168,118,62,0.6)] animate-bounce">🏺</span>
                   </div>
                </div>
              </div>

              {/* Grid Lines for 3D Space Effect */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #A8763E 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-xs text-white/80 font-medium">Render: WebGL Realtime Engine</div>
                <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-brand-clay animate-ping"></div>
                   <div className="w-2 h-2 rounded-full bg-brand-clay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pottery3DStudio;

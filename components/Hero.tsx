
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-brand-dark"
      aria-label="Giới thiệu làng gốm Mỹ Thiện"
    >
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        {/* Dark Overlay 50% */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Artistic Texture Overlay */}
        <div className="absolute inset-0 opacity-10 z-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        
        {/* Gradient for content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-dark/90 z-15"></div>
      </div>

      <div className="relative z-30 container mx-auto px-6 text-center text-white">
        <div className="inline-block px-4 py-1 mb-8 border border-brand-clay/50 rounded-full text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase backdrop-blur-md bg-white/5 animate-fade-in text-brand-sand">
          Di sản gốm cổ Quảng Ngãi
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 drop-shadow-2xl leading-[1.1] animate-fade-in-up">
          Mỹ Thiện <br/>
          <span className="text-brand-clay italic">Hồn của Đất</span>
        </h1>
        
        <p className="text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto opacity-80 drop-shadow-lg leading-relaxed animate-fade-in-up delay-200">
          Hành trình hơn 200 năm giữ lửa nghề, nơi đôi bàn tay nghệ nhân biến khối đất sét bình dị thành kiệt tác di sản.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-500">
          <a href="#gioi-thieu" className="group relative bg-brand-clay hover:bg-brand-terracotta text-white font-bold py-5 px-12 rounded-full transition-all overflow-hidden shadow-2xl">
            <span className="relative z-10">Khám phá di sản</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a href="#xuong-3d" className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/30 font-bold py-5 px-12 rounded-full transition-all">
            <span>Trải nghiệm Gốm 3D</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40 animate-pulse">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Cuộn để bắt đầu</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

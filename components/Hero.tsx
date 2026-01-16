
import React, { useState, useEffect } from 'react';

const videos = [
  "https://cdn.pixabay.com/video/2023/11/04/187747-880629471_large.mp4", // Cận cảnh nặn gốm 1
  "https://cdn.pixabay.com/video/2021/08/04/83901-584742464_large.mp4"   // Cận cảnh nặn gốm 2
];

const Hero: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev === 0 ? 1 : 0));
    }, 8000); // Chuyển video sau mỗi 8 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-brand-dark">
      {/* Background Videos with Cross-fade */}
      <div className="absolute inset-0 z-0">
        {/* Video Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-brand-dark/80 z-20"></div>
        
        {/* Ceramic Texture Overlay */}
        <div className="absolute inset-0 opacity-20 z-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

        {/* Video 1 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={videos[0]} type="video/mp4" />
        </video>

        {/* Video 2 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={videos[1]} type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-30 container mx-auto px-6 text-center text-white">
        <div className="inline-block px-4 py-1 mb-8 border border-brand-clay/50 rounded-full text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase backdrop-blur-md bg-white/5 animate-fade-in text-brand-sand">
          Di sản gốm cổ Quảng Ngãi
        </div>
        
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 drop-shadow-2xl leading-[1.1] animate-fade-in-up">
          Mỹ Thiện <br/>
          <span className="text-brand-clay italic">Hồn của Đất</span>
        </h1>
        
        <p className="text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto opacity-80 drop-shadow-lg leading-relaxed animate-fade-in-up delay-200">
          Hành trình hơn 200 năm gìn giữ ngọn lửa nghề, nơi đôi bàn tay nghệ nhân biến những khối đất sét bình dị thành kiệt tác di sản.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-500">
          <a 
            href="#gioi-thieu" 
            className="group relative bg-brand-clay hover:bg-brand-terracotta text-white font-bold py-5 px-12 rounded-full transition-all overflow-hidden shadow-[0_0_30px_rgba(168,118,62,0.4)]"
          >
            <span className="relative z-10">Khám phá di sản</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          
          <a 
            href="#sang-tao" 
            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/30 font-bold py-5 px-12 rounded-full transition-all"
          >
            <span>Thử tài nghệ nhân AI</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator with text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-50 animate-pulse">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Cuộn để xem tiếp</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;


import React, { useState } from 'react';

const VideoJourney: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="hanh-trinh-video" className="scroll-mt-24">
      <div className="relative bg-brand-dark rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 p-8 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-clay font-bold tracking-widest text-xs uppercase">
              <span className="w-8 h-px bg-brand-clay"></span>
              Phim tư liệu ngắn
            </div>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
              Hành trình của <br/> <span className="text-brand-clay italic">Đất & Lửa</span>
            </h3>
            <p className="text-brand-sand/70 text-lg leading-relaxed font-light">
              Mỗi tác phẩm gốm Mỹ Thiện đều bắt đầu từ những tảng đất sét thô sơ, được "thai nghén" qua bàn xoay thủ công và tôi luyện trong ngọn lửa đỏ rực của lò bầu truyền thống. 
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <h4 className="text-white font-bold text-sm uppercase mb-2">Bàn xoay thủ công</h4>
                <p className="text-xs text-brand-sand/50">Không dùng máy móc, mọi hình dáng đều từ đôi tay nhịp nhàng.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase mb-2">Men Hỏa Biến</h4>
                <p className="text-xs text-brand-sand/50">Sự biến ảo kỳ diệu của nhiệt độ tạo nên sắc màu độc bản.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full aspect-video lg:aspect-square relative group cursor-pointer overflow-hidden bg-black">
            {isPlaying ? (
              <iframe 
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/uSv1mywmaMQ?autoplay=1" 
                title="Hành trình Gốm Mỹ Thiện" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full relative" onClick={() => setIsPlaying(true)}>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                >
                  <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27dc36997cf628ee8da9051a44dba595cf39803&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
                
                {/* Artistic Frame Overlay */}
                <div className="absolute inset-0 border-[16px] border-brand-dark pointer-events-none"></div>
                
                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-clay/40 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Texture Decor */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-clay to-transparent opacity-30"></div>
      </div>
    </section>
  );
};

export default VideoJourney;

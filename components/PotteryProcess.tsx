
import React, { useEffect, useRef, useState } from 'react';

interface ProcessStep {
  title: string;
  subtitle: string;
  desc: string;
}

const steps: ProcessStep[] = [
  {
    title: 'Khai thác & Làm đất',
    subtitle: 'Sự tinh khiết của nguyên liệu',
    desc: 'Đất sét Mỹ Thiện được lấy từ các mỏ sét dọc sông Trà Bồng. Đất sau khi khai thác phải phơi khô, nghiền nhỏ rồi mới đem "muối" (ngâm nước) và lọc bỏ tạp chất qua nhiều lớp lưới. Quá trình này đảm bảo đất đạt độ dẻo mịn tối đa, không bị nứt vỡ khi nung ở nhiệt độ cao.'
  },
  {
    title: 'Tạo hình Thủ công',
    subtitle: 'Nhịp điệu của đôi bàn tay',
    desc: 'Khác với gốm công nghiệp, nghệ nhân Mỹ Thiện vẫn duy trì kỹ thuật "chuốt" trên bàn xoay thủ công. Đôi tay nhịp nhàng điều khiển khối đất vô tri, kết hợp với nhịp chân xoay bàn đá để tạo ra những hình khối cân đối, mang hơi thở và cảm xúc riêng của người thợ.'
  },
  {
    title: 'Chạm khắc & Đắp nổi',
    subtitle: 'Nghệ thuật trang trí đặc trưng',
    desc: 'Đây là giai đoạn tạo nên bản sắc. Nghệ nhân sử dụng kỹ thuật khắc vạch (khắc chìm) hoặc đắp nổi (đắp thêm đất) các họa tiết dân gian như rồng, phượng, hoa sen. Mỗi đường nét đều được thực hiện khi đất còn ẩm, đòi hỏi sự tập trung tuyệt đối và tay nghề điêu luyện.'
  },
  {
    title: 'Phủ Men Hỏa Biến',
    subtitle: 'Phép màu từ tro củi',
    desc: 'Men gốm Mỹ Thiện là loại men tự nhiên được chế biến từ tro củi và đá nghiền. Khi tráng men, nghệ nhân phải tính toán độ dày mỏng chính xác để khi vào lò, sự biến thiên của nhiệt độ sẽ tạo ra những sắc màu "hỏa biến" xanh ngọc, nâu hổ phách độc bản không sản phẩm nào giống sản phẩm nào.'
  },
  {
    title: 'Nung Lò Bầu',
    subtitle: 'Thử thách của Lửa',
    desc: 'Công đoạn cuối cùng và quan trọng nhất là nung trong lò bầu (lò rồng) truyền thống. Trong suốt 3 ngày đêm, nghệ nhân phải "canh lửa" liên tục để nhiệt độ đạt ngưỡng 1.200°C. Ngọn lửa đỏ rực sẽ tôi luyện đất và men thành những tác phẩm gốm bền bỉ vĩnh cửu với thời gian.'
  }
];

const StepCard: React.FC<{ step: ProcessStep; index: number }> = ({ step, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative pl-12 md:pl-20 border-l-2 border-brand-sand/50 pb-16 transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
    >
      {/* Step Number Dot */}
      <div className="absolute -left-[17px] top-0 w-8 h-8 bg-brand-clay text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg ring-4 ring-brand-glaze">
        {index + 1}
      </div>
      
      <div className="space-y-3">
        <span className="text-brand-clay font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Giai đoạn 0{index + 1}</span>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">{step.title}</h3>
        <p className="text-brand-terracotta font-medium italic text-base md:text-lg">{step.subtitle}</p>
        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-brand-sand/20 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const PotteryProcess: React.FC = () => {
  return (
    <section id="quy-trinh" className="scroll-mt-24 py-16">
      <div className="text-center mb-20">
        <span className="text-brand-clay font-bold tracking-[0.3em] uppercase text-sm block mb-4">Tinh hoa chế tác</span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-6">
          Quy trình Chế tác Thủ công
        </h2>
        <div className="w-24 h-1.5 bg-brand-clay mx-auto mb-8"></div>
        <p className="max-w-2xl mx-auto text-gray-500 italic px-4">
          Từ những khối đất thô sơ bên dòng sông Trà Bồng, trải qua 5 giai đoạn kỳ công dưới bàn tay nghệ nhân để trở thành di sản.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
          {/* Fading line end */}
          <div className="absolute bottom-0 -left-[1px] w-[2px] h-20 bg-gradient-to-b from-brand-sand/50 to-transparent"></div>
        </div>
      </div>

      {/* Modern Fact Box */}
      <div className="mt-16 max-w-3xl mx-auto bg-brand-dark text-brand-sand rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-clay/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
        <div className="relative z-10">
          <h4 className="text-xl md:text-2xl font-serif font-bold text-brand-clay mb-4">Giá trị của sự kỳ công</h4>
          <p className="text-brand-sand/70 leading-relaxed text-sm md:text-base">
            Tỷ lệ hỏng trong lò nung gốm Mỹ Thiện truyền thống có thể lên tới 30%. Chính sự khắc nghiệt này đã tạo nên giá trị độc bản cho những sản phẩm hoàn hảo cuối cùng, nơi mỗi vết rạn, mỗi sắc men đều kể một câu chuyện riêng.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PotteryProcess;

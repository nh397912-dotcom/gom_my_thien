
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section id="gioi-thieu" className="scroll-mt-24">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-sand/30">
        <div className="lg:w-1/2 p-8 md:p-16">
          <span className="text-brand-clay font-bold tracking-widest uppercase text-sm mb-3 block">Di sản văn hóa quốc gia</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-tight">
            Linh hồn của Đất & Lửa Mỹ Thiện
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg font-light">
            <p>
              Nằm bên dòng sông Trà Bồng hiền hòa, làng gốm Mỹ Thiện (thị trấn Châu Ổ, huyện Bình Sơn, Quảng Ngãi) đã tồn tại hơn 200 năm, là nơi lưu giữ hồn cốt của vùng đất Ấn Trà.
            </p>
            <p>
              Khác biệt với các dòng gốm khác, gốm Mỹ Thiện nổi danh với kỹ thuật <strong>tráng men hỏa biến</strong> cực kỳ tinh xảo và phương pháp <strong>đắp nổi thủ công</strong> đầy sống động.
            </p>
            <blockquote className="border-l-4 border-brand-clay pl-4 italic text-brand-terracotta font-medium bg-brand-glaze/30 py-4 pr-4 rounded-r-lg">
              "Mỗi sản phẩm là một câu chuyện độc bản, không có hai chiếc bình nào hoàn toàn giống nhau dưới tác động kỳ diệu của ngọn lửa lò bầu."
            </blockquote>
          </div>
        </div>
        <div className="lg:w-1/2 h-full">
          <img 
            src="https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=1200" 
            alt="Nghệ nhân đang tỉ mỉ nặn gốm Mỹ Thiện" 
            className="w-full h-full min-h-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Introduction;

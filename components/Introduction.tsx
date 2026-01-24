
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section id="gioi-thieu" className="scroll-mt-24">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <span className="text-brand-clay font-bold tracking-widest uppercase text-sm mb-2 block text-center lg:text-left">Di sản văn hóa phi vật thể</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-tight text-center lg:text-left">
            Linh hồn của Đất & Lửa Mỹ Thiện
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              Nằm bên dòng sông Trà Bồng hiền hòa, làng gốm Mỹ Thiện (thị trấn Châu Ổ, huyện Bình Sơn, Quảng Ngãi) đã tồn tại hơn 200 năm, trải qua bao thăng trầm của lịch sử.
            </p>
            <p>
              Khác biệt với gốm Bát Tràng hay Chu Đậu, gốm Mỹ Thiện nổi tiếng với kỹ thuật <strong>tráng men hỏa biến</strong> và <strong>đắp nổi thủ công</strong>. Mỗi sản phẩm không chỉ là vật dụng, mà là một tác phẩm nghệ thuật mang đậm cốt cách mộc mạc, kiên cường của người dân xứ Quảng.
            </p>
            <p className="italic text-brand-clay font-medium text-center lg:text-left border-l-4 border-brand-clay pl-4 mt-6">
              "Gốm Mỹ Thiện - Nơi đất sét hồi sinh qua đôi bàn tay nghệ nhân Đặng Văn Trịnh."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;

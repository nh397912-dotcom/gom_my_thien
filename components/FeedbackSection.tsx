
import React, { useState, useEffect, useRef } from 'react';

interface Feedback {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    name: "Nguyễn Thu Thủy",
    rating: 5,
    comment: "Sản phẩm gốm Mỹ Thiện thực sự rất đặc biệt, men hỏa biến nhìn bên ngoài còn đẹp hơn trong ảnh. Rất trân trọng nỗ lực giữ nghề của các nghệ nhân.",
    date: "15/05/2024"
  },
  {
    id: 2,
    name: "Trần Hoàng Nam",
    rating: 4,
    comment: "Trải nghiệm làm gốm rất thú vị. Nghệ nhân hướng dẫn cực kỳ nhiệt tình. Mong làng nghề mình ngày càng phát triển hơn nữa!",
    date: "10/05/2024"
  }
];

const FeedbackSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newFeedback: Feedback = {
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setName('');
    setComment('');
    setRating(5);
  };

  return (
    <section id="phan-hoi" ref={sectionRef} className="scroll-mt-24 py-16">
      <div className="text-center mb-16">
        <span className="text-brand-clay font-bold tracking-[0.3em] uppercase text-xs block mb-4">Cộng đồng Mỹ Thiện</span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">Phản hồi từ Khách hàng</h2>
        <div className="w-24 h-1 bg-brand-clay mx-auto"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-brand-sand sticky top-28">
            <h3 className="text-xl font-serif font-bold text-brand-dark mb-6">Gửi ý kiến của bạn</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Họ và tên</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none transition-all"
                  placeholder="Nhập tên của bạn"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Đánh giá</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Lời nhắn</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-clay outline-none transition-all resize-none"
                  rows={4}
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-terracotta text-white font-bold py-4 rounded-xl hover:bg-brand-clay transition-all shadow-lg active:scale-95"
              >
                Gửi phản hồi
              </button>
            </form>
          </div>
        </div>

        {/* Feedback List Column */}
        <div className="lg:col-span-2 space-y-6">
          {feedbacks.map((item, index) => (
            <div 
              key={item.id}
              className={`bg-white p-8 rounded-2xl shadow-sm border border-brand-sand/30 transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-brand-dark text-lg">{item.name}</h4>
                  <div className="flex text-yellow-500 text-sm mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < item.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{item.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                "{item.comment}"
              </p>
            </div>
          ))}
          
          {feedbacks.length === 0 && (
            <div className="text-center py-20 bg-brand-sand/10 rounded-3xl border-2 border-dashed border-brand-sand">
              <span className="text-4xl block mb-4">✍️</span>
              <p className="text-gray-500">Chưa có phản hồi nào. Hãy là người đầu tiên chia sẻ!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;

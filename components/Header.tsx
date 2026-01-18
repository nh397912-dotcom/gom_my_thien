
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLoginModal from './AdminLoginModal';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-brand-sand">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <a href="index.html" className="flex items-center gap-3 group">
              <div className="bg-brand-clay text-white w-10 h-10 rounded-lg flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform">
                🏺
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-serif font-bold text-brand-terracotta leading-none">
                  MỸ THIỆN
                </h1>
                <p className="text-[10px] md:text-xs text-brand-dark tracking-[0.2em] font-bold uppercase mt-1">Làng gốm Quảng Ngãi</p>
              </div>
            </a>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-brand-dark uppercase tracking-wider">
            <a href="#gioi-thieu" className="hover:text-brand-clay transition-colors px-2">Câu chuyện</a>
            <a href="https://t-l-ch-workshop.vercel.app/" className="hover:text-brand-clay transition-colors px-2">Workshop</a>
            <a href="https://shop-gom-my-thien.vercel.app/" className="hover:text-brand-clay transition-colors px-2">Shop đồ gốm</a>
            <a href="#san-pham" className="hover:text-brand-clay transition-colors px-2">Bộ sưu tập</a>
            <a href="#sang-tao" className="bg-brand-clay text-white px-5 py-2.5 rounded-full hover:bg-brand-terracotta transition-all shadow-sm">Xưởng AI</a>
          </nav>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-xs font-bold text-brand-accent border-2 border-brand-accent hover:bg-brand-accent hover:text-white py-2 px-4 rounded-full transition-all"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-bold text-brand-clay hover:text-brand-terracotta py-2 px-3 transition-colors uppercase tracking-tight"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </header>
      {!isLoggedIn && <AdminLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;

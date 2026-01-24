
import React, { useState } from 'react';
import type { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import EditProductModal from './EditProductModal';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { isLoggedIn } = useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Gốm Mỹ Thiện: ${product.name}`,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép liên kết để chia sẻ sản phẩm!');
      }
    } catch (err) {
      console.log('Error sharing product:', err);
    }
  };

  return (
    <>
      <div 
        className="w-[280px] md:w-[350px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group relative mx-4"
      >
        <div className="overflow-hidden aspect-[4/5] relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          />
          <button 
            onClick={handleShare}
            className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-brand-clay transition-all duration-300"
            title="Chia sẻ sản phẩm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold text-brand-dark group-hover:text-brand-clay transition-colors truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">{product.description}</p>
          <div className="mt-4 w-12 h-1 bg-brand-sand group-hover:w-full transition-all duration-500"></div>
        </div>
        {isLoggedIn && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditModalOpen(true);
              }}
              className="bg-brand-accent/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-brand-accent transition-all shadow-lg"
            >
              Sửa
            </button>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <EditProductModal
          product={product}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </>
  );
};


const ProductGallery: React.FC = () => {
  const { products } = useAuth();
  const extendedProducts = [...products, ...products];

  return (
    <section id="san-pham" className="mb-12 md:mb-16 scroll-mt-24 overflow-hidden">
      <div className="text-center mb-16">
        <span className="text-brand-clay font-bold tracking-[0.3em] uppercase text-xs">Di sản gốm xưa</span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mt-3">
          Bộ sưu tập tiêu biểu
        </h2>
        <div className="w-24 h-1 bg-brand-clay mx-auto mt-6"></div>
      </div>
      
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-pottery-texture to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-pottery-texture to-transparent z-10 pointer-events-none"></div>

        <div className="overflow-x-auto no-scrollbar py-8 flex items-center scroll-smooth snap-x">
          <div className="animate-marquee-right flex">
            {extendedProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-400 italic">Di chuột để dừng lại • Vuốt để xem nhanh</p>
      </div>
    </section>
  );
};

export default ProductGallery;

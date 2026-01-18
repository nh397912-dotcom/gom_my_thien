
import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import EditProductModal from './EditProductModal';

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const { isLoggedIn } = useAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div 
        ref={cardRef}
        className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 group relative ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-brand-dark">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        </div>
        {isLoggedIn && (
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="bg-brand-accent text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-opacity-80 transition-colors shadow-md"
            >
              Chỉnh sửa
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
  return (
    <section id="san-pham" className="mb-12 md:mb-16 scroll-mt-24 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-12 text-center">
        Bộ sưu tập tiêu biểu
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductGallery;


import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import PotteryProcess from './components/PotteryProcess';
import ProductGallery from './components/ProductGallery';
import CreativeStudio from './components/CreativeStudio';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <div className="container mx-auto px-4 py-16 space-y-24">
            <Introduction />
            <PotteryProcess />
            <ProductGallery />
            <CreativeStudio />
          </div>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

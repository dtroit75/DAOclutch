
'use client';
import { useEffect, useState } from 'react';
import TopBanner from './components/TopBanner';
import Hero from './components/Hero';
import ProjectPreview from './components/ProjectPreview';
import WalletSection from './components/WalletSection';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [clutchBalance, setClutchBalance] = useState<number>(250);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleBalanceUpdate = (balance: number) => {
    setClutchBalance(balance);
  };
  
  const handleVote = (projectId: string, voted: boolean) => {
    if (voted) {
      // Subtract 10 CLUTCH tokens when user votes
      setClutchBalance(prevBalance => Math.max(0, prevBalance - 10));
    }
  };
  
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      
      <main className="flex-grow">
        <Hero />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 py-8">
            {/* Main content area */}
            <div className="lg:w-3/4">
              <ProjectPreview />
              <Dashboard 
                userClutchBalance={clutchBalance}
                onVote={handleVote}
              />
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
              <WalletSection 
                clutchBalance={clutchBalance}
                onBalanceUpdate={handleBalanceUpdate}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

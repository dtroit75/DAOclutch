
'use client';
import { useState } from 'react';
interface TopBannerProps {}
const TopBanner: React.FC<TopBannerProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-green-600 text-white py-1.5 px-4 flex justify-between items-center">
      <div className="flex-1 text-center">
        <a 
          href="https://tokenhoops-49.lovable.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
        >
          🏀 Turn Your Plastic Into Impact — Visit Clutch Platform Now!
        </a>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-white hover:text-gray-200 ml-2"
        aria-label="Close banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};
export default TopBanner;

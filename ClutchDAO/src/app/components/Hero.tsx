
'use client';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
interface HeroProps {}
const Hero: React.FC<HeroProps> = () => {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Sustainable Basketball DAO
            </h1>
            <p className="text-lg mb-4">
              Join our community-driven platform that connects basketball with environmental impact. 
              Vote for projects, donate tokens, and earn rewards for participating in environmental activities.
            </p>
            <p className="text-base mb-6">
              Each CLUTCH token represents real-world action tied to environmental impact, 
              primarily through plastic waste segregation and recycling.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://tokenhoops-49.lovable.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                Join Clutch Platform
              </a>
              
              <a 
                href="https://tokenhoops-49.lovable.app/#activities" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium border border-white hover:bg-green-700 transition-colors text-sm"
              >
                ♻️ Earn Tokens
              </a>
              
              <a 
                href="https://tokenhoops-49.lovable.app/tickets" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium border border-white hover:bg-green-700 transition-colors text-sm"
              >
                🎁 Redeem Rewards
              </a>
            </div>
          </div>
          
          <div className="md:w-2/5">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                alt="Sustainable Basketball Initiative" 
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 font-medium text-sm">Total Impact</p>
                  <p className="text-gray-700 text-sm">15,000 kg CO₂ Offset</p>
                </div>
                <div>
                  <p className="text-green-700 font-medium text-sm">Active Projects</p>
                  <p className="text-gray-700 text-sm">6 Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
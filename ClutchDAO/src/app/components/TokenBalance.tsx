
'use client';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import type { UserProfile } from '../types/project';
import { FundButton } from '@coinbase/onchainkit/fund';
interface TokenBalanceProps {
  address: string;
  clutchBalance: number;
  onBalanceUpdate: (balance: number) => void;
}
const TokenBalance: React.FC<TokenBalanceProps> = ({ 
  address, 
  clutchBalance,
  onBalanceUpdate 
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(address);
        setUserProfile(data);
        
        // Update parent component with the fetched CLUTCH balance
        onBalanceUpdate(data.tokens.clutch);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };
    
    if (address) {
      fetchUserProfile();
    }
  }, [address, onBalanceUpdate]);
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  if (!userProfile) {
    return (
      <div className="p-3 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-sm">No profile data available.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200 hover:shadow-sm transition-shadow">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white p-1 mr-2 shadow-sm flex items-center justify-center">
            <img 
              src="https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm" 
              alt="CLUTCH" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-gray-600">CLUTCH Balance</p>
            <p className="text-lg font-bold text-gray-800">{clutchBalance}</p>
          </div>
        </div>
        <div className="flex mt-2 space-x-2">
          <a 
            href="https://tokenhoops-49.lovable.app/#activities" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors flex-1 text-center"
          >
            Earn More
          </a>
          <a 
            href="https://tokenhoops-49.lovable.app/tickets" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors flex-1 text-center"
          >
            Redeem
          </a>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200 hover:shadow-sm transition-shadow">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white p-1 mr-2 shadow-sm flex items-center justify-center">
            <img 
              src="https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2" 
              alt="USDC" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-gray-600">USDC Balance</p>
            <p className="text-lg font-bold text-gray-800">${userProfile.tokens.usdc}</p>
          </div>
        </div>
        <div className="mt-2">
          <FundButton text="Add Funds" hideIcon={true} className="w-full text-xs py-1 rounded" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white p-1 mr-2 shadow-sm flex items-center justify-center">
            <img 
              src="https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png" 
              alt="ETH" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-gray-600">ETH Balance</p>
            <p className="text-lg font-bold text-gray-800">{userProfile.tokens.eth} ETH</p>
          </div>
        </div>
        <div className="mt-2">
          <FundButton text="Add Funds" hideIcon={true} className="w-full text-xs py-1 rounded" />
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
        <p className="text-xs text-gray-500 mb-1">Your wallet</p>
        <p className="text-sm font-medium text-gray-700 break-all">{address.substring(0, 6)}...{address.substring(address.length - 4)}</p>
      </div>
    </div>
  );
};
export default TokenBalance;
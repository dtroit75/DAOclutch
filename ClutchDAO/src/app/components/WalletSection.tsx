

'use client';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownBasename, WalletDropdownFundLink, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Avatar, Identity, Name, Address, EthBalance } from '@coinbase/onchainkit/identity';
import TokenBalance from './TokenBalance';
interface WalletSectionProps {
  clutchBalance: number;
  onBalanceUpdate: (balance: number) => void;
}
const WalletSection: React.FC<WalletSectionProps> = ({ clutchBalance, onBalanceUpdate }) => {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-green-600 text-white p-4">
        <h2 className="text-lg font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Wallet
        </h2>
      </div>
      
      <div className="p-4">
        {mounted && (
          <Wallet>
            <ConnectWallet>
              <div className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors shadow-sm w-full justify-center">
                <Avatar className="h-6 w-6" />
                <span className="font-medium">{isConnected ? 'Connected' : 'Connect Wallet'}</span>
                {isConnected && address && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-1">
                    {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
                  </span>
                )}
              </div>
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-4 pb-3" hasCopyAddressOnClick>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-14 w-14 border-2 border-green-100 rounded-full" />
                  <div>
                    <Name className="font-bold text-lg text-gray-800" />
                    <div className="flex items-center">
                      <Address className="text-sm text-gray-600" />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Balance:</span>
                    <EthBalance className="font-medium text-gray-800" />
                  </div>
                </div>
              </Identity>
              <div className="border-t border-gray-100 my-2"></div>
              <WalletDropdownBasename className="px-4 py-2.5 hover:bg-gray-50 text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </WalletDropdownBasename>
              <WalletDropdownFundLink className="px-4 py-2.5 hover:bg-gray-50 text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </WalletDropdownFundLink>
              <div className="border-t border-gray-100 my-2"></div>
              <WalletDropdownDisconnect className="px-4 py-2.5 text-red-600 hover:bg-red-50 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </WalletDropdownDisconnect>
            </WalletDropdown>
          </Wallet>
        )}
        
        {isConnected && address && (
          <div className="mt-4">
            <TokenBalance 
              address={address} 
              clutchBalance={clutchBalance}
              onBalanceUpdate={onBalanceUpdate}
            />
          </div>
        )}
        
        {!isConnected && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center border border-gray-100">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Connect your wallet to vote and donate to projects.
            </p>
            <Wallet>
              <ConnectWallet>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm w-full">
                  Connect Wallet
                </button>
              </ConnectWallet>
            </Wallet>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
          <h3 className="font-medium text-gray-800 mb-2">Quick Links</h3>
          <div className="space-y-2">
            <a 
              href="https://tokenhoops-49.lovable.app/#activities" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-700 hover:text-green-600"
            >
              <span className="mr-2">♻️</span>
              <span>Earn CLUTCH Tokens</span>
            </a>
            <a 
              href="https://tokenhoops-49.lovable.app/tickets" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-700 hover:text-green-600"
            >
              <span className="mr-2">🎁</span>
              <span>Redeem Rewards</span>
            </a>
            <a 
              href="https://tokenhoops-49.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-700 hover:text-green-600"
            >
              <span className="mr-2">🏀</span>
              <span>Visit Clutch Platform</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WalletSection;
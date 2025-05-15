

'use client';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWalletClient } from 'wagmi';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import type { Project, Token, DonationDetails } from '../types/project';
import { transferTokens, buildTokenTransaction } from '../utils/api';
interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}
const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, project }) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedToken, setSelectedToken] = useState<Token>({
    name: 'CLUTCH',
    symbol: 'CLUTCH',
    address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
    decimals: 18,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm',
    chainId: 1,
  });
  
  const tokenOptions: Token[] = [
    {
      name: 'CLUTCH',
      symbol: 'CLUTCH',
      address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
      decimals: 18,
      image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm',
      chainId: 1,
    },
    {
      name: 'USDC',
      symbol: 'USDC',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
      chainId: 1,
    },
    {
      name: 'ETH',
      symbol: 'ETH',
      address: '',
      decimals: 18,
      image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
      chainId: 1,
    },
  ];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  const handlePresetAmount = (value: string) => {
    setAmount(value);
  };
  
  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };
  
  const handleDonate = async () => {
    if (!address || !amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      // Create donation details
      const donationDetails: DonationDetails = {
        projectId: project.id,
        projectTitle: project.title,
        amount,
        token: selectedToken,
        walletAddress: address,
      };
      
      // For a real blockchain transaction
      if (walletClient) {
        // Build the transaction
        const tx = await buildTokenTransaction(
          address,
          selectedToken,
          amount
        );
        
        // Send the transaction
        const hash = await walletClient.sendTransaction({
          to: tx.to as `0x${string}`,
          value: BigInt(tx.value || 0),
          data: tx.data as `0x${string}`,
        });
        
        setTransactionHash(hash);
        
        // Simulate API call to record the donation
        await transferTokens(donationDetails);
      } else {
        throw new Error('Wallet client not available');
      }
    } catch (err) {
      console.error('Donation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process donation');
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Donate to Project</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl">
                🏀
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{project.title}</p>
                <p className="text-xs text-gray-600">{project.category.charAt(0).toUpperCase() + project.category.slice(1)} • {project.location}</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="font-medium">Recipient: 0x291d...4e9C</span>
            </div>
          </div>
          
          {!isConnected ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-gray-600 text-sm mb-3">Connect your wallet to donate</p>
              <Wallet>
                <ConnectWallet>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Connect Wallet
                  </button>
                </ConnectWallet>
              </Wallet>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Select Token</label>
                <div className="grid grid-cols-3 gap-2">
                  {tokenOptions.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => handleTokenSelect(token)}
                      className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                        selectedToken.symbol === token.symbol
                          ? 'border-green-500 bg-green-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <img src={token.image} alt={token.symbol} className="w-8 h-8 mb-1" />
                      <span className="text-xs font-medium">{token.symbol}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Amount</label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <div className="flex items-center bg-gray-100 p-1 rounded">
                      <img src={selectedToken.image} alt={selectedToken.symbol} className="w-4 h-4" />
                      <span className="ml-1 text-xs font-medium text-gray-700">{selectedToken.symbol}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-2">
                  {['5', '10', '25', '50'].map((presetAmount) => (
                    <button 
                      key={presetAmount}
                      onClick={() => handlePresetAmount(presetAmount)}
                      className={`flex-1 py-1 rounded text-xs transition-colors ${
                        amount === presetAmount 
                          ? 'bg-green-100 text-green-800 font-medium border border-green-200' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-transparent'
                      }`}
                    >
                      {selectedToken.symbol === 'ETH' ? '' : '$'}{presetAmount}
                    </button>
                  ))}
                </div>
              </div>
              
              {error && (
                <div className="mb-3 p-2 bg-red-50 text-red-700 rounded-lg flex items-start border border-red-100 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              {transactionHash && (
                <div className="mb-3 p-2 bg-green-50 text-green-700 rounded-lg border border-green-100 text-xs">
                  <p className="font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Transaction submitted!
                  </p>
                  <p className="mt-1">Your donation is being processed.</p>
                  <div className="mt-1 p-1 bg-green-100 rounded break-all">
                    <span className="font-medium">Transaction Hash:</span><br />
                    {transactionHash}
                  </div>
                </div>
              )}
              
              <button
                onClick={handleDonate}
                disabled={isProcessing || !amount || parseFloat(amount) <= 0}
                className={`w-full py-2 rounded-lg font-medium flex items-center justify-center text-sm ${
                  isProcessing || !amount || parseFloat(amount) <= 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Donate {amount ? amount : '0'} {selectedToken.symbol}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DonateModal;
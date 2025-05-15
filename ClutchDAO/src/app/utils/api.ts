

import { setOnchainKitConfig } from '@coinbase/onchainkit';
import type { Token } from '@coinbase/onchainkit/token';
import type { DonationDetails } from '../types/project';
import { mockProjects } from './mockData';
import { encodeFunctionData } from 'viem';
// Initialize OnchainKit configuration
setOnchainKitConfig({
  apiKey: 'EUK6nliWVdB5Nkt4VuNXUsAV7VwBmtwR',
});
// ABI for ERC20 token transfer function
const erc20ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  }
] as const;
export async function transferTokens(donationDetails: DonationDetails): Promise<any> {
  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        protocol: 'https',
        origin: 'api.ethereum.org',
        path: '/v1/transfer',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          fromAddress: donationDetails.walletAddress,
          toAddress: '0x291deb5591023dB8b88c947E5778ccE951F24e9C',
          token: donationDetails.token,
          amount: donationDetails.amount,
          projectId: donationDetails.projectId
        }),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error transferring tokens:', error);
    throw error;
  }
}
export async function buildTokenTransaction(
  fromAddress: string,
  token: Token,
  amount: string
): Promise<any> {
  try {
    // For native ETH transfers
    if (token.symbol === 'ETH') {
      // Convert amount to wei (1 ETH = 10^18 wei)
      const amountInWei = BigInt(Math.floor(parseFloat(amount) * 10**18)).toString();
      
      return {
        to: '0x291deb5591023dB8b88c947E5778ccE951F24e9C', // Recipient address
        value: amountInWei,
        data: '0x',
      };
    }
    
    // For ERC20 token transfers
    // Convert amount to token units based on decimals
    const multiplier = BigInt(10) ** BigInt(token.decimals);
    const tokenAmount = BigInt(Math.floor(parseFloat(amount) * Number(multiplier)));
    
    // Use viem's encodeFunctionData to properly encode the function call
    const data = encodeFunctionData({
      abi: erc20ABI,
      functionName: 'transfer',
      args: ['0x291deb5591023dB8b88c947E5778ccE951F24e9C', tokenAmount]
    });
    
    // Return transaction to token contract address with encoded function data
    return {
      to: token.address, // Token contract address
      value: '0',
      data,
    };
  } catch (error) {
    console.error('Error building transaction:', error);
    throw error;
  }
}
export async function voteForProject(voteDetails: {
  projectId: string;
  walletAddress: string;
  vote: boolean;
}): Promise<any> {
  try {
    // In a real application, this would be an API call
    // For now, we'll simulate a delay and return a success response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      projectId: voteDetails.projectId,
      message: 'Vote recorded successfully'
    };
  } catch (error) {
    console.error('Error voting for project:', error);
    throw error;
  }
}
export async function getProjects(): Promise<any> {
  // In a real application, this would fetch from an API
  return mockProjects;
}
export async function getUserProfile(address: string): Promise<any> {
  // Mock data for demonstration
  return {
    address,
    tokens: {
      clutch: 250,
      usdc: 100,
      eth: 0.05,
    },
    activities: {
      plasticCollected: 45,
      projectsVoted: 12,
      projectsDonated: 5,
    },
  };
}



import type { Project, Token } from '../types/project';
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Eco-Friendly Basketball Court',
    description: 'Building a basketball court using recycled materials and sustainable practices.',
    category: 'infrastructure',
    fundingGoal: 10000,
    currentFunding: 6500,
    votes: 128,
    image: 'https://images.unsplash.com/photo-1505666287802-931dc83a5dc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    location: 'Nairobi, Kenya',
    impact: {
      carbonOffset: 5000,
      waterSaved: 20000,
      communityReach: 500,
      plasticRecycled: 2500
    },
    featured: true,
    walletAddress: '0x291deb5591023dB8b88c947E5778ccE951F24e9C'
  },
  {
    id: '2',
    title: 'Youth Basketball Recycling Program',
    description: 'Teaching youth basketball teams about recycling and environmental stewardship.',
    category: 'education',
    fundingGoal: 5000,
    currentFunding: 3200,
    votes: 95,
    image: 'https://images.unsplash.com/photo-1587335805033-14c57df61617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    location: 'Mombasa, Kenya',
    impact: {
      carbonOffset: 2000,
      waterSaved: 5000,
      communityReach: 300,
      plasticRecycled: 1000
    },
    featured: true,
    walletAddress: '0x291deb5591023dB8b88c947E5778ccE951F24e9C'
  },
  {
    id: '3',
    title: 'Recycled Basketball Equipment',
    description: 'Providing basketball equipment made from recycled materials to underprivileged communities.',
    category: 'equipment',
    fundingGoal: 7500,
    currentFunding: 4000,
    votes: 76,
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    location: 'Kisumu, Kenya',
    impact: {
      carbonOffset: 3000,
      waterSaved: 10000,
      communityReach: 200,
      plasticRecycled: 1500
    },
    featured: false,
    walletAddress: '0x291deb5591023dB8b88c947E5778ccE951F24e9C'
  },
  {
    id: '4',
    title: 'Community Clean-up Basketball Tournament',
    description: 'Organizing a basketball tournament where teams compete in both basketball and community clean-up activities.',
    category: 'community',
    fundingGoal: 3000,
    currentFunding: 2200,
    votes: 112,
    image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    location: 'Lagos, Nigeria',
    impact: {
      carbonOffset: 1500,
      waterSaved: 3000,
      communityReach: 400,
      plasticRecycled: 2000
    },
    featured: true,
    walletAddress: '0x291deb5591023dB8b88c947E5778ccE951F24e9C'
  },
  {
    id: '5',
    title: 'Solar-Powered Basketball Facility',
    description: 'Converting an existing basketball facility to run on solar power.',
    category: 'infrastructure',
    fundingGoal: 15000,
    currentFunding: 8000,
    votes: 89,
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    location: 'Accra, Ghana',
    impact: {
      carbonOffset: 8000,
      waterSaved: 15000,
      communityReach: 250,
      plasticRecycled: 500
    },
    featured: false,
    walletAddress: '0x291deb5591023dB8b88c947E5778ccE951F24e9C'
  },
  {
    id: '6',
    title: 'Basketball Environmental Education Program',
    description: 'Developing a curriculum that teaches environmental science through basketball.',
    category: 'education',
    fundingGoal: 4000,
    currentFunding: 1800,
    votes: 65,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1090&q=80',
    location: 'Nakuru, Kenya',
    impact: {
      carbonOffset: 1000,
      waterSaved: 2000,
      communityReach: 350,
      plasticRecycled: 800
    },
    featured: false,
    walletAddress: '0x291deb5591023dB8b88c947E5778ccE951F24e9C'
  }
];
export const availableTokens: Token[] = [
  {
    name: 'Clutch Token',
    symbol: 'CLUTCH',
    address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
    decimals: 18,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm',
    chainId: 1,
    balance: '1000.0'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/44/2b/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
    chainId: 1,
    balance: '250.0'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '',
    decimals: 18,
    image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
    chainId: 1,
    balance: '1.5'
  }
];

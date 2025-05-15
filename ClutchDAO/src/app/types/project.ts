
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'infrastructure' | 'education' | 'equipment' | 'community';
  fundingGoal: number;
  currentFunding: number;
  votes: number;
  image: string;
  location: string;
  impact: ProjectImpact;
  featured: boolean;
  walletAddress: string;
}
export interface ProjectImpact {
  carbonOffset: number; // in kg
  waterSaved: number; // in liters (kept for data structure compatibility but not displayed)
  communityReach: number; // number of people
  plasticRecycled: number; // in kg
}
export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  image: string;
  chainId: number;
  balance?: string;
}
export interface DonationDetails {
  projectId: string;
  projectTitle: string;
  amount: string;
  token: Token;
  walletAddress: string;
}
export interface UserProfile {
  address: string;
  tokens: {
    clutch: number;
    usdc: number;
    eth: number;
  };
  activities: {
    plasticCollected: number;
    projectsVoted: number;
    projectsDonated: number;
  };
}
      

'use client';
import { useState } from 'react';
import type { Project } from '../types/project';
import { useAccount } from 'wagmi';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { voteForProject } from '../utils/api';
interface ProjectCardProps {
  project: Project;
  onDonate: () => void;
  userClutchBalance: number;
  onVote: (projectId: string, voted: boolean) => void;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onDonate, 
  userClutchBalance,
  onVote 
}) => {
  const { isConnected, address } = useAccount();
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(project.votes);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<string>('');
  
  const handleVote = async () => {
    if (!address) return;
    
    if (hasVoted) {
      // User is unvoting (not implemented in this version)
      return;
    }
    
    // Check if user has enough CLUTCH tokens
    if (userClutchBalance < 10) {
      setVoteError('Insufficient CLUTCH tokens (10 required)');
      setTimeout(() => setVoteError(''), 3000);
      return;
    }
    
    setIsVoting(true);
    setVoteError('');
    
    try {
      // Call API to record vote
      await voteForProject({
        projectId: project.id,
        walletAddress: address,
        vote: true
      });
      
      // Update UI
      setVoteCount(voteCount + 1);
      setHasVoted(true);
      
      // Notify parent component to update token balance
      onVote(project.id, true);
    } catch (error) {
      console.error('Voting error:', error);
      setVoteError('Failed to submit vote');
    } finally {
      setIsVoting(false);
    }
  };
  
  const progressPercentage = (project.currentFunding / project.fundingGoal) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative">
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            style={{ aspectRatio: '16/9', objectPosition: 'center' }}
          />
        </div>
        <div className="absolute top-2 right-2">
          <span className="inline-block bg-white/90 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full shadow-sm">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="text-base font-bold text-gray-800 mb-1">{project.title}</h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{project.description}</p>
        
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Funding Progress</span>
            <span className="text-gray-800 font-medium">
              ${project.currentFunding.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-green-600 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage > 100 ? 100 : progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-green-50 p-1.5 rounded text-center border border-green-100">
            <p className="text-xs text-gray-600">Carbon Offset</p>
            <p className="text-xs font-bold text-gray-800">{project.impact.carbonOffset.toLocaleString()} kg</p>
          </div>
          <div className="bg-blue-50 p-1.5 rounded text-center border border-blue-100">
            <p className="text-xs text-gray-600">Plastic Recycled</p>
            <p className="text-xs font-bold text-gray-800">{project.impact.plasticRecycled.toLocaleString()} kg</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          {isConnected ? (
            <button
              onClick={handleVote}
              disabled={isVoting || hasVoted}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                hasVoted
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : isVoting
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-transparent'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {isVoting ? (
                <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span>{hasVoted ? '✓' : '+'}</span>
              )}
              <span>Vote</span>
              <span className="ml-1 font-medium">{voteCount}</span>
              {!hasVoted && (
                <span className="ml-1 text-xs text-gray-500">(10)</span>
              )}
            </button>
          ) : (
            <Wallet>
              <ConnectWallet>
                <button className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 hover:bg-gray-200 border border-transparent">
                  <span>Connect to Vote</span>
                </button>
              </ConnectWallet>
            </Wallet>
          )}
          
          {isConnected ? (
            <button
              onClick={onDonate}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              Donate
            </button>
          ) : (
            <Wallet>
              <ConnectWallet>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                  Connect
                </button>
              </ConnectWallet>
            </Wallet>
          )}
        </div>
        
        {voteError && (
          <div className="mt-2 text-xs text-red-600 bg-red-50 p-1 rounded border border-red-100">
            {voteError}
          </div>
        )}
        
        <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{project.location}</span>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;

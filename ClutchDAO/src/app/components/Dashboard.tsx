

'use client';
import { useState, useEffect } from 'react';
import { getProjects } from '../utils/api';
import type { Project } from '../types/project';
import ProjectList from './ProjectList';
import { useAccount } from 'wagmi';
interface DashboardProps {
  userClutchBalance: number;
  onVote: (projectId: string, voted: boolean) => void;
}
const Dashboard: React.FC<DashboardProps> = ({ userClutchBalance, onVote }) => {
  const { address } = useAccount();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalFunding: 0,
    totalProjects: 0,
    carbonOffset: 0,
    communityReach: 0,
    plasticRecycled: 0
  });
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
        setFilteredProjects(data);
        
        // Calculate stats
        const totalFunding = data.reduce((sum: number, project: Project) => sum + project.currentFunding, 0);
        const carbonOffset = data.reduce((sum: number, project: Project) => sum + project.impact.carbonOffset, 0);
        const communityReach = data.reduce((sum: number, project: Project) => sum + project.impact.communityReach, 0);
        const plasticRecycled = data.reduce((sum: number, project: Project) => sum + project.impact.plasticRecycled, 0);
        
        setStats({
          totalFunding,
          totalProjects: data.length,
          carbonOffset,
          communityReach,
          plasticRecycled
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.category === category);
      setFilteredProjects(filtered);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Dashboard</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total Funding</p>
          <p className="text-xl font-bold text-gray-800">${stats.totalFunding.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Carbon Offset</p>
          <p className="text-xl font-bold text-gray-800">{stats.carbonOffset.toLocaleString()} kg</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Plastic Recycled</p>
          <p className="text-xl font-bold text-gray-800">{stats.plasticRecycled.toLocaleString()} kg</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              activeCategory === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => handleCategoryChange('infrastructure')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              activeCategory === 'infrastructure'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Infrastructure
          </button>
          <button
            onClick={() => handleCategoryChange('education')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              activeCategory === 'education'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => handleCategoryChange('equipment')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              activeCategory === 'equipment'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Equipment
          </button>
          <button
            onClick={() => handleCategoryChange('community')}
            className={`px-3 py-1.5 rounded-full text-sm ${
              activeCategory === 'community'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Community
          </button>
        </div>
      </div>
      
      {address && (
        <div className="mb-4 bg-green-50 p-3 rounded-lg border border-green-100 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white p-1 mr-3 shadow-sm flex items-center justify-center">
              <img 
                src="https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/3b/bf/3bbf118b5e6dc2f9e7fc607a6e7526647b4ba8f0bea87125f971446d57b296d2-MDNmNjY0MmEtNGFiZi00N2I0LWIwMTItMDUyMzg2ZDZhMWNm" 
                alt="CLUTCH" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-xs text-gray-600">Your CLUTCH Balance</p>
              <p className="text-sm font-bold text-gray-800">{userClutchBalance} CLUTCH</p>
            </div>
          </div>
          <div className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full border border-green-100">
            Each vote costs 10 CLUTCH tokens
          </div>
        </div>
      )}
      
      <ProjectList 
        projects={filteredProjects} 
        isLoading={isLoading} 
        userClutchBalance={userClutchBalance}
        onVote={onVote}
      />
    </div>
  );
};
export default Dashboard;
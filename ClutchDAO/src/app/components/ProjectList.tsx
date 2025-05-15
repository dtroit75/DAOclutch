
'use client';
import { useState } from 'react';
import type { Project } from '../types/project';
import ProjectCard from './ProjectCard';
import DonateModal from './DonateModal';
import { useAccount } from 'wagmi';
interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  userClutchBalance: number;
  onVote: (projectId: string, voted: boolean) => void;
}
const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  isLoading, 
  userClutchBalance,
  onVote
}) => {
  const { address } = useAccount();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const handleDonate = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="h-40 bg-gray-200"></div>
            <div className="p-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-2 bg-gray-200 rounded w-full mb-3"></div>
              <div className="flex justify-between mb-3">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No projects found in this category.</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onDonate={() => handleDonate(project)}
            userClutchBalance={userClutchBalance}
            onVote={onVote}
          />
        ))}
      </div>
      
      {selectedProject && (
        <DonateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </>
  );
};
export default ProjectList;
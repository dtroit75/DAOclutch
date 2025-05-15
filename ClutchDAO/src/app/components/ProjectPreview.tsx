
'use client';
import { useState, useEffect, useRef } from 'react';
import { getProjects } from '../utils/api';
import type { Project } from '../types/project';
interface ProjectPreviewProps {}
const ProjectPreview: React.FC<ProjectPreviewProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        const featuredProjects = data.filter((project: Project) => project.featured);
        setProjects(featuredProjects);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };
    fetchProjects();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (projects.length > 0 && !isTransitioning) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [projects.length, currentIndex, isTransitioning]);
  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Projects</h2>
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }
  if (projects.length === 0) {
    return null;
  }
  const currentProject = projects[currentIndex];
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Projects</h2>
      
      <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
        <div className="p-5">
          <div className="mb-4">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 border border-green-200">
              {currentProject.category.charAt(0).toUpperCase() + currentProject.category.slice(1)}
            </span>
            <h3 className="text-xl font-bold text-gray-800">{currentProject.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{currentProject.description}</p>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span className="text-gray-600">Funding Progress</span>
              <span className="text-gray-800 font-medium">
                ${currentProject.currentFunding.toLocaleString()} / ${currentProject.fundingGoal.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(currentProject.currentFunding / currentProject.fundingGoal) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-600">Carbon Offset</p>
              <p className="text-sm font-bold text-gray-800">{currentProject.impact.carbonOffset.toLocaleString()} kg</p>
            </div>
            <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-600">Plastic Recycled</p>
              <p className="text-sm font-bold text-gray-800">{currentProject.impact.plasticRecycled.toLocaleString()} kg</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-700">{currentProject.location}</span>
            </div>
            <div className="text-gray-600 bg-white px-2 py-1 rounded-full text-xs border border-gray-100">
              {currentIndex + 1} of {projects.length}
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <button 
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Previous project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Next project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Pagination dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsTransitioning(true);
                setTimeout(() => setIsTransitioning(false), 500);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-green-600 w-4' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectPreview;

import React, { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { getTechIcon, getGitHubStyles } from '../utils/techMapping';
import { projectsAPI, handleAPIError } from '../utils/api';



/**
 * ProjectCards Component
 * 
 * Displays a grid of project cards with technology-specific icons and brand colors.
 * Supports the following technologies: HTML, CSS, JavaScript, React, Express, 
 * MongoDB, Next.js, Node.js, GitHub, Git, Vite, Tailwind CSS, Vercel, Mongoose.
 * 
 * Features:
 * - Modern card layout with hover effects
 * - Technology-specific icons with brand colors
 * - GitHub integration with brand styling
 * - Responsive design
 * - Loading and error states
 * 
 * @returns {JSX.Element} Grid of project cards
 */
const ProjectCards = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from database
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsAPI.getAll();
      setProjects(data.data || []);
    } catch (err) {
      const errorMessage = handleAPIError(err);
      setError(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fb3c5f]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">Error loading projects: {error}</p>
        <Button 
          onClick={fetchProjects}
          className="bg-gradient-to-r from-[#fb3c5f] to-[#d237b1] hover:from-[#d237b1] hover:to-[#7200ff] text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-400 mb-4">No projects found</h3>
        <p className="text-gray-500">Projects will appear here once added.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-16 relative z-20">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

  /**
   * Individual Project Card Component
   * 
   * @param {Object} project - Project data object
   * @param {string} project.projectName - Name of the project
   * @param {string} project.projectImg - Project image URL
   * @param {string} project.description - Project description
   * @param {string} project.liveLink - Live demo URL
   * @param {string} project.githubLink - GitHub repository URL
   * @param {Array<string>} project.tags - Array of technology tags
   * @returns {JSX.Element} Single project card
   */
  const ProjectCard = ({ project }) => {
  return (
    <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl border border-white/30 overflow-hidden hover:border-[#d237b1]/50 transition-all duration-500 group hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#7200ff]/25 h-full flex flex-col">
      {/* Project Image with Modern Overlay */}
      <div className="relative overflow-hidden h-64">
        <img
          src={project.projectImg}
          alt={project.projectName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <Button
            size="icon"
            asChild
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-xl hover:scale-125 transition-all duration-300 backdrop-blur-sm"
          >
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              title="View Live Site"
            >
              <FiExternalLink size={16} />
            </a>
          </Button>
          {project.githubLink && (
            <Button
              size="icon"
              asChild
              className="rounded-full shadow-xl hover:scale-125 transition-all duration-300 backdrop-blur-sm"
              style={{ 
                backgroundColor: getGitHubStyles().backgroundColor,
                color: getGitHubStyles().color,
                border: `1px solid ${getGitHubStyles().borderColor}`
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = getGitHubStyles().hoverBackgroundColor;
                e.target.style.transform = 'scale(1.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = getGitHubStyles().backgroundColor;
                e.target.style.transform = 'scale(1)';
              }}
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source Code"
              >
                <SiGithub size={16} />
              </a>
            </Button>
          )}
        </div>

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#d237b1] transition-colors duration-300 leading-tight">
            {project.projectName}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 opacity-90">
            {project.description || "An innovative web development project showcasing modern technologies and best practices."}
          </p>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col bg-black/20 backdrop-blur-sm">
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-6 flex-1">
          {project.tags.slice(0, 4).map((tag, index) => {
            const techInfo = getTechIcon(tag);
            const IconComponent = techInfo.icon;
            
            // Check if the technology has a dark theme flag or dark color
            const isDarkTech = techInfo.isDark || techInfo.color === '#000000' || techInfo.color === '#24292e';
            
            return (
              <span
                key={index}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg
                  border backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg
                  ${isDarkTech 
                    ? 'bg-white/90 border-gray-300 text-gray-800' 
                    : 'bg-black/50 border-white/20'
                  } cursor-default
                `}
                style={{ 
                  color: isDarkTech ? '#374151' : techInfo.color 
                }}
              >
                <IconComponent size={14} />
                {tag}
              </span>
            );
          })}
          {project.tags.length > 4 && (
            <span className="inline-flex items-center px-3 py-1.5 bg-black/60 border border-white/20 text-gray-300 text-xs rounded-full">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <Button
            asChild
            className="bg-gradient-to-r from-[#fb3c5f] to-[#d237b1] hover:from-[#d237b1] hover:to-[#7200ff] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-3"
          >
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <FiExternalLink size={16} />
              Live Demo
            </a>
          </Button>
          {project.githubLink && (
            <Button
              asChild
              variant="outline"
              className="font-semibold transition-all duration-300 hover:scale-105 py-3"
              style={{ 
                backgroundColor: getGitHubStyles().backgroundColor,
                color: getGitHubStyles().color,
                borderColor: getGitHubStyles().borderColor
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = getGitHubStyles().hoverBackgroundColor;
                e.target.style.borderColor = getGitHubStyles().hoverBorderColor;
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = getGitHubStyles().backgroundColor;
                e.target.style.borderColor = getGitHubStyles().borderColor;
                e.target.style.transform = 'scale(1)';
              }}
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <SiGithub size={16} />
                Source
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCards;
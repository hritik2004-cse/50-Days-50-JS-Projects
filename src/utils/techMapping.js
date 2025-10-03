import { FiCode } from 'react-icons/fi';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiGithub,
  SiGit,
  SiVite,
  SiTailwindcss,
  SiVercel,
  SiMongoose
} from 'react-icons/si';

/**
 * Technology mapping with icons and brand colors
 * @param {string} tech - Technology name
 * @returns {Object} Technology configuration with icon, color, and styling
 */
export const getTechIcon = (tech) => {
  const techLower = tech.toLowerCase().replace(/\s+/g, '').replace(/[.-]/g, '');
  
  const techMap = {
    // Frontend
    'html': { 
      icon: SiHtml5, 
      color: '#E34F26', 
      bgColor: 'bg-orange-500/20', 
      borderColor: 'border-orange-400/50' 
    },
    'html5': { 
      icon: SiHtml5, 
      color: '#E34F26', 
      bgColor: 'bg-orange-500/20', 
      borderColor: 'border-orange-400/50' 
    },
    'css': { 
      icon: SiCss3, 
      color: '#1572B6', 
      bgColor: 'bg-blue-600/20', 
      borderColor: 'border-blue-500/50' 
    },
    'css3': { 
      icon: SiCss3, 
      color: '#1572B6', 
      bgColor: 'bg-blue-600/20', 
      borderColor: 'border-blue-500/50' 
    },
    'javascript': { 
      icon: SiJavascript, 
      color: '#F7DF1E', 
      bgColor: 'bg-yellow-500/20', 
      borderColor: 'border-yellow-400/50' 
    },
    'js': { 
      icon: SiJavascript, 
      color: '#F7DF1E', 
      bgColor: 'bg-yellow-500/20', 
      borderColor: 'border-yellow-400/50' 
    },
    'react': { 
      icon: SiReact, 
      color: '#61DAFB', 
      bgColor: 'bg-blue-500/20', 
      borderColor: 'border-blue-400/50' 
    },
    'reactjs': { 
      icon: SiReact, 
      color: '#61DAFB', 
      bgColor: 'bg-blue-500/20', 
      borderColor: 'border-blue-400/50' 
    },
    'nextjs': { 
      icon: SiNextdotjs, 
      color: '#FFFFFF', 
      bgColor: 'bg-gray-700/20', 
      borderColor: 'border-gray-400/50',
      isDark: true
    },
    'next': { 
      icon: SiNextdotjs, 
      color: '#FFFFFF', 
      bgColor: 'bg-gray-700/20', 
      borderColor: 'border-gray-400/50',
      isDark: true
    },
    'tailwind': { 
      icon: SiTailwindcss, 
      color: '#06B6D4', 
      bgColor: 'bg-cyan-500/20', 
      borderColor: 'border-cyan-400/50' 
    },
    'tailwindcss': { 
      icon: SiTailwindcss, 
      color: '#06B6D4', 
      bgColor: 'bg-cyan-500/20', 
      borderColor: 'border-cyan-400/50' 
    },

    // Backend
    'nodejs': { 
      icon: SiNodedotjs, 
      color: '#339933', 
      bgColor: 'bg-green-600/20', 
      borderColor: 'border-green-500/50' 
    },
    'node': { 
      icon: SiNodedotjs, 
      color: '#339933', 
      bgColor: 'bg-green-600/20', 
      borderColor: 'border-green-500/50' 
    },
    'express': { 
      icon: SiExpress, 
      color: '#FFFFFF', 
      bgColor: 'bg-gray-700/20', 
      borderColor: 'border-gray-400/50',
      isDark: true
    },
    'expressjs': { 
      icon: SiExpress, 
      color: '#FFFFFF', 
      bgColor: 'bg-gray-700/20', 
      borderColor: 'border-gray-400/50',
      isDark: true
    },

    // Database
    'mongodb': { 
      icon: SiMongodb, 
      color: '#47A248', 
      bgColor: 'bg-green-600/20', 
      borderColor: 'border-green-500/50' 
    },
    'mongo': { 
      icon: SiMongodb, 
      color: '#47A248', 
      bgColor: 'bg-green-600/20', 
      borderColor: 'border-green-500/50' 
    },
    'mongoose': { 
      icon: SiMongoose, 
      color: '#880000', 
      bgColor: 'bg-red-800/20', 
      borderColor: 'border-red-600/50' 
    },

    // Tools & Deployment
    'git': { 
      icon: SiGit, 
      color: '#F05032', 
      bgColor: 'bg-red-500/20', 
      borderColor: 'border-red-400/50' 
    },
    'github': { 
      icon: SiGithub, 
      color: '#FFFFFF', 
      bgColor: 'bg-gray-700/20', 
      borderColor: 'border-gray-400/50',
      isDark: true
    },
    'vite': { 
      icon: SiVite, 
      color: '#646CFF', 
      bgColor: 'bg-purple-500/20', 
      borderColor: 'border-purple-400/50' 
    },
    'vercel': { 
      icon: SiVercel, 
      color: '#FFFFFF', 
      bgColor: 'bg-gray-700/20', 
      borderColor: 'border-gray-400/50',
      isDark: true
    }
  };

  return techMap[techLower] || { 
    icon: FiCode, 
    color: '#d237b1', 
    bgColor: 'bg-purple-500/20', 
    borderColor: 'border-purple-400/50' 
  };
};

/**
 * GitHub button styling configuration
 */
export const getGitHubStyles = () => ({
  backgroundColor: '#24292e',
  color: 'white',
  borderColor: '#333',
  hoverBackgroundColor: '#1a1e22',
  hoverBorderColor: '#555'
});
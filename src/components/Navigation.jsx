import React from 'react';
import { FiHome, FiSettings, FiArrowLeft } from 'react-icons/fi';
import { useLocation, Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navigation = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <nav className="fixed top-4 right-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-2 flex gap-2">
        {isAdmin ? (
          <Button
            asChild
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Link to="/">
              <FiArrowLeft size={16} />
              Back to Portfolio
            </Link>
          </Button>
        ) : (
          // Only show admin link in development
          (import.meta.env.DEV || import.meta.env.VITE_ENABLE_ADMIN === 'true') && (
            <Button
              asChild
              variant="ghost"
              size="sm" 
              className="text-white hover:bg-white/20"
            >
              <Link to="/admin">
                <FiSettings size={16} />
                Admin
              </Link>
            </Button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navigation;
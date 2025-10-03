import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import toast from 'react-hot-toast';

// Simple, bulletproof admin access component
const AdminAccess = () => {
  const navigate = useNavigate();
  
  // Get initial auth state from localStorage immediately
  const getAuthState = () => {
    try {
      return localStorage.getItem('admin_logged_in') === 'true';
    } catch {
      return false;
    }
  };

  // State with immediate localStorage read
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthState);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Hritik@14';

  // Ensure we're mounted and check auth state
  useEffect(() => {
    const authState = getAuthState();
    setIsAuthenticated(authState);
    setMounted(true);
  }, []);

  // Persist auth state changes to localStorage
  useEffect(() => {
    if (!mounted) return;
    
    try {
      if (isAuthenticated) {
        localStorage.setItem('admin_logged_in', 'true');
        localStorage.setItem('admin_login_time', Date.now().toString());
      } else {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_login_time');
      }
    } catch {
      toast.error('Failed to save authentication state');
    }
  }, [isAuthenticated, mounted]);

  // Session validation every minute
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      try {
        const loginTime = localStorage.getItem('admin_login_time');
        if (loginTime) {
          const sessionAge = Date.now() - parseInt(loginTime);
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours
          
          if (sessionAge > maxAge) {
            handleLogout();
          }
        }
      } catch {
        toast.error('Session validation failed');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('Login successful! Welcome to Admin Panel.');
    } else {
      setError('Invalid password. Please try again.');
      toast.error('Invalid password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast.success('Logged out successfully.');
  };

  // Show admin panel if authenticated
  if (isAuthenticated) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  // Don't render login form until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#06020d] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Show login form
  return (
    <div className="min-h-screen bg-[#06020d] flex items-center justify-center p-4 relative">
      {/* Background Gradient Effects */}
      <div className="fixed inset-0">
        <div className="h-[30vh] w-[30vh] blur-3xl rounded-full absolute top-[10%] left-[50%] bg-[#7200ff]/30 animate-glow-slow"></div>
        <div className="h-[30vh] w-[30vh] rounded-full absolute blur-3xl top-[40%] left-[20%] bg-[#fb3c5f]/30 animate-glow-slow-delayed"></div>
      </div>
      
      <Card className="bg-[#06020d]/90 backdrop-blur-lg border-white/20 w-full max-w-sm relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">
            <FiLock className="text-[#d237b1]" size={32} />
          </div>
          <CardTitle className="text-white">Admin Access</CardTitle>
          <CardDescription className="text-gray-400">
            Enter password to continue
          </CardDescription>
          {error && (
            <div className="text-red-400 text-sm mt-2 p-2 bg-red-500/10 rounded border border-red-500/20">
              {error}
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d237b1] focus:border-transparent"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-200 rounded-lg"
              >
                Back to Home
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#fb3c5f] to-[#d237b1] hover:from-[#d237b1] hover:to-[#7200ff] text-white"
                disabled={!password.trim()}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccess;
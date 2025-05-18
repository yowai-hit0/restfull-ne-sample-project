import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';
import { motion } from 'framer-motion';
import { BookOpenText } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Left side (display on lg and up) */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 justify-center items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center p-8"
        >
          <BookOpenText className="h-24 w-24 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Bookshelf</h1>
          <p className="text-indigo-100 text-lg max-w-md">
            Discover, borrow, and manage your book collection from anywhere.
            Join thousands of readers exploring new worlds through literature.
          </p>
        </motion.div>
      </div>
      
      {/* Right side / Mobile full */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-6 py-12"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
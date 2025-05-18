import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Home, BookOpen, Calendar, User, Settings, Users, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../stores/auth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex md:hidden"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        ref={sidebarRef}
        className="relative flex-1 flex flex-col max-w-xs w-full bg-white"
      >
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            onClick={onClose}
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold">Bookshelf</span>
          </div>
          
          <nav className="mt-5 px-2 space-y-1">
            <Link 
              to="/"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
              onClick={onClose}
            >
              <Home className="mr-4 h-6 w-6" />
              Home
            </Link>
            
            <Link 
              to="/books"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
              onClick={onClose}
            >
              <BookOpen className="mr-4 h-6 w-6" />
              Browse Books
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/my-bookings"
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  onClick={onClose}
                >
                  <Calendar className="mr-4 h-6 w-6" />
                  My Bookings
                </Link>
                
                <Link 
                  to="/profile"
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  onClick={onClose}
                >
                  <User className="mr-4 h-6 w-6" />
                  Profile
                </Link>
                
                {isAdmin && (
                  <>
                    <div className="pt-4 pb-2">
                      <div className="px-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Admin
                        </p>
                      </div>
                    </div>
                    
                    <Link 
                      to="/admin/books"
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                      onClick={onClose}
                    >
                      <BookOpen className="mr-4 h-6 w-6" />
                      Manage Books
                    </Link>
                    
                    <Link 
                      to="/admin/bookings"
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                      onClick={onClose}
                    >
                      <Calendar className="mr-4 h-6 w-6" />
                      Manage Bookings
                    </Link>
                    
                    <Link 
                      to="/admin/users"
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                      onClick={onClose}
                    >
                      <Users className="mr-4 h-6 w-6" />
                      Manage Users
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                
                <Link 
                  to="/login"
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  onClick={onClose}
                >
                  <LogIn className="mr-4 h-6 w-6" />
                  Login
                </Link>
                
                <Link 
                  to="/register"
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                  onClick={onClose}
                >
                  <UserPlus className="mr-4 h-6 w-6" />
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
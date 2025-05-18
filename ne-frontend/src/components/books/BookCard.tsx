import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book as BookType } from '../../types';
import { cn } from '../../utils/cn';

interface BookCardProps {
  book: BookType;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className }) => {
  const navigate = useNavigate();
  
  // If no cover image, use a default
  const coverImage = book.cover || 'https://images.pexels.com/photos/1266302/pexels-photo-1266302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const formattedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full cursor-pointer",
        className
      )}
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <div className="relative pb-[60%] overflow-hidden">
        <img
          src={coverImage}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Availability badge */}
        <div 
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
            book.available 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}
        >
          {book.available ? 'Available' : 'Borrowed'}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{book.description}</p>
        
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Book className="h-4 w-4 mr-1" />
            <span>{book.isbn}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
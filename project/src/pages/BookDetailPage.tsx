import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  BookOpen, Calendar, User, Tag, Clock, ChevronLeft, Loader2, AlertCircle, CheckCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

import { getBook } from '../services/books';
import { createBooking } from '../services/bookings';
import { useAuthStore } from '../stores/auth';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: () => id ? getBook(id) : Promise.reject('No book ID provided'),
  });
  
  const bookingMutation = useMutation({
    mutationFn: (bookingData: { bookId: string; startDate: string; endDate: string }) => 
      createBooking(bookingData),
    onSuccess: () => {
      toast.success('Book booked successfully');
      setShowBookingForm(false);
      setStartDate('');
      setEndDate('');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to book');
    },
  });
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    if (!isAuthenticated) {
      toast.error('You must be logged in to book a book');
      navigate('/login');
      return;
    }
    
    if (!startDate || !endDate) {
      toast.error('Please select start and end dates');
      return;
    }
    
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    
    if (startDateTime >= endDateTime) {
      toast.error('End date must be after start date');
      return;
    }
    
    bookingMutation.mutate({
      bookId: id,
      startDate,
      endDate,
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }
  
  if (isError || !data?.data) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/books')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Books
        </button>
      </div>
    );
  }
  
  const book = data.data;
  
  // If no cover image, use a default
  const coverImage = book.cover || 'https://images.pexels.com/photos/1266302/pexels-photo-1266302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  
  const publishedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/books')}
        className="inline-flex items-center mb-6 text-gray-600 hover:text-indigo-600"
      >
        <ChevronLeft className="mr-1 h-5 w-5" />
        Back to Books
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3">
            <img
              src={coverImage}
              alt={book.title}
              className="h-64 w-full object-cover md:h-full"
            />
          </div>
          
          <div className="p-6 md:p-8 md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <div 
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    book.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {book.available ? 'Available' : 'Borrowed'}
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mb-6">by {book.author}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-gray-700">{publishedDate}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-gray-700">ISBN: {book.isbn}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About this book</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
              
              {book.available ? (
                <div>
                  {showBookingForm ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 p-4 rounded-lg mb-4"
                    >
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Book Reservation</h3>
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <input
                              type="date"
                              id="startDate"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                              End Date
                            </label>
                            <input
                              type="date"
                              id="endDate"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              min={startDate || new Date().toISOString().split('T')[0]}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowBookingForm(false)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={bookingMutation.isPending}
                            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            {bookingMutation.isPending ? (
                              <span className="flex items-center">
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                Processing...
                              </span>
                            ) : (
                              'Confirm Booking'
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error('You must be logged in to book a book');
                          navigate('/login');
                          return;
                        }
                        setShowBookingForm(true);
                      }}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Book This Title
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex items-center bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <Clock className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-amber-700">
                    This book is currently borrowed. Please check back later or browse other available titles.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
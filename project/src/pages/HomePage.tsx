import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            <span className="block">Your gateway to a world of</span>
            <span className="block text-indigo-600">books and knowledge</span>
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            Discover, borrow, and manage your reading journey all in one place.
            Join our growing community of book lovers today.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => navigate('/books')}
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
            >
              Browse Books
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:text-lg"
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need for your reading journey
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform makes it easy to discover, borrow, and manage your reading experience.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Discover Books</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Search through our extensive library of books. Filter by genre, author, or availability.
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Borrow With Ease</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Reserve and borrow books with just a few clicks. Keep track of your current loans.
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Manage Your Time</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get notified about due dates and manage your reservations with our intuitive dashboard.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start reading?</span>
            <span className="block">Create an account today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-100">
            Join thousands of readers who are already enjoying our vast collection of books.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
              >
                Sign up for free
              </button>
            </div>
            <div className="ml-3 inline-flex">
              <button
                onClick={() => navigate('/books')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Browse Books
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What our users are saying
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Sarah Johnson</h4>
                  <p className="text-gray-500">Avid Reader</p>
                </div>
              </div>
              <p className="text-gray-600">
                "This platform has transformed how I access books. The reservation system is seamless, and I love being able to track my reading history."
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Michael Chen</h4>
                  <p className="text-gray-500">Book Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've discovered so many new authors through this service. The interface is intuitive, and the book recommendations are always spot on."
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Emily Rodriguez</h4>
                  <p className="text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a student, having access to a digital library has been invaluable. The notification system ensures I never miss a return date!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
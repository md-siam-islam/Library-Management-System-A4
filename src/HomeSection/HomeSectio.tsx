import { Link } from 'react-router-dom';
import { BookOpen, Library, Users, BarChart2, Clock } from 'lucide-react';

const HomeSection = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Digital Library</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover, borrow, and manage books with our modern library management system
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/books" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Browse Books
            </Link>
            <Link 
              to="/borrow-summary" 
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Borrowed
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-10 w-10 mb-4 text-blue-600 " />,
                title: "Extensive Collection",
                description: "Access thousands of books across various genres and categories"
              },
              {
                icon: <Library className="h-10 w-10 mb-4 text-blue-600" />,
                title: "Easy Management",
                description: "Simple interface for managing books and borrow records"
              },
              {
                icon: <Users className="h-10 w-10 mb-4 text-blue-600" />,
                title: "User Friendly",
                description: "Intuitive design for both librarians and patrons"
              },
              {
                icon: <BarChart2 className="h-10 w-10 mb-4 text-blue-600" />,
                title: "Real-time Stats",
                description: "Track book availability and borrowing trends"
              },
              {
                icon: <Clock className="h-10 w-10 mb-4 text-blue-600" />,
                title: "Quick Access",
                description: "Find and borrow books in just a few clicks"
              },
              {
                icon: <BookOpen className="h-10 w-10 mb-4 text-blue-600" />,
                title: "Digital Catalog",
                description: "All books available in digital format for easy searching"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ">
                <div className="text-center flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic" },
              { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" },
              { title: "1984", author: "George Orwell", genre: "Dystopian" },
              { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" }
            ].map((book, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-1">by {book.author}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {book.genre}
                  </span>
                  <Link 
                    to="/books"
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Borrow Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/books" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <h3 className="text-xl font-semibold">Books Available</h3>
              <p className="text-gray-600">Wide collection covering all genres</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <h3 className="text-xl font-semibold">Active Members</h3>
              <p className="text-gray-600">Join our reading community</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <h3 className="text-xl font-semibold">Digital Access</h3>
              <p className="text-gray-600">Available anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Our Collection?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of readers who discover new books every day
          </p>
          <Link 
            to="/books" 
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
import { useGetBookQuery } from '@/redux/api/baseapi';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, ArrowLeft, BookOpen, User, Tag, Hash, Copy } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, error, isLoading } = useGetBookQuery(id!);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <p className="text-gray-600">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <p>Error loading book details</p>
        <p className="text-sm text-gray-500">
          {"message" in error ? error.message : "Please try again later"}
        </p>
      </div>
    );
  }

  if (!book?.data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Book not found</h2>
        <p className="mt-2 text-gray-500">The requested book does not exist.</p>
        <Link to="/books" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to all books
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        <Link to="/books" className="flex items-center text-blue-500 hover:underline">
          <ArrowLeft className="h-5 w-5 mr-1" /> Back to books
        </Link>

        <div className="bg-white rounded-lg border border-blue-200 shadow-sm p-5">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-blue-600">{book.data.title}</h1>
              <p className="text-gray-600 mt-1 flex items-center">
                <User className="h-4 w-4 mr-1 text-gray-400" />
                {book.data.author}
              </p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              book.data.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {book.data.available ? 'Available' : 'Checked Out'}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h2 className="font-medium flex items-center">
                <BookOpen className="h-5 w-5 mr-1 text-blue-400" />
                Description
              </h2>
              <p className="text-gray-700 mt-2 pl-6">
                {book.data.description || 'No description available.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Genre
                </p>
                <p className="mt-1 font-medium">{book.data.genre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Hash className="h-4 w-4 mr-1" />
                  ISBN
                </p>
                <p className="mt-1 font-mono text-sm">{book.data.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Copy className="h-4 w-4 mr-1" />
                  Copies
                </p>
                <p className="mt-1 font-medium">{book.data.copies}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button asChild className="w-full">
              <Link to={`/borrow/${book.data._id}`}>
                Borrow This Book
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/books">
                Back to All Books
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-lg border border-blue-200 shadow-sm overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-2">
                <Link to="/books" className="text-blue-500 hover:underline flex items-center">
                  <ArrowLeft className="h-5 w-5 mr-1" /> Back to books
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-blue-600">{book.data.title}</h1>
              <p className="text-xl text-gray-600 mt-2 flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-400" />
                {book.data.author}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              book.data.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {book.data.available ? 'Available' : 'Checked Out'}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-blue-400" />
                  Description
                </h2>
                <p className="text-gray-700 mt-3 pl-8">
                  {book.data.description || 'No description available.'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Genre
                  </p>
                  <p className="mt-1 font-medium">{book.data.genre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Hash className="h-4 w-4 mr-1" />
                    ISBN
                  </p>
                  <p className="mt-1 font-mono">{book.data.isbn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Copy className="h-4 w-4 mr-1" />
                    Copies Available
                  </p>
                  <p className="mt-1 font-medium">{book.data.copies}</p>
                </div>
              </div>
            </div>

            <div className="border border-blue-200 rounded-lg p-6 h-fit">
              <h2 className="font-semibold text-xl mb-6 text-center text-blue-600">
                Book Actions
              </h2>
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link to={`/borrow/${book.data._id}`}>
                    Borrow This Book
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/books">
                    Back to All Books
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
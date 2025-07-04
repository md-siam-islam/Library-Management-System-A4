import { useGetBookQuery } from '@/redux/api/baseapi';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Loader, AlertCircle } from 'lucide-react';

const Bookdetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, error, isLoading } = useGetBookQuery(id!);

  console.log(book)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8" />
        <span className="ml-2">Loading book details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <span className="ml-2">
          Error loading book! {"message" in error ? error.message : "Please try again later."}
        </span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">Book not found</h2>
        <p className="mt-2">The requested book does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl my-5">
      <div className="bg-white rounded-lg border border-sky-600 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-sky-400">{book.data.title}</h1>
            <p className="text-xl text-gray-600 my-2">By : {book.data.author}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
            {book.data.available ? 'Available' : 'Checked Out'}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className=" text-gray-700">
                {book.data.description || 'No description available.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Genre</h3>
                <p className="mt-1">{book.data.genre}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                <p className="mt-1">{book.data.isbn}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Copies Available</h3>
                <p className="mt-1">{book.data.copies}</p>
              </div>
            </div>
          </div>

          <div className="border border-sky-600 rounded-lg p-4 h-fit">
            <h2 className="font-semibold text-lg mb-4 text-center text-sky-500">Book Actions</h2>
            <div className="space-y-3">
              {/* <Button asChild className="text-sky-500 hover:text-orange-600 border w-full py-1 px-2 rounded-2xl">
                <Link to={`/edit-book/${book.data._id}`}>Edit Book Details</Link>
              </Button> */}
              <Button asChild variant="secondary" className="text-sky-500 hover:text-orange-600 border w-full py-1 px-2 rounded-2xl">
                <Link to={`/borrow/${book.data._id}`}>Borrow This Book</Link>
              </Button>
              <Button variant="outline" className="text-sky-500 hover:text-orange-600 border w-full py-1 px-2 rounded-2xl">
                <Link to="/books">Back to All Books</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookdetails;
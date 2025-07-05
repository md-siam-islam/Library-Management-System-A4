import { useDeleteBookMutation, useGetAllBooksQuery } from '@/redux/api/baseapi';
import { Link } from 'react-router';
import Swal from 'sweetalert2'


const BookList = () => {

    const [deleteBook] = useDeleteBookMutation();

   const BookdeleteFunc = async (id: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  });

  if (result.isConfirmed) {
    try {
      await deleteBook(id).unwrap(); 
      Swal.fire(
        'Deleted!',
        'Your book has been deleted.',
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to delete the book.',
        'error'
      );
      console.error("Delete failed:", error);
    }
  }
};


  const { data, error, isLoading } = useGetAllBooksQuery(undefined);
  console.log(data, error, isLoading);

 if (isLoading) return <div className="text-center py-8">Loading books...</div>;
  
  if (error) return <div className="text-red-500 text-center py-8">
    Error loading books! {"message" in error ? error.message : "Unknown error"}
  </div>;

  return (
    <div className="container mx-auto p-4">
  <h2 className="text-2xl font-bold mb-6 text-center underline">All Books</h2>
  
  {/* Mobile Cards (show on small screens) */}
  <div className="md:hidden space-y-4">
    {data?.map((book) => (
      <div key={book._id} className="bg-white border rounded-lg p-4 shadow-sm">
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-gray-600">by {book.author}</p>
          <div className="flex flex-wrap gap-1">
            <span className="bg-gray-100 px-2 py-1 rounded text-sm">{book.genre}</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-sm">{book.isbn}</span>
            <span className={`px-2 py-1 rounded text-sm ${
              book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {book.available ? 'Available' : 'Unavailable'} ({book.copies})
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/edit-book/${book._id}`}
            className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 px-3 py-1 rounded-lg"
          >
            Edit
          </Link>
          <Link
            to={`/borrow/${book._id}`}
            className="text-sm bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 px-3 py-1 rounded-lg"
          >
            Borrow
          </Link>
          <button 
            onClick={() => BookdeleteFunc(book._id)}
            className="text-sm bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-lg"
          >
            Delete
          </button>
          <Link
            to={`/books/${book._id}`}
            className="text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg"
          >
            Details
          </Link>
        </div>
      </div>
    ))}
  </div>

  {/* Desktop Table (show on medium screens and up) */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full bg-white border rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Title</th>
          <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Author</th>
          <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Genre</th>
          <th className="py-3 px-4 border-b text-left font-medium text-gray-700">ISBN</th>
          <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Copies</th>
          <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Status</th>
          <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data?.map((book) => (
          <tr key={book._id} className="hover:bg-gray-50">
            <td className="py-3 px-4">{book.title}</td>
            <td className="py-3 px-4">{book.author}</td>
            <td className="py-3 px-4">{book.genre}</td>
            <td className="py-3 px-4 font-mono text-sm">{book.isbn}</td>
            <td className="py-3 px-4 text-center">{book.copies}</td>
            <td className="py-3 px-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {book.available ? 'Available' : 'Unavailable'}
              </span>
            </td>
            <td className="py-3 px-4 space-x-2">
              <Link
                to={`/edite-book/${book._id}`}
                className="inline-flex items-center px-3 py-1 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Edit
              </Link>
              <Link
                to={`/borrow/${book._id}`}
                className="inline-flex items-center px-3 py-1 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50"
              >
                Borrow
              </Link>
              <button
                onClick={() => BookdeleteFunc(book._id)}
                className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
              >
                Delete
              </button>
              <Link
                to={`/books/${book._id}`}
                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-600 bg-white hover:bg-gray-50"
              >
                Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default BookList;
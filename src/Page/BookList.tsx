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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Author</th>
              <th className="py-2 px-4 border">Genre</th>
              <th className="py-2 px-4 border">ISBN</th>
              <th className="py-2 px-4 border">Copies</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((book) => (
              <tr key={book._id}>
                <td className="py-2 px-4 border">{book.title}</td>
                <td className="py-2 px-4 border">{book.author}</td>
                <td className="py-2 px-4 border">{book.genre}</td>
                <td className="py-2 px-4 border">{book.isbn}</td>
                <td className="py-2 px-4 border">{book.copies}</td>
                <td className="py-2 px-4 border">
                  {book.available ? (
                    <span className="text-green-600">Available</span>
                  ) : (
                    <span className="text-red-600">Unavailable</span>
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="mr-2 text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/borrow/${book._id}`}
                    className="mr-2 text-green-600 hover:underline"
                  >
                    Borrow
                  </Link>
                  <button onClick={() => BookdeleteFunc (book._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
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
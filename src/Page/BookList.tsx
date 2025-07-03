import { useGetAllBooksQuery } from '@/redux/api/baseapi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
}

const BookList = () => {

  const { data, error, isLoading } = useGetAllBooksQuery(undefined);
  console.log(data, error, isLoading);

//   useEffect(() => {
//     // Fetch books from API
//     const fetchBooks = async () => {
//       const response = await fetch('/api/books');
//       const data = await response.json();
//       setBooks(data);
//     };
//     fetchBooks();
//   }, []);

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
                  <button className="text-red-600 hover:underline">
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
import { Link } from "react-router";


const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Library Management</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/books" className="hover:underline">
              All Books
            </Link>
          </li>
          <li>
            <Link to="/create-book" className="hover:underline">
              Add Book
            </Link>
          </li>
          <li>
            <Link to="/borrow-summary" className="hover:underline">
              Borrow Summary
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
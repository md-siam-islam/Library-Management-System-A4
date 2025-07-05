import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-sky-500 p-4 text-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Library Management</h1>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <NavItem to="/" text="Home" />
            <NavItem to="/books" text="All Books" />
            <NavItem to="/create-book" text="Add Book" />
            <NavItem to="/borrow-summary" text="Borrow Summary" />
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-3">
            <MobileNavItem to="/" text="Home" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/books" text="All Books" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/create-book" text="Add Book" onClick={() => setIsOpen(false)} />
            <MobileNavItem to="/borrow-summary" text="Borrow Summary" onClick={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  );
};

// Reusable component for desktop nav items
const NavItem = ({ to, text }: { to: string; text: string }) => (
  <li>
    <Link 
      to={to} 
      className="hover:underline hover:text-sky-100 transition-colors"
    >
      {text}
    </Link>
  </li>
);

// Reusable component for mobile nav items
const MobileNavItem = ({ 
  to, 
  text, 
  onClick 
}: { 
  to: string; 
  text: string;
  onClick: () => void;
}) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="block py-2 px-4 hover:bg-sky-400 rounded transition-colors"
  >
    {text}
  </Link>
);

export default Navbar;
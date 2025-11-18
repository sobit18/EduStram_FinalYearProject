import React, { useState, useEffect } from "react";
import Navitem from "../components/custom/Navitem";
import { Menu, X, BookOpen, User, LogIn } from "lucide-react";
import { useLocation } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div 
        className={`fixed w-full px-4 py-3 flex items-center justify-between z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white mr-2">
            <BookOpen size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            EduStream
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex h-full gap-4 text-lg items-center">
          <Navitem 
            head="Home" 
            to="/" 
            className="rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700 hover:text-indigo-600" 
          />
          <Navitem 
            head="Courses" 
            to="/courses" 
            className="rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700 hover:text-indigo-600" 
          />
          <Navitem 
            head="Features" 
            to="/features" 
            className="rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700 hover:text-indigo-600" 
          />
          <Navitem 
            head="About Us" 
            to="/aboutus" 
            className="rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700 hover:text-indigo-600" 
          />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <Navitem 
            head="Login" 
            to="/login" 
            className="flex items-center gap-1 rounded-lg px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium hover:text-indigo-600" 
            icon={<LogIn size={18} />}
          />
          <Navitem 
            head="Register" 
            to="/register" 
            className="flex items-center gap-1 rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg" 
            icon={<User size={18} />}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`absolute top-full left-0 w-full bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex flex-col py-4">
            <Navitem 
              head="Home" 
              to="/" 
              className="px-6 py-3 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700" 
            />
            <Navitem 
              head="Courses" 
              to="/courses" 
              className="px-6 py-3 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700" 
            />
            <Navitem 
              head="Features" 
              to="/features" 
              className="px-6 py-3 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700" 
            />
            <Navitem 
              head="About Us" 
              to="/aboutus" 
              className="px-6 py-3 hover:bg-indigo-50 transition-colors duration-200 font-medium text-gray-700" 
            />
            
            <div className="border-t border-gray-100 my-2"></div>
            
            <Navitem 
              head="Login" 
              to="/login" 
              className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:bg-indigo-50 transition-colors duration-200 font-medium" 
              icon={<LogIn size={18} />}
            />
            <Navitem 
              head="Register" 
              to="/register" 
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 font-medium mx-4 mt-2 rounded-lg" 
              icon={<User size={18} />}
            />
          </div>
        </div>
      </div>
      
      {/* Add padding to the top of the page content to account for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Nav;
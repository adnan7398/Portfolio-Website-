
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-700/50" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Go to homepage"
        >
          <span className="text-blue-400 font-bold text-2xl">AD</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-base font-medium transition-all duration-200 relative group",
                location.pathname === item.path 
                  ? "text-blue-400" 
                  : "text-gray-300 hover:text-blue-400"
              )}
            >
              {item.name}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full",
                  location.pathname === item.path ? "w-full" : ""
                )}
              />
            </Link>
          ))}
        </nav>
        
        <Link
          to="/contact"
          className="hidden md:flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
        >
          Contact me
        </Link>
      
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 z-50"
          aria-label="Toggle mobile menu"
        >
          <span className={cn(
            "block w-6 h-0.5 bg-gray-300 transition-all duration-300",
            mobileMenuOpen && "translate-y-2 rotate-45"
          )} />
          <span className={cn(
            "block w-6 h-0.5 bg-gray-300 transition-all duration-300",
            mobileMenuOpen && "opacity-0"
          )} />
          <span className={cn(
            "block w-6 h-0.5 bg-gray-300 transition-all duration-300",
            mobileMenuOpen && "-translate-y-2 -rotate-45"
          )} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 p-6 flex flex-col justify-center transition-transform duration-500 md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col space-y-6 text-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-xl font-medium py-3 transition-all duration-200",
                location.pathname === item.path 
                  ? "text-blue-400" 
                  : "text-gray-300 hover:text-blue-400"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full transition-all hover:shadow-lg shadow-lg shadow-blue-500/25"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact me
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

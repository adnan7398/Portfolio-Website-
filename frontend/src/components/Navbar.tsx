
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll events
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

  // Close mobile menu when route changes
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
        scrolled ? "py-3 glass-effect shadow-lg" : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Go to homepage"
        >
          <span className="text-brand-blue font-bold text-2xl">AD</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-base font-medium transition-all duration-200 relative group",
                location.pathname === item.path 
                  ? "text-brand-blue" 
                  : "text-gray-700 hover:text-brand-blue"
              )}
            >
              {item.name}
              <span 
                className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full",
                  location.pathname === item.path ? "w-full" : ""
                )}
              />
            </Link>
          ))}
        </nav>
        
        {/* Contact Button */}
        <Link
          to="/contact"
          className="hidden md:flex items-center justify-center px-6 py-2.5 bg-brand-blue text-white font-medium rounded-full transition-all hover:shadow-lg hover:scale-105 active:scale-95"
        >
          Contact me
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 z-50"
          aria-label="Toggle mobile menu"
        >
          <span className={cn(
            "block w-6 h-0.5 bg-gray-800 transition-all duration-300",
            mobileMenuOpen && "translate-y-2 rotate-45"
          )} />
          <span className={cn(
            "block w-6 h-0.5 bg-gray-800 transition-all duration-300",
            mobileMenuOpen && "opacity-0"
          )} />
          <span className={cn(
            "block w-6 h-0.5 bg-gray-800 transition-all duration-300",
            mobileMenuOpen && "-translate-y-2 -rotate-45"
          )} />
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 p-6 flex flex-col justify-center transition-transform duration-500 md:hidden glass-effect",
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
                  ? "text-brand-blue" 
                  : "text-gray-700"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-4 flex items-center justify-center px-6 py-3 bg-brand-blue text-white font-medium rounded-full transition-all"
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

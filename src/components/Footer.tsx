
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-brand-blue font-bold text-2xl">AD</span>
            </Link>
            <p className="mt-2 text-gray-600 text-sm">
              Building digital products, brands, and experiences.
            </p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h3 className="text-gray-900 font-medium mb-3">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors text-sm">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors text-sm">About</Link>
              <Link to="/projects" className="text-gray-600 hover:text-brand-blue transition-colors text-sm">Projects</Link>
              <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors text-sm">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-medium mb-3">Connect</h3>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/adnan7398" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-blue transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-brand-blue transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href="mailto:123adnansiddiqui@gmail.com"
                className="text-gray-600 hover:text-brand-blue transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} Mohd Adnan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

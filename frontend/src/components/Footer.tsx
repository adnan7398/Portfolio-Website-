
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  Twitter
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Hide footer on admin dashboard
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight">Mohd <span className="text-primary">Adnan</span></span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building digital products, brands, and experiences with meticulous attention to detail.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">Navigation</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-foreground hover:text-primary transition-colors text-sm">Home</Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors text-sm">About</Link>
                <Link to="/projects" className="text-foreground hover:text-primary transition-colors text-sm">Projects</Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors text-sm">Contact</Link>
              </nav>
            </div>

            <div>
              <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">Socials</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/adnan7398"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:123adnansiddiqui@gmail.com"
                  className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-muted-foreground text-xs">
            &copy; {currentYear} Mohd Adnan. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs flex items-center gap-1">
            Designed with <span className="text-red-500">♥</span> and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

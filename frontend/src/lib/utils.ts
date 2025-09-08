import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Centralized API base URL resolver
// Priority: explicit VITE_API_URL > Vercel deployment > Render-deployed origin > localhost
export const API_BASE_URL: string = (() => {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.replace(/\/$/, '');
  }

  // If running in browser, check for specific deployment environments
  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;
    
    // If frontend is on Vercel, use Render backend
    if (hostname.includes('vercel.app')) {
      return 'https://portfolio-website-s2e8.onrender.com';
    }
    
    // If frontend is hosted on Render or any other domain, assume backend lives at same host
    if (!/localhost|127\.0\.0\.1/.test(origin)) {
      return origin.replace(/\/$/, '');
    }
  }

  // Fallback to local dev backend
  return 'http://localhost:3001';
})();

export function buildApiUrl(path: string): string {
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${sanitizedPath}`;
}

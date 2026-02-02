import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Centralized API base URL resolver
// Priority: explicit VITE_API_URL > Vercel deployment > Render-deployed origin > localhost
export const API_BASE_URL: string = (() => {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined;

  // If VITE_API_URL is set (e.g., in .env.local), use it
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    // If it's the Vercel app URL (often set by default in some environments), ignore it and use Render backend
    // This prevents the frontend from trying to call itself as the backend
    if (!envUrl.includes('vercel.app')) {
      return envUrl.replace(/\/$/, '');
    }
  }

  // If running in browser
  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;

    // If on localhost, use local backend
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }

    // If on Vercel or any other production domain, use the Render backend
    return 'https://portfolio-website-s2e8.onrender.com';
  }

  // Fallback default
  return 'http://localhost:3001';
})();

export function buildApiUrl(path: string): string {
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${sanitizedPath}`;
}

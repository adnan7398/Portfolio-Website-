import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Centralized API base URL resolver
// Priority: explicit VITE_API_URL > Vercel deployment > Render-deployed origin > localhost
// Priority: Localhost check > explicit VITE_API_URL > Default Production Backend
export const API_BASE_URL: string = (() => {
  // 1. Force Localhost if running locally
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
  }

  // 2. Check for explicit env var (allow override via VITE_API_URL)
  // We filter out 'vercel.app' URLs because that's often the frontend URL, not the backend
  const envUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0 && !envUrl.includes('vercel.app')) {
    return envUrl.replace(/\/$/, '');
  }

  // 3. Default to the known working Production Backend
  // This ensures that whether deployed on Vercel, Render, or Netlify, it hits the correct backend
  return 'https://portfolio-website-s2e8.onrender.com';
})();

export function buildApiUrl(path: string): string {
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${sanitizedPath}`;
}

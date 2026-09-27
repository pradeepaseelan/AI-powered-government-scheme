import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-8xl font-semibold text-navy-100">404</span>
      <h1 className="mt-4 text-2xl font-semibold text-navy-900">Page not found</h1>
      <p className="mt-2 text-navy-700/70">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </div>
  );
}

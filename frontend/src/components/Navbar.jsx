import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/schemes', label: 'Schemes' },
  { to: '/eligibility', label: 'Eligibility Checker' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-saffron-600' : 'text-navy-700 hover:text-saffron-600'}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-navy-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-500 via-white to-indiagreen-500 border border-navy-100 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-navy-700" />
          </span>
          <span className="font-display font-semibold text-lg text-navy-900">Scheme Setu</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-navy-700 hover:text-saffron-600">
                Hi, {user.fullName.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-navy-700 hover:text-saffron-600">Login</Link>
              <Link to="/register" className="btn-accent !px-4 !py-2 text-sm">Register</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-navy-700 text-2xl" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-navy-100 bg-white px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <hr className="border-navy-100" />
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm font-medium text-navy-700">Dashboard</Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="btn-outline text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-navy-700">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-accent text-sm">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

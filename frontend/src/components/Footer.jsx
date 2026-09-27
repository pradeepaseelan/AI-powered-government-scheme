import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-semibold text-xl text-white">Scheme Setu</span>
          <p className="mt-3 text-sm text-navy-100/70 leading-relaxed">
            A bridge between citizens and the government schemes they're entitled to —
            built for Smart India Hackathon 2025.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3 text-sm uppercase tracking-wide">Explore</h4>
          <ul className="space-y-2 text-sm text-navy-100/70">
            <li><Link to="/schemes" className="hover:text-saffron-400">Government Schemes</Link></li>
            <li><Link to="/eligibility" className="hover:text-saffron-400">Eligibility Checker</Link></li>
            <li><Link to="/assistant" className="hover:text-saffron-400">AI Assistant</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3 text-sm uppercase tracking-wide">Account</h4>
          <ul className="space-y-2 text-sm text-navy-100/70">
            <li><Link to="/login" className="hover:text-saffron-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-saffron-400">Register</Link></li>
            <li><Link to="/admin/login" className="hover:text-saffron-400">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3 text-sm uppercase tracking-wide">Contact</h4>
          <ul className="space-y-2 text-sm text-navy-100/70">
            <li><Link to="/contact" className="hover:text-saffron-400">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-saffron-400">About the Project</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-navy-100/50">
        Built as a mini project for demonstration purposes — not an official Government of India website.
      </div>
    </footer>
  );
}

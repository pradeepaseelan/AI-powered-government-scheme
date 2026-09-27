import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = errors ? Object.values(errors)[0] : err.response?.data?.message || 'Registration failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="eyebrow">Get started</span>
          <h1 className="mt-2 text-3xl font-semibold text-navy-900">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="label-text" htmlFor="fullName">Full name</label>
            <input id="fullName" name="fullName" required className="input-field" placeholder="Your name"
              value={form.fullName} onChange={handleChange} />
          </div>
          <div>
            <label className="label-text" htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required className="input-field" placeholder="you@example.com"
              value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className="label-text" htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" className="input-field" placeholder="10-digit mobile number"
              value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="label-text" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required minLength={6} className="input-field" placeholder="At least 6 characters"
              value={form.password} onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-navy-700/70">
          Already have an account?{' '}
          <Link to="/login" className="text-saffron-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="eyebrow">Welcome back</span>
          <h1 className="mt-2 text-3xl font-semibold text-navy-900">Log in to your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label className="label-text" htmlFor="email">Email address</label>
            <input
              id="email" name="email" type="email" required
              className="input-field" placeholder="you@example.com"
              value={form.email} onChange={handleChange}
            />
          </div>
          <div>
            <label className="label-text" htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password" required
              className="input-field" placeholder="••••••••"
              value={form.password} onChange={handleChange}
            />
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-sm text-navy-600 hover:text-saffron-600">Forgot password?</Link>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-navy-700/70">
          Don't have an account?{' '}
          <Link to="/register" className="text-saffron-600 font-medium hover:underline">Register here</Link>
        </p>
        <p className="text-center mt-2 text-sm">
          <Link to="/admin/login" className="text-navy-600 hover:underline">Admin login</Link>
        </p>
      </div>
    </div>
  );
}

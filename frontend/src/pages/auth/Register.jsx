import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios.js';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/auth/register', { full_name: fullName, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-8 text-white">
      <div className="w-full max-w-md rounded-3xl bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Create Account</h1>
        <p className="mt-2 text-slate-400">Start managing inventory, sales, and customers in Merchant OS.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              placeholder="Create a secure password"
            />
          </div>
          {error && <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-red-200">{error}</div>}
          <button className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-white hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

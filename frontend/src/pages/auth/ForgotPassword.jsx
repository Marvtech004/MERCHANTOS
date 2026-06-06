import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('If that email exists, we sent a reset link.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-8 text-white">
      <div className="w-full max-w-md rounded-3xl bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">Forgot Password</h1>
        <p className="mt-2 text-slate-400">Enter your email and we will send instructions to reset your password.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
          {message && <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-emerald-200">{message}</div>}
          <button className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-400">
          <Link to="/login" className="text-white hover:underline">Return to login</Link>
        </div>
      </div>
    </div>
  );
}

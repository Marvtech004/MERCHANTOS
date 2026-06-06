import { useEffect, useState } from 'react';
import api from '../../api/axios.js';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get('/auth/profile');
        setProfile(response.data);
        setName(response.data.full_name);
        setAvatarUrl(response.data.avatar_url || '');
      } catch {
        setProfile(null);
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put('/auth/profile', { full_name: name, avatar_url: avatarUrl });
      setMessage('Profile updated successfully.');
    } catch {
      setMessage('Unable to update profile.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Profile</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage your account details and display settings.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Account</h3>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-500 dark:text-slate-400">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-500 dark:text-slate-400">Avatar URL</label>
              <input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <button onClick={handleSubmit} className="rounded-2xl bg-primary px-5 py-3 text-white transition hover:bg-emerald-600">
              Save Profile
            </button>
            {message && <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-emerald-200">{message}</div>}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Details</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p><strong>Email:</strong> {profile?.email || 'Loading...'}</p>
            <p><strong>Role:</strong> {profile?.role_id || 'N/A'}</p>
              <p><strong>Member since:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FiBell, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';

export default function Topbar({ darkMode, setDarkMode }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage inventory, sales, reports, and customers from one platform.</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode((mode) => !mode)}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
          {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
          <FiBell /> Alerts
        </button>
      </div>
    </div>
  );
}

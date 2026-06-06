import { useEffect, useState } from 'react';
import api from '../../api/axios.js';

const reportTypes = [
  { key: 'daily-sales', label: 'Daily Sales' },
  { key: 'weekly-sales', label: 'Weekly Sales' },
  { key: 'monthly-sales', label: 'Monthly Sales' },
  { key: 'revenue-report', label: 'Revenue Report' },
  { key: 'inventory-report', label: 'Inventory Report' }
];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(reportTypes[0].key);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadReports() {
      try {
        const response = await api.get('/reports');
        setReports(response.data);
      } catch (err) {
        console.warn(err);
      }
    }
    loadReports();
  }, []);

  const generateReport = async () => {
    try {
      const response = await api.post('/reports/generate', { type: selected, filters: {} });
      setReports((prev) => [response.data, ...prev]);
      setMessage('Report generated successfully.');
    } catch {
      setMessage('Unable to generate report.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Reports</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Create and export sales, inventory, and revenue reports.</p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" value={selected} onChange={(e) => setSelected(e.target.value)}>
            {reportTypes.map((option) => (
              <option value={option.key} key={option.key}>{option.label}</option>
            ))}
          </select>
          <button onClick={generateReport} className="rounded-2xl bg-primary px-5 py-3 text-white transition hover:bg-emerald-600">
            Generate Report
          </button>
        </div>
        {message && <p className="mt-4 rounded-2xl bg-emerald-500/10 p-4 text-emerald-200">{message}</p>}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {reports.map((report) => (
          <div key={report.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">{report.type}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Generated at {new Date(report.created_at).toLocaleString()}</p>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">Payload: {JSON.stringify(report.payload)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

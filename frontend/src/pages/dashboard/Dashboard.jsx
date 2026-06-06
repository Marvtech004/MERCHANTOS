import { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../api/axios.js';

const summaryBlocks = [
  { label: 'Total Revenue', value: '$24,820' },
  { label: 'Total Sales', value: '1,248' },
  { label: 'Total Customers', value: '382' },
  { label: 'Total Products', value: '214' }
];

const dailySales = [
  { name: 'Mon', sales: 1800 },
  { name: 'Tue', sales: 2100 },
  { name: 'Wed', sales: 1200 },
  { name: 'Thu', sales: 2600 },
  { name: 'Fri', sales: 2900 },
  { name: 'Sat', sales: 3200 },
  { name: 'Sun', sales: 2700 }
];

const monthlyRevenue = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 15000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 21000 },
  { name: 'May', revenue: 24000 },
  { name: 'Jun', revenue: 26200 }
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      try {
        const response = await api.get('/sales');
        setTransactions(response.data.slice(0, 6));
      } catch (err) {
        console.warn(err);
      }
    }
    fetchSales();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-4">
        {summaryBlocks.map((block) => (
          <div key={block.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">{block.label}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{block.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Daily Sales</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySales} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#16A34A" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Monthly Revenue</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#16A34A" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Transactions</h2>
          <div className="mt-4 space-y-4">
            {transactions.length > 0 ? (
              transactions.map((sale) => (
                <div key={sale.id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{sale.invoice_number}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{sale.payment_method} • {new Date(sale.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className="text-lg font-semibold text-primary">${sale.total}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No recent transactions available.</p>
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Low Stock Alerts</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">Apple MacBook Air — 4 units</li>
            <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">Wireless Mouse — 8 units</li>
            <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">Vitamin C Tablets — 6 units</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import api from '../../api/axios.js';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await api.get('/customers');
        setCustomers(response.data);
      } catch (err) {
        console.warn(err);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Customers</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage customer records and review purchase history.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {customers.map((customer) => (
          <div key={customer.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-white">{customer.full_name}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{customer.email || 'No email'}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{customer.phone || 'No phone'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import api from '../../api/axios.js';

export default function SalesHistory() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function loadSales() {
      try {
        const response = await api.get('/sales');
        setSales(response.data);
      } catch (err) {
        console.warn(err);
      }
    }
    loadSales();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sales History</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Browse completed transactions and review invoice details.</p>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
            <tr>
              <th className="px-6 py-4">Invoice</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-6 py-4">{sale.invoice_number}</td>
                <td className="px-6 py-4">{sale.customer_name || 'Guest'}</td>
                <td className="px-6 py-4">{sale.payment_method}</td>
                <td className="px-6 py-4">${sale.total}</td>
                <td className="px-6 py-4">{new Date(sale.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

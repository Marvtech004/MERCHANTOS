import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.warn(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Products</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage product inventory, stock levels, and categories.</p>
        </div>
        <Link to="/products/new" className="inline-flex items-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
          Add Product
        </Link>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.sku}</td>
                <td className={`px-6 py-4 font-semibold ${product.quantity <= product.low_stock_threshold ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>{product.quantity}</td>
                <td className="px-6 py-4">${product.selling_price}</td>
                <td className="px-6 py-4">{product.category_name || 'Uncategorized'}</td>
                <td className="px-6 py-4">
                  <Link to={`/products/${product.id}`} className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios.js';

const initialState = {
  name: '',
  sku: '',
  barcode: '',
  cost_price: '',
  selling_price: '',
  quantity: '',
  category_id: '',
  description: '',
  image_url: '',
  low_stock_threshold: ''
};

export default function ProductForm() {
  const { id } = useParams();
  const [product, setProduct] = useState(initialState);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct({ ...response.data });
      } catch (err) {
        console.warn(err);
      }
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, product);
      } else {
        await api.post('/products', product);
      }
      navigate('/products');
    } catch (err) {
      setMessage('Unable to save product.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{id ? 'Edit Product' : 'Add Product'}</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Capture product details, pricing, and inventory settings.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:grid-cols-2">
        {[
          { label: 'Product Name', name: 'name' },
          { label: 'SKU', name: 'sku' },
          { label: 'Barcode', name: 'barcode' },
          { label: 'Cost Price', name: 'cost_price', type: 'number' },
          { label: 'Selling Price', name: 'selling_price', type: 'number' },
          { label: 'Quantity', name: 'quantity', type: 'number' },
          { label: 'Category ID', name: 'category_id', type: 'number' },
          { label: 'Low Stock Threshold', name: 'low_stock_threshold', type: 'number' }
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">{field.label}</label>
            <input
              name={field.name}
              type={field.type || 'text'}
              value={product[field.name] || ''}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        ))}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Description</label>
          <textarea
            name="description"
            value={product.description || ''}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Image URL</label>
          <input
            name="image_url"
            type="text"
            value={product.image_url || ''}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="lg:col-span-2">
          <button className="rounded-2xl bg-primary px-6 py-3 text-white transition hover:bg-emerald-600">Save Product</button>
          {message && <p className="mt-3 text-sm text-rose-500">{message}</p>}
        </div>
      </form>
    </div>
  );
}

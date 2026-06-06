import { useEffect, useMemo, useState } from 'react';
import api from '../../api/axios.js';

export default function POS() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState('Walk-in');
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.warn(err);
      }
    }
    load();
  }, []);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.product_id === product.id);
      if (found) {
        return prev.map((item) => item.product_id === product.id ? { ...item, quantity: item.quantity + 1, total_price: (item.quantity + 1) * product.selling_price } : item);
      }
      return [...prev, { product_id: product.id, name: product.name, unit_price: product.selling_price, quantity: 1, total_price: product.selling_price }];
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
  const total = subtotal + Number(tax || 0) - Number(discount || 0);

  const handleSale = async () => {
    await api.post('/sales', {
      customer_id: null,
      payment_method: 'Cash',
      subtotal,
      tax,
      discount,
      total,
      items: cart
    });
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Point of Sale</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Quick checkout with product search, discounts, and receipt preview.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-sm text-slate-500 dark:text-slate-400">Customer</label>
              <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-slate-500 dark:text-slate-400">Discount</label>
              <input type="number" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-slate-500 dark:text-slate-400">Tax</label>
              <input type="number" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" value={tax} onChange={(e) => setTax(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <label className="text-sm text-slate-500 dark:text-slate-400">Search Products</label>
            <input className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or barcode" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {visibleProducts.slice(0, 8).map((product) => (
                <button key={product.id} onClick={() => addToCart(product)} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-900 transition hover:border-primary hover:bg-primary hover:text-white dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-500">
                  <div className="font-semibold">{product.name}</div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">${product.selling_price} • {product.quantity} in stock</div>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Cart</h3>
            <div className="mt-4 space-y-4">
              {cart.length ? cart.map((item) => (
                <div key={item.product_id} className="flex items-center justify-between rounded-3xl border border-slate-200 p-4 dark:border-slate-700">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">${item.total_price.toFixed(2)}</p>
                </div>
              )) : <p className="text-slate-500 dark:text-slate-400">No items in cart.</p>}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Receipt</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p><strong>Invoice:</strong> INV-{Date.now()}</p>
              <p><strong>Customer:</strong> {customer}</p>
              <p><strong>Items:</strong> {cart.length}</p>
              <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <p><strong>Tax:</strong> ${Number(tax).toFixed(2)}</p>
              <p><strong>Discount:</strong> -${Number(discount).toFixed(2)}</p>
              <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
            <button onClick={handleSale} className="mt-6 w-full rounded-2xl bg-primary px-4 py-3 text-white transition hover:bg-emerald-600">
              Complete Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

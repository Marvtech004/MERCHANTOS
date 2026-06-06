import { NavLink } from 'react-router-dom';
import { FiPieChart, FiPackage, FiShoppingCart, FiUsers, FiFileText, FiUser } from 'react-icons/fi';

const links = [
  { label: 'Dashboard', path: '/', icon: FiPieChart },
  { label: 'Products', path: '/products', icon: FiPackage },
  { label: 'POS', path: '/pos', icon: FiShoppingCart },
  { label: 'Sales', path: '/sales', icon: FiFileText },
  { label: 'Customers', path: '/customers', icon: FiUsers },
  { label: 'Reports', path: '/reports', icon: FiFileText },
  { label: 'Profile', path: '/profile', icon: FiUser }
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 lg:block">
      <div className="text-2xl font-semibold text-slate-900 dark:text-white">Merchant OS</div>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Business management for modern retailers.</p>
      <nav className="mt-8 space-y-2">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

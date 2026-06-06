import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import AIWidget from './AIWidget.jsx';

export default function Layout({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-6">
        <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
      <AIWidget />
    </div>
  );
}

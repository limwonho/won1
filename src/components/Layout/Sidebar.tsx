import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowLeftRight, Bell } from 'lucide-react';
import { useInventoryStore } from '../../store/inventoryStore';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '대시보드' },
  { to: '/inventory', icon: Package, label: '재고 목록' },
  { to: '/transactions', icon: ArrowLeftRight, label: '입출고 관리' },
];

export default function Sidebar() {
  const products = useInventoryStore((s) => s.products);
  const alertCount = products.filter((p) => p.currentStock < p.minStock).length;

  return (
    <aside className="w-60 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-slate-700">
        <h1 className="text-lg font-bold tracking-tight">재고 관리 시스템</h1>
        <p className="text-slate-400 text-xs mt-1">Inventory Manager</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <Bell size={18} />
          재고 알림
          {alertCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {alertCount}
            </span>
          )}
        </NavLink>
      </nav>

      <div className="px-6 py-4 border-t border-slate-700 text-xs text-slate-500">
        담당자: 관리자
      </div>
    </aside>
  );
}

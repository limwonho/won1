import { Package, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useInventoryStore } from '../store/inventoryStore';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const products = useInventoryStore((s) => s.products);
  const transactions = useInventoryStore((s) => s.transactions);

  const lowStockItems = products.filter((p) => p.currentStock < p.minStock);
  const totalIn = transactions.filter((t) => t.type === 'in').reduce((sum, t) => sum + t.quantity, 0);
  const totalOut = transactions.filter((t) => t.type === 'out').reduce((sum, t) => sum + t.quantity, 0);

  const categoryData = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const stockBarData = products.slice(0, 8).map((p) => ({
    name: p.name.length > 8 ? p.name.slice(0, 8) + '…' : p.name,
    재고: p.currentStock,
    최소: p.minStock,
  }));

  const recentTx = transactions.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">대시보드</h2>
        <p className="text-slate-500 text-sm mt-1">전체 재고 현황을 한눈에 확인하세요.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={<Package size={22} className="text-blue-600" />} label="전체 품목 수" value={`${products.length}개`} bg="bg-blue-50" />
        <StatCard icon={<AlertTriangle size={22} className="text-red-500" />} label="부족 재고 알림" value={`${lowStockItems.length}건`} bg="bg-red-50" highlight={lowStockItems.length > 0} />
        <StatCard icon={<TrendingUp size={22} className="text-emerald-600" />} label="총 입고 수량" value={`${totalIn.toLocaleString()}`} bg="bg-emerald-50" />
        <StatCard icon={<TrendingDown size={22} className="text-amber-600" />} label="총 출고 수량" value={`${totalOut.toLocaleString()}`} bg="bg-amber-50" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-slate-700 mb-4">품목별 재고 현황 (상위 8개)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stockBarData} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="재고" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="최소" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-slate-700 mb-4">카테고리 분포</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name }) => name}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock + Recent Transactions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" /> 부족 재고 품목
          </h3>
          {lowStockItems.length === 0 ? (
            <p className="text-slate-400 text-sm">부족 재고 없음</p>
          ) : (
            <div className="space-y-2">
              {lowStockItems.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.sku} · {p.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-red-600 font-bold text-sm">{p.currentStock}</span>
                    <span className="text-slate-400 text-xs"> / 최소 {p.minStock} {p.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-semibold text-slate-700 mb-3">최근 입출고 내역</h3>
          <div className="space-y-2">
            {recentTx.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{tx.productName}</p>
                  <p className="text-xs text-slate-400">{tx.createdAt} · {tx.createdBy}</p>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'in' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.type === 'in' ? '+' : '-'}{tx.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg, highlight }: {
  icon: React.ReactNode; label: string; value: string; bg: string; highlight?: boolean;
}) {
  return (
    <div className={`${bg} rounded-xl p-5 flex items-center gap-4 shadow-sm`}>
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className={`text-2xl font-bold mt-0.5 ${highlight ? 'text-red-600' : 'text-slate-800'}`}>{value}</p>
      </div>
    </div>
  );
}

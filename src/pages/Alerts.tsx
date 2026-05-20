import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';

export default function Alerts() {
  const products = useInventoryStore((s) => s.products);

  const lowStock = products.filter((p) => p.currentStock < p.minStock);
  const okStock = products.filter((p) => p.currentStock >= p.minStock);

  const severityColor = (current: number, min: number) => {
    const ratio = current / min;
    if (ratio === 0) return 'bg-red-100 border-red-300 text-red-800';
    if (ratio < 0.5) return 'bg-orange-50 border-orange-200 text-orange-700';
    return 'bg-yellow-50 border-yellow-200 text-yellow-700';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">재고 알림</h2>
        <p className="text-slate-500 text-sm mt-1">최소 수량 미달 품목을 확인하세요.</p>
      </div>

      {lowStock.length === 0 ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
          <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
          <p className="text-emerald-700 font-semibold">모든 재고가 정상 수준입니다!</p>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" />
            재고 부족 품목 ({lowStock.length}건)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {lowStock
              .sort((a, b) => a.currentStock / a.minStock - b.currentStock / b.minStock)
              .map((p) => {
                const ratio = Math.round((p.currentStock / p.minStock) * 100);
                return (
                  <div key={p.id} className={`border rounded-xl p-4 ${severityColor(p.currentStock, p.minStock)}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-base">{p.name}</p>
                        <p className="text-xs opacity-70 mt-0.5">{p.sku} · {p.location}</p>
                      </div>
                      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>현재: <strong>{p.currentStock} {p.unit}</strong></span>
                        <span>최소: {p.minStock} {p.unit}</span>
                      </div>
                      <div className="w-full bg-white/60 rounded-full h-2">
                        <div
                          className="bg-current h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(100, ratio)}%`, opacity: 0.7 }}
                        />
                      </div>
                      <p className="text-xs mt-1 opacity-70">최소 대비 {ratio}% 수준</p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium">
                      <TrendingUp size={13} />
                      부족 수량: {p.minStock - p.currentStock} {p.unit} 발주 필요
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {okStock.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-500" />
            정상 재고 품목 ({okStock.length}건)
          </h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['품목명', 'SKU', '현재 재고', '최소 수량', '여유'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {okStock.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">{p.name}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{p.sku}</td>
                    <td className="px-4 py-3 text-emerald-600 font-semibold">{p.currentStock} {p.unit}</td>
                    <td className="px-4 py-3 text-slate-500">{p.minStock} {p.unit}</td>
                    <td className="px-4 py-3 text-slate-500">+{p.currentStock - p.minStock} {p.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

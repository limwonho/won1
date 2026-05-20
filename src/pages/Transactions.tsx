import { useState } from 'react';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';
import TransactionModal from '../components/Transactions/TransactionModal';

export default function Transactions() {
  const transactions = useInventoryStore((s) => s.transactions);
  const [typeFilter, setTypeFilter] = useState<'all' | 'in' | 'out'>('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = transactions.filter((t) =>
    typeFilter === 'all' ? true : t.type === typeFilter
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">입출고 관리</h2>
          <p className="text-slate-500 text-sm mt-1">재고 입고 및 출고 내역</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> 입출고 등록
        </button>
      </div>

      {/* Filter */}
      <div className="flex border border-slate-200 rounded-lg overflow-hidden w-fit bg-white shadow-sm text-sm">
        {(['all', 'in', 'out'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setTypeFilter(f)}
            className={`px-5 py-2 font-medium transition-colors ${
              typeFilter === f ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f === 'all' ? '전체' : f === 'in' ? '입고' : '출고'}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['구분', '품목명', '수량', '메모', '담당자', '일시'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">내역이 없습니다.</td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      tx.type === 'in'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {tx.type === 'in' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {tx.type === 'in' ? '입고' : '출고'}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{tx.productName}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${tx.type === 'in' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {tx.type === 'in' ? '+' : '-'}{tx.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{tx.note || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{tx.createdBy}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{tx.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && <TransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

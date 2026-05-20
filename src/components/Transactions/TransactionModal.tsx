import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useInventoryStore } from '../../store/inventoryStore';

interface Props {
  onClose: () => void;
}

export default function TransactionModal({ onClose }: Props) {
  const products = useInventoryStore((s) => s.products);
  const addTransaction = useInventoryStore((s) => s.addTransaction);

  const [form, setForm] = useState({
    productId: '',
    type: 'in' as 'in' | 'out',
    quantity: 1,
    note: '',
    createdBy: '',
  });

  const selectedProduct = products.find((p) => p.id === form.productId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.productId || form.quantity < 1) return;
    addTransaction({
      ...form,
      productName: selectedProduct?.name ?? '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-800">입출고 등록</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">품목 선택 *</label>
            <select
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">품목을 선택하세요</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (현재: {p.currentStock} {p.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">구분 *</label>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden text-sm">
              {(['in', 'out'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, type: t })}
                  className={`flex-1 py-2 font-medium transition-colors ${
                    form.type === t
                      ? t === 'in' ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t === 'in' ? '입고' : '출고'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">수량 *</label>
            <input
              type="number"
              min={1}
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: Math.max(1, Number(e.target.value)) })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {selectedProduct && form.type === 'out' && form.quantity > selectedProduct.currentStock && (
              <p className="text-red-500 text-xs mt-1">현재 재고({selectedProduct.currentStock})보다 많습니다.</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">담당자</label>
            <input
              type="text"
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
              placeholder="이름 입력"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">메모</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="입출고 사유 등"
              rows={2}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
              취소
            </button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

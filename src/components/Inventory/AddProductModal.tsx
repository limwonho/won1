import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useInventoryStore } from '../../store/inventoryStore';

interface Props {
  onClose: () => void;
}

export default function AddProductModal({ onClose }: Props) {
  const addProduct = useInventoryStore((s) => s.addProduct);
  const [form, setForm] = useState({
    name: '', sku: '', category: '', unit: '', location: '', currentStock: 0, minStock: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.sku) return;
    addProduct(form);
    onClose();
  };

  const field = (label: string, key: keyof typeof form, type = 'text') => (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={key === 'name' || key === 'sku'}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-800">품목 추가</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {field('품목명 *', 'name')}
          {field('SKU *', 'sku')}
          {field('카테고리', 'category')}
          <div className="grid grid-cols-2 gap-3">
            {field('단위', 'unit')}
            {field('위치', 'location')}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {field('현재 재고', 'currentStock', 'number')}
            {field('최소 재고', 'minStock', 'number')}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
              취소
            </button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

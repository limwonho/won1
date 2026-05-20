import { useState } from 'react';
import { Search, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import { useInventoryStore } from '../store/inventoryStore';
import type { Product } from '../types';
import AddProductModal from '../components/Inventory/AddProductModal';

export default function Inventory() {
  const products = useInventoryStore((s) => s.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [showModal, setShowModal] = useState(false);

  const categories = ['전체', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === '전체' || p.category === category;
    const isLow = p.currentStock < p.minStock;
    const matchStatus =
      statusFilter === '전체' ||
      (statusFilter === '부족' && isLow) ||
      (statusFilter === '정상' && !isLow);
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">재고 목록</h2>
          <p className="text-slate-500 text-sm mt-1">전체 {products.length}개 품목</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> 품목 추가
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="품목명 또는 SKU 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <div className="flex border border-slate-200 rounded-lg overflow-hidden text-sm">
          {['전체', '정상', '부족'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 font-medium transition-colors ${
                statusFilter === s ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['품목명', 'SKU', '카테고리', '위치', '현재고', '최소수량', '상태', '최종 수정'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-slate-400">검색 결과가 없습니다.</td>
              </tr>
            ) : (
              filtered.map((p) => <ProductRow key={p.id} product={p} />)
            )}
          </tbody>
        </table>
      </div>

      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function ProductRow({ product: p }: { product: Product }) {
  const isLow = p.currentStock < p.minStock;
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
      <td className="px-4 py-3 text-slate-500 font-mono text-xs">{p.sku}</td>
      <td className="px-4 py-3">
        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{p.category}</span>
      </td>
      <td className="px-4 py-3 text-slate-500">{p.location}</td>
      <td className="px-4 py-3">
        <span className={`font-bold ${isLow ? 'text-red-600' : 'text-slate-800'}`}>
          {p.currentStock} {p.unit}
        </span>
      </td>
      <td className="px-4 py-3 text-slate-500">{p.minStock} {p.unit}</td>
      <td className="px-4 py-3">
        {isLow ? (
          <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
            <AlertTriangle size={13} /> 재고 부족
          </span>
        ) : (
          <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
            <CheckCircle size={13} /> 정상
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-slate-400 text-xs">{p.updatedAt}</td>
    </tr>
  );
}

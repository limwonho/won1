import type { Product, Transaction } from '../types';

export const mockProducts: Product[] = [
  { id: '1', name: 'A4 복사용지', sku: 'OFF-001', category: '사무용품', currentStock: 45, minStock: 20, unit: '박스', location: 'A-01', updatedAt: '2026-05-19' },
  { id: '2', name: '볼펜 (검정)', sku: 'OFF-002', category: '사무용품', currentStock: 8, minStock: 30, unit: '다스', location: 'A-02', updatedAt: '2026-05-18' },
  { id: '3', name: '스테이플러', sku: 'OFF-003', category: '사무용품', currentStock: 12, minStock: 5, unit: '개', location: 'A-03', updatedAt: '2026-05-15' },
  { id: '4', name: '토너 카트리지 (검정)', sku: 'PRT-001', category: '프린터 소모품', currentStock: 3, minStock: 5, unit: '개', location: 'B-01', updatedAt: '2026-05-20' },
  { id: '5', name: '토너 카트리지 (컬러)', sku: 'PRT-002', category: '프린터 소모품', currentStock: 2, minStock: 3, unit: '개', location: 'B-02', updatedAt: '2026-05-20' },
  { id: '6', name: '손 세정제', sku: 'CLN-001', category: '청소/위생', currentStock: 25, minStock: 10, unit: '개', location: 'C-01', updatedAt: '2026-05-17' },
  { id: '7', name: '화장지', sku: 'CLN-002', category: '청소/위생', currentStock: 4, minStock: 10, unit: '묶음', location: 'C-02', updatedAt: '2026-05-16' },
  { id: '8', name: '마스크 (KF94)', sku: 'CLN-003', category: '청소/위생', currentStock: 150, minStock: 50, unit: '개', location: 'C-03', updatedAt: '2026-05-14' },
  { id: '9', name: '노트북 충전기', sku: 'IT-001', category: 'IT 장비', currentStock: 6, minStock: 3, unit: '개', location: 'D-01', updatedAt: '2026-05-10' },
  { id: '10', name: 'USB 허브', sku: 'IT-002', category: 'IT 장비', currentStock: 9, minStock: 5, unit: '개', location: 'D-02', updatedAt: '2026-05-12' },
  { id: '11', name: '커피 원두', sku: 'BEV-001', category: '식음료', currentStock: 2, minStock: 5, unit: 'kg', location: 'E-01', updatedAt: '2026-05-19' },
  { id: '12', name: '생수 (500ml)', sku: 'BEV-002', category: '식음료', currentStock: 60, minStock: 24, unit: '개', location: 'E-02', updatedAt: '2026-05-18' },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', productId: '1', productName: 'A4 복사용지', type: 'in', quantity: 20, note: '정기 발주', createdBy: '김민준', createdAt: '2026-05-20 09:15' },
  { id: 't2', productId: '4', productName: '토너 카트리지 (검정)', type: 'out', quantity: 1, note: '3층 프린터 교체', createdBy: '이서연', createdAt: '2026-05-20 10:30' },
  { id: 't3', productId: '11', productName: '커피 원두', type: 'out', quantity: 1, note: '탕비실 보충', createdBy: '박지훈', createdAt: '2026-05-19 14:00' },
  { id: 't4', productId: '7', productName: '화장지', type: 'out', quantity: 2, note: '화장실 보충', createdBy: '최수아', createdAt: '2026-05-19 11:20' },
  { id: 't5', productId: '6', productName: '손 세정제', type: 'in', quantity: 10, note: '월간 발주', createdBy: '김민준', createdAt: '2026-05-18 09:00' },
  { id: 't6', productId: '2', productName: '볼펜 (검정)', type: 'out', quantity: 5, note: '신입사원 지급', createdBy: '이서연', createdAt: '2026-05-18 15:30' },
  { id: 't7', productId: '8', productName: '마스크 (KF94)', type: 'in', quantity: 100, note: '긴급 발주', createdBy: '박지훈', createdAt: '2026-05-17 13:00' },
  { id: 't8', productId: '10', productName: 'USB 허브', type: 'in', quantity: 3, note: '장비 구매', createdBy: '최수아', createdAt: '2026-05-16 16:00' },
];

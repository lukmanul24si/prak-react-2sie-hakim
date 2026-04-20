// src/data/dummyData.js
export const ordersData = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customerName: ["Lukmanul Hakim", "Budi Santoso", "Siti Aminah", "Andi Wijaya", "Rina Rose"][i % 5],
  status: ["Pending", "Completed", "Cancelled"][i % 3],
  totalPrice: `Rp ${(Math.random() * 500000 + 50000).toLocaleString('id-ID')}`,
  orderDate: `2024-05-${(i % 28) + 1}`
}));

export const customersData = Array.from({ length: 30 }, (_, i) => ({
  id: `CUST-${2000 + i}`,
  customerName: ["Lukmanul Hakim", "Budi Santoso", "Siti Aminah", "Andi Wijaya", "Rina Rose"][i % 5],
  email: `user${i}@example.com`,
  phone: `0812345678${i.toString().padStart(2, '0')}`,
  loyalty: ["Bronze", "Silver", "Gold"][i % 3]
}));
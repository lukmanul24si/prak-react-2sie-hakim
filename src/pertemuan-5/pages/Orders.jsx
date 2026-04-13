import React from "react";

export default function Orders({ searchQuery }) {
  const dataPesanan = [
    { id: "ORD-01", menu: "Nasi Goreng", qty: 2 },
    { id: "ORD-02", menu: "Ayam Bakar", qty: 1 },
    { id: "ORD-03", menu: "Es Teh Manis", qty: 3 },
  ];

  // Filter berdasarkan search bar di Header
  const filtered = dataPesanan.filter(item => 
    item.menu.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "15px" }}>
      <h3>Daftar Pesanan (Orders)</h3>
      <ul style={{ marginTop: "15px" }}>
        {filtered.map((item) => (
          <li key={item.id} style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <b>{item.id}</b> - {item.menu} ({item.qty} Porsi)
          </li>
        ))}
      </ul>
    </div>
  );
}
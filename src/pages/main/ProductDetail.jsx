import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook untuk tombol kembali
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;
  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Tombol Kembali Sesuai Gambar Modul */}
      <button 
        onClick={() => navigate(-1)} 
        className="text-blue-600 hover:underline mb-6 flex items-center font-medium"
      >
        ← Kembali ke Daftar
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* Kolom Gambar (Kiri) */}
        <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-auto object-contain mix-blend-multiply"
          />
        </div>

        {/* Kolom Informasi (Kanan) */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase w-fit mb-4">
            {product.category}
          </span>
          
          <h2 className="text-4xl font-bold text-slate-800 mb-2">{product.title}</h2>
          <p className="text-slate-500 italic mb-6 font-medium text-lg">Brand: {product.brand}</p>
          
          <p className="text-slate-600 leading-relaxed mb-8">
            {product.description || "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects."}
          </p>

          <div className="border-t pt-6">
            <p className="text-slate-400 text-sm mb-1 font-semibold">Harga Estimasi</p>
            <p className="text-4xl font-bold text-emerald-500">
              Rp {(product.price * 15000).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
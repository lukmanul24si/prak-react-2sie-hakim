import { useState, useEffect } from "react";
import { notesAPI } from "../../services/notesAPI";
import { AiFillDelete } from "react-icons/ai"; // Import ikon hapus

// ==========================================
// KELOMPOK KOMPONEN PEMBANTU (MOCK/CUSTOM)
// ==========================================

function AlertBox({ type, children }) {
    const isError = type === "error";
    return (
        <div className={`mb-4 p-4 text-sm rounded-2xl border ${
            isError 
                ? "text-red-800 bg-red-50 border-red-100" 
                : "text-emerald-800 bg-emerald-50 border-emerald-100"
        }`}>
            {children}
        </div>
    );
}

function LoadingSpinner({ text }) {
    return (
        <div className="flex flex-col items-center justify-center p-10 space-y-3">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm font-medium">{text || "Memuat..."}</p>
        </div>
    );
}

function EmptyState({ text }) {
    return (
        <div className="text-center p-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-4">
            <p className="text-gray-500 text-sm font-medium">{text}</p>
        </div>
    );
}

function GenericTable({ columns, data, renderRow }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-6 py-3 font-semibold">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((item, idx) => (
                        <tr key={item.id || idx} className="bg-white hover:bg-gray-50 transition-colors">
                            {renderRow(item, idx)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


// ==========================================
// KOMPONEN UTAMA: NOTESsss
// ==========================================

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        title: "",
        content: "",
        status: ""
    });

    // Load data saat komponen pertama kali di-render
    useEffect(() => {
        loadNotes();
    }, []);

    // Memanggil fetchNotes beserta error/loading handling
    const loadNotes = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await notesAPI.fetchNotes();
            setNotes(data || []);
        } catch (err) {
            setError("Gagal memuat catatan");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle perubahan nilai input form
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    // Handle form submission untuk membuat catatan baru
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.createNote(dataForm);

            setSuccess("Catatan berhasil ditambahkan!");

            // Kosongkan Form setelah Success
            setDataForm({ title: "", content: "", status: "" });

            // Hilangkan pesan Success setelah 3 detik
            setTimeout(() => setSuccess(""), 3000);
            
            // Refresh data otomatis setelah sukses submit
            loadNotes();
            
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle untuk aksi hapus data
    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus catatan ini?");
        if (!konfirmasi) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await notesAPI.deleteNote(id);
            setSuccess("Catatan berhasil dihapus!");
            
            // Hilangkan pesan Success setelah 3 detik
            setTimeout(() => setSuccess(""), 3000);

            // Refresh data terbaru dari database
            loadNotes();
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h2>
            </div>
            
            {/* Tampilan Notifikasi menggunakan AlertBox */}
            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Catatan Baru</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={dataForm.title}
                        placeholder="Judul catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                    />
                    
                    <textarea
                        name="content"
                        value={dataForm.content}
                        placeholder="Isi catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        rows="2"
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-60"
                    />
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                    >
                        {loading ? "Mohon Tunggu..." : "Tambah Data"}
                    </button>
                </form>
            </div>

            {/* Notes Table Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
                <div className="px-6 py-4 border-b border-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Daftar Catatan ({notes.length})
                    </h3>
                </div>
              
                {/* Terapkan Info Loading */}
                {loading && <LoadingSpinner text="Memuat catatan..." />}

                {/* Terapkan Info Data Kosong (Saat sukses fetch tapi data 0) */}
                {!loading && notes.length === 0 && !error && (
                    <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
                )}

                {/* Terapkan Info Data Kosong (Saat gagal fetch / error) */}
                {!loading && notes.length === 0 && error && (
                    <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
                )}
                
                {/* Menampilkan data notes menggunakan komponen GenericTable */}
                {!loading && notes.length > 0 ? (
                    <GenericTable
                        columns={["#", "Judul", "Isi Catatan", "Aksi"]} // Tambah kolom Aksi
                        data={notes}
                        renderRow={(note, index) => (
                            <>
                                <td className="px-6 py-4 font-medium text-gray-700 w-12">
                                    {index + 1}.
                                </td>
                                <td className="px-6 py-4 font-semibold text-emerald-600">
                                    {note.title}
                                </td>
                                <td className="px-6 py-4 max-w-xs text-gray-600 truncate">
                                    {note.content}
                                </td>
                                {/* Tambah td baru untuk tombol delete */}
                                <td className="px-6 py-4 w-20">
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        disabled={loading}
                                        className="p-1 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                                    >
                                        <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                                    </button>
                                </td>
                            </>
                        )}
                    />
                ) : null}
            </div>
        </div>
    );
}
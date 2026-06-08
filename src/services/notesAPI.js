import axios from "axios";

// Menggunakan variabel lingkungan (Environment Variables) bawaan Vite.
// Jika tidak terbaca di Vercel, kode ini otomatis menggunakan fallback string di sebelah kanan (||).
const API_URL = import.meta.env.VITE_SUPABASE_URL || "https://jdrlvovcuddoixbgcqhp.supabase.co";
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_p9RJmllAp2r8TmV7qAifUQ_DIUmWLfJ";

// Membuat instance Axios agar konfigurasi header tidak perlu ditulis berulang-ulang
const notesClient = axios.create({
  baseURL: `${API_URL}/rest/v1`,
  headers: {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    // PERBAIKAN: Supabase WAJIB meminta header ini saat POST data agar tidak memicu eror internal
    Prefer: "return=representation",
  },
});

export const notesAPI = {
  // Ambil semua data dari tabel 'note'
  async fetchNotes() {
    // Menuju ke endpoint /note
    const response = await notesClient.get("/note"); 
    return response.data;
  },

  // Tambah data baru ke tabel 'note'
  async createNote(data) {
    // Menuju ke endpoint /note dengan membawa data form
    const response = await notesClient.post("/note", data); 
    return response.data;
  },

  // Hapus data berdasarkan id catatan menggunakan HTTP method DELETE
  async deleteNote(id) {
    // Menembak ke endpoint /note?id=eq.{id} memanfaatkan notesClient instance
    const response = await notesClient.delete(`/note?id=eq.${id}`);
    return response.data;
  },
};
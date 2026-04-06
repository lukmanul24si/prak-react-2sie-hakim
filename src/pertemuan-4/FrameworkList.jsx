import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="max-w-4xl mx-auto p-6 md:p-8">
            <div className="grid gap-6">
                {frameworkData.map((item) => (
                    <div 
                        key={item.id} 
                        // Tambahan border kiri berwarna biru untuk aksen kartu
                        className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            
                            {/* Bagian Kiri: Teks dan Info */}
                            <div>
                                {/* Judul dengan warna teks gradasi biru ke ungu */}
                                <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {item.name}
                                </h2>
                                
                                <p className="text-gray-600 mt-2 leading-relaxed">
                                    {item.description}
                                </p>
                                
                                {/* Info Developer dengan badge warna kemerahan (rose) */}
                                <div className="mt-3 flex items-center gap-2 text-sm">
                                    <span className="font-semibold text-gray-700">Developer:</span>
                                    <span className="px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-md font-medium">
                                        {item.details.developer}
                                    </span>
                                </div>
                            </div>

                            {/* Bagian Kanan: Tombol Link */}
                            <div className="shrink-0 mt-2 md:mt-0">
                                <a 
                                    href={item.details.officialWebsite}
                                    // Atribut target="_blank" DIHAPUS agar user bisa klik "Back" di browser
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                                >
                                    Kunjungi Web
                                </a>
                            </div>
                            
                        </div>

                        {/* Bagian Bawah: Tags dengan warna hijau cerah (emerald) */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-bold rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
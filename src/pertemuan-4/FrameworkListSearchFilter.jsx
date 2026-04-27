import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
    /* Deklarasi state */
    //const [searchTerm, setSearchTerm] = useState("");
    //const [selectedTag, setSelectedTag] = useState("");

    /*Inisialisasi DataForm*/
		const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};

    /* Logic filter */
    const _searchTerm = searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name.toLowerCase().includes(_searchTerm) ||
            framework.description.toLowerCase().includes(_searchTerm);
            framework.details.developer.toLowerCase().includes(_searchTerm);


        const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    /** Deklarasi pengambilan unique tags di frameworkData **/
    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];

    return (
        <div className="max-w-6xl mx-auto p-8 md:p-12 bg-gray-50/50 min-h-screen">
            {/* Header section modern */}
            <div className="mb-10 border-b border-gray-200 pb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight">
                    Framework <span className="text-teal-600">Explorer</span>
                </h1>
                <p className="text-xl text-zinc-600 mt-4 max-w-2xl leading-relaxed">
                    Daftar teknologi modern untuk pengembangan web yang dikurasi khusus untuk Anda.
                </p>
            </div>

            {/* --- SECTION SEARCH & FILTER --- */}
            <div className="mb-12 flex flex-col md:flex-row gap-4">
                {/* Input Pencarian */}
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search framework by name or description..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full md:w-2/3 p-3.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />

                {/* Dropdown Filter Tags */}
                <select
                    name="selectedTag"
                    value={selectedTag}
                    onChange={handleChange}
                    className="w-full md:w-1/3 p-3.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer text-gray-700"
                >
                    <option value="">All Tags</option>
                    {allTags.map((tag, index) => (
                        <option key={index} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            {/* --- GRID LAYOUT --- */}
            {/* Cek apakah ada data setelah difilter */}
            {filteredFrameworks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {/* PERHATIKAN: Sekarang kita me-mapping filteredFrameworks, BUKAN frameworkData lagi */}
                    {filteredFrameworks.map((item) => (
                        <div 
                            key={item.id} 
                            className="group relative flex flex-col justify-between p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-teal-100 transition-all duration-500 ease-out"
                        >
                            <div className="absolute top-0 left-10 right-10 h-1 bg-linear-to-r from-teal-400 via-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="mb-8">
                                <div className="flex justify-between items-start gap-4">
                                    <h2 className="text-3xl font-bold text-zinc-950 tracking-tight leading-tight">
                                        {item.name}
                                    </h2>
                                    
                                    <a 
                                        href={item.details.officialWebsite}
                                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-full hover:bg-teal-600 transition-colors"
                                    >
                                        Visit Site 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </a>
                                </div>

                                <p className="text-lg text-zinc-600 mt-5 leading-relaxed font-light">
                                    {item.description}
                                </p>
                                
                                <div className="mt-6 pt-5 border-t border-gray-100 text-sm">
                                    <span className="text-zinc-500">Maintained by</span>
                                    <span className="ml-2 font-semibold text-zinc-900">{item.details.developer}</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-2.5">
                                {item.tags.map((tag, index) => (
                                    <div key={index} className="group/tag">
                                        <span 
                                            className="inline-block bg-zinc-950 text-teal-300 px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-300 wobble-text"
                                        >
                                            #{tag}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Tampilan jika hasil filter kosong (tidak ada yang cocok)
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-xl text-gray-500 font-medium">Hmm... framework tidak ditemukan.</p>
                    <button 
                        onClick={() => { setSearchTerm(""); setSelectedTag(""); }}
                        className="mt-4 text-teal-600 hover:text-teal-700 underline font-semibold"
                    >
                        Reset Filter
                    </button>
                </div>
            )}

            <style>
                {`
                    @keyframes wiggleText {
                        0% { transform: translateX(0) rotate(0deg); }
                        25% { transform: translateX(1px) rotate(-0.5deg); }
                        50% { transform: translateX(0) rotate(0deg); }
                        75% { transform: translateX(-1px) rotate(0.5deg); }
                        100% { transform: translateX(0) rotate(0deg); }
                    }
                    .wobble-text {
                        display: inline-block;
                    }
                    .wobble-text:hover {
                        animation: wiggleText 0.3s ease-in-out infinite;
                        color: #ffffff;
                    }
                `}
            </style>
        </div>
    );
}
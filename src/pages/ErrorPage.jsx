import React from 'react';

const ErrorPage = ({ code, title, message, image }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      {/* Prop Gambar: 
          Jika 'image' dikirim dari App.jsx, pakai itu.
          Jika tidak, otomatis pakai "/img/error.png" yang ada di folder public.
      */}
      <img 
        src={image || "/img/error.png"} 
        alt="Error Illustration" 
        className="w-80 mb-6 object-contain" 
      />
      
      <h1 className="text-8xl font-black text-green-500">{code}</h1>
      <h2 className="text-2xl font-bold mt-4 text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-2 max-w-md">{message}</p>
      
      <button 
        onClick={() => window.location.href = '/'}
        className="mt-8 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 font-bold transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ErrorPage;
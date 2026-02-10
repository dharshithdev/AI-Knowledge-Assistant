import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF first!");
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(res.data.message || "✅ AI Training Complete!");
      setFile(null); // Clear file after success
    } catch (err) {
      console.error(err);
      alert("❌ Training failed. Check your server logs.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/ask`, { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("❌ Error: Gateway or AI Service is offline.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <header className="border-b border-slate-800 p-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Intelligent RAG | AI
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Hidden Input */}
            <input type="file" id="pdf-upload" accept=".pdf" onChange={handleFileChange} className="hidden" />
            
            {/* Styled Trigger Label */}
            <label htmlFor="pdf-upload" className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-4 py-2 rounded-lg border border-slate-700 transition-all font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              {file ? "Change PDF" : "Select PDF"}
            </label>

            {file && <span className="text-xs text-blue-400 font-medium max-w-[100px] truncate">{file.name}</span>}

            <button 
              onClick={handleUpload}
              disabled={uploading || !file}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-bold disabled:opacity-50 transition-all shadow-lg shadow-blue-900/20"
            >
              {uploading ? "Training..." : "Train AI"}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold mb-4 text-white">Deep Intelligence <br/><span className="text-blue-500">on your documents.</span></h2>
            <p className="text-slate-400 text-lg">Query your processed PDF using RAG architecture. Powered by Groq, FastAPI, and MongoDB.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative group">
            <input 
              type="text" 
              className="w-full bg-slate-800 border-2 border-slate-700 p-5 rounded-2xl text-white focus:border-blue-500 outline-none transition-all pr-32 shadow-2xl"
              placeholder="Ask anything about the document..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button disabled={loading} className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all disabled:opacity-50">
              {loading ? "..." : "Ask AI"}
            </button>
          </form>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 flex flex-col min-h-[400px] shadow-inner relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-slate-500 font-bold text-sm uppercase mb-6 tracking-tighter">Query Result</h3>
            {answer ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-xl leading-relaxed text-slate-200">
                {answer}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl text-slate-600 italic">
                Waiting for your query...
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="p-8 text-center text-slate-600 text-sm">
        Built with MERN + FastAPI Microservices
      </footer>
    </div>
  );
}

export default App;
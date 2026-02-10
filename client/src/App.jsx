import React, { useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

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
      {/* Navigation Header */}
      <header className="border-b border-slate-800 p-6 bg-slate-900/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            MERN-AI Workspace
          </h1>
          <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Status: <span className="text-emerald-400">System Online</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Input */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">Deep Intelligence <br/><span className="text-blue-500">on your documents.</span></h2>
            <p className="text-slate-400 text-lg">Query your processed PDF using RAG architecture. Powered by Groq, FastAPI, and MongoDB.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative group">
            <input 
              type="text" 
              className="w-full bg-slate-800 border-2 border-slate-700 p-5 rounded-2xl text-white focus:border-blue-500 outline-none transition-all pr-32 shadow-2xl"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button 
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {loading ? "..." : "Ask AI"}
            </button>
          </form>
        </div>

        {/* Right Side: Output */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 flex flex-col min-h-[400px] shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-slate-500 font-bold text-sm uppercase mb-6 tracking-tighter">Query Result</h3>
            {answer ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-xl leading-relaxed text-slate-200">
                  {answer}
                </p>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl">
                <p className="text-slate-600 italic">Waiting for your query...</p>
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
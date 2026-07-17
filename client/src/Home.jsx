import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCpu, FiDatabase, FiLayers, FiShield, FiFileText } from 'react-icons/fi';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 🧩 Built-in Sticky Header */}
      <nav className="fixed top-0 left-0 w-full bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Intelligent RAG
            </span>
          </Link>
          <Link 
            to="/ai" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2"
          >
            <span>Try Now</span>
            <FiArrowRight />
          </Link>
        </div>
      </nav>

      {/* 🚀 Hero Section */}
      <main className="flex-1 pt-36 sm:pt-44 pb-20 relative overflow-hidden">
        {/* Decorative Background Light Grid */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight"
          >
            Deep Intelligence on Your <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">PDF Documents</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Upload static operational documentation and execute structured vector queries across dynamic multi-threaded data pipelines instantaneously.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/ai" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-900/40 transition-all">
              <span>Launch Terminal</span>
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>

        {/* 📊 Bento Box Feature Grid */}
        <div className="max-w-7xl mx-auto px-6 mt-28 sm:mt-36">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Bento Card 1: Vector Storage */}
            <motion.div variants={itemVariants} className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl md:col-span-2 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FiDatabase />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">MongoDB Context Aggregations</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  Transform massive text extractions into manageable chunk arrays. Store, manage, and scale deep vector indices with low infrastructure latency rules.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono tracking-wider">
                PERSISTENT ARCHITECTURE &bull; FULL INDEX DATA
              </div>
            </motion.div>

            {/* Bento Card 2: AI Core */}
            <motion.div variants={itemVariants} className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl flex flex-col justify-between group hover:border-blue-500/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FiCpu />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Groq Inference</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Utilize high-speed localized system processing models to query document sets efficiently.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 3: Middleware Isolation */}
            <motion.div variants={itemVariants} className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl flex flex-col justify-between group hover:border-blue-500/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FiShield />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">FastAPI Microservice</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Asynchronous backend structures process inputs securely, shielding foundational prompt context mappings.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 4: Document Engine */}
            <motion.div variants={itemVariants} className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl md:col-span-2 flex flex-col justify-between group hover:border-blue-500/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FiFileText />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Automated Document Parsing</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  Extract complex structural datasets directly from plain PDF structures. Streamline embedding token steps safely prior to operational queries.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* 🗖 Built-in Responsive Footer */}
      <footer className="border-t border-slate-800 bg-[#070a11]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600 tracking-wider">
          <p>BUILT WITH MERN + FASTAPI MICROSERVICES</p>
          <p>&copy; {new Date().getFullYear()} INTELLIGENT RAG PLATFORM. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
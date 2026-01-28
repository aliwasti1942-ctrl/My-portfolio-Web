
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Gamepad2, PenTool, Bot, Mic, Sparkles } from 'lucide-react';
import { Button } from '../components/UIComponents';
import { PROFILE_INFO } from '../data';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* === Hero Section === */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid-bg opacity-30"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 animate-[slideRight_1s_ease-out]">
            <div className="inline-block px-4 py-1 border border-primary/50 rounded-full bg-primary/10 backdrop-blur-sm">
              <span className="text-primary font-mono text-sm tracking-wider">AVAILABLE FOR HIRE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary neon-text">
                {PROFILE_INFO.name}
              </span>
            </h1>

            <div className="h-20 md:h-24">
               <p className="text-xl md:text-2xl text-gray-400 font-light border-l-4 border-secondary pl-4">
                 Graphics Designer | 3D Artist <br/> Game Developer | Video Editor
               </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/portfolio">
                <Button size="lg" variant="primary">
                  View Portfolio <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Placeholder */}
          <div className="relative flex justify-center animate-[float_6s_ease-in-out_infinite]">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute -inset-4 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-surface shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-gray-800 group">
                <img 
                  src="https://i.ibb.co/qMPnRLCW/1760025475999.png" 
                  alt="Muhammad Ali Wasti" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === AI Agent Section === */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 group">
            
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 text-secondary font-mono text-sm tracking-widest uppercase">
                <Sparkles className="w-5 h-5 animate-pulse" />
                Next-Gen Interaction
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white">
                Talk to my <span className="text-primary">AI Virtual Agent</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Have questions about my projects, skills, or availability? Experience the future of portfolio interaction. My voice-enabled AI twin is ready to assist you in real-time.
              </p>
              
              {/* The required trigger button */}
              <button 
                id="omni-open-widget-btn"
                className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-lg px-8 py-4 text-base tracking-wider bg-secondary hover:bg-green-600 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] border border-transparent group"
              >
                <Bot className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Talk To Agent
                <Mic className="w-5 h-5 ml-3 animate-pulse text-black/60" />
              </button>
            </div>

            <div className="flex-1 relative max-w-sm w-full">
              <div className="aspect-square rounded-full border-4 border-dashed border-primary/20 animate-[spin_20s_linear_infinite] absolute inset-0"></div>
              <div className="aspect-square rounded-full border-2 border-secondary/30 animate-[spin_15s_linear_infinite_reverse] absolute -inset-4"></div>
              <div className="relative aspect-square flex items-center justify-center">
                <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center blur-2xl absolute"></div>
                <Bot className="w-32 h-32 text-primary relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === Services / Skills Preview === */}
      <section className="py-20 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: PenTool, title: 'Graphics Design', desc: 'Brand identities, UI/UX, and marketing materials that stand out.' },
                { icon: Box, title: '3D Modeling', desc: 'High-fidelity characters, environments, and assets for games and film.' },
                { icon: Gamepad2, title: 'Game Dev', desc: 'Full-cycle game development using Unity and Unreal Engine.' },
              ].map((s, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-background border border-white/5 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2">
                  <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <s.icon className="w-7 h-7 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

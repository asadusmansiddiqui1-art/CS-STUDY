import React from 'react';
import { Terminal, BookOpen, Calculator, Sparkles, ArrowRight, Code2, GraduationCap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenPlayground: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPlayground }) => {
  return (
    <section id="hero-section" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20 flex justify-between">
        <div className="w-80 h-80 rounded-full bg-indigo-500/30 blur-3xl -ml-20"></div>
        <div className="w-96 h-96 rounded-full bg-violet-500/20 blur-3xl -mr-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Creator Attribution Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold mb-6 shadow-xs">
            <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Curated by Asad Usman &bull; Computer Science Expert</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            The All-in-One <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-300 dark:to-violet-400 bg-clip-text text-transparent">
              Computer Science
            </span>{' '}
            Study Hub
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            An interactive workspace built specifically for CS undergraduates. Experiment with
            real <span className="font-semibold text-slate-800 dark:text-slate-100">JavaScript</span> and simulated{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-100">C++</span> algorithms, study curated
            DSA lecture notes with downloadable cheat sheets, and plan your academic progress.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              id="hero-cta-playground"
              onClick={onOpenPlayground}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Live Playground</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#resources"
              id="hero-cta-notes"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 font-semibold text-sm shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Browse DSA Notes</span>
            </a>

            <a
              href="#gpa-calculator"
              id="hero-cta-gpa"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 font-semibold text-sm shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>Semester GPA Calculator</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-10 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Dual Engine</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">JS & C++ Simulator</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">DSA Cheat Sheets</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Interactive & Downloadable</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">4.0 GPA Planner</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Semester & CGPA Projection</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">6 Core Subjects</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">PF, DSA, OS, DB, CN & SE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

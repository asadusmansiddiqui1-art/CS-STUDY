import React from 'react';
import { Terminal, ArrowUp, Heart, Sparkles, Mail, MessageSquare, BookOpen, Calculator, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/80 backdrop-blur-sm text-slate-600 dark:text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Brand Info */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                CS Study Hub
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                CS Edition
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Designed and built by <strong className="text-slate-700 dark:text-slate-300">Asad Usman</strong> (Computer Science Expert) to empower computer science undergraduates with live code experimentation, comprehensive DSA cheat sheets, video masterclasses, and academic semester tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-6 text-xs font-medium">
            <a href="#subjects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Core CS Subjects
            </a>
            <a href="#playground" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Code Playground
            </a>
            <a href="#ai-chat" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              AI Study Board
            </a>
            <a href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Skills &amp; Videos
            </a>
            <a href="#gpa-calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              GPA Calculator
            </a>
            <a href="#resources" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              DSA Notes &amp; Slides
            </a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Contact Asad
            </a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shadow-xs flex items-center gap-2 text-xs font-medium self-end md:self-auto cursor-pointer"
            title="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <div>
            &copy; {new Date().getFullYear()} CS Study Hub &bull; Crafted by{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">Asad Usman</span> (CS Expert)
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:asadusmansiddiqui1@gmail.com"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 font-medium"
              title="Send Mail"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>asadusmansiddiqui1@gmail.com</span>
            </a>
            <a
              href="https://wa.me/923424622705?text=Hello%20Asad,%20reaching%20out%20via%20CS%20Study%20Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
              title="Message on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Message</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

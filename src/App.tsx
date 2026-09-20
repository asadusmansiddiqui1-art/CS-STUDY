import React, { useState, useEffect } from 'react';
import { ThemeMode, StudyResource } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Playground } from './components/Playground';
import { Resources } from './components/Resources';
import { SkillsSection } from './components/SkillsSection';
import { GpaCalculator } from './components/GpaCalculator';
import { CoreSubjects } from './components/CoreSubjects';
import { AiChatBoard } from './components/AiChatBoard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StudyViewerModal } from './components/StudyViewerModal';
import { Bot } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('cs_study_hub_theme') as ThemeMode;
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedResource, setSelectedResource] = useState<StudyResource | null>(null);

  // Sync theme changes to html root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cs_study_hub_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenAiTutor = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('ai-chat');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('ai-chat-input') as HTMLTextAreaElement | null;
        if (input) {
          input.focus();
        }
      }, 400);
    }
  };

  // Scroll section listener to highlight active navigation link
  useEffect(() => {
    const sections = ['subjects', 'playground', 'ai-chat', 'skills', 'gpa-calculator', 'resources', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-300">
      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Item 1: Hero Section */}
        <Hero onOpenPlayground={handleScrollToPlayground} />

        {/* Item 2: Core Computer Science Subjects & Curriculum (216-Page Master Handbook + 23-Page Textbooks) */}
        <CoreSubjects />

        {/* Item 3: Live Code Playground (JavaScript + C++ Simulator) */}
        <Playground />

        {/* Item 4: AI CS Study Board & Doubt Resolution (Student Q&A with Gemini) */}
        <AiChatBoard />

        {/* Item 5: Industry Skills, Practical Matrix & Video Masterclasses */}
        <SkillsSection />

        {/* Item 6: Semester GPA Calculator Utility */}
        <GpaCalculator />

        {/* Item 7: Study Resources & Lecture Slides (DSA) - Second to last */}
        <Resources onSelectResource={(res) => setSelectedResource(res)} />

        {/* Item 8: Developer Profile & Contact Section - Last */}
        <ContactSection />
      </main>

      {/* Floating Ask AI Button */}
      {activeSection !== 'ai-chat' && (
        <a
          href="#ai-chat"
          id="floating-ai-board-btn"
          onClick={handleOpenAiTutor}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 sm:gap-2.5 font-bold text-xs border border-indigo-400/30 group cursor-pointer"
          title="Open AI CS Study Board"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <Bot className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span className="inline">Ask AI</span>
        </a>
      )}

      {/* Footer */}
      <Footer />

      {/* Interactive Study Viewer Modal */}
      <StudyViewerModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    </div>
  );
}

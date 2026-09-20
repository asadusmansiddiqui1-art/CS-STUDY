import React, { useState, useEffect } from 'react';
import { Terminal, BookOpen, Calculator, Layers, User, Moon, Sun, Menu, X, Sparkles, Video, Bot } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'subjects', label: 'Core CS Subjects', icon: Layers, href: '#subjects' },
    { id: 'playground', label: 'Playground', icon: Terminal, href: '#playground' },
    { id: 'ai-chat', label: 'AI Study Board', icon: Bot, href: '#ai-chat' },
    { id: 'skills', label: 'Skills & Videos', icon: Video, href: '#skills' },
    { id: 'gpa-calculator', label: 'GPA Calculator', icon: Calculator, href: '#gpa-calculator' },
    { id: 'resources', label: 'DSA Resources', icon: BookOpen, href: '#resources' },
    { id: 'contact', label: 'Contact', icon: User, href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-3'
          : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-b border-slate-200/40 dark:border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
          id="brand-logo-link"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                CS Study Hub
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50">
                <Sparkles className="w-3 h-3" /> CS Hub
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Curated by <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Asad Usman</span> &bull; <span className="text-slate-600 dark:text-slate-300">CS Expert</span>
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                id={`nav-link-${item.id}`}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <a
            href="#subjects"
            id="nav-mega-book-quick-link"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm hover:shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>216-Page CS Book (PDF)</span>
          </a>

          <button
            type="button"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 sm:p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 shadow-xs cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            id="mobile-nav-backdrop"
            className="md:hidden fixed inset-0 top-[65px] bg-slate-950/50 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            id="mobile-nav-drawer"
            className="md:hidden relative z-50 border-t border-slate-200/80 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto"
          >
            {/* Quick Dark Mode Switcher Row on Mobile */}
            <div className="flex items-center justify-between p-3 mb-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span>Appearance Theme</span>
              </span>
              <button
                type="button"
                id="mobile-theme-toggle-row-btn"
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-transform"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}

            <a
              href="#subjects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md mt-3 cursor-pointer min-h-[44px]"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Download 216-Page Master Book (PDF)</span>
            </a>

            <div className="pt-3 mt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-3">
              <span>Curated by Asad Usman (CS Expert)</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">v2.0 Active</span>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

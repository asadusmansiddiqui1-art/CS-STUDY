import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  BookmarkCheck,
  Code,
  Download,
  Presentation,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';
import { SubjectModule } from '../types';
import { generateCoursePdf } from '../utils/pdfGenerator';

interface SubjectModalProps {
  subject: SubjectModule | null;
  onClose: () => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({ subject, onClose }) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'slides'>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);

  if (!subject) return null;

  const slides = subject.slidesDeck?.slides || [];
  const currentSlide = slides[currentSlideIndex] || null;

  const handleDownloadPdf = () => {
    try {
      setDownloading(true);
      generateCoursePdf(subject);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1200);
    }
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      id="subject-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        id="subject-modal-container"
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 sticky top-0 z-10 backdrop-blur-md">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                {subject.code}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {subject.semester} &bull; {subject.creditHours} CH
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 truncate">
              {subject.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="download-course-pdf-header-btn"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              title="Download 23-Page Course Textbook, Slides & Solved Exam Bank as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {downloading ? 'Compiling 23-Page PDF...' : 'Download 23-Page Textbook (PDF)'}
              </span>
              <span className="sm:hidden">
                {downloading ? 'Compiling...' : '23-Pg PDF'}
              </span>
            </button>

            <button
              type="button"
              id="close-subject-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="px-4 sm:px-6 pt-2.5 pb-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              id="tab-course-slides"
              onClick={() => setActiveTab('slides')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'slides'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Slides ({slides.length})</span>
            </button>

            <button
              type="button"
              id="tab-course-syllabus"
              onClick={() => setActiveTab('syllabus')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'syllabus'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Syllabus &amp; Books</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
            <Sparkles className="w-3 h-3" /> Ready to export as printable PDF
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'slides' && (
            <div className="space-y-4">
              {/* Slide Presentation Canvas */}
              {currentSlide ? (
                <div
                  id="active-slide-card"
                  className="rounded-2xl border-2 border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-b from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20 p-5 sm:p-7 shadow-md flex flex-col justify-between min-h-[340px]"
                >
                  <div>
                    {/* Slide Header Indicator */}
                    <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold">
                          Slide {currentSlide.slideNumber} of {slides.length}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {subject.name} Lecture Presentation
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {subject.code} Deck
                      </span>
                    </div>

                    {/* Slide Title */}
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                      {currentSlide.title}
                    </h4>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 mb-5">
                      {currentSlide.bulletPoints.map((bp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-2 shrink-0"></span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Optional Code / Diagram Snippet */}
                    {currentSlide.codeOrDiagram && (
                      <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 dark:text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 my-3">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-sans font-bold">
                          Concept Architecture / Memory Representation:
                        </div>
                        <pre>{currentSlide.codeOrDiagram}</pre>
                      </div>
                    )}

                    {/* Exam Highlight */}
                    {currentSlide.examHighlight && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 mt-3 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold">Exam Takeaway: </strong>
                          {currentSlide.examHighlight}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Slide Navigation Controls */}
                  <div className="pt-4 mt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      id="prev-slide-btn"
                      onClick={prevSlide}
                      disabled={currentSlideIndex === 0}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Slide</span>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex items-center gap-1.5">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentSlideIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            idx === currentSlideIndex
                              ? 'bg-indigo-600 w-6'
                              : 'bg-slate-300 dark:bg-slate-700 hover:bg-indigo-400'
                          }`}
                          title={`Jump to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      id="next-slide-btn"
                      onClick={nextSlide}
                      disabled={currentSlideIndex === slides.length - 1}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <span>Next Slide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No slides available for this module.
                </div>
              )}
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                  Course Description &amp; Objectives
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {subject.description}
                </p>
              </div>

              {/* Core Topics Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Core Syllabus &amp; High-Yield Topics</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {subject.coreTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800/70 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Textbooks */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Recommended Standard Textbooks</span>
                </h4>
                <div className="space-y-2">
                  {subject.recommendedBooks.map((book, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/70 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <BookmarkCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span className="font-medium">{book}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam & Midterm Tips */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>Exam Prep &amp; Scoring Strategy</span>
                </h4>
                <div className="space-y-2">
                  {subject.examTips.map((tip, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200"
                    >
                      &bull; {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Practical Project Ideas */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                  <Code className="w-4 h-4" />
                  <span>Recommended Semester Project Ideas</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {subject.projectIdeas.map((project, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200"
                    >
                      {project}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Computer Science Curriculum Reference</span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Export as PDF</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

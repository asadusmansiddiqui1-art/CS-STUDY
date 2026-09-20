import React, { useState } from 'react';
import {
  Code2,
  Network,
  Database,
  Cpu,
  Wifi,
  Layers,
  ArrowRight,
  BookOpen,
  Sparkles,
  Download,
  Presentation,
  CheckCircle2,
  Award,
  FileText
} from 'lucide-react';
import { coreSubjects } from '../data/coreSubjects';
import { SubjectModule } from '../types';
import { SubjectModal } from './SubjectModal';
import { generateCoursePdf } from '../utils/pdfGenerator';
import { MegaBookDownloadModal } from './MegaBookDownloadModal';

export const CoreSubjects: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectModule | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isMegaBookOpen, setIsMegaBookOpen] = useState(false);

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-emerald-500" />;
      case 'Network':
        return <Network className="w-5 h-5 text-indigo-500" />;
      case 'Database':
        return <Database className="w-5 h-5 text-sky-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-rose-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
    }
  };

  const handleQuickDownloadPdf = (e: React.MouseEvent, subj: SubjectModule) => {
    e.stopPropagation();
    try {
      setDownloadingId(subj.id);
      generateCoursePdf(subj);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setTimeout(() => setDownloadingId(null), 1500);
    }
  };

  return (
    <section id="subjects" className="py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>Undergraduate Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Core Computer Science Subjects
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Essential pillars of the Computer Science degree. Explore syllabi, interactive lecture slide decks, downloadable 20+ page PDF textbooks, and our comprehensive 216-page master degree handbook.
          </p>
        </div>

        {/* Grand 216-Page Master Book Announcement Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/80 border border-indigo-400/40 text-xs font-bold text-amber-300">
              <Award className="w-4 h-4" />
              <span>OFFICIAL 216-PAGE CURRICULUM ENCYCLOPEDIA (&gt;200 PAGES)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Complete Computer Science Degree Handbook
            </h3>
            <p className="text-sm text-indigo-100/90 leading-relaxed">
              Exhaustive 216-page master curriculum curated by <strong>Asad Usman (CS Expert)</strong>. Expanded with foundational volumes covering <em>What is a Computer</em>, <em>The History &amp; Lineage of CPL (1963)</em>, and <em>The Science of Programming &amp; Languages</em>, integrated seamlessly with all 6 core disciplines, 100+ solved university exam questions, and senior capstones.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-indigo-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 216 Formatted A4 Pages
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Volume 0: Computing &amp; CPL
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 6 Core Disciplines
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Solved Exam Bank
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              type="button"
              id="open-mega-book-modal-btn"
              onClick={() => setIsMegaBookOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-400/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Get 216-Page Master Handbook (PDF)</span>
            </button>
            <span className="text-center text-[11px] text-indigo-300 font-mono">
              216 Full Pages &bull; Complete Degree Synthesis
            </span>
          </div>
        </div>

        {/* Subjects Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreSubjects.map((subj) => (
            <div
              key={subj.id}
              id={`subject-card-${subj.id}`}
              onClick={() => setSelectedSubject(subj)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon & Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getSubjectIcon(subj.iconName)}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {subj.code}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                      {subj.creditHours} CH
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {subj.name}
                </h3>

                {/* Semester & Slides Badge */}
                <div className="flex items-center justify-between mt-1 text-xs">
                  <span className="font-medium text-slate-500 dark:text-slate-400">
                    Recommended: {subj.semester}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
                    <FileText className="w-3 h-3" />
                    <span>23-Page Textbook</span>
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {subj.description}
                </p>

                {/* Topic tags */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5">
                  {subj.coreTopics.slice(0, 3).map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span className="line-clamp-1">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action triggers */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  id={`quick-download-${subj.id}`}
                  onClick={(e) => handleQuickDownloadPdf(e, subj)}
                  disabled={downloadingId === subj.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300 transition-colors cursor-pointer"
                  title="Direct Download 23-Page PDF Course Textbook"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{downloadingId === subj.id ? 'Compiling 23 Pgs...' : '23-Page Textbook (PDF)'}</span>
                </button>

                <div className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  <span>View Slides &amp; Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single Subject Modal */}
      <SubjectModal subject={selectedSubject} onClose={() => setSelectedSubject(null)} />

      {/* 110-Page Master Book Modal */}
      <MegaBookDownloadModal isOpen={isMegaBookOpen} onClose={() => setIsMegaBookOpen(false)} />
    </section>
  );
};


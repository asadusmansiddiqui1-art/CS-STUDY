import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  Code2,
  Database,
  Cpu,
  Network,
  GitBranch,
  FileText,
  AlertCircle
} from 'lucide-react';
import { generateMasterDegreeMegaBook, generate20PageSubjectTextbook } from '../utils/pdfMasterBookGenerator';
import { coreSubjects } from '../data/coreSubjects';
import { SubjectModule } from '../types';

interface MegaBookDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaBookDownloadModal: React.FC<MegaBookDownloadModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressPage, setProgressPage] = useState(0);
  const [totalTargetPages, setTotalTargetPages] = useState(216);
  const [progressLabel, setProgressLabel] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeSubjectDownload, setActiveSubjectDownload] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadMegaBook = async () => {
    setIsGenerating(true);
    setIsCompleted(false);
    setProgressPage(1);
    setProgressLabel('Initializing 216-page master handbook compiler...');

    try {
      await generateMasterDegreeMegaBook((current, total, label) => {
        setProgressPage(current);
        setTotalTargetPages(total);
        setProgressLabel(label);
      });
      setIsCompleted(true);
    } catch (err) {
      console.error('Mega-book generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSingleSubject = async (subj: SubjectModule) => {
    setActiveSubjectDownload(subj.id);
    try {
      await generate20PageSubjectTextbook(subj, (curr, tot, lbl) => {
        setProgressLabel(`[${subj.code}] Page ${curr}/${tot}: ${lbl}`);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setActiveSubjectDownload(null);
    }
  };

  const percentComplete = Math.round((progressPage / totalTargetPages) * 100) || 0;

  return (
    <div
      id="mega-book-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={() => !isGenerating && onClose()}
    >
      <div
        id="mega-book-modal-container"
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/80 border border-indigo-400/40 flex items-center justify-center text-white shrink-0">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold tracking-wider">
                  Official Academic Edition
                </span>
                <span className="text-xs text-indigo-200">216-Page Master Degree Encyclopedia (&gt;200 Pages)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                Complete Computer Science Degree Encyclopedia
              </h2>
            </div>
          </div>

          <button
            type="button"
            id="close-mega-book-modal-btn"
            disabled={isGenerating}
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hero Banner & Generation Stats */}
          <div className="p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Exhaustive 4-Year Academic Curriculum &bull; 216 Pages</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Download the Master 216-Page CS Degree Handbook
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Everything you need to master your Computer Science degree in one official, rigorously formatted 216-page PDF textbook. Expanded with comprehensive foundational volumes on <strong>What is a Computer</strong>, <strong>The History &amp; Lineage of CPL (1963)</strong>, and <strong>The Science of Programming &amp; Languages</strong>, along with in-depth coverage across all 6 core disciplines and 12 solved university exam sections.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto flex flex-col items-center gap-3">
              <button
                type="button"
                id="generate-mega-book-btn"
                disabled={isGenerating}
                onClick={handleDownloadMegaBook}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Compiling 216 Pages...</span>
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Download Ready (Click to Re-Download)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Complete 216-Page Book (PDF)</span>
                  </>
                )}
              </button>

              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Format: High-Res A4 Print PDF &bull; 216 Full Pages (&gt;200 Pgs)
              </span>
            </div>
          </div>

          {/* Active Generation Progress Display */}
          {isGenerating && (
            <div
              id="mega-book-progress-tracker"
              className="p-5 rounded-2xl bg-slate-900 text-white border border-indigo-500/50 shadow-lg animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-indigo-300 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                  <span>{progressLabel}</span>
                </span>
                <span className="font-mono text-emerald-400">
                  Page {progressPage} / {totalTargetPages} ({percentComplete}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-150"
                  style={{ width: `${percentComplete}%` }}
                ></div>
              </div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Building Academic Table of Contents, Volume 0 Foundations &amp; Memory Models</span>
                <span>Please keep this window open while jsPDF compiles</span>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {isCompleted && !isGenerating && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <strong>Handbook Generated Successfully!</strong> Your browser has downloaded the complete 216-page master handbook:{' '}
                <code className="font-mono text-xs bg-emerald-100 dark:bg-emerald-900/50 px-1.5 py-0.5 rounded">
                  Complete_Computer_Science_Degree_216_Page_Master_Handbook.pdf
                </code>
              </div>
            </div>
          )}

          {/* Feature Highlights Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>What Is Included Inside The 216 Pages:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                {
                  icon: <Sparkles className="w-4 h-4 text-amber-500" />,
                  title: 'Volume 0: What is a Computer? (Pages 7-14)',
                  desc: 'Turing machines, Church-Turing thesis, Von Neumann vs Harvard architecture, digital logic, transistors, and memory hierarchies.'
                },
                {
                  icon: <Code2 className="w-4 h-4 text-rose-500" />,
                  title: 'Volume 0: What is CPL? & Systems Lineage (Pages 15-22)',
                  desc: '1963 Cambridge/London Combined Programming Language, Christopher Strachey, Titan hardware, and the direct evolution to BCPL, B, C & C++.'
                },
                {
                  icon: <Layers className="w-4 h-4 text-teal-500" />,
                  title: 'Volume 0: Programming & Languages (Pages 23-36)',
                  desc: 'SDLC cycles, Böhm-Jacopini structured theorem, recursion vs iteration, loop invariants, compiler pipelines, type theory, and paradigm taxonomy.'
                },
                {
                  icon: <Code2 className="w-4 h-4 text-indigo-500" />,
                  title: 'Discipline I: Programming Fundamentals (Pages 37-64)',
                  desc: 'Machine architecture, memory segments, pointer arithmetic, dynamic heap allocation, 2D arrays, and struct padding.'
                },
                {
                  icon: <Layers className="w-4 h-4 text-emerald-500" />,
                  title: 'Discipline II: Data Structures & Algorithms (Pages 65-94)',
                  desc: 'Big-O mathematical proofs, recurrence trees, AVL self-balancing rotations, heaps, hash tables, Dijkstra, and dynamic programming.'
                },
                {
                  icon: <Database className="w-4 h-4 text-sky-500" />,
                  title: 'Discipline III: Database Systems (Pages 95-122)',
                  desc: 'Relational algebra, SQL standards, normalization theory (1NF to BCNF), B+ tree storage engines, and ACID transactions.'
                },
                {
                  icon: <Cpu className="w-4 h-4 text-purple-500" />,
                  title: 'Discipline IV: Operating Systems (Pages 123-150)',
                  desc: 'Dual-mode protection, process lifecycle, semaphores, Banker algorithm deadlock safety, virtual memory, and page replacement.'
                },
                {
                  icon: <Network className="w-4 h-4 text-blue-500" />,
                  title: 'Discipline V: Computer Networks (Pages 151-176)',
                  desc: 'OSI 7-layer, CIDR subnet calculations, TCP 3-way handshakes, congestion control state machines, HTTP/2, and TLS 1.3.'
                },
                {
                  icon: <GitBranch className="w-4 h-4 text-amber-500" />,
                  title: 'Discipline VI: Software Engineering (Pages 177-198)',
                  desc: 'Agile/Scrum ceremonies, SOLID design principles, Gang of Four patterns, Git branching, Docker, and CI/CD pipelines.'
                },
                {
                  icon: <Award className="w-4 h-4 text-rose-500" />,
                  title: 'Master Solved Exam Question Bank (Pages 199-210)',
                  desc: '12 exhaustive university midterm and final examination problems with comprehensive, step-by-step model solutions across all disciplines.'
                },
                {
                  icon: <Sparkles className="w-4 h-4 text-indigo-500" />,
                  title: 'Capstone Blueprints & Career Playbook (Pages 211-213)',
                  desc: 'Final year project milestones, production guidelines, FAANG technical interview questions, and graduate career roadmaps.'
                },
                {
                  icon: <FileText className="w-4 h-4 text-teal-500" />,
                  title: 'Master Lexicon & Bibliography (Pages 214-216)',
                  desc: 'Complete mathematical symbols, formal computing definitions, and authoritative ACM/IEEE textbook bibliography.'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/70 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Individual 20+ Page Subject Textbooks Download Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Or Download Individual 23-Page Subject Textbooks
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Each course manual is a dedicated 23-page textbook covering the full syllabus, slides, and exam bank.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {coreSubjects.map((subject) => (
                <button
                  key={subject.id}
                  type="button"
                  id={`btn-download-single-${subject.id}`}
                  disabled={activeSubjectDownload !== null || isGenerating}
                  onClick={() => handleDownloadSingleSubject(subject)}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-left transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {subject.code} &bull; 23 Pgs
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {subject.name}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Compiled &amp; Curated by <strong>Asad Usman</strong> (CS Expert &bull; Department of Computer Science)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isGenerating}
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-colors disabled:opacity-50 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

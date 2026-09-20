import React, { useState } from 'react';
import { X, Download, Copy, Check, Clock, FileText, Code2, AlertTriangle, Lightbulb, ChevronRight, CheckCircle2 } from 'lucide-react';
import { StudyResource } from '../types';
import { generateResourcePdf } from '../utils/pdfGenerator';

interface StudyViewerModalProps {
  resource: StudyResource | null;
  onClose: () => void;
}

export const StudyViewerModal: React.FC<StudyViewerModalProps> = ({ resource, onClose }) => {
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  if (!resource) return null;

  const handleDownloadPdf = () => {
    try {
      setDownloadingPdf(true);
      generateResourcePdf(resource);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setDownloadingPdf(false), 1200);
    }
  };

  // Generate downloadable markdown file
  const handleDownloadMarkdown = () => {
    const markdownContent = `# CS STUDY HUB - LECTURE NOTES & REVISION SLIDES
Title: ${resource.title}
Category: ${resource.category}
Curated by: Asad Usman (CS Expert)
Read Time: ${resource.readTime} | Slide Count: ${resource.slideCount} slides

==================================================
1. EXECUTIVE SUMMARY
==================================================
${resource.summary}

==================================================
2. CORE KEY CONCEPTS
==================================================
${resource.keyConcepts.map((k, i) => `${i + 1}. ${k}`).join('\n')}

==================================================
3. ARCHITECTURAL & MEMORY DIAGRAM
==================================================
${resource.asciiDiagram || 'N/A'}

==================================================
4. TIME & SPACE COMPLEXITY ANALYSIS
==================================================
- Best Case:    ${resource.complexity.best}
- Average Case: ${resource.complexity.average}
- Worst Case:   ${resource.complexity.worst}
- Space:        ${resource.complexity.space}
- Notes:        ${resource.complexity.notes}

==================================================
5. CODE IMPLEMENTATIONS
==================================================
${resource.codeSnippets
  .map(
    (snip) => `### ${snip.title}
Language: ${snip.language}
Explanation: ${snip.explanation}

\`\`\`${snip.language}
${snip.code}
\`\`\`
`
  )
  .join('\n')}

==================================================
6. COMMON EXAM & INTERVIEW PITFALLS
==================================================
${resource.commonPitfalls.map((p, i) => `[!] Pitfall ${i + 1}: ${p}`).join('\n')}

==================================================
7. RECOMMENDED PRACTICE PROBLEMS
==================================================
${resource.practiceProblems
  .map(
    (prob, i) => `Problem ${i + 1}: ${prob.title} [${prob.difficulty}]
Description: ${prob.description}
Approach Hint: ${prob.approachHint}
`
  )
  .join('\n')}

--------------------------------------------------
Generated from CS Study Hub by Asad Usman (CS Expert)
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', resource.downloadFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySnippet = async (index: number, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleCopyAllNotes = async () => {
    const text = `${resource.title}\n\nSummary:\n${resource.summary}\n\nComplexity:\n${resource.complexity.notes}`;
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div
      id="study-viewer-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        id="study-viewer-modal"
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                  {resource.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{resource.readTime}</span>
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">
                {resource.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              id="modal-download-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              title="Download formatted PDF Study Guide"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{downloadingPdf ? 'Exporting PDF...' : 'Download PDF'}</span>
              <span className="sm:hidden">{downloadingPdf ? 'PDF...' : 'PDF'}</span>
            </button>

            <button
              type="button"
              id="modal-download-btn"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 shadow-xs transition-colors cursor-pointer"
              title="Download clean Markdown study notes"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Notes (.md)</span>
              <span className="sm:hidden">.md</span>
            </button>

            <button
              type="button"
              id="modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close Study Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 divide-y divide-slate-200 dark:divide-slate-800">
          {/* Section 1: Overview & Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              1. Overview & Core Architecture
            </h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {resource.summary}
            </p>

            {/* Key concepts tags */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {resource.keyConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: ASCII Architecture Diagram */}
          {resource.asciiDiagram && (
            <div className="pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                2. Memory & Node Layout Diagram
              </h4>
              <div className="bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm p-4 rounded-xl border border-slate-800 overflow-x-auto shadow-inner leading-relaxed selection:bg-indigo-600/40">
                <pre>{resource.asciiDiagram}</pre>
              </div>
            </div>
          )}

          {/* Section 3: Time & Space Complexity */}
          <div className="pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
              3. Big-O Complexity Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium block">Best Case</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold text-sm mt-1 block">
                  {resource.complexity.best}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium block">Average Case</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold text-sm mt-1 block">
                  {resource.complexity.average}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium block">Worst Case</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono font-bold text-sm mt-1 block">
                  {resource.complexity.worst}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium block">Space Complexity</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold text-sm mt-1 block">
                  {resource.complexity.space}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
              Note: {resource.complexity.notes}
            </p>
          </div>

          {/* Section 4: Implementation Code Snippets */}
          <div className="pt-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              4. Code Snippets & Implementation
            </h4>

            {resource.codeSnippets.map((snippet, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-950 text-slate-100"
              >
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2 font-medium">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span>{snippet.title}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopySnippet(idx, snippet.code)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedSnippetIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed selection:bg-indigo-600/40">
                  <pre>{snippet.code}</pre>
                </div>

                <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400">
                  <span className="font-semibold text-indigo-400">Logic Note: </span>
                  {snippet.explanation}
                </div>
              </div>
            ))}
          </div>

          {/* Section 5: Common Traps & Pitfalls */}
          <div className="pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>5. Common Exam Traps & Pitfalls</span>
            </h4>
            <div className="space-y-2">
              {resource.commonPitfalls.map((pitfall, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{pitfall}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Practice Problems */}
          <div className="pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>6. Recommended Practice Problems</span>
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {resource.practiceProblems.map((problem, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {problem.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        problem.difficulty === 'Easy'
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                          : problem.difficulty === 'Medium'
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs mb-2">
                    {problem.description}
                  </p>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-400 flex items-start gap-1 font-medium">
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Approach Hint: {problem.approachHint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 text-xs text-slate-500 dark:text-slate-400">
          <div>Curated by Asad Usman (CS Expert) &bull; CS Study Hub</div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyAllNotes}
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
            >
              {copiedAll ? 'Summary Copied!' : 'Copy Summary'}
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Download Full Notes (.md)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BookOpen, Download, Eye, Clock, Layers, Sparkles, Search, CheckCircle2, ArrowRight, FileText } from 'lucide-react';
import { dsaResources } from '../data/dsaResources';
import { StudyResource } from '../types';
import { generateResourcePdf } from '../utils/pdfGenerator';

interface ResourcesProps {
  onSelectResource: (resource: StudyResource) => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onSelectResource }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredResources = dsaResources.filter(
    (res) =>
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePdfDownload = (e: React.MouseEvent, resource: StudyResource) => {
    e.stopPropagation();
    try {
      setDownloadingId(resource.id);
      generateResourcePdf(resource);
    } catch (err) {
      console.error('Error downloading resource PDF:', err);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  const handleMarkdownDownload = (e: React.MouseEvent, resource: StudyResource) => {
    e.stopPropagation();
    const markdownContent = `# CS STUDY HUB - LECTURE NOTES: ${resource.title}
Category: ${resource.category}
Curated by: Asad Usman (CS Expert)
Read Time: ${resource.readTime} | Slides: ${resource.slideCount}

## SUMMARY
${resource.summary}

## KEY CONCEPTS
${resource.keyConcepts.map((k, i) => `${i + 1}. ${k}`).join('\n')}

## ASCII ARCHITECTURAL DIAGRAM
${resource.asciiDiagram || ''}

## TIME & SPACE COMPLEXITY
- Best:    ${resource.complexity.best}
- Average: ${resource.complexity.average}
- Worst:   ${resource.complexity.worst}
- Space:   ${resource.complexity.space}

## CODE IMPLEMENTATIONS
${resource.codeSnippets.map((s) => `### ${s.title}\n\`\`\`${s.language}\n${s.code}\n\`\`\`\n`).join('\n')}

## PRACTICE PROBLEMS
${resource.practiceProblems.map((p) => `- ${p.title} (${p.difficulty}): ${p.description}`).join('\n')}
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

  return (
    <section id="resources" className="py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Data Structures &amp; Algorithms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Study Resources &amp; Lecture Slides
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Curated lecture notes, ASCII memory models, complexity tables, and implementation snippets. Click <strong className="text-indigo-600 dark:text-indigo-400">View</strong> to open the interactive study viewer modal or export genuine PDF slide documents.
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="resource-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search DSA topics, stacks, arrays..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              id={`resource-card-${res.id}`}
              onClick={() => onSelectResource(res)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                    {res.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {res.readTime} &bull; {res.slideCount} Slides
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {res.title}
                </h3>

                {/* Summary */}
                <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {res.summary}
                </p>

                {/* Key Concepts Preview */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  {res.keyConcepts.slice(0, 3).map((concept, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{concept}</span>
                    </div>
                  ))}
                  {res.keyConcepts.length > 3 && (
                    <span className="text-[11px] text-indigo-500 dark:text-indigo-400 font-medium block pl-5">
                      +{res.keyConcepts.length - 3} more concepts in viewer
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  id={`view-resource-${res.id}`}
                  onClick={() => onSelectResource(res)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Lecture Notes</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    id={`download-pdf-resource-${res.id}`}
                    onClick={(e) => handlePdfDownload(e, res)}
                    disabled={downloadingId === res.id}
                    className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors text-xs font-semibold"
                    title="Download PDF Study Guide"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingId === res.id ? 'PDF...' : 'PDF'}</span>
                  </button>

                  <button
                    type="button"
                    id={`download-md-resource-${res.id}`}
                    onClick={(e) => handleMarkdownDownload(e, res)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    title="Download Markdown File"
                    aria-label={`Download ${res.title} markdown notes`}
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

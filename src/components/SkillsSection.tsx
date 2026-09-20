import React, { useState, useEffect } from 'react';
import {
  Video,
  Play,
  CheckCircle2,
  ExternalLink,
  Code2,
  Terminal,
  Globe,
  GitBranch,
  Layers,
  Sparkles,
  BookOpen,
  Filter,
  CheckSquare,
  Square,
  Award,
  ChevronRight,
  X,
  Clock
} from 'lucide-react';
import { skillVideos, practicalSkillsList } from '../data/skillsData';
import { SkillVideo, PracticalSkill } from '../types';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<SkillVideo | null>(null);
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cs_hub_checked_skills');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cs_hub_checked_skills', JSON.stringify(checkedSkills));
    } catch (e) {
      console.error(e);
    }
  }, [checkedSkills]);

  const toggleSkillCheck = (id: string) => {
    setCheckedSkills((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-indigo-500" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-500" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-purple-500" />;
      case 'Container':
        return <Layers className="w-5 h-5 text-amber-500" />;
      default:
        return <Code2 className="w-5 h-5 text-indigo-500" />;
    }
  };

  const filteredVideos =
    selectedCategory === 'all'
      ? skillVideos
      : skillVideos.filter((v) => v.category === selectedCategory);

  const filteredSkills =
    selectedCategory === 'all'
      ? practicalSkillsList
      : practicalSkillsList.filter((s) => s.category === selectedCategory);

  const totalSkillsCount = practicalSkillsList.length;
  const completedCount = Object.values(checkedSkills).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalSkillsCount) * 100);

  return (
    <section id="skills" className="py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Career &amp; Practical Mastery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Software Engineering Skills &amp; Masterclasses
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Bridge the gap between theoretical classroom computer science and modern software engineering. Watch curated video courses, master industry tools (Git, Linux, Docker, REST), and track your career-ready competencies.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl self-start md:self-end text-xs font-medium">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'core', label: 'Algorithms' },
              { id: 'web', label: 'Web & APIs' },
              { id: 'devops', label: 'DevOps & Git' },
              { id: 'systems', label: 'Systems & Linux' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                id={`filter-skills-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Readiness Checklist Tracker Banner */}
        <div
          id="skills-readiness-tracker"
          className="mb-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-lg border border-indigo-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/60 border border-indigo-400/30 flex items-center justify-center text-white shrink-0">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                Industry Readiness Self-Check
              </h3>
              <p className="text-xs text-indigo-200/90 mt-0.5">
                Check off skills below as you acquire them in coursework, personal projects, or internships.
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 shrink-0">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="text-indigo-200">Competency Progress</span>
              <span className="font-mono text-emerald-400 font-bold">
                {completedCount} / {totalSkillsCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Subsection 1: Recommended Video Masterclasses */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Video className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Curated Video Masterclasses &amp; Crash Courses
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                id={`video-card-${video.id}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                {/* Thumbnail with Overlay */}
                <div
                  className="relative aspect-video bg-slate-800 overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideoModal(video)}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-600 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Badges on thumbnail */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold text-white">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600/90 backdrop-blur-xs">
                      {video.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                      {video.channel} &bull; {video.instructor}
                    </div>
                    <h4
                      onClick={() => setActiveVideoModal(video)}
                      className="text-base font-bold text-slate-900 dark:text-white tracking-tight cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
                    >
                      {video.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {video.summary}
                    </p>

                    {/* Topics covered */}
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                      <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                        Key Learnings:
                      </div>
                      {video.topicsCovered.slice(0, 2).map((topic, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      id={`watch-btn-${video.id}`}
                      onClick={() => setActiveVideoModal(video)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      <Play className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400" />
                      <span>Watch &amp; Study Notes</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title="Open directly on YouTube"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subsection 2: Practical Skills & Competency Matrix */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Essential Technical Skills Matrix
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => {
              const isChecked = Boolean(checkedSkills[skill.id]);
              return (
                <div
                  key={skill.id}
                  id={`skill-card-${skill.id}`}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between ${
                    isChecked
                      ? 'border-emerald-400/80 dark:border-emerald-500/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200/90 dark:border-slate-800/90'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          {getSkillIcon(skill.icon)}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                            Related: {skill.relatedCourseCode}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        id={`check-skill-${skill.id}`}
                        onClick={() => toggleSkillCheck(skill.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          isChecked
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title={isChecked ? 'Mark as in progress' : 'Mark as mastered'}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Badge */}
                    <div className="mb-3">
                      <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {skill.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {skill.description}
                    </p>

                    {/* Essential Concepts */}
                    <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Core Competencies:
                      </div>
                      {skill.essentialConcepts.map((concept, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                          <span>{concept}</span>
                        </div>
                      ))}
                    </div>

                    {/* Recommended Project */}
                    <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mb-2">
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200">Recommended Project: </strong>
                        {skill.recommendedProject}
                      </div>
                    </div>
                  </div>

                  {/* Status footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Industry: <strong className="text-slate-700 dark:text-slate-300">{skill.industryApplication}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Lecture & Notes Modal */}
      {activeVideoModal && (
        <div
          id="video-study-modal-backdrop"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            id="video-study-modal-container"
            className="relative w-full max-w-3xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                    {activeVideoModal.channel}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Duration: {activeVideoModal.duration} &bull; {activeVideoModal.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                  {activeVideoModal.title}
                </h3>
              </div>

              <button
                type="button"
                id="close-video-modal-btn"
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Responsive Video Player */}
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-md border border-slate-800">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=0&rel=0`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                  Lecture Overview
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeVideoModal.summary}
                </p>
              </div>

              {/* Topics Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Key Concepts &amp; Curriculum Alignment</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeVideoModal.topicsCovered.map((topic, i) => (
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

              {/* Practical Takeaways */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Production &amp; Exam Tips</span>
                </h4>
                <div className="space-y-2">
                  {activeVideoModal.practicalTakeaways.map((takeaway, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200"
                    >
                      &bull; {takeaway}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
              <a
                href={`https://www.youtube.com/watch?v=${activeVideoModal.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Open in YouTube Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-colors"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

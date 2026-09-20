import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Download,
  Trash2,
  BookOpen,
  Code2,
  Cpu,
  Database,
  Network,
  HelpCircle,
  ArrowRight,
  Terminal,
  Square,
  Zap,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'model',
  content: `### Welcome to the CS Study Hub AI Academic Board! 👋
I am your **Trained AI Computer Science Tutor & Degree Mentor**, curated alongside **Asad Usman's** university curriculum.

I am fully equipped to guide you across:
- 🎓 **Your Courses & Classes**: Syllabi, recommended textbooks, lecture breakdowns, and exam tips for **CS-101** (Programming Fundamentals), **CS-201** (Data Structures), **CS-204** (Database Systems), **CS-301** (Operating Systems), **CS-302** (Computer Networks), and **CS-304** (Software Engineering).
- 🛠️ **Industry Skills & Careers**: Roadmaps for Full-Stack Development, Git & GitHub workflows, Linux terminal mastery, Docker containers, and Cloud deployment.
- 📊 **GPA & Academic Guidance**: 4.0 semester grading formulas, credit weighting, study strategies, and our downloadable **216-Page Master CS Degree Handbook**!
- 💻 **Live Code & Algorithmic Doubts**: Write and debug C++, Python, Java, or SQL code, and analyze Big-O complexities.

Click any question chip below or ask your own question to start!`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  subject: 'General CS',
};

const SUBJECT_CATEGORIES = [
  'General CS',
  'Courses & Classes',
  'Data Structures (CS-201)',
  'Operating Systems (CS-301)',
  'Database Systems (CS-204)',
  'Computer Networks (CS-302)',
  'Programming (CS-101)',
  'Industry Skills & Career',
  'GPA & Degree Handbook',
];

interface QuickPrompt {
  label: string;
  category: string;
  question: string;
  tag: 'course' | 'skill' | 'doubt' | 'gpa';
}

const CURATED_PROMPTS: QuickPrompt[] = [
  {
    label: '🎓 Semester Courses Roadmap',
    category: 'Courses & Classes',
    question: 'What core courses do I take from Semester 1 through Semester 6 on CS Study Hub, and what are their credit hours?',
    tag: 'course',
  },
  {
    label: '💻 CS-201 Data Structures Exam Guide',
    category: 'Data Structures (CS-201)',
    question: 'What are the main topics in CS-201 Data Structures and how do I prepare for midterm and final exams?',
    tag: 'course',
  },
  {
    label: '🛠️ Essential CS Industry Skills',
    category: 'Industry Skills & Career',
    question: 'What practical industry skills and tools (Git, Linux, Docker, Web Development) should a CS student learn to get hired?',
    tag: 'skill',
  },
  {
    label: '📊 4.0 GPA Calculation & Advice',
    category: 'GPA & Degree Handbook',
    question: 'How does the Semester GPA calculation work on a 4.0 scale, and what study strategy should I use to achieve a 3.8+ CGPA?',
    tag: 'gpa',
  },
  {
    label: '⚙️ OS Virtual Memory Page Fault',
    category: 'Operating Systems (CS-301)',
    question: 'Explain Virtual Memory page fault handling: What exact steps does the OS kernel take during a page fault?',
    tag: 'doubt',
  },
  {
    label: '🗄️ Database Normalization (1NF to BCNF)',
    category: 'Database Systems (CS-204)',
    question: 'Explain 1NF, 2NF, 3NF, and BCNF normalization with a clear student database example.',
    tag: 'doubt',
  },
  {
    label: '🌐 TCP 3-Way Handshake & SYN Flood',
    category: 'Computer Networks (CS-302)',
    question: 'Trace the TCP 3-way handshake with sequence numbers, and explain how SYN Flood attacks exploit half-open sockets.',
    tag: 'doubt',
  },
  {
    label: '⚡ LRU Cache in C++',
    category: 'Programming (CS-101)',
    question: 'Show a production C++ implementation of an LRU Cache with O(1) get() and put() using a Doubly Linked List and Hash Map.',
    tag: 'doubt',
  },
  {
    label: '📖 216-Page Master Degree Handbook',
    category: 'GPA & Degree Handbook',
    question: 'Tell me about the 216-Page Master Computer Science Degree Handbook curated by Asad Usman (CS Expert) and what it contains, including Volume 0 (What is a Computer, What is CPL, and Programming & Languages).',
    tag: 'course',
  },
];

export const AiChatBoard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cs_study_hub_chat_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
    return [INITIAL_MESSAGE];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('General CS');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('cs_study_hub_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to persist chat history:', e);
    }
  }, [messages]);

  // Scroll to bottom when new messages arrive or while streaming
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, isStreaming]);

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setIsStreaming(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? inputQuery).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject: selectedSubject,
    };

    const botMessageId = `model-${Date.now()}`;
    const placeholderBotMessage: ChatMessage = {
      id: botMessageId,
      role: 'model',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subject: selectedSubject,
    };

    const newMessages = [...messages, userMessage];
    setMessages([...newMessages, placeholderBotMessage]);
    setInputQuery('');
    setLoading(true);
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let accumulatedText = '';

    try {
      const payloadMessages = [...newMessages].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Try fast real-time SSE streaming from /api/chat/stream
      const streamRes = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: payloadMessages,
          subject: selectedSubject,
        }),
        signal: controller.signal,
      });

      if (streamRes.ok && streamRes.body) {
        const reader = streamRes.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;
            const dataStr = trimmed.substring(6).trim();

            if (dataStr === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulatedText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botMessageId ? { ...m, content: accumulatedText } : m
                  )
                );
              } else if (parsed.error) {
                console.warn('Stream chunk error:', parsed.error);
              }
            } catch {
              // Ignore non-json lines
            }
          }
        }

        // If streamed successfully with content
        if (accumulatedText.trim().length > 0) {
          return;
        }
      }

      // Fallback to standard /api/chat if streaming was not supported or empty
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: payloadMessages,
          subject: selectedSubject,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const replyContent = data.reply || 'No response returned from the model.';

      setMessages((prev) =>
        prev.map((m) => (m.id === botMessageId ? { ...m, content: replyContent } : m))
      );
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        if (!accumulatedText) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMessageId
                ? { ...m, content: '_Response paused by student._' }
                : m
            )
          );
        }
        return;
      }

      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
                ...m,
                content:
                  accumulatedText ||
                  `**⚠️ Connection Notice:** Could not connect to Gemini (${err?.message || 'Network error'}).\n\nVerify that \`GEMINI_API_KEY\` is configured in your project settings to enable live answering, or explore the comprehensive **216-Page Master Handbook** and **23-Page Subject Textbooks** above!`,
              }
            : m
        )
      );
    } finally {
      setLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all conversation history on this board?')) {
      setMessages([INITIAL_MESSAGE]);
      try {
        localStorage.removeItem('cs_study_hub_chat_history');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleExportMarkdown = () => {
    const header = `# CS Study Hub - AI Doubt Solving Session
Platform: CS Study Hub (Curated by Asad Usman)
Exported: ${new Date().toLocaleString()}
Subject Focus: ${selectedSubject}
======================================================

`;
    const transcript = messages
      .map(
        (m) =>
          `### [${m.timestamp}] ${m.role === 'user' ? 'STUDENT' : 'AI CS TUTOR'} (${m.subject || 'General'})\n\n${m.content}\n\n---\n`
      )
      .join('\n');

    const blob = new Blob([header + transcript], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CS_AI_Study_Session_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="ai-chat" className="py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Bot className="w-4 h-4" />
              <span>Interactive Doubt Resolution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center flex-wrap gap-3">
              <span>AI CS Study Board &amp; Tutor</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Connected to Gemini 3.6 Flash &bull; Quick Streaming</span>
              </span>
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Ask questions on data structures, operating systems, networking, algorithm complexities, or debug C++/Python code. Tailored to the university computer science syllabus.
            </p>
          </div>

          {/* Top Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              id="export-chat-markdown-btn"
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors shadow-xs cursor-pointer"
              title="Export Conversation as Markdown Notes"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>Export Notes (.md)</span>
            </button>

            <button
              type="button"
              id="clear-chat-board-btn"
              onClick={handleClearHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-rose-50 hover:border-rose-200 dark:hover:bg-rose-950/30 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-medium transition-colors shadow-xs cursor-pointer"
              title="Clear Board History"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Main Board Container */}
        <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl overflow-hidden flex flex-col min-h-[620px] max-h-[820px]">
          {/* Discipline Selector Ribbon */}
          <div className="border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between gap-3 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Focus Discipline:
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 sm:pb-0">
              {SUBJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedSubject(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedSubject === cat
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Starter Chips */}
          <div className="border-b border-slate-200/60 dark:border-slate-800/60 px-4 sm:px-6 py-2.5 bg-indigo-50/30 dark:bg-indigo-950/10 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="font-semibold text-indigo-700 dark:text-indigo-400 shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ask About Courses, Skills &amp; Doubts:</span>
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {CURATED_PROMPTS.map((cp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedSubject(cp.category);
                    handleSendMessage(cp.question);
                  }}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title={cp.question}
                >
                  <span className="font-medium">{cp.label}</span>
                  <ArrowRight className="w-3 h-3 text-indigo-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Conversation Messages Viewport */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20 mt-1">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  )}

                  {/* Message Bubble Container */}
                  <div
                    className={`min-w-0 max-w-[92%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-5 relative group text-sm leading-relaxed overflow-hidden ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/15'
                        : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {/* Role & Time Subheader */}
                    <div
                      className={`flex items-center justify-between gap-3 text-[11px] mb-2 pb-1.5 border-b ${
                        isUser
                          ? 'border-indigo-500/50 text-indigo-100'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-medium truncate">
                        <span>{isUser ? 'Student' : 'AI CS Academic Tutor'}</span>
                        {msg.subject && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                              isUser
                                ? 'bg-indigo-700/60 text-white'
                                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60'
                            }`}
                          >
                            {msg.subject}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-0.5 rounded transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content Body */}
                    {isUser ? (
                      <p className="whitespace-pre-wrap font-medium break-words">{msg.content}</p>
                    ) : !msg.content && loading ? (
                      <div className="flex items-center gap-2.5 py-1 text-slate-500 dark:text-slate-400 text-xs">
                        <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
                        <span className="font-medium">Connecting to Gemini for instant response...</span>
                      </div>
                    ) : (
                      <div className="markdown-body prose prose-sm dark:prose-invert max-w-none break-words overflow-x-auto prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700/60 prose-pre:rounded-xl prose-pre:p-3 sm:prose-pre:p-3.5 prose-pre:overflow-x-auto prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
                        <Markdown>{msg.content}</Markdown>
                        {isStreaming && loading && msg.id === messages[messages.length - 1]?.id && (
                          <span className="inline-block w-2 h-4 ml-1 bg-indigo-600 dark:bg-indigo-400 animate-pulse align-middle rounded-xs" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Student Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 border border-slate-300 dark:border-slate-700 mt-1">
                      <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Prompt Input Area */}
          <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/60">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <textarea
                  id="ai-chat-input"
                  ref={textareaRef}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask anything about ${selectedSubject}, course syllabus, exams, skills, or debug code...`}
                  rows={2}
                  disabled={loading}
                  className="w-full px-4 py-3 text-base sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none transition-all shadow-inner disabled:opacity-60"
                />
                <div className="absolute right-3 bottom-2.5 flex items-center gap-2 text-[11px] text-slate-400 pointer-events-none">
                  <span className="hidden sm:inline">Press</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono">
                    Enter
                  </kbd>
                  <span className="hidden sm:inline">to send</span>
                </div>
              </div>

              <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                {loading ? (
                  <button
                    type="button"
                    id="stop-ai-generation-btn"
                    onClick={handleStopGenerating}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-rose-600/25 hover:shadow-rose-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    title="Stop Generating Response"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="send-ai-query-btn"
                    onClick={() => handleSendMessage()}
                    disabled={!inputQuery.trim()}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ask AI</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Gemini Live Streaming &bull; Instant answers to student questions</span>
              </span>
              <span className="font-mono text-slate-400">Shift + Enter for new line</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

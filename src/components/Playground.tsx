import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Trash2, Terminal, Code2, Cpu, HelpCircle, CornerDownLeft, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { playgroundPresets } from '../data/playgroundPresets';
import { executeJavaScript, simulateCpp, RunResult } from '../utils/codeRunner';
import { ExecutionLog } from '../types';

export const Playground: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'cpp'>('javascript');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('js-binary-search');
  const [code, setCode] = useState<string>('');
  const [stdin, setStdin] = useState<string>('');
  const [showStdin, setShowStdin] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [executionStats, setExecutionStats] = useState<{ timeMs?: number; success?: boolean } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  // Initialize code when language or preset changes
  useEffect(() => {
    const currentPresets = playgroundPresets.filter((p) => p.language === selectedLanguage);
    const foundPreset = currentPresets.find((p) => p.id === selectedPresetId) || currentPresets[0];
    if (foundPreset) {
      setSelectedPresetId(foundPreset.id);
      setCode(foundPreset.code);
      if (foundPreset.defaultStdin) {
        setStdin(foundPreset.defaultStdin);
        setShowStdin(true);
      }
    }
  }, [selectedLanguage]);

  // Scroll to bottom of terminal when logs are appended
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = playgroundPresets.find((p) => p.id === presetId);
    if (preset) {
      setCode(preset.code);
      if (preset.defaultStdin) {
        setStdin(preset.defaultStdin);
        setShowStdin(true);
      }
    }
  };

  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setExecutionStats(null);

    // Initial log
    const initialLog: ExecutionLog = {
      id: `run-${Date.now()}`,
      type: 'info',
      text: `Executing ${selectedLanguage === 'javascript' ? 'JavaScript (V8/Browser Engine)' : 'C++ Simulation Engine (g++ virtualizer)'}...`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs((prev) => [...prev, initialLog]);

    try {
      let result: RunResult;
      if (selectedLanguage === 'javascript') {
        result = await executeJavaScript(code, stdin);
      } else {
        result = await simulateCpp(code, stdin);
      }

      setLogs((prev) => [...prev, ...result.logs]);
      setExecutionStats({ timeMs: result.executionTimeMs, success: result.success });
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : String(err);
      setLogs((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: 'stderr',
          text: `Execution failed: ${errText}`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setExecutionStats({ timeMs: 0, success: false });
    } finally {
      setIsRunning(false);
    }
  };

  // Support Tab key indentation inside textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);

      // Restore cursor position after state update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    }
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    const preset = playgroundPresets.find((p) => p.id === selectedPresetId);
    if (preset) {
      setCode(preset.code);
    }
  };

  const handleClearConsole = () => {
    setLogs([]);
    setExecutionStats(null);
  };

  const currentPresets = playgroundPresets.filter((p) => p.language === selectedLanguage);
  const lineCount = code.split('\n').length;

  return (
    <section id="playground" className="py-16 md:py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              <Terminal className="w-4 h-4" />
              <span>Interactive Dual Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Live Code Playground
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Write, edit, and test algorithms instantly in the browser. Run client-side JavaScript or simulate C++ programs with terminal inputs and formatted stdout.
            </p>
          </div>

          {/* Language Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start md:self-auto shadow-inner">
            <button
              type="button"
              id="lang-select-js"
              onClick={() => {
                setSelectedLanguage('javascript');
                setSelectedPresetId('js-binary-search');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedLanguage === 'javascript'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/60 dark:border-slate-700/60'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4 text-amber-500" />
              <span>JavaScript</span>
            </button>

            <button
              type="button"
              id="lang-select-cpp"
              onClick={() => {
                setSelectedLanguage('cpp');
                setSelectedPresetId('cpp-binary-search');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedLanguage === 'cpp'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/60 dark:border-slate-700/60'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-sky-500" />
              <span>C++ Simulator</span>
            </button>
          </div>
        </div>

        {/* Playground Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 gap-3">
            {/* Presets dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Algorithm Preset:
              </span>
              <select
                id="algorithm-preset-select"
                value={selectedPresetId}
                onChange={(e) => handleSelectPreset(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-3 py-1.5 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-xs"
              >
                {currentPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="toggle-stdin-btn"
                onClick={() => setShowStdin(!showStdin)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
                  showStdin
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Toggle standard input (stdin) for interactive programs"
              >
                Input (stdin) {showStdin ? 'On' : 'Off'}
              </button>

              <button
                type="button"
                id="copy-code-btn"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-xs"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="reset-code-btn"
                onClick={handleResetCode}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-xs"
                title="Reset editor to initial preset code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              {/* Run Button */}
              <button
                type="button"
                id="run-code-btn"
                onClick={handleRunCode}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 disabled:opacity-60 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Code</span>
                    <span className="hidden sm:inline text-[10px] text-indigo-200 font-normal">
                      (Ctrl+Enter)
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Optional Stdin Panel */}
          {showStdin && (
            <div className="px-4 py-2.5 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-200/60 dark:border-amber-900/40 flex items-center gap-3">
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 shrink-0">
                Standard Input (stdin):
              </span>
              <input
                type="text"
                id="playground-stdin-input"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="e.g. 28 (passed to cin or readLine)"
                className="flex-1 px-3 py-1 text-xs font-mono bg-white dark:bg-slate-900 border border-amber-300/70 dark:border-amber-800/60 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <span className="text-[11px] text-amber-700/80 dark:text-amber-400/80 hidden sm:inline">
                Values will be read sequentially by cin &gt;&gt; var
              </span>
            </div>
          )}

          {/* Split Pane: Code Editor + Terminal Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left: Code Editor (7 cols) */}
            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-950">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                  <span>main.{selectedLanguage === 'javascript' ? 'js' : 'cpp'}</span>
                </div>
                <span>{lineCount} lines</span>
              </div>

              <div className="relative flex flex-1 overflow-hidden font-mono text-xs sm:text-sm">
                {/* Line Numbers Gutter */}
                <div className="py-4 pl-3 pr-2 text-slate-600 dark:text-slate-500 select-none text-right font-mono text-xs bg-slate-950/70 border-r border-slate-800/60 leading-6 shrink-0 w-10">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Editor Textarea */}
                <textarea
                  ref={textareaRef}
                  id="code-editor-textarea"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  className="w-full flex-1 p-4 bg-transparent text-slate-100 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none selection:bg-indigo-600/40"
                  style={{ tabSize: 2 }}
                />
              </div>
            </div>

            {/* Right: Output Terminal Console (5 cols) */}
            <div className="lg:col-span-5 flex flex-col bg-slate-950 text-slate-200 font-mono">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px] ml-2">
                    Terminal Console
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {executionStats && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                        executionStats.success
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                      }`}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      {executionStats.timeMs}ms
                    </span>
                  )}
                  <button
                    type="button"
                    id="clear-console-btn"
                    onClick={handleClearConsole}
                    className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors"
                    title="Clear console output"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Logs Content Area */}
              <div
                id="terminal-output-container"
                className="flex-1 p-4 overflow-y-auto max-h-[460px] font-mono text-xs space-y-1.5 leading-relaxed selection:bg-indigo-600/40"
              >
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-16 px-4">
                    <Terminal className="w-8 h-8 mb-2 opacity-40" />
                    <p className="font-semibold text-slate-400">Interactive Console Ready</p>
                    <p className="text-[11px] mt-1 max-w-xs text-slate-500">
                      Click <strong className="text-indigo-400">Run Code</strong> to execute your
                      algorithm. Output printed via <code className="text-slate-300">console.log</code>{' '}
                      or <code className="text-slate-300">std::cout</code> will display here in real
                      time.
                    </p>
                  </div>
                ) : (
                  logs.map((log) => {
                    let styleClass = 'text-slate-200';
                    let prefix = '';

                    if (log.type === 'stdout') {
                      styleClass = 'text-emerald-400';
                    } else if (log.type === 'info') {
                      styleClass = 'text-indigo-400 font-semibold';
                    } else if (log.type === 'warn') {
                      styleClass = 'text-amber-400';
                      prefix = '[WARN] ';
                    } else if (log.type === 'stderr') {
                      styleClass = 'text-rose-400 font-semibold';
                      prefix = '[ERROR] ';
                    }

                    return (
                      <div key={log.id} className="flex items-start gap-2 break-all">
                        <span className="text-slate-600 text-[10px] select-none shrink-0 pt-0.5">
                          {log.timestamp}
                        </span>
                        <span className={`${styleClass} whitespace-pre-wrap`}>
                          {prefix}
                          {log.text}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={consoleBottomRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

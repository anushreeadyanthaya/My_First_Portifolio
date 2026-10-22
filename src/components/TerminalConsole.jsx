import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Copy, Check } from 'lucide-react';
import { INITIAL_TERMINAL_HISTORY, executeCommand } from '../data/terminalCommands';

export default function TerminalConsole({ onOpenResume, onToggleTheme }) {
  const [history, setHistory] = useState(INITIAL_TERMINAL_HISTORY);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSubmit = (cmdToRun) => {
    const command = (cmdToRun !== undefined ? cmdToRun : inputVal).trim();
    if (!command) return;

    const newHistory = [...history, { type: 'input', command }];
    const result = executeCommand(command, {
      openResume: onOpenResume,
      toggleTheme: onToggleTheme
    });

    if (result.clear) {
      setHistory([]);
    } else {
      newHistory.push({ type: 'output', text: result.output });
      setHistory(newHistory);
    }

    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopyHistory = () => {
    const textToCopy = history
      .map((item) =>
        item.type === 'input'
          ? `$ ${item.command}`
          : item.type === 'output'
          ? item.text
          : `[System] ${item.text}`
      )
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl border border-dark-border/60 dark:border-dark-border/60 light:border-light-border bg-dark-surface/95 dark:bg-dark-surface/95 light:bg-light-surface backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B101E] dark:bg-[#0B101E] light:bg-[#E2E8F0] border-b border-dark-border/40 dark:border-dark-border/40 light:border-light-border/40 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50"></div>
          <span className="ml-2 font-mono text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-electric-blue" />
            anushree@portfolio:~
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyHistory}
          className="flex items-center gap-1 font-mono text-[11px] text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          title="Copy session"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Content Body */}
      <div
        className="p-4 sm:p-5 font-mono text-xs sm:text-sm h-72 sm:h-80 overflow-y-auto space-y-3 bg-[#080B14]/95 dark:bg-[#080B14]/95 light:bg-light-surface scanline"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="leading-relaxed">
            {item.type === 'system' && (
              <div className="text-slate-400 italic text-xs">
                {item.text}
              </div>
            )}
            {item.type === 'input' && (
              <div className="flex items-center gap-2 text-electric-blue font-semibold">
                <span className="text-emerald-400 font-mono">anushree:~$</span>
                <span className="text-white dark:text-white light:text-slate-900">{item.command}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre className="text-slate-300 dark:text-slate-300 light:text-slate-700 whitespace-pre-wrap font-mono mt-1 pl-2 border-l border-electric-blue/30 text-xs sm:text-sm">
                {item.text}
              </pre>
            )}
          </div>
        ))}

        {/* Live Input Line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-semibold shrink-0 font-mono">anushree:~$</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type 'help' for commands..."
              aria-label="Terminal command input"
              className="w-full bg-transparent border-none text-white dark:text-white light:text-slate-900 focus:outline-none focus:ring-0 p-0 font-mono text-xs sm:text-sm placeholder:text-slate-600 dark:placeholder:text-slate-600 light:placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => handleSubmit()}
              aria-label="Execute command"
              className="text-slate-500 hover:text-electric-blue p-1"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Info */}
      <div className="px-4 py-2 bg-[#0B101E] dark:bg-[#0B101E] light:bg-[#E2E8F0] border-t border-dark-border/40 dark:border-dark-border/40 light:border-light-border/40 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Available: help, about, skills, projects, achievements, links, resume</span>
        <span className="text-emerald-400 hidden sm:inline">● Online</span>
      </div>
    </div>
  );
}

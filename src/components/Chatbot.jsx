import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Trash2,
  Bot,
  User,
  Loader2,
  ChevronDown
} from 'lucide-react';

// ── Suggested questions shown when chat opens ──────────────────────────────
const SUGGESTED_QUESTIONS = [
  'Who is Anushree?',
  'What technical skills does she have?',
  'What projects has she developed?',
  'What technologies does she use?',
  'What is her educational background?',
  'How can I contact her?',
  'What are her areas of interest?'
];

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! 👋 I'm Anushree's AI assistant. Ask me anything about her skills, projects, education, or experience!",
  timestamp: Date.now()
};

// ── Utility: generate a simple unique id ────────────────────────────────────
let _msgIdCounter = 0;
function uid() {
  return `msg-${Date.now()}-${++_msgIdCounter}`;
}

// ── Typing indicator dots ───────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-electric-blue to-cyber-violet flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-white" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Individual message bubble ───────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-cyber-violet to-electric-blue'
            : 'bg-gradient-to-br from-electric-blue to-cyber-violet'
        }`}
      >
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'rounded-br-sm bg-gradient-to-br from-electric-blue to-cyber-violet text-white shadow-md shadow-electric-blue/20'
            : 'rounded-bl-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

// ── Main Chatbot Component ──────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Build history array for API (exclude welcome message)
  const buildHistory = useCallback((currentMessages) => {
    return currentMessages
      .filter(m => m.id !== 'welcome')
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content
      }));
  }, []);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setError(null);
    setShowSuggestions(false);

    // Add user message
    const userMsg = { id: uid(), role: 'user', content: trimmed, timestamp: Date.now() };
    setMessages(prev => {
      const next = [...prev, userMsg];
      return next;
    });
    setInputText('');
    setIsTyping(true);

    try {
      // We need the history BEFORE the new user message for context
      const historyBeforeThisMsg = buildHistory(messages);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyBeforeThisMsg
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      const assistantMsg = {
        id: uid(),
        role: 'assistant',
        content: data.reply,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message || 'Failed to get a response. Please try again.');
      // Remove the user message if the request completely failed (network error)
      // Actually keep it so user can see what they asked; just show error below
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, messages, buildHistory]);

  const handleSend = useCallback(() => {
    sendMessage(inputText);
  }, [inputText, sendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleSuggestion = useCallback((question) => {
    sendMessage(question);
  }, [sendMessage]);

  const handleClear = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setShowSuggestions(true);
    setError(null);
    inputRef.current?.focus();
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* ── Chat Window ────────────────────────────────────────────────────── */}
      <div
        ref={chatWindowRef}
        aria-label="AI Chatbot"
        aria-hidden={!isOpen}
        className={`
          fixed bottom-24 right-5 z-50
          w-[92vw] max-w-sm
          rounded-2xl shadow-2xl shadow-black/40
          bg-light-base dark:bg-dark-base
          border border-light-border dark:border-dark-border
          flex flex-col overflow-hidden
          transition-all duration-300 origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-95 pointer-events-none translate-y-4'
          }
        `}
        style={{ height: '520px', maxHeight: 'calc(100vh - 120px)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-electric-blue/10 to-cyber-violet/10 border-b border-light-border dark:border-dark-border flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-blue to-cyber-violet flex items-center justify-center shadow-md shadow-electric-blue/30">
            <Bot size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-light-text-primary dark:text-dark-text-primary leading-none">
              Portfolio AI Assistant
            </p>
            <p className="text-xs text-electric-blue mt-0.5 font-mono">● online</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              aria-label="Clear chat"
              title="Clear chat"
              className="p-1.5 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={toggleChat}
              aria-label="Close chatbot"
              className="p-1.5 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 scrollbar-thin">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          {/* Error message */}
          {error && (
            <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2 mb-2">
              ⚠️ {error}
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions */}
        {showSuggestions && (
          <div className="px-3 pb-2 flex-shrink-0">
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2 font-mono px-1">
              // suggested questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  disabled={isTyping}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-electric-blue/40 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed font-mono leading-none"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="px-3 pb-3 pt-2 border-t border-light-border dark:border-dark-border flex-shrink-0">
          <div className="flex items-center gap-2 bg-light-surface dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border focus-within:border-electric-blue/60 transition-colors px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              disabled={isTyping}
              maxLength={1000}
              aria-label="Chat message input"
              className="flex-1 bg-transparent text-sm text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary outline-none disabled:opacity-50 font-sans"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              aria-label="Send message"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-cyber-violet flex items-center justify-center text-white transition-all duration-150 hover:shadow-md hover:shadow-electric-blue/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex-shrink-0"
            >
              {isTyping
                ? <Loader2 size={14} className="animate-spin" />
                : <Send size={14} />
              }
            </button>
          </div>
          <p className="text-center text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1.5 font-mono opacity-60">
            Powered by Gemini AI
          </p>
        </div>
      </div>

      {/* ── Floating Trigger Button ──────────────────────────────────────── */}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Close AI chatbot' : 'Open AI chatbot'}
        aria-expanded={isOpen}
        className={`
          fixed bottom-5 right-5 z-50
          w-14 h-14 rounded-full
          bg-gradient-to-br from-electric-blue to-cyber-violet
          text-white shadow-lg shadow-electric-blue/40
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110 hover:shadow-xl hover:shadow-electric-blue/50
          active:scale-95
          ${isOpen ? 'rotate-180' : 'rotate-0'}
        `}
      >
        {isOpen
          ? <X size={24} className="transition-transform duration-300" />
          : <MessageCircle size={24} className="transition-transform duration-300" />
        }
      </button>

      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={toggleChat}
          aria-hidden="true"
        />
      )}
    </>
  );
}

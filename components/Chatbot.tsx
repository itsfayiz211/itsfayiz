'use client';

import { useTheme } from '@/context/ThemeContext';
import {  X, Send, Bot, User, Sparkles, Minimize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED = [
  'Tell me about Fayis',
  'What technologies does he specialize in?',
  'Show me his projects',
  'How can I work with him?',
];
function MarkdownText({ text }: { text: string }) {
  // Simple markdown: **bold**, bullet lists
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        // Bold
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className={line.startsWith('•') || line.startsWith('-') ? 'pl-2' : ''}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j}>{part.slice(2, -2)}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-violet-400"
          style={{
            animation: 'typing 1s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Chatbot({
  isOpen,
  onClose,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
      "Hello! 👋 I'm Subu, Fayis's AI assistant. I can help you explore his projects, technical skills, and experience, or guide you on how to get in touch with him. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          
        }),
        
      });

      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Sorry, I had trouble responding. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again!',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

const cardBg = isLight ? 'bg-white border-gray-200' : 'bg-neutral-950 border-white/10';
  const headerBg = isLight ? 'bg-gradient-to-r from-neutral-950 to-neutral-900' : 'bg-gradient-to-r from-neutral-900 to-neutral-950';

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        id="chatbot-toggle"
        onClick={isOpen ? onClose : onOpen}
        className={`fixed  bottom-6 right-6  z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-gray-700 scale-95'
            : 'bg-gradient-to-br from-violet-500 to-fuchsia-500 hover:scale-110'
        }`}
        style={!isOpen ? { animation: 'pulse-glow 2s ease-in-out infinite' } : {}}
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <Bot size={22} className="text-white" />
        )}
        {/* Unread dot (shown when closed) */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[8px] font-black text-white">AI</span>
          </span>
        )}
      </button>

      {/* ── Chat Panel ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${cardBg} ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        style={{ height: '520px', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}
      >
        {/* ── Header ── */}
        <div className={`${headerBg} p-4 flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-white text-sm">Subu AI</p>
                <Sparkles size={12} className="text-yellow-300" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <p className="text-[11px] text-violet-100">Online · Instant replies</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            aria-label="Close chat"
          >
            <Minimize2 size={14} className="text-white" />
          </button>
        </div>

        {/* ── Messages ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center ${
                  msg.role === 'user'
                    ? 'bg-violet-500'
                    : isLight
                    ? 'bg-gray-100'
                    : 'bg-white/10'
                }`}
              >
                {msg.role === 'user' ? (
                  <User size={13} className="text-white" />
                ) : (
                  <Bot size={13} className={isLight ? 'text-neutral-950' : 'text-white'} />
                )}
              </div>

              {/* Bubble */}
           <div
  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed backdrop-blur-md border ${
    msg.role === 'user'
      ? 'bg-neutral-900/80 text-white border-white/10 rounded-tr-sm'
      : isLight
      ? 'bg-gray-100 text-gray-800 border-gray-200 rounded-tl-sm'
      : 'bg-white/5 text-gray-200 border-white/10 rounded-tl-sm'
  }`}
>
                {msg.role === 'assistant' ? (
                  <MarkdownText text={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5">
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                  isLight ? 'bg-gray-100' : 'bg-white/10'
                }`}
              >
                <Bot size={13} className={isLight ? 'text-violet-500' : 'text-violet-400'} />
              </div>
              <div
                className={`px-4 py-3 rounded-2xl rounded-tl-sm ${
                  isLight ? 'bg-gray-100' : 'bg-white/8 border border-white/5'
                }`}
              >
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>

        {/* ── Suggested questions ── */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex gap-2 flex-wrap shrink-0">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all hover:border-violet-400/50 hover:text-violet-400 ${
                  isLight
                    ? 'bg-gray-50 border-gray-200 text-gray-600'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ── Input ── */}
        <form
          onSubmit={handleSubmit}
          className={`p-3 border-t flex items-center gap-2 shrink-0 ${
            isLight ? 'border-gray-200 bg-gray-50' : 'border-white/5 bg-white/3'
          }`}
        >
          <input
            ref={inputRef}
            id="chatbot-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isTyping}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm outline-none border transition-all ${
              isLight
                ? 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100'
                : 'bg-white/8 border-white/10 text-gray-200 placeholder:text-gray-600 focus:border-violet-500/50'
            }`}
          />
          <button
            id="chatbot-send"
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0"
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </>
  );
}

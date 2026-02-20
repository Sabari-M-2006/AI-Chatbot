'use client';

import { useEffect, useRef } from 'react';
import type { UIMessage } from 'ai';
import ChatMessage from './ChatMessage';

interface MessageListProps {
  messages: UIMessage[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
    return () => clearTimeout(timer);
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
        <div className="mb-4 text-6xl animate-bounce">💬</div>
        <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
          Start a Conversation
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mb-6 leading-relaxed">
          Ask me anything! I'm here to help with questions, writing, analysis, coding, and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
            <div className="font-semibold mb-1">💡 Ask a Question</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Get answers on any topic</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
            <div className="font-semibold mb-1">✍️ Writing Help</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Improve your content</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
            <div className="font-semibold mb-1">💻 Code Help</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Debug and explain code</div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
            <div className="font-semibold mb-1">🔍 Analysis</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Analyze problems</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent scroll-smooth"
    >
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {messages.map((m, idx) => (
          <div key={m.id || idx} className="animate-in fade-in duration-300">
            <ChatMessage message={m} />
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-bl-none">
              <div
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        )}
        
        <div ref={endRef} />
      </div>
    </div>
  );
}

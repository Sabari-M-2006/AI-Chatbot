'use client';

import { FormEvent, KeyboardEvent, useState } from 'react';

interface ChatInputProps {
  input: string;
  setInput: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

const QUICK_PROMPTS = [
  { icon: '💡', text: 'Explain this concept' },
  { icon: '✍️', text: 'Help me write' },
  { icon: '🐛', text: 'Debug this code' },
  { icon: '📝', text: 'Summarize this' },
];

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const [characterCount, setCharacterCount] = useState(0);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as any);
    }
  };

  const handleInputChange = (value: string) => {
    if (value.length <= 5000) {
      setInput(value);
      setCharacterCount(value.length);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <form onSubmit={onSubmit} className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 md:p-5 transition-colors">
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Quick Prompts */}
        {!input && !isLoading && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPrompt(prompt.text)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors whitespace-nowrap"
              >
                {prompt.icon} {prompt.text}
              </button>
            ))}
          </div>
        )}

        {/* Input Container */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              className="w-full bg-zinc-50 dark:bg-zinc-800 px-4 py-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent text-sm resize-none placeholder:text-zinc-400 dark:text-white transition-all"
              value={input}
              onChange={e => handleInputChange(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (Shift+Enter for new line)"
              rows={1}
              style={{
                minHeight: '44px',
                maxHeight: '120px',
                overflow: input.split('\n').length > 2 ? 'auto' : 'hidden',
              }}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 h-[44px] rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            title={isLoading ? 'Waiting for response...' : 'Send message (Enter)'}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex">
                  <span className="animate-spin">✓</span>
                </span>
                <span className="text-xs">Thinking...</span>
              </span>
            ) : (
              <span className="text-lg">➤</span>
            )}
          </button>
        </div>

        {/* Character Counter & Help Text */}
        <div className="flex justify-between items-center px-1">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            📌 Shift+Enter for new line
          </p>
          <span className={`text-xs font-medium ${characterCount > 4500 ? 'text-red-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
            {characterCount} / 5000
          </span>
        </div>
      </div>
    </form>
  );
}

'use client';

import { useEffect, useState } from 'react';
import type { UIMessage } from 'ai';
import { sanitizeMessage } from '@/app/lib/messageUtils';

interface ChatMessageProps {
  message: UIMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isUser = message.role === 'user';
  
  // Handle both message formats: with 'parts' array or direct 'content'
  const text = message.parts && Array.isArray(message.parts)
    ? message.parts
        .filter((p): p is Extract<typeof p, { type: 'text' }> => p.type === 'text')
        .map(p => sanitizeMessage(p.text))
        .join('')
    : sanitizeMessage((message as any).content || '');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced markdown rendering
  const renderContent = (content: string) => {
    const segments = content.split(/(\*\*.*?\*\*|`.*?`|\n)/);
    
    return segments.map((segment, idx) => {
      if (segment.match(/^\*\*.*\*\*$/)) {
        return (
          <strong key={idx} className="font-semibold">
            {segment.replace(/\*\*/g, '')}
          </strong>
        );
      }
      if (segment.match(/^`.*`$/)) {
        return (
          <code
            key={idx}
            className={`px-2 py-1 rounded font-mono text-xs ${
              isUser
                ? 'bg-blue-400'
                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
            }`}
          >
            {segment.replace(/`/g, '')}
          </code>
        );
      }
      if (segment === '\n') {
        return <br key={idx} />;
      }
      return segment;
    });
  };

  return (
    <div
      className={`flex w-full gap-2 ${isUser ? 'justify-end' : 'justify-start'} ${
        isVisible ? 'animate-in fade-in slide-in-from-bottom-2 duration-300' : 'opacity-0'
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          AI
        </div>
      )}
      
      <div
        className={`max-w-[85%] md:max-w-[65%] px-4 py-3 rounded-2xl leading-relaxed break-words ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-md'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none shadow-sm hover:shadow-md transition-shadow'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">
          {renderContent(text)}
        </div>
      </div>
    </div>
  );
}

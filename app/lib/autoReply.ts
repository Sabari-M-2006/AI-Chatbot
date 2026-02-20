/**
 * Intelligent Auto-Reply System
 * Detects message intent and generates contextual responses
 */

interface AutoReply {
  enabled: boolean;
  response: string;
  confidence: number;
}

type MessagePattern = {
  patterns: RegExp[];
  reply: (match: RegExpMatchArray | null) => string;
  confidence: number;
};

const messagePatterns: MessagePattern[] = [
  {
    patterns: [/^(hi|hello|hey|greetings)$/i],
    reply: () => '👋 Hello! How can I assist you today?',
    confidence: 0.95,
  },
  {
    patterns: [/(how\s+are\s+you|how's\s+it\s+going|what's\s+up)/i],
    reply: () => "I'm doing great! Thanks for asking. How can I help you?",
    confidence: 0.9,
  },
  {
    patterns: [/(thanks|thank\s+you|appreciate|grateful)/i],
    reply: () => "You're welcome! Happy to help. Is there anything else you need?",
    confidence: 0.9,
  },
  {
    patterns: [/(bye|goodbye|see\s+you|take\s+care)/i],
    reply: () => 'Goodbye! Feel free to come back anytime. Have a great day! 👋',
    confidence: 0.95,
  },
  {
    patterns: [/(what's\s+your\s+name|who\s+are\s+you)/i],
    reply: () => "I'm your AI Assistant, powered by Google Gemini. I'm here to help with questions, writing, coding, analysis, and much more!",
    confidence: 0.95,
  },
  {
    patterns: [/(help|what\s+can\s+you\s+do|capabilities)/i],
    reply: () => "I can assist you with:\n• Answering questions on various topics\n• Writing and editing content\n• Code explanations and debugging\n• Problem analysis\n• Creative tasks\n• And much more!\n\nJust ask me anything!",
    confidence: 0.85,
  },
  {
    patterns: [/(ok|okay|alright|sure|sounds\s+good)/i],
    reply: () => 'Great! What would you like to know?',
    confidence: 0.8,
  },
  {
    patterns: [/^(yes|yep|yeah)$/i],
    reply: () => 'Awesome! Go ahead and ask your question.',
    confidence: 0.75,
  },
  {
    patterns: [/^(no|nope)$/i],
    reply: () => 'No problem! Feel free to ask if you need anything else.',
    confidence: 0.75,
  },
];

/**
 * Detect if a message should trigger an auto-reply
 */
export function detectAutoReply(message: string): AutoReply | null {
  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return null;
  }

  // Only auto-reply to short messages (likely greetings/simple messages)
  if (trimmedMessage.length > 100) {
    return null;
  }

  for (const pattern of messagePatterns) {
    for (const regex of pattern.patterns) {
      const match = trimmedMessage.match(regex);
      if (match) {
        return {
          enabled: true,
          response: pattern.reply(match),
          confidence: pattern.confidence,
        };
      }
    }
  }

  return null;
}

/**
 * Format response text with better structure
 */
export function formatResponseText(text: string): string {
  return text
    .split('\n')
    .map(line => line.trimRight())
    .join('\n');
}

/**
 * Check if response needs to be streamed or can be instant
 */
export function shouldStreamResponse(message: string): boolean {
  // Auto-replies are instant, complex questions should be streamed
  const autoReply = detectAutoReply(message);
  return !autoReply?.enabled || autoReply.confidence < 0.85;
}

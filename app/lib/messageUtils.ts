/**
 * Message Utility Functions
 * Enhanced message processing and formatting
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

/**
 * Validate message content
 */
export function validateMessage(content: string): {
  valid: boolean;
  error?: string;
} {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Message must be a non-empty string' };
  }

  const trimmed = content.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (trimmed.length > 5000) {
    return { valid: false, error: 'Message exceeds maximum length of 5000 characters' };
  }

  return { valid: true };
}

/**
 * Format text with proper markdown handling
 */
export function formatMessageText(text: string): string {
  return text
    .replace(/\n\n+/g, '\n\n') // Remove multiple line breaks
    .trim();
}

/**
 * Extract code blocks from message
 */
export function extractCodeBlocks(text: string): { code: string; language: string }[] {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: { code: string; language: string }[] = [];
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2],
    });
  }

  return blocks;
}

/**
 * Truncate long messages for previews
 */
export function truncateMessage(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get message length statistics
 */
export function getMessageStats(text: string) {
  return {
    characters: text.length,
    words: text.split(/\s+/).filter(w => w.length > 0).length,
    lines: text.split('\n').length,
    paragraphs: text.split(/\n\s*\n/).length,
  };
}

/**
 * Check if message is a question
 */
export function isQuestion(text: string): boolean {
  const trimmed = text.trim();
  return (
    trimmed.endsWith('?') ||
    /^(what|when|where|why|how|who|which|can|could|would|should|will|is|are|do|does)/i.test(trimmed)
  );
}

/**
 * Sanitize message content
 */
export function sanitizeMessage(text: string): string {
  return text
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .trim();
}

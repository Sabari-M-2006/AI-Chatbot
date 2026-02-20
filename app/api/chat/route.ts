import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';
import { detectAutoReply } from '@/app/lib/autoReply';

/**
 * Enhanced system prompt with better response structure
 */
const SYSTEM_PROMPT = `You are a helpful, friendly, and highly intelligent AI assistant.

Your Response Guidelines:
1. **Clarity**: Use clear, concise language appropriate for the audience
2. **Structure**: Organize responses with headings, bullet points, and formatting when appropriate
3. **Code**: Provide well-commented, production-ready examples when coding is involved
4. **Completeness**: Address all aspects of the question while being respectful of token limits
5. **Tone**: Be conversational, encouraging, and professional
6. **Accuracy**: Admit uncertainty when appropriate rather than guessing

When responding:
- Use **bold** for key terms
- Use \`code\` for inline code examples
- Use bullet points for lists
- Break down complex topics into digestible parts
- End with a helpful follow-up question when appropriate

You are knowledgeable about a wide range of topics including:
- Software development and coding
- Data analysis and science
- Writing and communication
- Business and strategy
- Education and learning
- And much more!`;

/**
 * Validates incoming request and message format
 */
function validateRequest(body: any): {
  valid: boolean;
  error?: string;
  messages?: UIMessage[];
} {
  if (!body) {
    return { valid: false, error: 'Request body is required' };
  }

  const { messages } = body;

  if (!messages) {
    return { valid: false, error: 'Messages field is required' };
  }

  if (!Array.isArray(messages)) {
    return { valid: false, error: 'Messages must be an array' };
  }

  if (messages.length === 0) {
    return { valid: false, error: 'At least one message is required' };
  }

  // Validate each message
  for (const msg of messages) {
    if (!msg.role || !msg.content) {
      return { valid: false, error: 'Each message must have a role and content' };
    }
    if (!['user', 'assistant'].includes(msg.role)) {
      return { valid: false, error: 'Invalid message role' };
    }
  }

  return { valid: true, messages };
}

/**
 * Main chat API route handler
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request
    const validation = validateRequest(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error || 'Invalid request' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const messages = validation.messages!;

    // Validate presence of Google API key early to avoid confusing downstream errors
    const googleApiKey =
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!googleApiKey || typeof googleApiKey !== 'string' || googleApiKey.trim() === '') {
      console.error('Missing GOOGLE_API_KEY environment variable');
      return new Response(
        JSON.stringify({ error: 'Missing or invalid GOOGLE_API_KEY. Please set GOOGLE_API_KEY in your environment.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    let lastMessageContent = '';
    
    // Extract content from lastMessage based on its structure
    if ('content' in lastMessage && typeof lastMessage.content === 'string') {
      lastMessageContent = lastMessage.content;
    } else if ('parts' in lastMessage && Array.isArray(lastMessage.parts)) {
      lastMessageContent = lastMessage.parts
        .filter((p: any) => p.type === 'text')
        .map((p: any) => p.text)
        .join('');
    }

    // Check for auto-reply
    if (typeof lastMessageContent === 'string') {
      const autoReply = detectAutoReply(lastMessageContent);
      
      if (autoReply?.enabled && autoReply.confidence > 0.8) {
        // Return auto-reply as a simple text stream
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          start(controller) {
            // Send the auto-reply in the format expected by useChat
            // Format: 0:"message content"\n
            controller.enqueue(
              encoder.encode(`0:"${autoReply.response.replace(/"/g, '\\"')}"\n`)
            );
            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
          },
        });
      }
    }

    // Create streaming text response for regular AI messages
    // Attempt to convert messages to model format, but fall back to a safe
    // plain conversion if the library function fails for unknown shapes.
    let modelMessages;
    try {
      if (!Array.isArray(messages)) {
        throw new Error('Messages must be an array');
      }

      modelMessages = await convertToModelMessages(messages);
    } catch (err) {
      console.warn('convertToModelMessages failed, using safe fallback:', err);

      // Fallback: create a simplified model messages array using role+string content
      modelMessages = messages.map((m: any) => {
        let content = '';
        if (typeof m.content === 'string') content = m.content;
        else if (Array.isArray(m.parts)) {
          content = m.parts
            .filter((p: any) => p && p.type === 'text')
            .map((p: any) => p.text)
            .join('');
        }
        return { role: m.role, content };
      });
    }

    const result = streamText({
      model: google('gemini-2.0-flash'),
      system: SYSTEM_PROMPT,
      messages: modelMessages,

      // Enhanced configuration
      temperature: 0.7, // Balance creativity and consistency
      topP: 0.95, // Diverse but focused responses

      // TODO TASK 2 - Enable tool calling when ready:
      // tools,            // Enable tool calling for extended functionality
      // maxToolRoundtrips: 5,      // Allow multi-step tool use
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return new Response(
      JSON.stringify({
        error: 'Failed to process request',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return new Response(null, { status: 200 });
}

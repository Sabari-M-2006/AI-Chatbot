# Configuration Guide

## Auto-Reply Configuration

### Adding New Auto-Reply Patterns

Edit `app/lib/autoReply.ts`:

```typescript
const messagePatterns: MessagePattern[] = [
  // ... existing patterns
  {
    patterns: [/your-regex-pattern/i],
    reply: (match) => 'Your response here',
    confidence: 0.85, // 0-1 scale
  },
];
```

### Confidence Levels
- **0.95-1.0**: Always reply (reserved for greetings)
- **0.85-0.95**: Usually reply (common messages)
- **0.70-0.85**: Sometimes reply (context-dependent)
- **Below 0.70**: Rarely reply (ambiguous messages)

### Examples

**Greeting Pattern:**
```typescript
{
  patterns: [/^(wa+su+p|yo|howdy)$/i],
  reply: () => 'Hey there! 👋 What can I help you with?',
  confidence: 0.92,
}
```

**Question Pattern:**
```typescript
{
  patterns: [/(what.*your|who.*you|explain.*yourself)/i],
  reply: () => 'I\'m your AI Assistant! I can help with questions, coding, writing, and more.',
  confidence: 0.88,
}
```

## API Configuration

### Environment Variables

Create `.env.local`:
```env
# Required
GOOGLE_GENERATIVE_AI_API_KEY=sk-xxx...

# Optional (for future features)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
```

### System Prompt Customization

Edit the `SYSTEM_PROMPT` in `app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `You are [ROLE_DESCRIPTION].

Your Response Guidelines:
1. [CUSTOM_GUIDELINE_1]
2. [CUSTOM_GUIDELINE_2]
...
`;
```

### Response Settings

```typescript
const result = streamText({
  model: google('gemini-2.0-flash'),
  temperature: 0.7,    // 0=deterministic, 1=creative
  maxTokens: 2048,     // Response length
  topP: 0.95,          // Diversity: lower = focused, higher = diverse
  topK: 40,            // Consider top K tokens
});
```

## UI/UX Customization

### Colors

Update in `app/globals.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  /* Update color variables */
}
```

Or modify Tailwind classes in components:
```tsx
// User message background
className="bg-gradient-to-r from-blue-500 to-blue-600"

// Assistant message background
className="bg-zinc-100 dark:bg-zinc-800"
```

### Animation Speed

In `app/globals.css`:
```css
:root {
  --message-animation-duration: 0.3s; /* Adjust as needed */
}
```

### Quick Prompts

Customize in `app/components/ChatInput.tsx`:
```typescript
const QUICK_PROMPTS = [
  { icon: '💡', text: 'Your custom prompt' },
  { icon: '✍️', text: 'Another prompt' },
  // Add more...
];
```

## Message Validation

Customize validation in `app/lib/messageUtils.ts`:

```typescript
export function validateMessage(content: string) {
  // Modify max length
  if (trimmed.length > 5000) { // Change this value
    return { valid: false, error: 'Message too long' };
  }
  
  // Add custom validations
  if (hasProhibitedContent(trimmed)) {
    return { valid: false, error: 'Prohibited content' };
  }
  
  return { valid: true };
}
```

## Tool Configuration

### Enabling Tools

In `app/api/chat/route.ts`, uncomment:
```typescript
const result = streamText({
  // ... other config
  tools,           // Enable tools
  maxSteps: 5,     // Max tool calls
});
```

### Adding Real APIs

**Weather Tool Example:**
```typescript
export const weatherTool = tool({
  description: 'Get the current weather for a given city',
  parameters: z.object({
    city: z.string().describe('The city to get weather for'),
  }),
  execute: async ({ city }) => {
    // Replace with real API call
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    return response.json();
  },
});
```

### Custom Tools

```typescript
export const customTool = tool({
  description: 'What this tool does',
  parameters: z.object({
    param1: z.string().describe('Description of param1'),
    param2: z.number().describe('Description of param2'),
  }),
  execute: async ({ param1, param2 }) => {
    // Your logic here
    return { result: 'data' };
  },
});
```

## Component Customization

### ChatMessage Component

Modify styling in `app/components/ChatMessage.tsx`:
```tsx
<div className={`
  max-w-[65%] 
  px-4 py-3 
  rounded-2xl 
  ${isUser 
    ? 'bg-blue-500 text-white' 
    : 'bg-gray-200 text-gray-900'
  }
`}>
```

### MessageList Component

Customize empty state:
```tsx
if (messages.length === 0) {
  return (
    <div className="custom-empty-state">
      {/* Your custom content */}
    </div>
  );
}
```

### ChatInput Component

Adjust textarea height:
```tsx
style={{
  minHeight: '44px',      // Min height when empty
  maxHeight: '120px',     // Max height before scrolling
  overflow: input.split('\n').length > 2 ? 'auto' : 'hidden',
}}
```

## Performance Tuning

### Debounce Input Changes
```typescript
const [debouncedInput, setDebouncedInput] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedInput(input);
  }, 300);
  
  return () => clearTimeout(timer);
}, [input]);
```

### Lazy Load Components
```typescript
import dynamic from 'next/dynamic';

const ChatMessage = dynamic(() => import('./ChatMessage'), {
  loading: () => <div>Loading...</div>,
});
```

## Browser Compatibility

Check browser support in `app/globals.css`:
```css
/* CSS Grid fallback */
@supports not (display: grid) {
  /* Fallback styles */
}
```

## Testing Configuration

### Message Validation Tests
```typescript
test('validates message length', () => {
  const result = validateMessage('a'.repeat(5001));
  expect(result.valid).toBe(false);
});

test('sanitizes HTML', () => {
  const result = sanitizeMessage('<script>alert("xss")</script>');
  expect(result).not.toContain('<script>');
});
```

### Auto-Reply Tests
```typescript
test('detects greeting', () => {
  const reply = detectAutoReply('hello');
  expect(reply?.enabled).toBe(true);
});
```

## Debugging

### Enable Verbose Logging

In `app/api/chat/route.ts`:
```typescript
console.log('Request received:', { messages, timestamp: new Date() });
console.log('Response streaming started');
```

### Debug Auto-Replies

In `app/page.tsx`:
```typescript
const autoReply = detectAutoReply(userMessage);
console.log('Auto-reply detected:', autoReply);
```

### Browser DevTools
- Use Network tab to inspect API calls
- Use Console for JavaScript errors
- Use Application tab for localStorage debugging

## Performance Metrics

### Recommended Limits
- Message character limit: 5,000
- Max API response: 2,048 tokens
- Auto-reply max length: 100 characters
- Message history: Keep recent 50 messages

### Optimization Tips
1. Use React.memo for expensive components
2. Implement virtual scrolling for long message lists
3. Cache API responses when appropriate
4. Lazy load images and heavy components
5. Minify CSS and JavaScript

## Disaster Recovery

### Clear Data
```typescript
// Clear all messages
localStorage.clear();
window.location.reload();
```

### Reset to Defaults
```typescript
// Delete .env.local and restart
npm run dev
```

## Production Deployment

### Environment Variables (Production)
```env
GOOGLE_GENERATIVE_AI_API_KEY=your-production-key
NODE_ENV=production
```

### Build
```bash
npm run build
npm start
```

### Monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Track user interactions with analytics

---

For more information, refer to the main [README.md](./README.md)

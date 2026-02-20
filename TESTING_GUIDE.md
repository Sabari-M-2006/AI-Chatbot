# Usage Examples & Testing Guide

## 🚀 Quick Start Examples

### 1. Auto-Reply Triggers

These messages will trigger instant auto-replies:

#### Greetings
```
User: "hi"
Bot: "👋 Hello! How can I assist you today?"

User: "hey there"
Bot: "👋 Hello! How can I assist you today?"

User: "hello"
Bot: "👋 Hello! How can I assist you today?"
```

#### How Are You?
```
User: "how are you?"
Bot: "I'm doing great! Thanks for asking. How can I help you?"

User: "how's it going?"
Bot: "I'm doing great! Thanks for asking. How can I help you?"

User: "what's up?"
Bot: "I'm doing great! Thanks for asking. How can I help you?"
```

#### Gratitude
```
User: "thanks"
Bot: "You're welcome! Happy to help. Is there anything else you need?"

User: "thank you"
Bot: "You're welcome! Happy to help. Is there anything else you need?"

User: "appreciate it"
Bot: "You're welcome! Happy to help. Is there anything else you need?"
```

#### Goodbyes
```
User: "bye"
Bot: "Goodbye! Feel free to come back anytime. Have a great day! 👋"

User: "goodbye"
Bot: "Goodbye! Feel free to come back anytime. Have a great day! 👋"

User: "see you"
Bot: "Goodbye! Feel free to come back anytime. Have a great day! 👋"
```

#### Identity Questions
```
User: "what's your name?"
Bot: "I'm your AI Assistant, powered by Google Gemini. I'm here to help with questions, writing, coding, analysis, and much more!"

User: "who are you?"
Bot: "I'm your AI Assistant, powered by Google Gemini. I'm here to help with questions, writing, coding, analysis, and much more!"
```

#### Capability Questions
```
User: "what can you do?"
Bot: "I can assist you with:\n• Answering questions on various topics\n• Writing and editing content\n• Code explanations and debugging\n• Problem analysis\n• Creative tasks\n• And much more!\n\nJust ask me anything!"

User: "help"
Bot: [Same as above]

User: "capabilities"
Bot: [Same as above]
```

#### Agreement/Disagreement
```
User: "ok"
Bot: "Great! What would you like to know?"

User: "yes"
Bot: "Awesome! Go ahead and ask your question."

User: "no"
Bot: "No problem! Feel free to ask if you need anything else."

User: "nope"
Bot: "No problem! Feel free to ask if you need anything else."
```

### 2. Regular AI Responses

These will trigger the full Gemini AI model:

```
User: "How do I learn programming?"
Bot: [Detailed streaming response from AI]

User: "Explain quantum computing"
Bot: [Detailed streaming response from AI]

User: "Write me a poem about coding"
Bot: [Full AI-generated poem]

User: "Debug this code: function foo() { return bar; }"
Bot: [Code analysis and suggestions]
```

### 3. Quick Prompts

Click these suggestion buttons on the home screen:

- **💡 Explain this concept** - Use for explaining complex topics
- **✍️ Help me write** - For writing assistance
- **🐛 Debug this code** - For code debugging
- **📝 Summarize this** - For summarizing content

Click any to automatically populate the input field.

## 🧪 Testing Scenarios

### Scenario 1: First-Time User
```
1. Visit http://localhost:3000
2. See welcome screen with 4 suggestion cards
3. Click "Explain this concept"
4. Input populates with "Explain this concept"
5. Press Enter or click Send
6. Chat flows normally
```

### Scenario 2: Quick Interaction
```
1. Type "Hi"
2. Press Enter
3. See instant auto-reply: "👋 Hello! How can I assist you today?"
4. Type a follow-up question
5. See full AI response stream
```

### Scenario 3: Multi-line Message
```
1. Start typing: "This is line 1"
2. Press Shift+Enter
3. Type: "This is line 2"
4. Watch character counter increase
5. Press Shift+Enter multiple times
6. Textarea expands (up to 120px max)
7. Press Enter to send
```

### Scenario 4: Character Limit
```
1. Paste a very long text (5000+ characters)
2. Notice character counter in red at 4500+
3. Try to paste beyond 5000
4. Input stops accepting text
5. Delete some characters
6. Can type again
```

### Scenario 5: Error Handling
```
1. Disconnect internet
2. Try to send message
3. See error notification with icon
4. Error auto-dismisses after 5 seconds
5. Reconnect and try again
```

### Scenario 6: Dark Mode
```
1. Set system to dark mode
2. Refresh page
3. All UI appears dark
4. Colors remain readable
5. Scrollbar changes to light color
```

### Scenario 7: Mobile Experience
```
1. Open on mobile (or use DevTools mobile view)
2. See responsive layout
3. Quick prompts stack vertically
4. Message bubbles scale appropriately
5. Touch interactions work smoothly
6. Keyboard doesn't cover input
```

## 📊 Testing Checklist

### Functionality Tests
- [ ] Auto-reply triggers for greeting "hi"
- [ ] Auto-reply triggers for "thanks"
- [ ] Auto-reply triggers for "bye"
- [ ] Auto-reply triggers for "what can you do?"
- [ ] Regular question triggers Gemini AI
- [ ] Multi-line messages work with Shift+Enter
- [ ] Character counter updates correctly
- [ ] Error message displays and auto-dismisses
- [ ] Clear Chat button reloads page
- [ ] New Chat button works

### UI/UX Tests
- [ ] Welcome screen displays correctly
- [ ] Quick prompts populate input when clicked
- [ ] Message animations fade in smoothly
- [ ] Loading dots animate
- [ ] Send button changes state when loading
- [ ] Scrollbar is visible and styled
- [ ] Fonts are readable
- [ ] Colors have good contrast
- [ ] Icons display correctly (emoji)
- [ ] Buttons have hover effects

### Responsive Design Tests
- [ ] Works on 320px width (mobile)
- [ ] Works on 768px width (tablet)
- [ ] Works on 1920px width (desktop)
- [ ] Textarea doesn't overflow
- [ ] Messages don't stretch too wide
- [ ] Header adapts to screen size
- [ ] Touch targets are large enough (44px+)

### Performance Tests
- [ ] Initial page load is fast
- [ ] Message sending is responsive
- [ ] Scrolling is smooth
- [ ] Animations don't stutter
- [ ] No memory leaks (DevTools)
- [ ] Auto-replies are instant

### Browser Tests
- [ ] Chrome/Edge works
- [ ] Firefox works
- [ ] Safari works
- [ ] Mobile Safari works (iOS)
- [ ] Chrome Mobile works (Android)

### Accessibility Tests
- [ ] Tab navigation works
- [ ] Messages are screen-reader friendly
- [ ] Colors have sufficient contrast
- [ ] Focus indicators are visible
- [ ] Keyboard shortcuts work (Shift+Enter)

## 💻 Developer Testing

### Test Auto-Reply Detection

In browser console:
```javascript
// Import the function (if exposed)
import { detectAutoReply } from '@/app/lib/autoReply';

// Test various inputs
console.log(detectAutoReply('hi'));           // Should have enabled: true
console.log(detectAutoReply('hello there'));  // Should have enabled: true
console.log(detectAutoReply('thanks a lot')); // Should have enabled: true
console.log(detectAutoReply('How do I...'));  // Should have enabled: false
```

### Test Message Validation

```javascript
import { validateMessage } from '@/app/lib/messageUtils';

console.log(validateMessage(''));           // invalid
console.log(validateMessage('Hello'));      // valid
console.log(validateMessage('a'.repeat(5001))); // invalid (too long)
```

### Monitor Network Requests

1. Open DevTools (F12)
2. Go to Network tab
3. Send a message
4. See POST request to `/api/chat`
5. View request/response headers
6. Monitor response streaming

### Check Console Errors

1. Open DevTools
2. Go to Console tab
3. Look for any errors/warnings
4. Test error scenarios
5. Verify error handling works

## 🎯 Expected Behaviors

### Message Timing
- Auto-reply: < 1 second
- Regular AI response: 1-5 seconds depending on length
- Error notification: Displays immediately
- Auto-dismiss error: 5 seconds

### Animation Timing
- Message fade-in: 0.3 seconds
- Loading dots: Continuous bounce
- Button hover: 0.2 seconds
- Scrollbar transition: 0.2 seconds

### Limits & Constraints
- Max message length: 5,000 characters
- Max response tokens: 2,048
- Auto-reply triggers: Messages under 100 characters
- Max quick prompts: 4 displayed
- Conversation history: Last 50 messages

## 🔍 Debugging Tips

### Check Auto-Reply Logic
```typescript
// In app/page.tsx
const autoReply = detectAutoReply(userMessage);
console.log('Auto-reply:', autoReply); // Check if enabled
```

### Monitor API Calls
```typescript
// In app/api/chat/route.ts
console.log('Received messages:', messages);
console.log('Stream started');
```

### Test Validation
```typescript
const validation = validateMessage(input);
console.log('Validation result:', validation);
```

### Inspect UI State
```typescript
// Use React DevTools extension
// Check component state
// Monitor re-renders
```

## 📈 Performance Benchmarks

Aim for these metrics:

- **Load Time**: < 3 seconds
- **First Paint**: < 1.5 seconds
- **Time to Interactive**: < 2.5 seconds
- **Auto-reply Response**: < 100ms
- **API Response**: 1-5 seconds
- **Frame Rate**: 60 fps on animations
- **Bundle Size**: < 500KB (gzipped)

## 🚨 Known Limitations

1. Auto-replies only trigger on short messages (< 100 chars)
2. No message history persistence (use DB for production)
3. No user authentication (add for production)
4. Tools are disabled by default (uncomment to enable)
5. Mock data used for weather tool (use real API)

## 🔮 Future Enhancements

- [ ] Message export (PDF/TXT)
- [ ] Voice input/output
- [ ] Message reactions/rating
- [ ] Regenerate responses
- [ ] Message editing
- [ ] Search chat history
- [ ] Custom themes
- [ ] User profiles
- [ ] Conversation branching
- [ ] Real-time collaboration

---

For configuration details, see [CONFIGURATION.md](./CONFIGURATION.md)
For main documentation, see [README.md](./README.md)

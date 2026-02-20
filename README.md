# 🤖 AI Chatbot - Enhanced Version

A modern, feature-rich AI chatbot built with Next.js, React, and Google Gemini 2.0 with intelligent auto-reply, improved UI/UX, and enhanced methods.

## ✨ New Features

### 1. **Intelligent Auto-Reply System**
The chatbot automatically detects and replies to common greetings and simple messages:
- Greeting detection ("Hi", "Hello", "Hey")
- Gratitude responses ("Thanks", "Thank you", "Appreciate")
- Farewell messages ("Bye", "Goodbye", "See you")
- Help requests ("Help", "What can you do", "Capabilities")
- Yes/No responses

Smart detection only triggers for short messages (under 100 characters) to avoid interrupting complex questions.

**Files:**
- `app/lib/autoReply.ts` - Auto-reply detection logic
- `app/page.tsx` - Auto-reply integration in main chat component

### 2. **Enhanced Security & Validation**
- Message content validation with error handling
- HTML sanitization to prevent XSS attacks
- Character limit checks (5000 max)
- Request validation on API endpoint

**Files:**
- `app/lib/messageUtils.ts` - Message validation and utilities
- `app/api/chat/route.ts` - Enhanced request validation

### 3. **Improved UI/UX Design**

#### Message Display
- ✨ Fade-in animations for messages
- 🎨 Avatar for AI assistant
- 📝 Markdown-like text formatting with bold and code support
- 💬 Better visual distinction between user and assistant messages
- 🌈 Gradient backgrounds for enhanced aesthetics

#### Chat Interface
- 📌 Quick prompt suggestions
- 📊 Character counter
- ⌨️ Keyboard shortcuts guide
- 🎯 Loading state with animated dots
- 🔄 New Chat button for fresh conversations
- 💡 Helpful tips at the bottom

#### First Message Experience
- Large welcome emoji with animation
- 4 suggestion cards for common tasks
- Clear call-to-action text
- Professional presentation

#### Error Handling
- Styled error messages with icons
- Auto-dismissing notifications
- Clear error descriptions
- Development mode error details

### 4. **Enhanced API Methods**
- ✅ Comprehensive request validation
- 📋 Detailed error responses
- 🔒 Request sanitization
- 📈 Better response streaming
- 🛠️ CORS support
- 📝 Enhanced system prompt with better response guidelines

### 5. **Advanced Tool System**
Pre-built tools ready to be enabled:
- 🌤️ **Weather Tool** - Get current weather with temperature, condition, humidity
- 🧮 **Calculator Tool** - Perform mathematical calculations
- 🕐 **Timezone Tool** - Get time information for different timezones
- 📊 **Text Analysis Tool** - Analyze text statistics and complexity

**Files:**
- `app/api/chat/tools.ts` - Enhanced tool definitions

### 6. **Utility Functions**
```typescript
// Message utilities (app/lib/messageUtils.ts)
- validateMessage() - Validate message content
- formatMessageText() - Format with proper markdown
- extractCodeBlocks() - Extract code from messages
- truncateMessage() - Truncate long messages
- getMessageStats() - Get message statistics
- isQuestion() - Detect if message is a question
- sanitizeMessage() - Remove malicious content

// Auto-reply utilities (app/lib/autoReply.ts)
- detectAutoReply() - Detect auto-reply triggers
- formatResponseText() - Format response text
- shouldStreamResponse() - Determine response type
```

## 🎨 UI/UX Improvements

### Color Scheme
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **User Messages**: Blue gradient with white text
- **Assistant Messages**: Light gray/dark gray backgrounds
- **Accents**: Purple, blue, and gradient effects

### Typography
- Larger headers (20-24px)
- Better text hierarchy
- Improved contrast for accessibility
- Consistent font sizing

### Spacing
- Better padding and margins throughout
- Improved visual breathing room
- Consistent spacing system

### Animations
- Smooth fade-in for messages
- Bounce animation for welcome emoji
- Gradient loading dots
- Button hover effects with scale animations
- Active state button feedback

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly buttons
- Adjusted typography for mobile

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+
npm or yarn
API Key for Google Gemini
```

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env.local` file:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

### Running the Application
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       ├── route.ts          # Enhanced API endpoint
│   │       └── tools.ts          # Tool definitions
│   ├── components/
│   │   ├── ChatInput.tsx         # Input with quick prompts
│   │   ├── ChatMessage.tsx       # Enhanced message display
│   │   └── MessageList.tsx       # Improved message list
│   ├── lib/
│   │   ├── autoReply.ts         # Auto-reply detection
│   │   └── messageUtils.ts      # Message utilities
│   ├── globals.css              # Enhanced styling
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main chat page
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 🔧 Configuration

### Auto-Reply Patterns
Modify confidence thresholds in `app/lib/autoReply.ts`:
```typescript
const messagePatterns: MessagePattern[] = [
  {
    patterns: [/^(hi|hello|hey)$/i],
    reply: () => '👋 Hello! How can I assist you today?',
    confidence: 0.95, // Adjust this value (0-1)
  },
  // ... more patterns
];
```

### API Settings
Adjust in `app/api/chat/route.ts`:
- `temperature`: 0.7 (creativity/consistency balance)
- `maxTokens`: 2048 (response length limit)
- `topP`: 0.95 (diversity parameter)

## 🛠️ Enabling Tools

To enable tool calling, uncomment in `app/api/chat/route.ts`:

```typescript
const result = streamText({
  model: google('gemini-2.0-flash'),
  system: SYSTEM_PROMPT,
  messages: await convertToModelMessages(messages),
  
  tools,            // Enable tool calling
  maxSteps: 5,      // Allow multi-step tool use
  
  temperature: 0.7,
  maxTokens: 2048,
});
```

## 🎯 Next Steps / Enhancements

1. **Enable Tool Calling** - Uncomment tool configuration for AI to use tools
2. **Real Weather API** - Integrate OpenWeatherMap or WeatherAPI
3. **Database Integration** - Store chat history with Prisma
4. **User Authentication** - Add user accounts with NextAuth
5. **Custom Themes** - Implement theme switcher
6. **Export Chat** - Download conversations as PDF/TXT
7. **Voice Input/Output** - Add voice capabilities
8. **Message Search** - Search through chat history
9. **Regenerate Responses** - Retry message generation

## 🧪 Testing

### Manual Testing Checklist
- [ ] Send a greeting and verify auto-reply
- [ ] Send a complex question and verify AI response
- [ ] Test character counter at 4500+ characters
- [ ] Test quick prompt buttons
- [ ] Verify animations on message display
- [ ] Test on mobile devices
- [ ] Test dark mode
- [ ] Test keyboard shortcuts

## 📱 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Features
- Input sanitization
- XSS prevention
- Request validation
- Environment variable protection
- Safe mathematical expression evaluation

## 📊 Performance Optimizations
- Smooth scrolling
- Optimized animations
- Lazy loading (Next.js)
- Efficient re-renders
- Minimal bundle size

## 🌙 Dark Mode
Automatically supports system dark mode preference with smooth transitions.

## 📝 API Documentation

### POST `/api/chat`
Send a message and get a response.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, how are you?"
    }
  ]
}
```

**Response:** Stream of text data

## 🤝 Contributing
Feel free to customize and enhance the chatbot further!

## 📄 License
MIT License - Feel free to use this project as you wish.

## 💡 Tips & Tricks
1. Use Shift+Enter to create multi-line messages
2. Try saying "Hello" for an instant auto-reply
3. Ask "What can you do?" to learn about capabilities
4. The assistant supports markdown-like formatting
5. Question detection helps with prompt optimization

---

**Built with ❤️ using Next.js, React, TypeScript, and Google Gemini 2.0**

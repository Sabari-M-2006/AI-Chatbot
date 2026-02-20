"use client";

import { useState } from "react";
import type { UIMessage } from "ai";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

export default function Page() {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [input, setInput] = useState("");
  const [g, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: UIMessage = {
      id: String(Date.now()),
      role: "user",
      content: input.trim(),
    } as any;

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const text = await res.text();

      const assistantMessage: UIMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: text,
      } as any;

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} isLoading={isLoading} />
        <ChatInput input={input} setInput={setInput} onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </main>
  );
}

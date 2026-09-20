import React, { useEffect, useRef, useState } from 'react';
import { Bot, ChevronDown, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { aiAPI } from '../services/api.js';

const initialMessage = {
  role: 'model',
  content: "Hi, I'm the WeCare assistant. Ask me about our services, dentists, appointments, or how to use the website.",
};

const quickPrompts = [
  'What services do you offer?',
  'How do I book an appointment?',
  'What are your clinic hours?',
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  const submitMessage = async (event) => {
    event?.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    const userMessage = { role: 'user', content: trimmedMessage };
    const conversation = [...messages, userMessage];

    setMessages(conversation);
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const data = await aiAPI.chat(trimmedMessage, conversation.slice(0, -1));
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'model', content: data.answer },
      ]);
    } catch (requestError) {
      setError(requestError.message || 'The assistant is unavailable right now.');
    } finally {
      setIsLoading(false);
    }
  };

  const startPrompt = (prompt) => {
    setMessage(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-60 flex flex-col items-end gap-3">
      {isOpen && (
        <section
          className="flex h-[min(600px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-97.5 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 sm:w-97.5"
          aria-label="WeCare Clinic AI assistant"
        >
          <header className="shrink-0 bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">WeCare Assistant</p>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Online guidance</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
                title="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              I can help you find information about WeCare Clinic and the website.
            </p>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4" aria-live="polite">
            {messages.map((chatMessage, index) => (
              <div
                key={`${chatMessage.role}-${index}`}
                className={`flex ${chatMessage.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[87%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${chatMessage.role === 'user'
                    ? 'rounded-br-md bg-teal-600 text-white'
                    : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm whitespace-pre-line'
                    }`}
                >
                  {chatMessage.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-1">
                <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Try asking</p>
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => startPrompt(prompt)}
                    className="block w-full rounded-xl border border-teal-100 bg-white px-3 py-2 text-left text-xs font-semibold text-teal-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-500 shadow-sm">
                  <LoaderCircle className="h-4 w-4 animate-spin text-teal-600" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs leading-relaxed text-rose-700">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={submitMessage} className="shrink-0 border-t border-slate-200 bg-white p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
              <label htmlFor="assistant-message" className="sr-only">Message the WeCare assistant</label>
              <textarea
                ref={inputRef}
                id="assistant-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    submitMessage(event);
                  }
                }}
                placeholder="Ask a question..."
                rows={1}
                maxLength={2000}
                disabled={isLoading}
                className="max-h-24 min-h-10 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                aria-label="Send message"
                title="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="px-1 pt-2 text-[10px] text-slate-400">For urgent symptoms, contact emergency services or the clinic directly.</p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group flex items-center gap-2 rounded-full bg-teal-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition-all hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close WeCare assistant' : 'Open WeCare assistant'}
      >
        {isOpen ? <ChevronDown className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span>{isOpen ? 'Close' : 'Ask WeCare'}</span>
        {!isOpen && <Sparkles className="h-4 w-4 text-teal-200" />}
      </button>
    </div>
  );
};
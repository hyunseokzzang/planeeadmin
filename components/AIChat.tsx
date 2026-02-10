
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: 'Hello! I am your FocusFlow AI assistant. How can I help you manage your system today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrollingManual = useRef(false);

  // Scroll logic: Only auto-scroll if user is already at the bottom
  const scrollToBottom = useCallback((force = false) => {
    if (!scrollRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (force || (isAtBottom && !isUserScrollingManual.current)) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
      setShowNewMessageIndicator(false);
    } else {
      setShowNewMessageIndicator(true);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    
    if (isAtBottom) {
      setShowNewMessageIndicator(false);
      isUserScrollingManual.current = false;
    } else {
      // User is scrolling up
      isUserScrollingManual.current = true;
    }
  };

  const simulateAIResponse = (userMsg: string) => {
    setIsTyping(true);
    const newId = Date.now().toString();
    
    // Simulate streaming content
    const fullText = `I've analyzed the system logs based on your request: "${userMsg}". 
    Currently, user engagement is up by 15.4% compared to last week. 
    However, I noticed a slight spike in latency around the Asia-East nodes between 03:00 and 05:00 UTC. 
    Would you like me to optimize the load balancing rules or provide a detailed breakdown of the affected instances?`;
    
    let currentText = "";
    const words = fullText.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i < words.length) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant' && last.id === newId) {
            return [...prev.slice(0, -1), { ...last, content: currentText }];
          }
          return [...prev, { id: newId, role: 'assistant', content: currentText }];
        });
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 80);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Manual reset scroll state on explicit user send
    isUserScrollingManual.current = false;
    
    setTimeout(() => simulateAIResponse(userMsg.content), 500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] relative">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">AI Support System</h2>
        <p className="text-slate-500">Intelligent system insights and task automation.</p>
      </div>

      <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col overflow-hidden relative">
        {/* Messages List */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs ${
                  m.role === 'user' ? 'bg-indigo-600 text-white ml-3' : 'bg-slate-200 text-slate-600 mr-3'
                }`}>
                  {m.role === 'user' ? 'ME' : 'AI'}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-800'
                }`}>
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <span className="flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                </span>
                <span className="text-xs text-slate-400 font-medium">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* New Content Indicator - Demonstrates User Control over Flow */}
        {showNewMessageIndicator && (
          <button 
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl animate-bounce flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>New insights available</span>
          </button>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question or system command..."
              className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1.5 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <div className="mt-2 flex items-center space-x-4 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></span> AI Engine Online</span>
            <span>Secure Connection</span>
            <span>Context: System v4.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

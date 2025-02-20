import React, { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI learning assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'I understand you\'re interested in learning. Let me help guide you through your journey!'
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
        >
          <Bot size={24} />
        </button>
      )}

      {isOpen && (
        <div className="bg-gray-900 border-2 border-blue-500 rounded-lg w-80 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Bot className="text-blue-500" />
              <h3 className="font-semibold text-white">AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import { useState } from 'react';
import { FiMessageCircle, FiSend } from 'react-icons/fi';
import api from '../api/axios.js';

const initialMessages = [
  { role: 'assistant', text: 'Hello! Ask me about sales, inventory, or profit recommendations.' }
];

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: 'user', text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const response = await api.post('/ai/assistant', { prompt });
      setMessages((prev) => [...prev, { role: 'assistant', text: response.data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Unable to process the request. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[340px] max-w-full text-slate-900">
      <div className="flex justify-end">
        <button
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-lg hover:bg-emerald-600"
        >
          <FiMessageCircle />
          {open ? 'Close AI Assistant' : 'AI Assistant'}
        </button>
      </div>
      {open && (
        <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <div className="max-h-[340px] overflow-y-auto space-y-3 pb-3">
            {messages.map((message, index) => (
              <div key={index} className={`rounded-2xl p-3 ${message.role === 'assistant' ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100' : 'bg-primary text-white'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 border border-slate-200 bg-slate-50 px-4 py-2 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="Ask: What sold best today?"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <FiSend />
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

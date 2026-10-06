import { useCallback, useEffect, useRef, useState } from 'react';
import { sendAIMessage } from '../services/api.js';

export default function AIAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Anis's site assistant — ask me about his projects, skills, experience, or how to reach him."
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const send = useCallback(async () => {
    const question = input.trim();

    if (!question || loading) return;

    setInput('');
    setError('');

    setMessages((current) => [
      ...current,
      { role: 'user', text: question }
    ]);

    setLoading(true);

    try {
      const data = await sendAIMessage(question);

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: data.response || 'Sorry, I did not get a response.'
        }
      ]);
    } catch (err) {
      setError(
        err.message ||
        'Could not reach the AI backend.'
      );

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: "I couldn't reach the AI service right now. Please try again later."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <div className="fixed bottom-5 right-5 z-[200]">
      {open && (
        <div className="mb-3 w-[min(90vw,340px)] h-[420px] bg-card border border-line rounded-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line">
            <span className="font-mono text-xs text-sage">
              // ask about Anis
            </span>

            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-inkdim hover:text-brass text-lg leading-none"
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`agent-msg text-sm max-w-[85%] px-3 py-2 rounded-md ${
                  message.role === 'user'
                    ? 'self-end bg-brass text-[#16211d]'
                    : 'self-start bg-bg border border-line text-inkdim'
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="self-start bg-bg border border-line text-inkdim text-sm px-3 py-2 rounded-md flex gap-1">
                <span className="agent-dot">●</span>
                <span className="agent-dot">●</span>
                <span className="agent-dot">●</span>
              </div>
            )}

            {error && (
              <div className="text-xs text-brass italic">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2 p-3 border-t border-line"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 bg-bg border border-line rounded-sm px-3 py-2 text-sm text-ink focus:border-brass outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 rounded-sm text-sm font-medium bg-brass text-[#16211d] disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle AI agent"
        className="w-14 h-14 rounded-full bg-brass text-[#16211d] shadow-[0_14px_30px_-8px_rgba(0,0,0,0.6)] flex items-center justify-center text-2xl hover:-translate-y-0.5 transition-all"
      >
        {open ? '×' : '🤖'}
      </button>
    </div>
  );
}

import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { sendMessage } from '../services/api.js';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    setStatus('');
    setError('');

    if (!data.name || !data.email || !data.message) {
      setError('Please fill in every field.');
      return;
    }

    setLoading(true);

    try {
      await sendMessage(data);

      setStatus(
        `Thanks, ${data.name.split(' ')[0]} — your message was sent successfully.`
      );

      form.reset();
    } catch (err) {
      setError(
        err.message || 'Could not send your message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Reveal
      as="form"
      onSubmit={submit}
      className="flex flex-col gap-4.5"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-inkdim">
          Name
        </label>

        <input
          type="text"
          id="name"
          name="name"
          required
          className="bg-card border border-line rounded-sm px-3.5 py-3 text-ink focus:border-brass outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-inkdim">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          required
          className="bg-card border border-line rounded-sm px-3.5 py-3 text-ink focus:border-brass outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-inkdim">
          Message
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows="4"
          className="bg-card border border-line rounded-sm px-3.5 py-3 text-ink focus:border-brass outline-none transition-colors resize-y"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="self-start px-6 py-3 rounded-sm text-sm font-medium bg-brass text-[#16211d] hover:bg-[#eab96a] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send message'}
      </button>

      <p
        className="text-sm text-sage min-h-[1.2em]"
        role="status"
      >
        {status}
      </p>

      {error && (
        <p
          className="text-sm text-brass"
          role="alert"
        >
          {error}
        </p>
      )}
    </Reveal>
  );
}

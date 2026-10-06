import { useEffect, useState } from 'react';
import GitHubIcon from './icons/GitHubIcon.jsx';
import LinkedInIcon from './icons/LinkedInIcon.jsx';
import { GH_URL, LI_URL, NAV_ITEMS } from '../data/content.js';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/85 backdrop-blur-sm border-b border-line">
      <nav className="max-w-[1100px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between relative">
        <a href="#" className="font-display text-xl tracking-wide">
          Anis Elleuchy<span className="text-brass">.</span>
        </a>

        <ul className={`gap-2 ${open ? 'flex flex-col absolute top-full right-0 left-0 bg-bg border-b border-line p-2' : 'hidden md:flex'}`}>
          {NAV_ITEMS.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`nav-link block text-sm px-3.5 py-2 rounded-sm transition-colors ${active === n.id ? 'active' : 'text-inkdim hover:text-brass'}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={GH_URL} target="_blank" rel="noopener" aria-label="GitHub" className="icon-link">
            <GitHubIcon />
          </a>
          <a href={LI_URL} target="_blank" rel="noopener" aria-label="LinkedIn" className="icon-link">
            <LinkedInIcon />
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 border border-line rounded-sm text-ink text-base ml-1"
          >
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
}

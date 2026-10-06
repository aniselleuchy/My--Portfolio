import Reveal from './Reveal.jsx';
import ContactForm from './ContactForm.jsx';
import GitHubIcon from './icons/GitHubIcon.jsx';
import LinkedInIcon from './icons/LinkedInIcon.jsx';
import { GH_URL, LI_URL, EMAIL } from '../data/content.js';

export default function Contact() {
  return (
    <section className="relative z-10 py-16 sm:py-28 border-t border-line" id="contact">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] gap-14">
        <Reveal>
          <h2 className="font-display font-medium text-3xl mb-3.5">Let's talk</h2>
          <p className="text-inkdim max-w-[40ch] mb-6">
            Open to internships, collaborations, and interesting side projects. Usually replies within a day.
          </p>
          <ul className="flex flex-col gap-4">
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 text-sm hover:text-brass transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="M3.5 6.5 12 13l8.5-6.5" />
                </svg>
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={GH_URL} target="_blank" rel="noopener" className="flex items-center gap-2.5 text-sm hover:text-brass transition-colors">
                <GitHubIcon /> github.com/AnisElleuchy
              </a>
            </li>
            <li>
              <a href={LI_URL} target="_blank" rel="noopener" className="flex items-center gap-2.5 text-sm hover:text-brass transition-colors">
                <LinkedInIcon /> linkedin.com/in/anis-elleuchy
              </a>
            </li>
          </ul>
        </Reveal>
        <ContactForm />
      </div>
    </section>
  );
}

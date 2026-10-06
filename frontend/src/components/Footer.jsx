import GitHubIcon from './icons/GitHubIcon.jsx';
import LinkedInIcon from './icons/LinkedInIcon.jsx';
import { GH_URL, LI_URL } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-9">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 flex justify-between items-center flex-wrap gap-3 text-sm text-inkdim">
        <span>© {new Date().getFullYear()} Anis Elleuchy</span>
        <div className="flex items-center gap-4">
          <a href={GH_URL} target="_blank" rel="noopener" aria-label="GitHub" className="icon-link">
            <GitHubIcon size={17} />
          </a>
          <a href={LI_URL} target="_blank" rel="noopener" aria-label="LinkedIn" className="icon-link">
            <LinkedInIcon size={17} />
          </a>
        </div>
        <span>Built with React &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}

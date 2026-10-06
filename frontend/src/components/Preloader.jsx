import { useEffect, useState } from 'react';

const MIN_LOADER_TIME = 1100; // ms — keep the loading animation visible briefly

export default function Preloader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    document.body.classList.add('is-loading');
    const start = Date.now();

    const onLoad = () => {
      const wait = Math.max(0, MIN_LOADER_TIME - (Date.now() - start));
      setTimeout(() => {
        setHide(true);
        document.body.classList.remove('is-loading');
      }, wait);
    };

    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div id="preloader" className={`fixed inset-0 z-[9999] bg-bg flex items-center justify-center ${hide ? 'hide' : ''}`}>
      <div className="flex flex-col items-center gap-5 px-6">
        <div className="font-display text-2xl tracking-wide">
          Anis Elleuchy<span className="text-brass">.</span>
        </div>
        <div className="font-mono text-xs text-sage">
          $ starting up
          <span className="loader-dots"><span>.</span><span>.</span><span>.</span></span>
        </div>
        <div className="w-48 h-[3px] bg-line rounded-full overflow-hidden">
          <div className="h-full bg-brass loader-bar"></div>
        </div>
      </div>
    </div>
  );
}

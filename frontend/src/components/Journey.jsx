import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionIntro from './SectionIntro.jsx';
import { getExperience } from '../services/api.js';

function formatDate(value) {
  if (!value) return 'Present';

  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
}

function formatRange(start, end) {
  if (!start && !end) return 'Timeline';

  const from = start ? formatDate(start) : 'Start';
  const to = end ? formatDate(end) : 'Present';

  return `${from} — ${to}`;
}

export default function Journey() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getExperience()
      .then((data) => {
        if (active) setExperience(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Could not load experience.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative z-10 py-16 sm:py-28 border-t border-line" id="journey">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <SectionIntro
          title="Journey"
          text="How I got from first lines of code to where I am now."
        />

        {loading && (
          <div className="text-sm text-inkdim py-10">
            Loading experience...
          </div>
        )}

        {!loading && error && (
          <Reveal className="border border-line rounded-md p-6 bg-card">
            <div className="font-mono text-xs text-brass mb-2">// api error</div>
            <p className="text-inkdim">{error}</p>
          </Reveal>
        )}

        {!loading && !error && experience.length === 0 && (
          <Reveal className="border border-dashed border-line rounded-md p-8 text-center">
            <div className="font-mono text-xs text-sage mb-2">// no experience yet</div>
            <p className="text-inkdim">
              Add experience from the Admin Panel and it will appear here.
            </p>
          </Reveal>
        )}

        {!loading && !error && experience.length > 0 && (
          <div className="timeline pl-8">
            {experience.map((item, index) => (
              <Reveal
                as="div"
                key={item.id}
                className={`tl-item ${index < experience.length - 1 ? 'pb-11' : ''}`}
              >
                <div className="font-mono text-xs text-sage">
                  {formatRange(item.start_date, item.end_date)}
                </div>

                <h3 className="font-display text-xl font-medium mt-1.5 mb-1">
                  {item.position || 'Experience'}
                </h3>

                {item.company && (
                  <div className="text-inkdim text-sm mb-2.5">
                    {item.company}
                  </div>
                )}

                {item.description && (
                  <p className="text-inkdim max-w-[62ch]">
                    {item.description}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionIntro from './SectionIntro.jsx';
import { getSkills } from '../services/api.js';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getSkills()
      .then((data) => {
        if (active) setSkills(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Could not load skills.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const groups = useMemo(() => {
    const grouped = new Map();

    skills.forEach((skill) => {
      const category = skill.category || 'Other';

      if (!grouped.has(category)) {
        grouped.set(category, []);
      }

      grouped.get(category).push(skill);
    });

    return Array.from(grouped.entries()).map(([title, tags]) => ({
      title,
      tags
    }));
  }, [skills]);

  return (
    <section className="relative z-10 py-16 sm:py-28 border-t border-line" id="skills">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <SectionIntro
          title="Skills"
          text="The languages and tools I've picked up so far, grouped by where they sit in the stack."
        />

        {loading && (
          <div className="text-sm text-inkdim py-10">
            Loading skills...
          </div>
        )}

        {!loading && error && (
          <Reveal className="border border-line rounded-md p-6 bg-card">
            <div className="font-mono text-xs text-brass mb-2">// api error</div>
            <p className="text-inkdim">{error}</p>
          </Reveal>
        )}

        {!loading && !error && skills.length === 0 && (
          <Reveal className="border border-dashed border-line rounded-md p-8 text-center">
            <div className="font-mono text-xs text-sage mb-2">// no skills yet</div>
            <p className="text-inkdim">
              Add skills from the Admin Panel and they will appear here.
            </p>
          </Reveal>
        )}

        {!loading && !error && skills.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {groups.map((group) => (
              <Reveal
                key={group.title}
                className="bg-card border border-line rounded-md p-6"
              >
                <h3 className="font-mono text-[0.82rem] text-sage mb-4">
                  {group.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.tags.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-sm px-3 py-1.5 border border-line rounded-full text-inkdim"
                      title={
                        skill.level !== null && skill.level !== undefined
                          ? `Level: ${skill.level}%`
                          : undefined
                      }
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

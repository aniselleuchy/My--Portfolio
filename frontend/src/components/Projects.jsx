import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionIntro from './SectionIntro.jsx';
import { GH_URL } from '../data/content.js';
import { getProjects } from '../services/api.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getProjects()
      .then((data) => {
        if (active) setProjects(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (active) setError(err.message || 'Could not load projects.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative z-10 py-16 sm:py-28 border-t border-line" id="projects">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <SectionIntro
          title="Selected projects"
          text="A few things I've built recently, end to end."
        />

        {loading && (
          <div className="text-sm text-inkdim py-10">
            Loading projects...
          </div>
        )}

        {!loading && error && (
          <Reveal className="border border-line rounded-md p-6 bg-card">
            <div className="font-mono text-xs text-brass mb-2">// api error</div>
            <p className="text-inkdim">{error}</p>
          </Reveal>
        )}

        {!loading && !error && projects.length === 0 && (
          <Reveal className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-line rounded-md">
            <div className="font-mono text-xs text-sage mb-3">// no projects yet</div>
            <h3 className="font-display text-2xl font-medium mb-2">
              Projects coming soon
            </h3>
            <p className="text-inkdim max-w-[42ch]">
              Add projects from the Admin Panel and they will appear here automatically.
            </p>
            <a
              href={GH_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-sm text-sm font-medium border border-line text-ink hover:border-brassdim hover:-translate-y-0.5 transition-all"
            >
              Visit my GitHub
            </a>
          </Reveal>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {projects.map((project) => (
              <Reveal
                as="article"
                key={project.id}
                className="bg-card border border-line rounded-md overflow-hidden"
              >
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-52 object-cover border-b border-line"
                  />
                )}

                <div className="p-6">
                  <div className="font-mono text-xs text-sage mb-2">
                    // project
                  </div>

                  <h3 className="font-display text-2xl font-medium mb-2">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="text-inkdim text-sm leading-7">
                      {project.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-6">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-sm text-sm border border-line text-ink hover:border-brassdim hover:-translate-y-0.5 transition-all"
                      >
                        GitHub
                      </a>
                    )}

                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-sm text-sm bg-brass text-[#16211d] hover:bg-[#eab96a] hover:-translate-y-0.5 transition-all"
                      >
                        Live demo
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

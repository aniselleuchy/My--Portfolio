import Reveal from './Reveal.jsx';

export default function About() {
  return (
    <section className="relative z-10 py-16 sm:py-28 border-t border-line" id="about">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr] gap-10">
        <div>
          <h2 className="font-display font-medium text-3xl">About</h2>
        </div>
        <div>
          <p className="text-inkdim max-w-[62ch] mb-4">
            I'm a third-year student at Tambov State Technical University. My coursework and
            side projects have pushed me across a wide range of languages and tools — Python
            and C++ for fundamentals, Java and C# for structured backends, and React with
            TypeScript for the interfaces people actually touch.
          </p>
          <p className="text-inkdim max-w-[62ch]">
            Outside the classroom, I've built comfort with relational and in-memory data
            stores (MySQL, PostgreSQL, Redis) and containerized workflows with Docker. I also
            work daily across four languages — Arabic, English, French, and Russian.
          </p>
          <div className="flex gap-10 mt-9 flex-wrap">
            <Reveal>
              <b className="block font-display text-3xl text-brass">3rd</b>
              <span className="text-sm text-inkdim">year at TSTU</span>
            </Reveal>
            <Reveal>
              <b className="block font-display text-3xl text-brass">4</b>
              <span className="text-sm text-inkdim">languages spoken</span>
            </Reveal>
            <Reveal>
              <b className="block font-display text-3xl text-brass">10+</b>
              <span className="text-sm text-inkdim">technologies used</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

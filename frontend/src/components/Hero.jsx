export default function Hero() {
  return (
    <section className="relative z-10 min-h-[100svh] flex items-center pt-[72px]" id="home">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <div className="hero-anim d1 font-mono text-sm text-sage mb-4">// 3rd-year student · TSTU</div>
          <h1 className="hero-anim d2 font-display font-medium text-[clamp(2.4rem,5.2vw,4.1rem)] leading-[1.06]">
            I like software that works, in <em className="italic text-brass">whatever language</em> it's written.
          </h1>
          <p className="hero-anim d3 mt-5 max-w-[52ch] text-lg text-inkdim">
            I'm Anis Elleuchy — a third-year student at Tambov State Technical University.
            I build across the stack, from Java and C++ backends to React interfaces, and
            work comfortably in Arabic, English, French, and Russian.
          </p>
          <div className="hero-anim d4 mt-8 flex gap-3.5 flex-wrap">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium bg-brass text-[#16211d] hover:bg-[#eab96a] hover:-translate-y-0.5 transition-all">
              See my work
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium border border-line text-ink hover:border-brassdim hover:-translate-y-0.5 transition-all">
              Get in touch
            </a>
          </div>
        </div>

        <div className="code-panel hero-anim d5 bg-card border border-line rounded-lg overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] max-w-[480px] w-full mx-auto md:mx-0">
          <div className="flex gap-2.5 px-6 py-4 border-b border-line">
            <span className="w-3.5 h-3.5 rounded-full bg-[#3a534b]"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#3a534b]"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#3a534b]"></span>
          </div>
          <pre
            className="px-3 py-6 font-mono text-[0.92rem] leading-[1.9] text-inkdim overflow-x-auto"
            dangerouslySetInnerHTML={{
              __html:
                `<span class="k">const</span> student = {\n` +
                `  name: <span class="s">'Anis Elleuchy'</span>,\n` +
                `  university: <span class="s">'TSTU'</span>,\n` +
                `  year: 3,\n` +
                `  languages: [<span class="s">'AR'</span>, <span class="s">'EN'</span>, <span class="s">'FR'</span>, <span class="s">'RU'</span>],\n` +
                `  stack: [<span class="s">'Python'</span>, <span class="s">'Java'</span>, <span class="s">'React'</span>, <span class="s">'C++'</span>],\n` +
                `  <span class="c">// always learning</span>\n` +
                `  curious: <span class="k">true</span>\n` +
                `};`,
            }}
          />

        </div>
      </div>
    </section>
  );
}

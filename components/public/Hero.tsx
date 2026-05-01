interface HeroProps {
  name: string;
  tagline: string;
  bio: string;
}

export default function Hero({ name, tagline, bio }: HeroProps) {
  return (
    <section className="min-h-screen flex items-end pt-16">
      <div className="w-full border-t-2 border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <p className="text-xs tracking-widest uppercase text-zinc-400 mb-8">Portfolio</p>
              <h1 className="text-7xl font-bold tracking-tight text-zinc-900 leading-none mb-0">
                {name}
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="text-lg text-zinc-700 mb-3 font-normal">{tagline}</p>
              <p className="text-sm text-zinc-500 leading-relaxed mb-8 max-w-sm">{bio}</p>
              <a
                href="#work"
                className="inline-block border border-zinc-900 text-zinc-900 text-sm px-8 py-3 hover:bg-zinc-900 hover:text-white transition-colors duration-200"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

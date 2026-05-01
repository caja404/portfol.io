interface HeroProps {
  name: string;
  tagline: string;
  bio: string;
}

export default function Hero({ name, tagline, bio }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-6">Portfolio</p>
          <h1 className="text-6xl font-bold tracking-tight text-zinc-900 leading-none mb-6">
            {name}
          </h1>
          <p className="text-xl text-zinc-600 mb-4 font-light">{tagline}</p>
          <p className="text-base text-zinc-500 leading-relaxed mb-10 max-w-lg">{bio}</p>
          <a
            href="#work"
            className="inline-block border border-zinc-900 text-zinc-900 text-sm px-8 py-3 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
}

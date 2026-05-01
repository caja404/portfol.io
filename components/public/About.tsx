interface AboutProps {
  bio: string;
  email: string;
}

export default function About({ bio, email }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-zinc-300" />
          <h2 className="text-xs tracking-widest uppercase text-zinc-400">About</h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-zinc-700 leading-relaxed text-lg whitespace-pre-line mb-10">{bio}</p>
          <a
            href={`mailto:${email}`}
            className="text-sm text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
}

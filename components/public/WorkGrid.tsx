import { PortfolioItem } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface WorkGridProps {
  items: PortfolioItem[];
}

export default function WorkGrid({ items }: WorkGridProps) {
  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-zinc-300" />
          <h2 className="text-xs tracking-widest uppercase text-zinc-400">Work</h2>
        </div>
        {items.length === 0 ? (
          <p className="text-zinc-400 text-sm">No work items published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

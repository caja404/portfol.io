import { PortfolioItem } from '@/lib/types';
import ProjectCard from './ProjectCard';

interface WorkGridProps {
  items: PortfolioItem[];
}

export default function WorkGrid({ items }: WorkGridProps) {
  return (
    <section id="work" className="py-24" style={{ background: 'var(--cream)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-5 mb-16">
          <svg width="44" height="2" viewBox="0 0 44 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="44" y2="1" stroke="#C4603A" strokeWidth="1" strokeDasharray="5 3"/>
          </svg>
          <h2
            className="text-[0.58rem] tracking-[0.32em] uppercase"
            style={{ color: 'rgba(26,20,16,0.38)' }}
          >
            Selected Work
          </h2>
        </div>
        {items.length === 0 ? (
          <p className="text-sm" style={{ color: 'rgba(26,20,16,0.28)' }}>No work items published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {items.map((item, i) => (
              <ProjectCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">Contact Messages</h1>
      {!submissions || submissions.length === 0 ? (
        <p className="text-sm text-zinc-400">No messages yet.</p>
      ) : (
        <div className="border border-zinc-100 divide-y divide-zinc-50">
          {submissions.map((sub) => (
            <details key={sub.id} className="group">
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none hover:bg-zinc-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-zinc-900">{sub.name}</p>
                  <p className="text-xs text-zinc-400">{sub.email} &middot; {formatDate(sub.created_at)}</p>
                </div>
                <p className="text-xs text-zinc-400 max-w-xs truncate hidden md:block">{sub.message}</p>
                <span className="text-xs text-zinc-300 ml-4">expand</span>
              </summary>
              <div className="px-4 py-4 bg-zinc-50 border-t border-zinc-100">
                <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                <a
                  href={`mailto:${sub.email}`}
                  className="mt-3 inline-block text-xs text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
                >
                  Reply to {sub.email}
                </a>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

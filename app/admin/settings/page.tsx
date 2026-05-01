import { createClient } from '@/lib/supabase/server';
import SettingsForm from '@/components/admin/SettingsForm';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('*');

  const settings: Record<string, string> = {};
  for (const row of data || []) {
    settings[row.key] = row.value;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">Site Settings</h1>
      <SettingsForm initial={settings} />
    </div>
  );
}

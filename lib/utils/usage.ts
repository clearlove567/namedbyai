import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function recordUsage(userId: string, type: 'chinese' | 'english') {
  try {
    const { error } = await supabase
      .from('usage_records')
      .insert([
        {
          user_id: userId,
          type: type,
        },
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error recording usage:', error);
    return false;
  }
}

export async function checkDailyLimit(userId: string): Promise<boolean> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
      .from('usage_records')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .gte('used_at', today.toISOString());

    if (error) throw error;

    return (count || 0) < Number(process.env.NEXT_PUBLIC_DAILY_LIMIT);
  } catch (error) {
    console.error('Error checking daily limit:', error);
    return false;
  }
} 
import { Plan } from '@/types/plan';
import { createClient } from '@/utils/supabase/server';

export async function fetchPlanById(id: number): Promise<Plan | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('plan')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching plan:', error);
    return null;
  }

  return data as Plan;
}

export async function fetchPlanByProfileId(profileId: number): Promise<Plan | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profile')
    .select('plan_id')
    .eq('id', profileId)
    .single();

  if (error || !data?.plan_id) {
    console.error('Error fetching profile plan:', error);
    return null;
  }

  return fetchPlanById(data.plan_id);
} 
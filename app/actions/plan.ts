import { Plan } from '@/types/plan';
import { createClient } from '@/utils/supabase/server';
import { fetchProfileById } from '../(with-ui)/u/[slug]/actions';

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

  const profile = await fetchProfileById(profileId);
  return await fetchPlanById(profile?.data?.plan_id as number);
} 
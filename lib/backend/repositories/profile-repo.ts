import { supabaseAdmin } from "@/lib/supabase/server";
import { Profile } from "@/lib/supabase/types";

export class ProfileRepository {
  async findByUserId(userId: string): Promise<Profile | null> {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) return null;
    return data as Profile;
  }

  async update(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", userId)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to update profile: ${error?.message}`);
    }
    return data as Profile;
  }

  async upsert(profile: Partial<Profile> & { id: string }): Promise<Profile> {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert({ ...profile, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to upsert profile: ${error?.message}`);
    }
    return data as Profile;
  }
}

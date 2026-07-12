import { supabaseAdmin } from "@/lib/supabase/server";
import { GovernmentScheme } from "@/lib/supabase/types";

export class SchemeRepository {
  async findAll(): Promise<GovernmentScheme[]> {
    const { data, error } = await supabaseAdmin
      .from("government_schemes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to fetch schemes: ${error.message}`);
    return (data ?? []) as GovernmentScheme[];
  }

  async findByCategory(category: string): Promise<GovernmentScheme[]> {
    const { data, error } = await supabaseAdmin
      .from("government_schemes")
      .select("*")
      .ilike("category", category)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to fetch schemes by category: ${error.message}`);
    return (data ?? []) as GovernmentScheme[];
  }

  async findById(id: string): Promise<GovernmentScheme | null> {
    const { data, error } = await supabaseAdmin
      .from("government_schemes")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as GovernmentScheme;
  }
}

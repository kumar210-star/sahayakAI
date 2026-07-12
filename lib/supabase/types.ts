/**
 * TypeScript type definitions auto-derived from the Supabase schema.
 * Update these as the database schema evolves.
 */

export interface Profile {
  id: string;
  full_name: string;
  mobile_number: string | null;
  email: string;
  aadhaar_hash: string | null;
  state: string | null;
  district: string | null;
  occupation: string | null;
  annual_income: string | null;
  education: string | null;
  family_details: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  category: string;
  authority: string;
  summary: string;
  eligibility_criteria: Record<string, unknown>;
  documents_required: string[];
  created_at: string;
  updated_at: string;
}

export interface SavedScheme {
  id: string;
  profile_id: string;
  scheme_id: string;
  eligibility_score: number;
  created_at: string;
  government_schemes?: GovernmentScheme; // Joined relation
}

export interface Notification {
  id: string;
  profile_id: string;
  category: string;
  title: string;
  message: string;
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

export type ApplicationStatus = "draft" | "submitted" | "under-review" | "approved" | "rejected";

export interface Application {
  id: string;
  profile_id: string;
  scheme_id: string;
  application_number: string;
  status: ApplicationStatus;
  current_step: number;
  step_details: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  government_schemes?: GovernmentScheme; // Joined relation
}

export type DocumentVerificationStatus = "pending" | "verified" | "rejected";

export interface Document {
  id: string;
  profile_id: string;
  application_id: string | null;
  name: string;
  file_path: string;
  file_type: string;
  verification_status: DocumentVerificationStatus;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  profile_id: string;
  role: ChatRole;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

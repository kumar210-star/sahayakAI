export interface SavedSchemeItem {
  id: string;
  name: string;
  category: "Education" | "Agriculture" | "Housing" | "Business" | "Health" | "Social Welfare";
  authority: string;
  eligibilityScore: number; // percentage (0-100)
  dateSaved: string; // formatted date (e.g. "2026-07-10")
  summary: string;
  requirements: string[];
}

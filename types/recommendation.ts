export interface SchemeRecommendation {
  id: string;
  name: string;
  category: string;
  authority: string;
  description: string;
  score: number;
  benefit: string;
  whyEligible: string[];
  documents: string[];
  applyUrl: string;
}

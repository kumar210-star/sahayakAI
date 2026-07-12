import { SchemeRepository, SchemeEntity } from "../repositories/scheme-repo";

export class SchemeService {
  private schemeRepo: SchemeRepository;

  constructor() {
    this.schemeRepo = new SchemeRepository();
  }

  async getAllAvailableSchemes(): Promise<SchemeEntity[]> {
    return this.schemeRepo.findAll();
  }

  async getRecommendedSchemes(profileIncome: string, categoryFilter = "all"): Promise<SchemeEntity[]> {
    const all = await this.schemeRepo.findAll();
    
    // Simple mock eligibility matching scoring logic:
    return all
      .filter((s) => categoryFilter === "all" || s.category.toLowerCase() === categoryFilter.toLowerCase())
      .map((s) => {
        // Dynamic scoring rule matches
        let score = s.eligibilityScore;
        if (profileIncome.includes("₹18L") && s.id === "rec-pmawy") {
          score = 45; // lower match for high income
        }
        return {
          ...s,
          eligibilityScore: score,
        };
      });
  }
}

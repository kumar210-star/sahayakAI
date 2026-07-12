import { GovernmentScheme } from "@/lib/supabase/types";
import { SchemeRepository } from "../repositories/scheme-repo";

export class SchemeService {
  private schemeRepo: SchemeRepository;

  constructor() {
    this.schemeRepo = new SchemeRepository();
  }

  async getAllAvailableSchemes(): Promise<GovernmentScheme[]> {
    return this.schemeRepo.findAll();
  }

  async getRecommendedSchemes(
    income: string,
    categoryFilter = "all"
  ): Promise<GovernmentScheme[]> {
    if (categoryFilter !== "all") {
      return this.schemeRepo.findByCategory(categoryFilter);
    }
    return this.schemeRepo.findAll();
  }
}

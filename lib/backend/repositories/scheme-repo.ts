export interface SchemeEntity {
  id: string;
  name: string;
  category: string;
  authority: string;
  eligibilityScore: number;
  summary: string;
  requirements: string[];
}

const mockSchemesDb: SchemeEntity[] = [
  {
    id: "rec-kisan",
    name: "PM-Kisan Samman Nidhi",
    category: "Agriculture",
    authority: "Ministry of Agriculture & Farmers Welfare",
    eligibilityScore: 92,
    summary: "Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    requirements: ["Small or marginal landholding", "Aadhaar-seeded bank account", "Land registration documents"],
  },
  {
    id: "rec-pmawy",
    name: "PM Awas Yojana (Urban)",
    category: "Housing",
    authority: "Ministry of Housing and Urban Affairs",
    eligibilityScore: 88,
    summary: "Interest subsidy and financial assistance to build or purchase houses for EWS, LIG, and MIG categories.",
    requirements: ["Household annual income below ₹18L", "No pucca house registered in India", "Aadhaar card"],
  },
  {
    id: "rec-postmatric",
    name: "Post-Matric Scholarship Scheme",
    category: "Education",
    authority: "Ministry of Social Justice & Empowerment",
    eligibilityScore: 95,
    summary: "Financial support for post-matriculation courses to students belonging to scheduled categories.",
    requirements: ["Student must belong to SC/ST/OBC categories", "Annual family income under ₹2.5L", "Passing marks certificate"],
  },
];

export class SchemeRepository {
  async findAll(): Promise<SchemeEntity[]> {
    return [...mockSchemesDb];
  }

  async findByCategory(category: string): Promise<SchemeEntity[]> {
    return mockSchemesDb.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }

  async findById(id: string): Promise<SchemeEntity | null> {
    const scheme = mockSchemesDb.find((s) => s.id === id);
    return scheme ? { ...scheme } : null;
  }
}

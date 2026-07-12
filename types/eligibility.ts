export interface UserProfile {
  language: string;
  ageGroup: string;
  gender: string;
  state: string;
  income: string;
  occupation: string;
  education: string;
  category: string;
  businessType?: string;
}

export interface ChatMessage {
  id: string;
  role: "ai" | "user";
  text: string;
}

export interface EligibilityStep {
  field: keyof UserProfile;
  question: string;
  chips: string[];
  skipIf?: (answers: Partial<UserProfile>) => boolean;
  skipValue?: string;
}

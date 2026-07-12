export interface ApplicationStatus {
  id: string;
  schemeName: string;
  currentStep: number;
  steps: string[];
  lastUpdated: string;
}

export interface UserNotification {
  id: string;
  type: "success" | "warning" | "info";
  message: string;
  timestamp: string;
}

export interface SearchLog {
  id: string;
  query: string;
  timestamp: string;
}

export interface EligibilityLog {
  id: string;
  timestamp: string;
  matchesCount: number;
  profileSummary: string;
}

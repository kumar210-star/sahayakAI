export interface TrackerStage {
  name: "Profile Completed" | "Documents Uploaded" | "Application Submitted" | "Under Review" | "Approved";
  status: "completed" | "in-progress" | "pending";
  date?: string;
  notes: string;
}

export interface ApplicationTrackerItem {
  id: string;
  schemeName: string;
  applicationId: string;
  category: string;
  dateApplied: string;
  overallProgress: number; // percentage (0-100)
  stages: TrackerStage[];
}

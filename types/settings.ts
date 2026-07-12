export interface UserSettings {
  theme: "light" | "dark" | "system";
  language: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
  whatsappAlerts: boolean;
  twoFactorAuth: boolean;
  dataSharing: boolean;
  highContrast: boolean;
  fontSize: "small" | "medium" | "large";
  googleConnected: boolean;
  githubConnected: boolean;
}

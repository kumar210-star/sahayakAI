export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "recommendation" | "scheme" | "status" | "deadline" | "document" | "announcement";
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

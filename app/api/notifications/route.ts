import { NextRequest } from "next/server";
import { withErrorHandler } from "@/lib/backend/middleware/error-handler";
import { authenticateRequest } from "@/lib/backend/middleware/auth-middleware";
import { ApiResponse } from "@/lib/backend/utils/response";

// Mock database for notifications
let mockNotifications = [
  {
    id: "notif-1",
    category: "recommendation",
    title: "New AI Recommendation",
    message: "Based on your updated annual income profile and student status, you qualify for the Post-Matric Scholarship Scheme. Click to review qualifications.",
    timestamp: "2 hours ago",
    isRead: false,
    actionUrl: "/eligibility",
  },
  {
    id: "notif-2",
    category: "scheme",
    title: "New Government Scheme Launched",
    message: "Central Government introduces 'PM Surya Ghar: Muft Bijli Yojana' providing up to ₹78,000 subsidy for rooftop solar.",
    timestamp: "1 day ago",
    isRead: false,
    actionUrl: "/saved",
  },
];

export const GET = withErrorHandler(async (req: NextRequest) => {
  await authenticateRequest(req);
  return ApiResponse.success(mockNotifications);
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  await authenticateRequest(req);
  const body = await req.json();
  const { id } = body;

  mockNotifications = mockNotifications.map((n) =>
    n.id === id ? { ...n, isRead: true } : n
  );

  return ApiResponse.success({ message: "Notification marked as read successfully." });
});

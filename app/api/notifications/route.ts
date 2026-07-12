import { NextRequest } from "next/server";
import { withErrorHandler } from "@/lib/backend/middleware/error-handler";
import { authenticateRequest } from "@/lib/backend/middleware/auth-middleware";
import { ApiResponse } from "@/lib/backend/utils/response";
import { supabaseAdmin } from "@/lib/supabase/server";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const user = await authenticateRequest(req);

  const { data, error } = await supabaseAdmin
    .from("notifications")
    .select("*")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch notifications: ${error.message}`);
  return ApiResponse.success(data ?? []);
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const user = await authenticateRequest(req);
  const body = await req.json();
  const { id } = body;

  const { error } = await supabaseAdmin
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id)
    .eq("profile_id", user.id);

  if (error) throw new Error(`Failed to update notification: ${error.message}`);
  return ApiResponse.success({ message: "Notification marked as read." });
});

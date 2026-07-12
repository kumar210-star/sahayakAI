import { NextRequest } from "next/server";
import { withErrorHandler } from "@/lib/backend/middleware/error-handler";
import { authenticateRequest } from "@/lib/backend/middleware/auth-middleware";
import { profileUpdateSchema } from "@/lib/backend/validators/profile-val";
import { ProfileService } from "@/lib/backend/services/profile-service";
import { ApiResponse } from "@/lib/backend/utils/response";

const profileService = new ProfileService();

export const GET = withErrorHandler(async (req: NextRequest) => {
  // Validate token
  const user = await authenticateRequest(req);

  const profile = await profileService.getUserProfile(user.id);
  return ApiResponse.success(profile);
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  // Validate token
  const user = await authenticateRequest(req);

  const body = await req.json();
  const parsed = profileUpdateSchema.parse(body);

  const updated = await profileService.updateProfile(user.id, parsed);
  return ApiResponse.success(updated);
});

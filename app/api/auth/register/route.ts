import { NextRequest } from "next/server";
import { withErrorHandler } from "@/lib/backend/middleware/error-handler";
import { registerSchema } from "@/lib/backend/validators/auth-val";
import { ApiResponse } from "@/lib/backend/utils/response";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  
  // Validate input parameters
  const parsed = registerSchema.parse(body);

  return ApiResponse.success({
    message: "Registration completed successfully.",
    user: {
      id: "user-123-mock",
      fullName: parsed.fullName,
      email: parsed.email,
      mobileNumber: parsed.mobileNumber,
    },
  });
});

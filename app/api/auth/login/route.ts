import { NextRequest } from "next/server";
import { withErrorHandler } from "@/lib/backend/middleware/error-handler";
import { loginSchema } from "@/lib/backend/validators/auth-val";
import { ApiResponse } from "@/lib/backend/utils/response";
import { BadRequestError } from "@/lib/backend/errors/app-error";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();
  
  // Validate input parameters
  const parsed = loginSchema.parse(body);

  if (parsed.email === "error@email.com") {
    throw new BadRequestError("Invalid login credentials provided.");
  }

  // Simulated JWT output
  const token = "mock-jwt-session-token-string";

  return ApiResponse.success({
    token,
    user: {
      id: "user-123-mock",
      email: parsed.email,
      name: "Rajesh Kumar",
    },
  });
});

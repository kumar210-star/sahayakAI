import { NextRequest } from "next/server";
import { withErrorHandler } from "@/lib/backend/middleware/error-handler";
import { SchemeService } from "@/lib/backend/services/scheme-service";
import { ApiResponse } from "@/lib/backend/utils/response";

const schemeService = new SchemeService();

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "all";
  const income = searchParams.get("income") || "all";

  const schemes = await schemeService.getRecommendedSchemes(income, category);
  return ApiResponse.success(schemes);
});

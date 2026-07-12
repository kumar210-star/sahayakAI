import { NextRequest } from "next/server";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error";
import { ApiResponse } from "../utils/response";

type ApiHandler = (req: NextRequest, context?: unknown) => Promise<Response> | Response;

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, context?: unknown) => {
    try {
      return await handler(req, context);
    } catch (error: unknown) {
      // 1. Zod schema validation errors
      if (error instanceof ZodError) {
        const firstErrMessage = error.issues[0]?.message || "Invalid payload parameters";
        return ApiResponse.error(firstErrMessage, 400);
      }

      // 2. Custom AppErrors (BadRequest, Unauthorized, NotFound, etc.)
      if (error instanceof AppError) {
        return ApiResponse.error(error.message, error.statusCode);
      }

      // 3. Generic unhandled server crashes
      console.error("Unhandled API Server Exception:", error);
      return ApiResponse.error("Internal Server Error", 500);
    }
  };
}

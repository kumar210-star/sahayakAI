import { NextRequest } from "next/server";
import { UnauthorizedError } from "../errors/app-error";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: "user" | "admin";
}

/**
 * Authentication Middleware Hook (Placeholder signature)
 * In production, this validates JWT signatures, parses user credentials,
 * and attaches metadata.
 */
export async function authenticateRequest(req: NextRequest): Promise<AuthenticatedUser> {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // For mockup testing, if no header is present, we can either raise or return a mock user.
    // Let's implement simulated authorization based on header presence to keep it operational:
    throw new UnauthorizedError("Authentication token is missing or malformed.");
  }

  const token = authHeader.split(" ")[1];

  if (token === "invalid-mock-token") {
    throw new UnauthorizedError("Provided authorization token is expired or invalid.");
  }

  // Simulated valid decoded user
  return {
    id: "user-123-mock",
    email: "rajesh.kumar@email.com",
    role: "user",
  };
}

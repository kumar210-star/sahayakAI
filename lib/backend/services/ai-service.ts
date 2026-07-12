import { SchemeEntity } from "../repositories/scheme-repo";

export class AiService {
  private apiKey: string;
  private endpoint: string;

  constructor() {
    this.apiKey = process.env.AI_API_KEY || "";
    this.endpoint = process.env.AI_ENDPOINT || "";
  }

  /**
   * Mock prompt request adapter to Google Gemini.
   * Scalable structure prepared for future direct integration.
   */
  async generateGuidedRecommendations(
    profileSummary: string,
    availableSchemes: SchemeEntity[]
  ): Promise<string> {
    if (!this.apiKey || this.apiKey === "mock_google_gemini_api_key_placeholder") {
      // Return simulated AI evaluation payload
      const matched = availableSchemes
        .slice(0, 2)
        .map((s) => s.name)
        .join(" and ");
      return `[AI Evaluation]: Rajesh's profile summary shows compatibility with rural agricultural structures. We recommend applying to ${matched} due to matching criteria.`;
    }

    try {
      // In production:
      // const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ contents: [{ parts: [{ text: `Analyze profile ${profileSummary} against schemes...` }] }] })
      // });
      // const data = await response.json();
      // return data.candidates[0].content.parts[0].text;
      
      return "Direct Gemini response parsing payload placeholder";
    } catch (e) {
      console.error("AI pipeline connection failed:", e);
      return "AI analysis offline. Standard matching index will remain active.";
    }
  }
}

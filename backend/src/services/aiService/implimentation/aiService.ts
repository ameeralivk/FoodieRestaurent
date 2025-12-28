import { IAIService } from "../interface/IAiService";
import openai from "../../../config/opneAi";

export class AIService implements IAIService {
  async getReply(prompt: string): Promise<string> {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return response.output_text ?? "No response generated";
  }
}
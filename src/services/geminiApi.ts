
interface GeminiRequestOptions {
  prompt: string;
  length: string;
  outputFormat: string;
  focusArea: string;
  apiKey: string;
}

export const enhancePrompt = async ({
  prompt,
  length,
  outputFormat,
  focusArea,
  apiKey
}: GeminiRequestOptions): Promise<string> => {
  try {
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent";
    
    // Build system prompt based on user preferences
    let detailLevel = "";
    switch (length) {
      case "short":
        detailLevel = "concise and to-the-point";
        break;
      case "medium":
        detailLevel = "moderately detailed";
        break;
      case "detailed":
        detailLevel = "highly detailed and comprehensive";
        break;
      default:
        detailLevel = "moderately detailed";
    }
    
    let formatInstruction = "";
    switch (outputFormat) {
      case "markdown":
        formatInstruction = "Format the output using Markdown with appropriate headers, lists, and formatting.";
        break;
      case "plain":
        formatInstruction = "Format the output as plain text without any special formatting.";
        break;
      case "structured":
        formatInstruction = "Format the output as a structured list with clear sections, numbered items, and hierarchical organization.";
        break;
      default:
        formatInstruction = "Format the output using Markdown.";
    }
    
    let focusInstruction = "";
    switch (focusArea) {
      case "clarity":
        focusInstruction = "Focus on clarity and straightforward communication.";
        break;
      case "creativity":
        focusInstruction = "Emphasize creativity and innovative thinking.";
        break;
      case "technical":
        focusInstruction = "Prioritize technical accuracy and precision.";
        break;
      case "persuasive":
        focusInstruction = "Use persuasive language and compelling arguments.";
        break;
      default:
        focusInstruction = "Balance clarity with creativity.";
    }
    
    const systemPrompt = `
You are Promgine, an advanced prompt engineering assistant. Your task is to transform user-provided raw prompts into ${detailLevel} enhanced prompts that will produce better results when used with AI models.

${formatInstruction}

${focusInstruction}

Include relevant details, context, and specific instructions in the enhanced prompt. Make it clear, specific, and actionable.

Structure the enhanced prompt with:
1. A clear objective statement
2. Detailed context and background
3. Specific requirements and constraints
4. Format specifications for the desired output
5. Examples or references where appropriate
6. Additional instructions or preferences

The enhanced prompt should be comprehensive yet focused, providing just the right amount of detail and direction.
`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `SYSTEM: ${systemPrompt}\n\nRAW PROMPT: ${prompt}\n\nPlease transform this raw prompt into an enhanced, well-structured prompt.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("API Error:", data);
      throw new Error(data.error?.message || "Error calling Gemini API");
    }

    // Extract and return the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return generatedText;
    
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
};

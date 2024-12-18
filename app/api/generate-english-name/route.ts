import { NextResponse } from "next/server";
import { callOpenRouter } from "@/lib/utils/openai";
import { generateEnglishNamePrompt } from "@/lib/prompts/englishNamePrompt";

interface NameResponse {
  name: string;
  meaning: string;
  cultural_notes: string;
  score: number;
}

interface ParsedResponse {
  names: NameResponse[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = generateEnglishNamePrompt(body);

    const completion = await callOpenRouter([
      { role: "user", content: prompt }
    ]);

    let response = completion.choices?.[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenRouter");
    }

    // 清理和规范化 JSON 字符串
    response = response
      .replace(/[\u0000-\u001F]+/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\\/g, '')
      .replace(/\s+([,\]}])/g, '$1')
      .replace(/([{[,])\s+/g, '$1')
      .trim();

    try {
      const parsedResponse = JSON.parse(response) as ParsedResponse;
      
      if (!parsedResponse.names || !Array.isArray(parsedResponse.names)) {
        throw new Error("Invalid response structure");
      }

      const names = parsedResponse.names.map(name => ({
        name: String(name.name || '').trim(),
        meaning: String(name.meaning || '').trim(),
        cultural_notes: String(name.cultural_notes || '').trim(),
        score: Number(name.score) || 0
      }));

      return NextResponse.json({ names });
    } catch (parseError: any) {
      console.error("Parse error:", parseError, "Response:", response);
      throw new Error(`Failed to parse response: ${parseError.message}`);
    }
  } catch (error) {
    console.error("Error generating names:", error);
    return NextResponse.json(
      { error: "Failed to generate names" },
      { status: 500 }
    );
  }
}
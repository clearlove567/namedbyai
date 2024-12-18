import { NextResponse } from "next/server";
import { callOpenRouter } from "@/lib/utils/openai";
import { generateChineseNamePrompt } from "@/lib/prompts/chineseNamePrompt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = generateChineseNamePrompt(body);

    const completion = await callOpenRouter([
      { role: "user", content: prompt }
    ]);
    
    let response = completion.choices?.[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenRouter");
    }

    // 清理响应内容中的特殊字符
    response = response.replace(/[\u0000-\u001F]+/g, '')
                      .replace(/\n/g, '')
                      .replace(/\r/g, '')
                      .replace(/\t/g, '')
                      .trim();

    try {
      const parsedResponse = JSON.parse(response);
      
      if (!parsedResponse.names || !Array.isArray(parsedResponse.names)) {
        throw new Error("Invalid response structure");
      }

      const names = parsedResponse.names.map(name => ({
        name: String(name.name || ''),
        meaning: String(name.meaning || ''),
        cultural_notes: String(name.cultural_notes || ''),
        score: Number(name.score) || 0
      }));

      return NextResponse.json({ names });
    } catch (parseError) {
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
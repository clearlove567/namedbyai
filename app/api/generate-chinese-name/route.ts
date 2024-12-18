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

    console.log("OpenRouter API Response:", completion);
    
    let response = completion.choices?.[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenRouter");
    }

    // 使用正则表达式直接提取引号中的内容
    const namesMatch = response.match(/"names"\s*:\s*\[(.*?)\]/s);
    if (!namesMatch) {
      throw new Error("Invalid response format");
    }

    const nameObjects = namesMatch[1].match(/{([^}]+)}/g)?.map((nameStr: string) => {
      const name = nameStr.match(/"name"\s*:\s*"([^"]+)"/)?.[1] || '';
      const meaning = nameStr.match(/"meaning"\s*:\s*"([^"]+)"/)?.[1] || '';
      const cultural_notes = nameStr.match(/"cultural_notes"\s*:\s*"([^"]+)"/)?.[1] || '';
      const score = nameStr.match(/"score"\s*:\s*(\d+)/)?.[1] || '0';

      return {
        name,
        meaning,
        cultural_notes,
        score: parseInt(score)
      };
    }) || [];

    return NextResponse.json({ names: nameObjects });
  } catch (error) {
    console.error("Error generating names:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { error: "Failed to generate names" },
      { status: 500 }
    );
  }
}
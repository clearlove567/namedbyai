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

    // 清理可能存在的特殊字符
    response = response.replace(/[\u0000-\u0019]+/g, "");
    
    try {
      const parsedResponse = JSON.parse(response);
      console.log("Parsed Response:", parsedResponse);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      // 尝试修复常见的 JSON 格式问题
      response = response.replace(/\n/g, "")
                        .replace(/\r/g, "")
                        .replace(/\t/g, "")
                        .replace(/\s+/g, " ")
                        .trim();
      
      const parsedResponse = JSON.parse(response);
      return NextResponse.json(parsedResponse);
    }
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
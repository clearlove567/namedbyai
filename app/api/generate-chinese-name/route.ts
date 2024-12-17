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

    // 清理特殊字符和替换中文引号
    response = response
      .replace(/[\u0000-\u0019]+/g, "")
      .replace(/[「」]/g, '"')  // 替换中文引号为英文引号
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .replace(/\t/g, "")
      .replace(/\s+/g, " ")
      .trim();
    
    try {
      const parsedResponse = JSON.parse(response);
      console.log("Parsed Response:", parsedResponse);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Failed to parse response:", response);
      
      // 如果还是解析失败，尝试更激进的清理
      response = response
        .replace(/[^\x20-\x7E]/g, '"') // 替换所有非ASCII字符为英文引号
        .replace(/""+/g, '"')          // 清理重复的引号
        .replace(/"{/g, '{')           // 修复对象开始
        .replace(/}"/g, '}');          // 修复对象结束
      
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
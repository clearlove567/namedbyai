import { NextResponse } from "next/server";
import { callOpenRouter } from "@/lib/utils/openai";
import { generateEnglishNamePrompt } from "@/lib/prompts/englishNamePrompt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = generateEnglishNamePrompt(body);

    const completion = await callOpenRouter([
      { role: "user", content: prompt }
    ]);

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from OpenRouter");
    }

    return NextResponse.json(JSON.parse(response));
  } catch (error) {
    console.error("Error generating names:", error);
    return NextResponse.json(
      { error: "Failed to generate names" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { callOpenRouter } from "@/lib/utils/openai";
import { generateChineseNamePrompt } from "@/lib/prompts/chineseNamePrompt";

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
    const prompt = generateChineseNamePrompt(body);

    const completion = await callOpenRouter([
      { role: "user", content: prompt }
    ]);
    
    let response = completion.choices?.[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenRouter");
    }

    // 清理和规范化 JSON 字符串
    response = response
      .replace(/[\u0000-\u001F]+/g, '')  // 移除控制字符
      .replace(/\n/g, ' ')               // 替换换行
      .replace(/\s+/g, ' ')              // 规范化空格
      .replace(/。/g, '.')               // 替换中文句号
      .replace(/：/g, ':')               // 替换中文冒号
      .replace(/，/g, ',')               // 替换中文逗号
      .replace(/'/g, "'")                // 规范化单引号
      .replace(/"/g, '"')                // 规范化双引号
      .replace(/\\/g, '')                // 移除反斜杠
      .replace(/\s+([,\]}])/g, '$1')     // 移除标点前的空格
      .replace(/([{[,])\s+/g, '$1')      // 移除标点后的空格
      .replace(/\s+/g, ' ')              // 再次规范化空格
      .replace(/([^\\])"([^"]*)\s+([^"]*)"([,}])/g, '$1"$2 $3"$4')  // 修复引号内的空格
      .replace(/\s*;\s*/g, ';')          // 规范化分号
      .trim();

    console.log("Cleaned response:", response); // 添加日志

    try {
      const parsedResponse = JSON.parse(response);
      
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
      
      // 尝试手动解析
      try {
        const manualParsed = response.match(/"names"\s*:\s*\[(.*)\]/s)?.[1];
        if (manualParsed) {
          const nameObjects = manualParsed.split('},{').map(str => {
            const name = str.match(/"name"\s*:\s*"([^"]+)"/)?.[1] || '';
            const meaning = str.match(/"meaning"\s*:\s*"([^"]+)"/)?.[1] || '';
            const cultural_notes = str.match(/"cultural_notes"\s*:\s*"([^"]+)"/)?.[1] || '';
            const score = parseInt(str.match(/"score"\s*:\s*(\d+)/)?.[1] || '0');
            
            return { name, meaning, cultural_notes, score };
          });
          
          return NextResponse.json({ names: nameObjects });
        }
      } catch (e) {
        console.error("Manual parse error:", e);
      }
      
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
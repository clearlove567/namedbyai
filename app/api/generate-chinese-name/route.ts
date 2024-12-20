import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { callOpenRouter } from "@/lib/utils/openai";
import { generateChineseNamePrompt } from "@/lib/prompts/chineseNamePrompt";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 检查使用次数
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count, error: countError } = await supabase
      .from('usage_records')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .gte('used_at', today.toISOString());

    if (countError) {
      console.error("Error checking usage count:", countError);
      throw countError;
    }

    const dailyLimit = Number(process.env.NEXT_PUBLIC_DAILY_LIMIT) || 3;
    if ((count || 0) >= dailyLimit) {
      return NextResponse.json(
        { error: "Daily limit exceeded" },
        { status: 429 }
      );
    }

    // 生成名字
    const body = await req.json();
    const prompt = generateChineseNamePrompt(body);
    const completion = await callOpenRouter([
      { role: "user", content: prompt }
    ]);

    if (!completion.choices?.[0]?.message?.content) {
      throw new Error("No response from OpenRouter");
    }

    try {
      const content = completion.choices[0].message.content;
      //console.log("OpenRouter response:", content);
      const parsedNames = JSON.parse(content);

      // 记录使用情况
      const { error: usageError } = await supabase
        .from('usage_records')
        .insert([{
          user_id: session.user.id,
          type: 'chinese',
          used_at: new Date().toISOString()
        }]);

      if (usageError) {
        //console.error("Error recording usage:", usageError);
        throw usageError;
      }

      return NextResponse.json({
        names: parsedNames,
        remainingUses: dailyLimit - ((count || 0) + 1)
      });
    } catch (parseError) {
      //console.error("JSON Parse Error:", parseError);
      //console.error("Raw content:", completion.choices[0].message.content);
      throw new Error("Invalid response format from AI");
    }

  } catch (error: any) {
    //console.error("Error generating names:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate names" },
      { status: 500 }
    );
  }
}
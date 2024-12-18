// 使用原生 fetch 来调用 OpenRouter API
export async function callOpenRouter(messages: any[]) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://namedbyai.online",
      "X-Title": "NamedByAI",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "anthropic/claude-3.5-sonnet",
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data;
}
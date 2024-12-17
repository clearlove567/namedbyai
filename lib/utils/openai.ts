// 使用原生 fetch 来调用 OpenRouter API
export async function callOpenRouter(messages: any[]) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://namedbyai.online",
      "X-Title": "NamedByAI"
    },
    body: JSON.stringify({
      model: "anthropic/claude-3.5-sonnet",
      messages: messages,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
  }

  return response.json();
}
// Thin chat client over the three provider APIs.
// `messages` is [{ role: 'user' | 'assistant', content: string }].

export async function chat({ provider, apiKey, model, system, messages }) {
  if (provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: system }, ...messages],
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error(`Empty response from OpenAI (model: ${model})`);
    return content.trim();
  }

  if (provider === 'anthropic') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1024,
        system,
        messages,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const content = data.content?.[0]?.text;
    if (!content) throw new Error(`Empty response from Anthropic (model: ${model})`);
    return content.trim();
  }

  if (provider === 'google') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: messages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
        }),
      }
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error(`Empty response from Google (model: ${model})`);
    return content.trim();
  }

  throw new Error(`Unknown provider: ${provider}`);
}

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function simplifyDocument(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "専門的な文書を一般の人にもわかりやすく説明し、関連する質問を3つ生成してください。"
      },
      {
        role: "user",
        content: text
      }
    ],
    functions: [
      {
        name: "processDocument",
        parameters: {
          type: "object",
          properties: {
            simplified: {
              type: "string",
              description: "簡略化された文書の内容"
            },
            suggestedQuestions: {
              type: "array",
              items: { type: "string" },
              description: "文書に関する推奨質問のリスト"
            }
          },
          required: ["simplified", "suggestedQuestions"]
        }
      }
    ],
    function_call: { name: "processDocument" }
  });

  const result = JSON.parse(completion.choices[0].message.function_call?.arguments || '{}');
  return {
    original: text,
    simplified: result.simplified,
    suggestedQuestions: result.suggestedQuestions
  };
}

export async function generateAnswer(question: string, context: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "与えられた文脈に基づいて質問に答えてください。"
      },
      {
        role: "user",
        content: `文脈: ${context}\n\n質問: ${question}`
      }
    ]
  });

  return completion.choices[0].message.content;
}
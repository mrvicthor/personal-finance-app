import { getTransactions } from "@/features/transactions/db/transactions";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const transactions = await getTransactions();
  const { prompt } = await req.json();
  const formattedText = transactions
    ?.map((item) => {
      const date = new Date(item.date).toLocaleDateString();
      return `- ${item.name} spent $${item.amount} on ${item.category} at ${date}. Recurring: ${item.recurring ? "Yes" : "No"}`;
    })
    .join("\n");

  //   const insightPrompt = `
  // You are an AI financial advisor. Analyze the following spending data and provide:
  // - One useful insight about their spending
  // - One tip on how to save more money

  // ${formattedText}
  // `;

  const insightPrompt = `${prompt}
${formattedText}
`;

  console.log();

  const URL = process.env.OLLAMA_API_URL;

  try {
    if (process.env.NODE_ENV === "development") {
      const response = await fetch(`${URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral",
          prompt: insightPrompt,
          stream: false,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ollama:", errorText);
        return new Response(JSON.stringify({ error: errorText }), {
          status: response.status,
        });
      }
      const result = await response.json();

      return Response.json({ insight: result.response });
    } else {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: "system",
                content: "You are a helpful finance assistant.",
              },
              { role: "user", content: insightPrompt },
            ],
          }),
        }
      );
      const result = await response.json();
      const text = result.choices?.[0]?.messages.content ?? "No response";
      console.log({ text });
      return Response.json({ response: text });
    }
  } catch (error) {
    console.error("Insight API error:", error);
    return Response.json(
      { error: "Failed to generate insight" },
      { status: 500 }
    );
  }
}

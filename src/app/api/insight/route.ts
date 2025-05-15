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

  const URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:11434/"
      : process.env.PRODUCTION_ORIGIN;

  const response = await fetch(`${URL}api/generate`, {
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

  if (result.error) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 400,
    });
  }

  return Response.json({ insight: result.response });
}

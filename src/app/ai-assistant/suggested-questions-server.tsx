import { SuggestedQuestionsClient } from "./suggested-questions-clients";

export default function SuggestedQuestions() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Suggested Questions</h2>
      <SuggestedQuestionsClient />
    </div>
  );
}

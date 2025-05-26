import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';

dotenv.config();

const COHERE_API_KEY = process.env.COHERE_API_KEY;

if (!COHERE_API_KEY) {
  console.error('❌ COHERE_API_KEY is missing. Check your .env file.');
  process.exit(1);
}

const cohere = new CohereClient({
  token: COHERE_API_KEY,
});

async function summarizeTodos(todos) {
  const taskList = todos.map((t, i) => `${i + 1}. ${t.task}`).join('\n');

  const prompt = `
You are a smart productivity assistant. The user has the following to-do list:

${taskList}

Your job is to:
1. Rephrase each task in a clear and descriptive manner.
2. Estimate how long each task might take in minutes.
3. Assign a priority (High, Medium, Low) based on common sense.
4. Provide 2–3 general tips to help the user plan their day more effectively.

Respond in this format:

### Smart Summary:

1. Task: [Rewritten Task]
   ⏱ Estimated Time: [Time]
   ⚡ Priority: [Priority]

...(repeat for each task)

📌 Suggestions:
- Tip 1
- Tip 2
- Tip 3
`;

  try {
    const response = await cohere.generate({
      model: 'command',
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const summary = response.generations[0].text.trim(); // ✅ updated path (no `.body`)
    return summary;
  } catch (error) {
    console.error('LLM summarize error:', error);
    throw new Error('Failed to summarize todos');
  }
}

export default { summarizeTodos };

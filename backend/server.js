// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-quiz', async (req, res) => {
  const { topic, numQuestions, difficulty } = req.body;

  if (!topic?.trim()) {
    return res.status(400).json({ error: 'Please enter a quiz topic.' });
  }

  const prompt = `
You are an AI quiz generator. Generate exactly ${numQuestions} multiple-choice questions (MCQs) on the topic "${topic}" with "${difficulty}" level difficulty.

Each question must include:
- type: "mcq"
- question (as a string)
- 4 options (array of strings)
- answer (must match one of the 4 options)
- explanation

Return the result as a valid JSON array like:
[
  {
    "type": "mcq",
    "question": "What is ...?",
    "options": ["A", "B", "C", "D"],
    "answer": "B",
    "explanation": "Because..."
  },
  ...
]
Only include the JSON array — no extra text.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const raw = response.choices[0].message.content;
    let quiz = JSON.parse(raw);

    // 🔒 Filter out any question without valid structure
    quiz = quiz.filter(q =>
      q.type === 'mcq' &&
      q.question &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      q.options.includes(q.answer) &&
      q.explanation
    );

    res.json({ quiz });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

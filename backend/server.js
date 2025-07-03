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

// Route to generate quiz
app.post('/generate-quiz', async (req, res) => {
  const { topic, numQuestions = 5, difficulty = 'medium' } = req.body;

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

// Route to generate study plan
app.post('/study-plan', async (req, res) => {
  const { topic } = req.body;

  if (!topic?.trim()) {
    return res.status(400).json({ error: 'Please provide a topic for the study plan.' });
  }

  const prompt = `Create a detailed 7-day study plan to learn "${topic}" for exams. The plan should include daily topics to study and suggested activities. Format it clearly.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });

    const plan = completion.choices[0].message.content;
    res.json({ plan });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate study plan.' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

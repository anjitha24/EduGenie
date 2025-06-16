import React, { useState } from 'react';
import axios from 'axios';
import './QuizPage.css';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    if (!topic.trim()) return alert('Please input a topic');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate-quiz', {
        topic,
        numQuestions,
        difficulty
      });
      setQuiz(res.data.quiz);
      setCurrent(0);
      setAnswers(Array(res.data.quiz.length).fill(null));
      setFeedback(null);
    } catch {
      alert('Could not generate quiz. Try again later.');
    }
    setLoading(false);
  };

  const handleAnswer = (ans) => {
    const correct = quiz[current].answer.trim().toLowerCase() === ans.trim().toLowerCase();
    setAnswers(prev => {
      const updated = [...prev];
      updated[current] = { selected: ans, correct };
      return updated;
    });
    setFeedback({ correct, explanation: quiz[current].explanation });
  };

  const next = () => {
    setFeedback(null);
    if (current < quiz.length - 1) setCurrent(c => c + 1);
  };

  const finish = () => {
    setFeedback(null);
    setCurrent(quiz.length);
  };

  const score = answers.filter(a => a?.correct).length;

  if (loading) return <p className="center">Loading quiz...</p>;

  if (!quiz.length) return (
    <div className="quiz-input">
      <h2>Start a Quiz</h2>
      <input placeholder="Enter topic" value={topic} onChange={e => setTopic(e.target.value)} />
      <input type="number" value={numQuestions} min="1" max="20"
        onChange={e => setNumQuestions(parseInt(e.target.value))} placeholder="Number of Questions" />
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );

  if (current >= quiz.length) return (
    <div className="results">
      <h2>Your Result</h2>
      <p>You answered {score} out of {quiz.length} correctly.</p>
      <div style={{ maxWidth: "300px", margin: "2rem auto" }}>
        <Pie
          data={{
            labels: ['Correct', 'Incorrect'],
            datasets: [{
              data: [score, quiz.length - score],
              backgroundColor: ['#28a745', '#dc3545']
            }]
          }}
        />
      </div>
      <button onClick={() => setQuiz([])}>Try Another Quiz</button>
    </div>
  );

  const q = quiz[current];
  const userAnswer = answers[current]?.selected;

  return (
    <div className="quiz-container">
      <div className="progress">Question {current + 1} / {quiz.length}</div>
      <div className="question">{q.question}</div>

      <div className="options">
        {q.options && q.options.map(opt => (
          <button
            key={opt}
            disabled={feedback}
            className={
              feedback
                ? (opt === q.answer ? 'correct' : opt === userAnswer ? 'wrong' : '')
                : ''
            }
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="feedback">
          {feedback.correct ? '✅ Correct!' : '❌ Incorrect'}
          <p><strong>Explanation:</strong> {feedback.explanation}</p>
          <button onClick={() => current < quiz.length - 1 ? next() : finish()}>
            {current < quiz.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
}

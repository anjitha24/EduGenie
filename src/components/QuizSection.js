import React, { useState } from 'react';
import axios from 'axios';
import './QuizSection.css'; // Use relative path if needed

const csTopics = [
  "Operating Systems", "Data Structures", "Algorithms", "Networking",
  "Databases", "Machine Learning", "Cybersecurity", "Computer Architecture",
  "Web Development", "Object-Oriented Programming"
];

const QuizSection = ({ setScore }) => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async (topic) => {
    setLoading(true);
    setSelectedTopic(topic);
    setAnswers({});
    setSubmitted(false);

    try {
      const res = await axios.post('http://localhost:5000/api/generate-quiz', { topic });
      setQuiz(res.data.quiz); // ✅ Fixed the bug here (was `response.data.quiz`)
    } catch (error) {
      console.error('❌ Failed to fetch quiz:', error.response || error.message);
      alert("⚠️ Could not load quiz. Please check backend or API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qIndex, choice) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [qIndex]: choice }));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== quiz.length) {
      alert("⚠️ Please answer all questions.");
      return;
    }

    let correct = 0;
    quiz.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });

    const finalScore = ((correct / quiz.length) * 100).toFixed(2);
    setScore(finalScore);
    setSubmitted(true);
  };

  return (
    <div className="quiz-container">
      <h2>🧠 Quiz Time</h2>

      {!selectedTopic && (
        <div className="topic-list">
          <p>Select a topic to begin:</p>
          <div className="topics">
            {csTopics.map((topic, idx) => (
              <button key={idx} className="topic-btn" onClick={() => fetchQuiz(topic)}>
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <p>⏳ Loading quiz...</p>}

      {quiz.length > 0 && (
        <div>
          <h3 className="selected-topic">📘 Topic: {selectedTopic}</h3>

          {quiz.map((q, index) => (
            <div className="quiz-card" key={index}>
              <p className="question">{index + 1}. {q.question}</p>
              <div className="options">
                {q.options.map((opt, i) => {
                  const isSelected = answers[index] === opt;
                  const isCorrect = submitted && opt === q.answer;
                  const isIncorrect = submitted && isSelected && opt !== q.answer;

                  return (
                    <label
                      key={i}
                      className={`option ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={opt}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleSelect(index, opt)}
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button className="submit-btn" onClick={handleSubmit}>✅ Submit Quiz</button>
          ) : (
            <div className="submitted-box">
              <p>🎯 Quiz submitted!</p>
              <p>📊 Scroll down to see your score.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizSection;

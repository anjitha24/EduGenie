import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopicInput from './components/TopicInput';
import NotesDisplay from './components/NotesDisplay';
import QuizSection from './components/QuizSection';
import Login from './pages/Login';
import Register from './pages/Register';
import ResultDisplay from './components/ResultDisplay';
import QuizPage from './pages/QuizPage';
import './App.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(null);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('loggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem('loggedIn');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`App ${theme}`}>
      <div className="top-bar">
        <button className="theme-toggle" onClick={handleAuthAction}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="main-content">
              <h1>EDUGENIE</h1>
              <p className="subtitle">
                Your AI Powered Assistant Transforming Curiosity into Knowledge with Every Click.
              </p>
              <TopicInput setTopic={setTopic} setNotes={setNotes} setQuiz={setQuiz} />
              {notes && <NotesDisplay notes={notes} />}
              {quiz.length > 0 && <QuizSection quiz={quiz} setScore={setScore} />}
              {score !== null && <ResultDisplay score={score} />}
            </div>
          }
        />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/quiz"
          element={isLoggedIn ? <QuizPage setScore={setScore} /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';

const topics = [
  'Data Structures', 'Algorithms', 'Operating Systems', 'Computer Networks',
  'Databases', 'Software Engineering', 'Machine Learning', 'Artificial Intelligence',
  'Cybersecurity', 'Web Development', 'Mobile Development', 'Cloud Computing',
  'System Design', 'Object-Oriented Programming', 'Functional Programming'
];

const QuizHome = ({ setSelectedTopic }) => {
  const navigate = useNavigate();

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    navigate('/quiz');
  };

  return (
    <div>
      <h2>🧠 Choose a CS Topic</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {topics.map((topic, i) => (
          <button key={i} onClick={() => handleTopicClick(topic)}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizHome;

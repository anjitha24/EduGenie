// src/components/StudyPlanGenerator.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './StudyPlanGenerator.css';

const StudyPlanGenerator = () => {
  const [topic, setTopic] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/study-plan', { topic });
      setPlan(response.data.plan);
    } catch (error) {
      console.error('Error:', error);
      setPlan('❗ Failed to generate plan.');
    }
    setLoading(false);
  };

   return (
    <div className="study-plan-container">
      <h1>Customized Study Plan Generator</h1>
      <input
        type="text"
        placeholder="Enter your topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={generatePlan}>Generate Study Plan</button>
      {loading && <p className="loading">⏳ Generating your personalized plan...</p>}
      {plan && <pre className="plan-output">{plan}</pre>}
    </div>
  );
};

export default StudyPlanGenerator;

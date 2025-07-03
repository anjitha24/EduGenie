import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaFileAlt, FaClipboardCheck, FaCalendarAlt } from 'react-icons/fa';
import './FeatureCardsPage.css'; // optional CSS file for styling

const FeatureCard = ({ title, description, Icon, onClick }) => (
  <div className="feature-card" onClick={onClick}>
    <div className="feature-icon">
      <Icon size={36} color="#ff5722" />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

export default function FeatureCardsPage() {
  const navigate = useNavigate();

  return (
    <div className="features-container">
       <h2 className="features-heading">Your AI Powered Assistant Transforming Curiosity into Knowledge with Every Click.</h2>   
      <div className="features-grid">
        <FeatureCard
          title="Generate Notes"
          description="AI-powered notes based on your topic."
          Icon={FaFileAlt}
          onClick={() => navigate('/generatenotes')}
        />
        <FeatureCard
          title="Quiz"
          description="Take a quiz and test your knowledge."
          Icon={FaClipboardCheck}
          onClick={() => navigate('/quiz')}
        />
        <FeatureCard
          title="Study Plan"
          description="Generate a 7-day study plan on any topic."
          Icon={FaCalendarAlt}
          onClick={() => navigate('/study-plan')}
        />
      </div>
    </div>
  );
}

function ResultDisplay({ score }) {
  let message = "Keep going!";
  if (score > 80) message = "🔥 Excellent!";
  else if (score > 60) message = "✅ Good Job!";
  else if (score > 40) message = "💡 Needs Practice!";
  else message = "🚀 Let's get better!";

  return (
    <div className="card">
      <h2>Your Score</h2>
      <p>{score} / 100</p>
    </div>
  );
};

export default ResultDisplay;
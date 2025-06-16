import React from 'react';
import jsPDF from 'jspdf';

const NotesDisplay = ({ notes }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(notes, 180);
    doc.text(lines, 10, 10);
    doc.save('generated-notes.pdf');
  };

  const containerStyle = {
    backgroundColor: 'var(--bg-color, #ffffff)',
    color: 'var(--text-color, #000000)',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '20px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
    fontSize: '1.1rem',
    lineHeight: '1.7',
    maxHeight: '70vh',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    transition: 'background-color 0.3s, color 0.3s'
  };

  const buttonStyle = {
    marginTop: '12px',
    padding: '8px 16px',
    fontSize: '1rem',
    borderRadius: '6px',
    backgroundColor: '#4F46E5',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'background 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#4338CA'
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Generated Notes</h2>
      
      <div style={containerStyle}>
        {notes}
      </div>

      {notes && (
        <button
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default NotesDisplay;

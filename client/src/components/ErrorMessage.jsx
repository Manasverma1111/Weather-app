import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">❌</div>
      <div className="error-message">{message}</div>
    </div>
  );
}

export default ErrorMessage;
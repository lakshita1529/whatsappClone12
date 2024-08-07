// StatusList.js
import React from 'react';
import StatusPlaceholder from './StatusPlaceholder';
import './StatusList.css';

const StatusList = () => {
  const placeholders = Array(10).fill(0); 

  return (
    <div className="status-list">
      {placeholders.map((_, index) => (
        <StatusPlaceholder key={index} />
      ))}
    </div>
  );
};

export default StatusList;

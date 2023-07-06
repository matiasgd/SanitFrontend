import React from 'react';

const MetricBox: React.FC<{}> = () => {
  const boxStyle = {
    backgroundColor: 'rgba(0, 191, 255, 0.5)',
    border: '1px solid blue',
    padding: '10px',
    display: 'inline-block',
    borderRadius: '7,5px',
  };

  const titleStyle = {
    fontSize: '16px',
    color: 'gray'
  };

  const metricStyle = {
    fontWeight: 'bold'
  };

  return (
    <div style={boxStyle}>
      <h2 style={titleStyle}>Consultas</h2>
      <p style={metricStyle}>12</p>
    </div>
  );
};

export default MetricBox;

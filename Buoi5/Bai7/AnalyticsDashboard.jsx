import React from 'react';


const ComplexChart = ({ id }) => {

  return <div className="chart-container">Heavy Chart Component #{id}</div>;
};

export const AnalyticsDashboard = ({ title }) => {
  return (
    <div className="analytics-dashboard">
      <h1 className="dashboard-title">{title}</h1>
      
      {/* 10 Biểu đồ con phức tạp */}
      <div className="charts-grid">
        {Array.from({ length: 10 }).map((_, index) => (
          <ComplexChart key={index} id={index + 1} />
        ))}
      </div>
    </div>
  );
};
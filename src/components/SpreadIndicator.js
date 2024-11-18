"use client";  
// src/components/SpreadIndicator.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary components
import useOrderbookData from '@components/hooks/useOrderBookData';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,  // Register the PointElement for line charts
  Title,
  Tooltip,
  Legend
);

function SpreadIndicator() {
  const { bids = [], asks = [] } = useOrderbookData();  // Default to empty arrays to avoid undefined errors
  const [spreadData, setSpreadData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (Array.isArray(bids) && bids.length > 0 && Array.isArray(asks) && asks.length > 0) {
      const spread = asks[0][0] - bids[0][0]; // Spread = lowest ask - highest bid
      setSpreadData((prev) => [...prev.slice(-59), spread]);
      setLabels((prev) => [...prev.slice(-59), new Date().toLocaleTimeString()]);
    }
  }, [bids, asks]); // Re-run effect when bids or asks change

  // Chart.js data and options
  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Spread (USD)',
      data: spreadData,
      fill: false,
      borderColor: 'blue',
      tension: 0.1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category', // Category scale for time-based labels
      },
      y: {
        type: 'linear',
        min: 0,  // Ensures the y-axis starts from 0
        ticks: {
          callback: function(value) { return value.toFixed(2); },  // Format y-axis ticks
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '400px' }}>
      <h2>Spread Indicator</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default SpreadIndicator;
    
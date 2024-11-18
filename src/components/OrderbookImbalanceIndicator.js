"use client";  
// src/components/OrderbookImbalanceIndicator.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useOrderbookData from '@components/hooks/useOrderBookData';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function OrderbookImbalanceIndicator() {
  const { bids = [], asks = [] } = useOrderbookData();
  const [imbalance, setImbalance] = useState(0);
  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Make sure bids and asks are not empty before calculating
    if (bids.length > 0 && asks.length > 0) {
      // Calculate total bid and ask volumes
      const totalBidVolume = bids.reduce((sum, [price, amount]) => sum + parseFloat(amount), 0);
      const totalAskVolume = asks.reduce((sum, [price, amount]) => sum + parseFloat(amount), 0);

      // Ensure no division by zero
      if (totalBidVolume + totalAskVolume > 0) {
        // Calculate imbalance
        const imbalanceValue = (totalBidVolume - totalAskVolume) / (totalBidVolume + totalAskVolume);

        // Smooth the imbalance over time by keeping the last 60 values
        setImbalance(imbalanceValue);

        setDataPoints((prev) => {
          // Use functional form of setState to correctly access previous state
          return [...prev.slice(-59), imbalanceValue]; // Keep only the last 60 data points
        });

        setLabels((prev) => {
          // Use functional form of setState to correctly access previous state
          return [...prev.slice(-59), new Date().toLocaleTimeString()]; // Keep only the last 60 labels
        });
      }
    }
  }, [bids, asks]); // Re-run effect when bids or asks change

  return (
    <div>
      <h2>Orderbook Imbalance Indicator</h2>
      <Bar
        data={{
          labels: labels,
          datasets: [{
            label: 'Orderbook Imbalance',
            data: dataPoints,
            backgroundColor: imbalance > 0 ? 'green' : 'red', // Green for positive imbalance, red for negative
            borderColor: imbalance > 0 ? 'darkgreen' : 'darkred', // Darker color for better visibility
            borderWidth: 1,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: -1, // Set a minimum value for the imbalance scale
              max: 1,  // Set a maximum value for the imbalance scale
              ticks: {
                callback: function(value) {
                  return value.toFixed(2); // Display imbalance with 2 decimal places
                }
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend if not needed
            },
          },
        }}
        style={{ height: '400px' }}
      />
    </div>
  );
}

export default OrderbookImbalanceIndicator;

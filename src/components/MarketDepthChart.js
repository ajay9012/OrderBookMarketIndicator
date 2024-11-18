// src/components/MarketDepthChart.js
"use client"; 
    
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import useOrderbookData from '@components/hooks/useOrderBookData';

function MarketDepthChart() {
  const { bids, asks } = useOrderbookData();
  const [depthData, setDepthData] = useState({ bidPrices: [], bidVolumes: [], askPrices: [], askVolumes: [] });

  useEffect(() => {
    // Calculate cumulative bid volumes
    const bidPrices = bids.map(([price]) => price);
    const bidVolumes = bids.reduce((acc, [price, volume], index) => {
      const cumulativeVolume = (acc[index - 1] || 0) + parseFloat(volume);
      return [...acc, cumulativeVolume];
    }, []);

    // Calculate cumulative ask volumes
    const askPrices = asks.map(([price]) => price);
    const askVolumes = asks.reduce((acc, [price, volume], index) => {
      const cumulativeVolume = (acc[index - 1] || 0) + parseFloat(volume);
      return [...acc, cumulativeVolume];
    }, []);

    setDepthData({ bidPrices, bidVolumes, askPrices, askVolumes });
  }, [bids, asks]);

  return (
    <div>
      <h2>Market Depth Chart</h2>
      <Line
        data={{
          labels: [...depthData.bidPrices, ...depthData.askPrices],
          datasets: [
            {
              label: 'Cumulative Bids',
              data: depthData.bidVolumes,
              fill: false,
              borderColor: 'green',
              tension: 0.1
            },
            {
              label: 'Cumulative Asks',
              data: depthData.askVolumes,
              fill: false,
              borderColor: 'red',
              tension: 0.1
            }
          ]
        }}
      />
    </div>
  );
}

export default MarketDepthChart;

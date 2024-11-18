"use client"; 

import React from 'react';
import useOrderbookData from '../hooks/useOrderBookData';
import "../components/orderBook.css";
function Orderbook() {
  const { bids, asks } = useOrderbookData();
  const getChangeClass = (current, previous) => {
    if (!previous) return '';
    return parseFloat(current) > parseFloat(previous) ? 'increase' : 'decrease';
  };
  return (
    <div>
      <h2>Orderbook</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>Bids</h3>
          {/* Ensure bids is always an array before mapping */}
          {Array.isArray(bids) && bids.length > 0 ? (
            bids.map(([price, amount]) => (
              <div key={price} className={getChangeClass(price, prevBids[index]?.[0])}>{price}: {amount}</div>
            ))
          ) : (
            <div>No bids available</div>
          )}
        </div>
        <div>
          <h3>Asks</h3>
          {/* Ensure asks is always an array before mapping */}
          {Array.isArray(asks) && asks.length > 0 ? (
            asks.map(([price, amount]) => (
              <div key={price} className={getChangeClass(price, prevAsks[index]?.[0])}>{price}: {amount}</div>
            ))
          ) : (
            <div>No asks available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orderbook;

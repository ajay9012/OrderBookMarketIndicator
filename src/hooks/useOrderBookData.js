"use client"; 
// src/components/hooks/useOrderBookData.js

import { useState, useEffect } from 'react';

function useOrderbookData(pair = 'btcusdt') {
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@depth`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Ensure bids and asks are arrays and safely slice them
      setOrderbook({
        bids: Array.isArray(data.bids) ? data.bids.slice(0, 10) : [],
        asks: Array.isArray(data.asks) ? data.asks.slice(0, 10) : [],
      });
    };

    return () => ws.close();
  }, [pair]);

  return orderbook;
}

export default useOrderbookData;

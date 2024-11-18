"use client"; 
import React, { useEffect, useState } from 'react';

import Orderbook from "@components/components/OrderBook";
import SpreadIndicator from "@components/components/SpreadIndicator";
import OrderbookImbalanceIndicator from "@components/components/OrderbookImbalanceIndicator";
import MarketDepthChart from "@components/components/MarketDepthChart";


export default function Home() {

  const [pair, setPair] = useState('btcusdt');

  const handlePairChange = (e) => {
    setPair(e.target.value);
  };
  return (
 
    <>
     <h1>Crypto Orderbook</h1>
     <select onChange={handlePairChange} value={pair}>
        <option value="btcusdt">BTC-USD</option>
        <option value="ethusdt">ETH-USD</option>
        <option value="xrpusdt">XRP-USD</option>
      </select>
      <SpreadIndicator pair={pair} />
      <OrderbookImbalanceIndicator pair={pair} />
      <Orderbook pair={pair} />
      <MarketDepthChart pair={pair} />
    </>
  );
}

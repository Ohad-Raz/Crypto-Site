// SingleCoin.jsx
import "./SingleCoin.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleCoin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${coinId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCoinData(data.data);
      } catch (error) {
        setError(error.message || "Error fetching coin data");
      }
    };

    if (coinId) {
      fetchCoinData();
    }

    return () => {
     
    };
  }, [coinId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!coinData) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="singleCoinContainer">
      <ul className="singleCoin">
        <li>
          <strong>Symbol:</strong> {coinData.symbol}
        </li>
        <li>
          <strong>Rank:</strong> {coinData.rank}
        </li>
        <li>
          <strong>Price (USD):</strong> {coinData.priceUsd}
        </li>
        <li>
          <strong>Explorer:</strong> {coinData.explorer}
        </li>
        <li>
          <strong>Change Percent (24Hr):</strong> {coinData.changePercent24Hr}
        </li>
        <li>
          <strong>ID:</strong> {coinData.id}
        </li>
        <li>
          <strong>Market Cap (USD):</strong> {coinData.marketCapUsd}
        </li>
        <li>
          <strong>Max Supply:</strong> {coinData.maxSupply || 'Not Available'}
        </li>
        <li>
          <strong>Name:</strong> {coinData.name}
        </li>
        <li>
          <strong>Supply:</strong> {coinData.supply}
        </li>
        <li>
          <strong>Volume (USD 24Hr):</strong> {coinData.volumeUsd24Hr}
        </li>
        <li>
          <strong>VWAP (USD 24Hr):</strong> {coinData.vwap24Hr}
        </li>
      </ul>
    </div>
  );
  
};

export default SingleCoin;

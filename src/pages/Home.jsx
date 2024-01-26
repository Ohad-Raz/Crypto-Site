// Home.jsx
import React, { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard";
import { doc, deleteDoc } from "firebase/firestore";
import { dataBase } from "../config/firebaseConfig";
import "./Home.css";
import { Routes, Route } from "react-router-dom";
import SingleCoin from "../components/data/SingleCoin";

function Home({ user }) {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://api.coincap.io/v2/assets", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const cryptoArray = result.data || [];
        setCryptoData(cryptoArray);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleRemove = async (crypto) => {
    try {
      const cryptoDoc = doc(dataBase, "cryptos", crypto.id);
      await deleteDoc(cryptoDoc);

      const filtered = cryptoData.filter((item) => item.id !== crypto.id);
      setCryptoData(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homeContainer">
      {cryptoData.map((crypto, index) => (
        <CoinCard
          key={index}
          crypto={crypto}
          onRemove={handleRemove}
          user={user}
        />
      ))}
    </div>
  );
}

export default Home;

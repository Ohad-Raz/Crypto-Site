// CoinCard.jsx
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { dataBase } from "../config/firebaseConfig";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./CoinCard.css";

function CoinCard({ crypto, onRemove, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false); // State to track whether the cryptocurrency is saved

  useEffect(() => {
    // Check if the cryptocurrency is saved when the component mounts
    checkIsSaved();
  }, []);

  const checkIsSaved = async () => {
    if (user) {
      try {
        const qUser = query(
          collection(dataBase, "cryptos"),
          where("userId", "==", user.uid),
          where("cryptoId", "==", crypto.id)
        );
        const querySnapshot = await getDocs(qUser);

        setIsSaved(!querySnapshot.empty);
      } catch (error) {
        console.error("Error checking if coin is saved: ", error);
      }
    }
  };

  const handleRemove = async () => {
    try {
      if (user) {
        const cryptoDoc = doc(dataBase, "cryptos", user.uid + crypto.id);
        await deleteDoc(cryptoDoc);
        // setIsSaved(false);
        onRemove(crypto);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveToMyCrypto = async () => {
    try {
      if (user) {
        const docRef = await addDoc(collection(dataBase, "cryptos"), {
          userId: user.uid,
          cryptoId: crypto.id,
          ...crypto,
        });
        // setIsSaved(true);
      } else {
        // Redirect to the authentication page only if not on the MyCrypto page
        if (location.pathname !== "/MyCrypto") {
          navigate("/authentications");
        }
      }
    } catch (e) {
      console.error("Error adding coin to MyCrypto: ", e);
    }
  };

  return (
    <div className="coinContainer">
      <h2>{crypto.name}</h2>
      <ul>
        <li>
          <strong>Symbol:</strong> {crypto.symbol}
        </li>
        <li>
          <strong>Rank:</strong> {crypto.rank}
        </li>
        <li>
          <strong>Price (USD):</strong> {crypto.priceUsd}
        </li>
        <li>
          <strong>Explorer:</strong> {crypto.explorer}
        </li>
      </ul>
      <div>
        {isSaved ? (
          <button onClick={handleRemove}>Remove</button>
        ) : (
          <button onClick={handleSaveToMyCrypto}>Save to MyCrypto</button>
        )}
        <Link to={`/single-coin/${crypto.id}`}>View More</Link>
      </div>
    </div>
  );
}

export default CoinCard;

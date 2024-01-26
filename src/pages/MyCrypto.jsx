import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { dataBase } from "../config/firebaseConfig";
import CoinCard from "../components/CoinCard";
import { Routes, Route } from "react-router-dom";
import SingleCoin from "../components/data/SingleCoin";
import "./MyCrypto.css";

function MyCrypto({ user }) {
  const [myCryptoData, setMyCryptoData] = useState([]);

  const fetchMyCryptoData = async () => {
    try {
      let qUser;

      if (user) {
        qUser = query(
          collection(dataBase, "cryptos"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(qUser);

        console.log("User ID:", user.uid);
        console.log("Query:", qUser);
        console.log("Snapshot:", querySnapshot);

        if (querySnapshot.empty) {
          console.log("No documents found");
        } else {
          const myCryptoArray = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id,
          }));

          console.log("My Crypto Data:", myCryptoArray);
          setMyCryptoData(myCryptoArray);
        }
      } else {
        console.log("No user is logged in.");
        setMyCryptoData([]);
      }
    } catch (error) {
      console.error("Error fetching MyCrypto data: ", error);
    }
  };

  useEffect(() => {
    console.log("User:", user);
    fetchMyCryptoData();
  }, [user]);

  const handleRemove = async (crypto) => {
    try {
      const cryptoDoc = doc(dataBase, "cryptos", crypto.uid);
      await deleteDoc(cryptoDoc);

      const filtered = myCryptoData.filter((item) => item.uid !== crypto.uid);
      setMyCryptoData(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="header"> Saved Crypto</h2>
      <Routes>
        <Route
          path="*"
          element={
            <div className="cryptoContainer">
              {myCryptoData.map((crypto, index) => (
                <CoinCard
                  key={index}
                  crypto={crypto}
                  onRemove={handleRemove}
                  user={user}
                />
              ))}
            </div>
          }
        />
        <Route path="/single-coin/:id" element={<SingleCoin />} />
      </Routes>
    </div>
  );
}

export default MyCrypto;

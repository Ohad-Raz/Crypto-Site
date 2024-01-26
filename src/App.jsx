// App.jsx
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MyCrypto from "./pages/MyCrypto";
import Authentications from "./pages/Authentications";
import SingleCoin from "./components/data/SingleCoin";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar user={user} />
        <Routes>
          <Route path="*" element={<Home user={user} />} />
          <Route path="/single-coin/:coinId" element={<SingleCoin />} />
          <Route
            path="/authentications"
            element={<Authentications setUser={setUser} />}
          />
          {user ? (
            <Route path="/MyCrypto/*" element={<MyCrypto user={user} />} />
          ) : (
            <Route path="/MyCrypto/*" element={<Navigate to="*" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

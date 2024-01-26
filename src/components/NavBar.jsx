import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./NavBar.css"

function NavBar({ user }) {
  const auth = getAuth();

  return (
    <div className="NavBarContainer">
    <nav  style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Link to="/">Home</Link>

      {/* Conditionally render MyCrypto and Authentications links */}
      {user ? (
        <>
          <Link to="MyCrypto">MyCrypto</Link>
          <button onClick={() => signOut(auth)} className="signOutBtn">
            Sign Out
          </button>
        </>
      ) : (
        <Link to="authentications">Authentications</Link>
      )}
    </nav></div>
  );
}

export default NavBar;

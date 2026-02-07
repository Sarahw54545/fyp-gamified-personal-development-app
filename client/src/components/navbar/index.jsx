import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "16px",
      background: "#0b0f2a",
      color: "white"
    }}>
      <h2>⭐ Stellara</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar
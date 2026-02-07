import Navbar from "../navbar";

function MainLayout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top,#0f172a,#020617)",
      color: "white"
    }}>
      <Navbar />
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}

export default MainLayout
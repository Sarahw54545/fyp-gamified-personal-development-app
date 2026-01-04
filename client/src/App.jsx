import {useEffect, useState} from "react";
import './App.css'

function App() {
  const [message, setMessage] = useState("");

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/hello`)
  .then(res => res.json())
  .then(data => setMessage(data.message))
  .catch(err => console.error(err));
}, []);

  return (
    <>
      <h1>Gamified Personal Development App</h1>
        <div style={{ padding: "2rem" }}>
          <h2>Frontend Connected</h2>
          <p>Message from backend:</p>
          <strong>{message}</strong>
        </div>
    </>
  )
}

export default App

import { Routes, Route } from "react-router-dom";
import './styles/App.css'
import Dashboard from "./pages/dashboard"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
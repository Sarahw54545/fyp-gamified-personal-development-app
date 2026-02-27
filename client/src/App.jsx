import { Routes, Route } from "react-router-dom";
import './styles/App.css'
import Dashboard from "./pages/dashboard"
import Goals from "./pages/goals"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/goals" element={<Goals/>} />
    </Routes>
  )
}

export default App
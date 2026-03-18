import { Routes, Route } from "react-router-dom";
import './styles/App.css'
import Dashboard from "./pages/dashboard"
import Goals from "./pages/goals"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Login from "./pages/login"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute> <Goals /> </ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
import { Routes, Route } from "react-router-dom";
import './styles/App.css'
import Dashboard from "./pages/dashboard"
import Goals from "./pages/goals"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import PublicRoute from "./components/auth/PublicRoute";
import Login from "./pages/login"

function App() {

  return (
    <Routes>
      <Route path="/" element={<PublicRoute> <Login /> </PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute> <Goals /> </ProtectedRoute>} />
      <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
    </Routes>
  )
}

export default App
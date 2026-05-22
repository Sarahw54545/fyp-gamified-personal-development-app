import { Routes, Route } from "react-router-dom";
import './styles/App.css';
import Dashboard from "./pages/dashboard";
import Goals from "./pages/goals";
import Achievements from "./pages/achievements";
import Profile from "./pages/profile";
import LandingPage from "./pages/landingPage";
import About from "./pages/about";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {

  return (
    <Routes>
      <Route path="/" element={<PublicRoute> <LandingPage /> </PublicRoute>} />
      <Route path="/about" element={<PublicRoute> <About /> </PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute> <Goals /> </ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute> <Achievements /> </ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
      <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
      <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>} />
    </Routes>
  )
}

export default App
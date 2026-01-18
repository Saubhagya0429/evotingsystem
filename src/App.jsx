import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Voters from './pages/Voters';
import Candidates from './pages/Candidates';
import Positions from './pages/Positions';
import './App.css';

function App() {
  const userRole = localStorage.getItem('userRole');

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!userRole) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/voters" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Voters />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/candidates" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Candidates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/positions" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Positions />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App

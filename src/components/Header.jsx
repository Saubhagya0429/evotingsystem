import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>SecureEvoting</h1>
        </Link>
        
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          
          {userRole === 'admin' && (
            <>
              <Link to="/candidates">Candidates</Link>
              <Link to="/voters">Voters</Link>
              <Link to="/positions">Positions</Link>
            </>
          )}
          
          {userRole === 'voter' && (
            <Link to="/vote">Vote</Link>
          )}
          
          {userRole === 'candidate' && (
            <Link to="/candidate-profile">Profile</Link>
          )}
        </nav>

        <div className="auth-section">
          {userRole ? (
            <>
              <span className="user-info">
                {username} ({userRole})
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/signup" className="auth-link signup-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Home.css';

const COLORS = ['#628141', '#8BAE66', '#EBD5AB', '#1B211A'];

export default function Home() {
  const userRole = localStorage.getItem('userRole');

  // Mock data for voting statistics
  const votingData = [
    {
      position: 'President',
      candidates: [
        { name: 'Candidate A', votes: 1250, percentage: 45 },
        { name: 'Candidate B', votes: 850, percentage: 30 },
        { name: 'Candidate C', votes: 650, percentage: 23 },
        { name: 'Candidate D', votes: 50, percentage: 2 }
      ]
    },
    {
      position: 'Secretary',
      candidates: [
        { name: 'Candidate X', votes: 1400, percentage: 52 },
        { name: 'Candidate Y', votes: 900, percentage: 33 },
        { name: 'Candidate Z', votes: 400, percentage: 15 }
      ]
    },
    {
      position: 'Treasurer',
      candidates: [
        { name: 'Candidate P', votes: 1100, percentage: 42 },
        { name: 'Candidate Q', votes: 1000, percentage: 38 },
        { name: 'Candidate R', votes: 520, percentage: 20 }
      ]
    }
  ];

  const totalVotes = votingData.reduce((sum, pos) => {
    return sum + pos.candidates.reduce((poSum, cand) => poSum + cand.votes, 0);
  }, 0);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to SecureEvoting</h1>
          <p>A transparent and secure voting platform for fair elections</p>
          {!userRole && (
            <div className="hero-buttons">
              <a href="/login" className="btn btn-primary">Login</a>
              <a href="/signup" className="btn btn-secondary">Sign Up</a>
            </div>
          )}
        </div>
      </section>

      {userRole && (
        <section className="dashboard">
          <div className="dashboard-container">
            <h2>Dashboard</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Votes</h3>
                <p className="stat-number">{totalVotes}</p>
              </div>
              <div className="stat-card">
                <h3>Positions</h3>
                <p className="stat-number">{votingData.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Candidates</h3>
                <p className="stat-number">
                  {votingData.reduce((sum, pos) => sum + pos.candidates.length, 0)}
                </p>
              </div>
            </div>

            <div className="charts-section">
              {votingData.map((positionData, idx) => (
                <div key={idx} className="chart-container">
                  <h3>{positionData.position}</h3>
                  
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={positionData.candidates}
                          dataKey="votes"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {positionData.candidates.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} votes`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="candidates-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Votes</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positionData.candidates.map((candidate, idx) => (
                          <tr key={idx}>
                            <td>{candidate.name}</td>
                            <td>{candidate.votes}</td>
                            <td>
                              <div className="percentage-bar">
                                <div 
                                  className="percentage-fill" 
                                  style={{ 
                                    width: `${candidate.percentage}%`,
                                    backgroundColor: COLORS[idx % COLORS.length]
                                  }}
                                />
                                <span>{candidate.percentage}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="features">
        <div className="features-container">
          <h2>Why Choose SecureEvoting?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Military-grade encryption ensures your votes are protected</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Transparent</h3>
              <p>Real-time voting statistics and candidate information</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast</h3>
              <p>Instant vote counting and results generation</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Accessible</h3>
              <p>Easy-to-use interface for all voter types</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

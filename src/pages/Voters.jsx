import { useState, useEffect } from 'react';
import './CRUD.css';

export default function Voters() {
  const [voters, setVoters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    voterId: '',
    phone: '',
    address: '',
    votingStatus: 'not-voted'
  });

  useEffect(() => {
    // Load voters from localStorage
    const storedVoters = JSON.parse(localStorage.getItem('voters') || '[]');
    setVoters(storedVoters);
  }, []);

  const saveVoters = (updatedVoters) => {
    localStorage.setItem('voters', JSON.stringify(updatedVoters));
    setVoters(updatedVoters);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      email: '',
      voterId: '',
      phone: '',
      address: '',
      votingStatus: 'not-voted'
    });
    setShowForm(true);
  };

  const handleEdit = (voter) => {
    setEditingId(voter.id);
    setFormData(voter);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this voter?')) {
      const updated = voters.filter(v => v.id !== id);
      saveVoters(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.voterId) {
      alert('Please fill all required fields');
      return;
    }

    let updated;
    if (editingId) {
      updated = voters.map(v => v.id === editingId ? { ...formData, id: editingId } : v);
    } else {
      updated = [...voters, { ...formData, id: Date.now().toString() }];
    }

    saveVoters(updated);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Voters Management</h2>
        <button onClick={handleAdd} className="btn-add">+ Add Voter</button>
      </div>

      {showForm && (
        <div className="form-section">
          <h3>{editingId ? 'Edit Voter' : 'Add New Voter'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Voter ID *</label>
                <input
                  type="text"
                  name="voterId"
                  value={formData.voterId}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="V123456"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="123 Main Street"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Voting Status</label>
                <select name="votingStatus" value={formData.votingStatus} onChange={handleChange} className="form-input">
                  <option value="not-voted">Not Voted</option>
                  <option value="voted">Voted</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-section">
        {voters.length === 0 ? (
          <p className="empty-message">No voters found. Click "Add Voter" to create one.</p>
        ) : (
          <table className="crud-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Voter ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Voting Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {voters.map(voter => (
                <tr key={voter.id}>
                  <td>{voter.fullName}</td>
                  <td>{voter.voterId}</td>
                  <td>{voter.email}</td>
                  <td>{voter.phone}</td>
                  <td>
                    <span className={`status-badge ${voter.votingStatus}`}>
                      {voter.votingStatus === 'voted' ? '✓ Voted' : 'Not Voted'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(voter)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(voter.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

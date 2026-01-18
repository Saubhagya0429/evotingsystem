import { useState, useEffect } from 'react';
import './CRUD.css';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: 'President',
    phone: '',
    bio: '',
    platform: '',
    image: '',
    votes: 0
  });

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    setCandidates(storedCandidates);
  }, []);

  const saveCandidates = (updatedCandidates) => {
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    setCandidates(updatedCandidates);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      email: '',
      position: 'President',
      phone: '',
      bio: '',
      platform: '',
      image: '',
      votes: 0
    });
    setShowForm(true);
  };

  const handleEdit = (candidate) => {
    setEditingId(candidate.id);
    setFormData(candidate);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this candidate?')) {
      const updated = candidates.filter(c => c.id !== id);
      saveCandidates(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.position) {
      alert('Please fill all required fields');
      return;
    }

    let updated;
    if (editingId) {
      updated = candidates.map(c => c.id === editingId ? { ...formData, id: editingId } : c);
    } else {
      updated = [...candidates, { ...formData, id: Date.now().toString() }];
    }

    saveCandidates(updated);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Candidates Management</h2>
        <button onClick={handleAdd} className="btn-add">+ Add Candidate</button>
      </div>

      {showForm && (
        <div className="form-section">
          <h3>{editingId ? 'Edit Candidate' : 'Add New Candidate'}</h3>
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
                  placeholder="Candidate Name"
                />
              </div>
              <div className="form-group">
                <label>Position *</label>
                <select name="position" value={formData.position} onChange={handleChange} className="form-input">
                  <option value="President">President</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                </select>
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
                  placeholder="candidate@example.com"
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

            <div className="form-row full-width">
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Candidate biography"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row full-width">
              <div className="form-group">
                <label>Platform/Agenda</label>
                <textarea
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="What will you do if elected?"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
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
        {candidates.length === 0 ? (
          <p className="empty-message">No candidates found. Click "Add Candidate" to create one.</p>
        ) : (
          <table className="crud-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Votes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr key={candidate.id}>
                  <td>{candidate.fullName}</td>
                  <td>
                    <span className="position-badge">{candidate.position}</span>
                  </td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.votes}</td>
                  <td>
                    <button onClick={() => handleEdit(candidate)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(candidate.id)} className="btn-delete">Delete</button>
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

import { useState, useEffect } from 'react';
import './CRUD.css';

export default function Positions() {
  const [positions, setPositions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsibilities: '',
    requirements: '',
    status: 'open'
  });

  useEffect(() => {
    // Initialize with default positions if not exists
    let storedPositions = JSON.parse(localStorage.getItem('positions') || '[]');
    if (storedPositions.length === 0) {
      storedPositions = [
        {
          id: '1',
          title: 'President',
          description: 'Head of the organization',
          responsibilities: 'Lead meetings, represent organization, make key decisions',
          requirements: 'At least 2 years membership',
          status: 'open'
        },
        {
          id: '2',
          title: 'Secretary',
          description: 'Record keeping and communication',
          responsibilities: 'Maintain records, handle communications, organize events',
          requirements: 'At least 1 year membership',
          status: 'open'
        },
        {
          id: '3',
          title: 'Treasurer',
          description: 'Financial management',
          responsibilities: 'Manage funds, prepare budgets, handle finances',
          requirements: 'At least 1 year membership',
          status: 'open'
        }
      ];
      localStorage.setItem('positions', JSON.stringify(storedPositions));
    }
    setPositions(storedPositions);
  }, []);

  const savePositions = (updatedPositions) => {
    localStorage.setItem('positions', JSON.stringify(updatedPositions));
    setPositions(updatedPositions);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      responsibilities: '',
      requirements: '',
      status: 'open'
    });
    setShowForm(true);
  };

  const handleEdit = (position) => {
    setEditingId(position.id);
    setFormData(position);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this position?')) {
      const updated = positions.filter(p => p.id !== id);
      savePositions(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    let updated;
    if (editingId) {
      updated = positions.map(p => p.id === editingId ? { ...formData, id: editingId } : p);
    } else {
      updated = [...positions, { ...formData, id: Date.now().toString() }];
    }

    savePositions(updated);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Positions Management</h2>
        <button onClick={handleAdd} className="btn-add">+ Add Position</button>
      </div>

      {showForm && (
        <div className="form-section">
          <h3>{editingId ? 'Edit Position' : 'Add New Position'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Position Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., President"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="filled">Filled</option>
                </select>
              </div>
            </div>

            <div className="form-row full-width">
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Brief description of the position"
                  rows="2"
                />
              </div>
            </div>

            <div className="form-row full-width">
              <div className="form-group">
                <label>Key Responsibilities</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="List the main responsibilities"
                  rows="3"
                />
              </div>
            </div>

            <div className="form-row full-width">
              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="List qualifications and requirements"
                  rows="3"
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
        {positions.length === 0 ? (
          <p className="empty-message">No positions found.</p>
        ) : (
          <table className="crud-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map(position => (
                <tr key={position.id}>
                  <td className="bold">{position.title}</td>
                  <td>{position.description}</td>
                  <td>
                    <span className={`status-badge ${position.status}`}>
                      {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(position)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(position.id)} className="btn-delete">Delete</button>
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

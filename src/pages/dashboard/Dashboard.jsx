import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../../components/sidebar/Sidebar';
import './dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entries, setEntries] = useState(() => {
    const stored = localStorage.getItem('passwords');
    return stored ? JSON.parse(stored) : [];
  });
  const [newEntry, setNewEntry] = useState({ name: '', username: '', password: '' });
  const [showPasswords, setShowPasswords] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('passwords', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    setNewEntry({ name: '', username: '', password: '' });
    alert('🎉 Password Saved!');
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    alert('🗑️ Password Deleted!');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredEntries = entries.filter((entry) =>
    entry.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="dashboard-wrapper">
      {/* Hamburger for mobile */}
      <button className="hamburger" onClick={() => setSidebarOpen(true)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">🔐 TPassword</h1>

        {/* Search + Add Button */}
        <div className="top-bar">
          <input
            type="text"
            placeholder="🔍 Search by site name..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          <button onClick={scrollToForm} className="add-btn">
            ➕ Add New
          </button>
        </div>

        <div className="password-section">
          <h2>🔒 Stored Passwords</h2>
          <button onClick={() => setShowPasswords(!showPasswords)} className="toggle-btn">
            {showPasswords ? '🙈 Hide Passwords' : '👁️ Show Passwords'}
          </button>

          <div className="entries">
            {filteredEntries.length === 0 ? (
              <p className="no-entries">No matching passwords found.</p>
            ) : (
              filteredEntries.map((entry, index) => (
                <div key={index} className={`entry theme-${index % 4}`}>
                  <h3>{entry.name}</h3>
                  <p>👤 {entry.username}</p>
                  <p>
                    🔑 {showPasswords ? entry.password : '*'.repeat(entry.password.length)}
                  </p>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add New Form */}
        <div className="form-section" ref={formRef}>
          <h2>Add New Entry</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              name="name"
              placeholder="Website Name"
              value={newEntry.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username or Email"
              value={newEntry.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newEntry.password}
              onChange={handleChange}
              required
            />
            <button type="submit">💾 Save Password</button>
          </form>
        </div>

        {/* Vault Entries */}
      </div>
    </div>
  );
};

export default Dashboard;

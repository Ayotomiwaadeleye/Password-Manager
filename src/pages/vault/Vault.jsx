import { React, useState, useEffect, useContext } from 'react';
import { FaLock, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Sidebar from '../../components/sidebar/Sidebar';
import './vault.css';
import { ThemeContext } from '../../context/ThemeContext';

const defaultCategories = ['All', 'Work', 'School', 'Personal'];

const Vault = () => {
  const { darkmode } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [entries, setEntries] = useState(() => {
    const stored = localStorage.getItem('vaultItems');
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState('All');
  const [newItem, setNewItem] = useState({ name: '', username: '', password: '', category: 'Personal' });
  const [isAdding, setIsAdding] = useState(false);
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('vaultCategories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem('vaultItems', JSON.stringify(entries));
    localStorage.setItem('vaultCategories', JSON.stringify(categories));
  }, [entries, categories]);

  const handleAddNewItem = (e) => {
    e.preventDefault();
    setEntries([...entries, newItem]);
    setNewItem({ name: '', username: '', password: '', category: 'Personal' });
    setIsAdding(false);
  };

  const filteredEntries = filter === 'All'
    ? entries
    : entries.filter(entry => entry.category === filter);

  const handleAddCategory = () => {
    const newCategory = prompt('Enter new category name:');
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div className="vault-layout {`vault-container ${darkMode}`}" >
      {/* Hamburger for mobile */}
      <button className="vault-hamburger" onClick={() => setSidebarOpen(true)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="vault-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <motion.div
        className="vault-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="vault-wrapper">
          <div className="vault-header">
            <h1 className="vault-title">
              <FaLock className="icon" /> Vault
            </h1>
            <div className="vault-controls">
              <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
              <button onClick={() => setIsAdding(true)}>➕ Add Item</button>
              <button onClick={handleAddCategory}>📂 Add Category</button>
            </div>
          </div>

          {/* Add New Vault Item Form */}
          {isAdding && (
            <div className="vault-form">
              <form onSubmit={handleAddNewItem}>
                <input
                  type="text"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={newItem.username}
                  onChange={(e) => setNewItem({ ...newItem, username: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={newItem.password}
                  onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
                  required
                />
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <button type="submit">Save</button>
              </form>
            </div>
          )}

          {/* Vault Items Grid */}
          <div className="vault-grid">
            {filteredEntries.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: '#ccc' }}>No items in this category.</p>
            ) : (
              filteredEntries.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`vault-item theme-${index % 4}`}
                >
                  <h3>{item.name}</h3>
                  <p>👤 {item.username}</p>
                  <p>🔑 {'*'.repeat(item.password.length)}</p>
                  <p className="category-label">📁 {item.category}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Vault;

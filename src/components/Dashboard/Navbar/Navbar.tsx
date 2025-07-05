'use client';
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import NotificationIcon from '../../../assets/NotificationIcon';

const employees = [
  'John Doe',
  'Jane Smith',
  'Michael Johnson',
  'Emily Williams',
  'Anurag Kumar',
];

const Navbar = () => {
   const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredEmployees = employees.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.searchBox}>
          <Search size={18} style={{color: '#2b2c31', marginTop: 2 }} />
          <ChevronDown size={16} style={{color: '#2b2c31', marginTop: 2 }}/>
          <input
            type="text"
          placeholder="Search Employee"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // delay to allow clicking dropdown
          className={styles.searchInput}
          />   
        
        {showDropdown && query && (
        <div className={styles.dropdown}>
          {filteredEmployees.length ? (
            filteredEmployees.map((name, idx) => (
              <div key={idx} className={styles.dropdownItem}>
                {name}
              </div>
            ))
          ) : (
            <div className={styles.dropdownItem}>No results found</div>
          )}
        </div>
      )}
      </div>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.essButton}>Go to ESS</button>
        <div className={styles.officeDropdown}>
          ABC Head office <ChevronDown size={16} />
        </div>
        <button className={styles.iconButton}><NotificationIcon /></button>
        <img
          src="https://randomuser.me/api/portraits/women/1.jpg"
          alt="User"
          className={styles.avatar}
        />
      </div>
    </header>
  );
};

export default Navbar;

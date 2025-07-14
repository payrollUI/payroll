'use client';
import React, { useState } from 'react';
import { Save, User, Upload } from 'lucide-react';
import styles from '../settings.module.css';
import { mockUserProfile } from '@/data/PayrollData';

export default function ProfileSettingsPage() {
  const [profileData, setProfileData] = useState({
    name: mockUserProfile.name,
    email: mockUserProfile.email,
    position: mockUserProfile.position,
    phone: '+91 98765 43210',
    department: 'Human Resources',
    employeeId: 'EMP001',
    dateOfJoining: '2023-01-15',
    address: '456 Residential Area, Mumbai, Maharashtra 400002',
    emergencyContact: '+91 87654 32109',
    emergencyContactName: 'John Doe',
    bloodGroup: 'O+',
    dateOfBirth: '1990-05-15'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile data:', profileData);
    alert('Profile updated successfully!');
  };

  const handleImageUpload = () => {
    // Handle image upload logic
    alert('Image upload functionality will be implemented');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <User size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>My Profile</h1>
          <p className={styles.settingsSubtitle}>
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Profile Picture Section */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Profile Picture</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <img 
              src={mockUserProfile.avatar} 
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #e5e7eb'
              }}
            />
            <button 
              className={styles.saveButton}
              onClick={handleImageUpload}
              style={{ background: '#6b7280' }}
            >
              <Upload size={16} />
              Upload New Picture
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name *</label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address *</label>
              <input
                type="email"
                className={styles.formInput}
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone Number</label>
              <input
                type="tel"
                className={styles.formInput}
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date of Birth</label>
              <input
                type="date"
                className={styles.formInput}
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Blood Group</label>
              <select
                className={styles.formSelect}
                value={profileData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Address</label>
            <textarea
              className={styles.formTextarea}
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your complete address"
              rows={3}
            />
          </div>
        </div>

        {/* Work Information */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Work Information</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Employee ID</label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.employeeId}
                disabled
                style={{ background: '#f3f4f6', color: '#6b7280' }}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Position</label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Enter your position"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Department</label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="Enter your department"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date of Joining</label>
              <input
                type="date"
                className={styles.formInput}
                value={profileData.dateOfJoining}
                disabled
                style={{ background: '#f3f4f6', color: '#6b7280' }}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Emergency Contact</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Emergency Contact Name</label>
              <input
                type="text"
                className={styles.formInput}
                value={profileData.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                placeholder="Enter emergency contact name"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Emergency Contact Number</label>
              <input
                type="tel"
                className={styles.formInput}
                value={profileData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Enter emergency contact number"
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Building2 } from 'lucide-react';
import styles from '../settings.module.css';

export default function OrganizationSettingsPage() {
  const router = useRouter();
  const [organizationData, setOrganizationData] = useState({
    name: 'ABC Head Office',
    registrationNumber: 'REG123456789',
    panNumber: 'ABCDE1234F',
    gstin: '22ABCDE1234F1Z5',
    address: '123 Business District, Mumbai, Maharashtra 400001',
    phone: '+91 22 1234 5678',
    email: 'contact@abccompany.com',
    website: 'www.abccompany.com'
  });

  const handleInputChange = (field: string, value: string) => {
    setOrganizationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving organization data:', organizationData);
    
    // Mark this task as completed
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes('task_001')) {
      completedTasks.push('task_001');
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    alert('Organization details saved successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Building2 size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Organization Details</h1>
          <p className={styles.settingsSubtitle}>
            Manage your organization information and registration details
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Organization Name *</label>
              <input
                type="text"
                className={styles.formInput}
                value={organizationData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter organization name"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Registration Number</label>
              <input
                type="text"
                className={styles.formInput}
                value={organizationData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="Enter registration number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>PAN Number *</label>
              <input
                type="text"
                className={styles.formInput}
                value={organizationData.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                placeholder="Enter PAN number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>GSTIN</label>
              <input
                type="text"
                className={styles.formInput}
                value={organizationData.gstin}
                onChange={(e) => handleInputChange('gstin', e.target.value)}
                placeholder="Enter GSTIN"
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Contact Information</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Address *</label>
            <textarea
              className={styles.formTextarea}
              value={organizationData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter complete address"
              rows={3}
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone Number</label>
              <input
                type="tel"
                className={styles.formInput}
                value={organizationData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input
                type="email"
                className={styles.formInput}
                value={organizationData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Website</label>
              <input
                type="url"
                className={styles.formInput}
                value={organizationData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="Enter website URL"
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
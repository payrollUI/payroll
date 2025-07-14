'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, FileText, Calculator } from 'lucide-react';
import styles from '../settings.module.css';

export default function TaxDetailsPage() {
  const router = useRouter();
  const [taxData, setTaxData] = useState({
    financialYear: '2023-24',
    panNumber: 'ABCDE1234F',
    tanNumber: 'MUMB12345A',
    pfAccountNumber: 'MH/MUM/12345/67890',
    esiNumber: '12345678901234567890',
    ptRegistrationNumber: 'PT123456789',
    pfDeductionRate: '12',
    esiDeductionRate: '0.75',
    professionalTaxAmount: '200',
    tdsSection: '194A',
    exemptionLimit: '250000',
    standardDeduction: '50000'
  });

  const handleInputChange = (field: string, value: string) => {
    setTaxData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving tax details:', taxData);
    
    // Mark this task as completed
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes('task_002')) {
      completedTasks.push('task_002');
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    alert('Tax details saved successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Calculator size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Tax Details</h1>
          <p className={styles.settingsSubtitle}>
            Configure tax settings, deduction rates, and compliance details
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Basic Tax Information */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Basic Tax Information</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Financial Year *</label>
              <select
                className={styles.formInput}
                value={taxData.financialYear}
                onChange={(e) => handleInputChange('financialYear', e.target.value)}
              >
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
                <option value="2021-22">2021-22</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>PAN Number *</label>
              <input
                type="text"
                className={styles.formInput}
                value={taxData.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                placeholder="Enter PAN number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>TAN Number</label>
              <input
                type="text"
                className={styles.formInput}
                value={taxData.tanNumber}
                onChange={(e) => handleInputChange('tanNumber', e.target.value)}
                placeholder="Enter TAN number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>TDS Section</label>
              <select
                className={styles.formInput}
                value={taxData.tdsSection}
                onChange={(e) => handleInputChange('tdsSection', e.target.value)}
              >
                <option value="194A">194A - Interest on Securities</option>
                <option value="194C">194C - Payment to Contractors</option>
                <option value="194H">194H - Commission or Brokerage</option>
                <option value="194J">194J - Professional Services</option>
              </select>
            </div>
          </div>
        </div>

        {/* Provident Fund Details */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Provident Fund Details</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>PF Account Number</label>
              <input
                type="text"
                className={styles.formInput}
                value={taxData.pfAccountNumber}
                onChange={(e) => handleInputChange('pfAccountNumber', e.target.value)}
                placeholder="Enter PF account number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>PF Deduction Rate (%)</label>
              <input
                type="number"
                className={styles.formInput}
                value={taxData.pfDeductionRate}
                onChange={(e) => handleInputChange('pfDeductionRate', e.target.value)}
                placeholder="Enter PF deduction rate"
                step="0.01"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* ESI Details */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>ESI Details</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>ESI Number</label>
              <input
                type="text"
                className={styles.formInput}
                value={taxData.esiNumber}
                onChange={(e) => handleInputChange('esiNumber', e.target.value)}
                placeholder="Enter ESI number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>ESI Deduction Rate (%)</label>
              <input
                type="number"
                className={styles.formInput}
                value={taxData.esiDeductionRate}
                onChange={(e) => handleInputChange('esiDeductionRate', e.target.value)}
                placeholder="Enter ESI deduction rate"
                step="0.01"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Professional Tax */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Professional Tax</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>PT Registration Number</label>
              <input
                type="text"
                className={styles.formInput}
                value={taxData.ptRegistrationNumber}
                onChange={(e) => handleInputChange('ptRegistrationNumber', e.target.value)}
                placeholder="Enter PT registration number"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Monthly PT Amount (₹)</label>
              <input
                type="number"
                className={styles.formInput}
                value={taxData.professionalTaxAmount}
                onChange={(e) => handleInputChange('professionalTaxAmount', e.target.value)}
                placeholder="Enter PT amount"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Income Tax Settings */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Income Tax Settings</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Exemption Limit (₹)</label>
              <input
                type="number"
                className={styles.formInput}
                value={taxData.exemptionLimit}
                onChange={(e) => handleInputChange('exemptionLimit', e.target.value)}
                placeholder="Enter exemption limit"
                min="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Standard Deduction (₹)</label>
              <input
                type="number"
                className={styles.formInput}
                value={taxData.standardDeduction}
                onChange={(e) => handleInputChange('standardDeduction', e.target.value)}
                placeholder="Enter standard deduction"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save Tax Details
          </button>
        </div>
      </div>
    </div>
  );
} 
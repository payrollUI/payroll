'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Archive, Upload, Download, Calendar, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import styles from '../settings.module.css';
import { LinearProgress } from '@mui/material';

interface PayrollRecord {
  id: string;
  period: string;
  employees: number;
  totalAmount: string;
  status: 'completed' | 'pending' | 'approved';
  processedDate: string;
  approvedBy?: string;
}

export default function PriorPayrollPage() {
  const router = useRouter();
  const [priorRecords] = useState<PayrollRecord[]>([
    {
      id: '1',
      period: 'December 2023',
      employees: 24,
      totalAmount: '18,50,000',
      status: 'completed',
      processedDate: '2024-01-05',
      approvedBy: 'John Doe'
    },
    {
      id: '2',
      period: 'November 2023',
      employees: 23,
      totalAmount: '17,25,000',
      status: 'completed',
      processedDate: '2023-12-05',
      approvedBy: 'John Doe'
    },
    {
      id: '3',
      period: 'October 2023',
      employees: 22,
      totalAmount: '16,50,000',
      status: 'completed',
      processedDate: '2023-11-05',
      approvedBy: 'John Doe'
    },
    {
      id: '4',
      period: 'September 2023',
      employees: 22,
      totalAmount: '16,50,000',
      status: 'pending',
      processedDate: '2023-10-05'
    }
  ]);

  const [importSettings, setImportSettings] = useState({
    allowOverwrite: false,
    validateData: true,
    backupBeforeImport: true,
    notifyOnCompletion: true
  });

  const handleImportSettingChange = (field: string, value: boolean) => {
    setImportSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImportPayroll = () => {
    alert('Payroll import functionality will be implemented');
  };

  const handleExportPayroll = (recordId: string) => {
    alert(`Exporting payroll record ${recordId}`);
  };

  const handleViewDetails = (recordId: string) => {
    alert(`Viewing details for payroll record ${recordId}`);
  };

  const handleSave = () => {
    console.log('Saving prior payroll settings:', importSettings);
    
    // Mark this task as completed
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes('task_007')) {
      completedTasks.push('task_007');
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    alert('Prior payroll settings saved successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#10b981" />;
      case 'approved':
        return <CheckCircle size={16} color="#3b82f6" />;
      case 'pending':
        return <AlertTriangle size={16} color="#f59e0b" />;
      default:
        return <AlertTriangle size={16} color="#ef4444" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'approved':
        return '#3b82f6';
      case 'pending':
        return '#f59e0b';
      default:
        return '#ef4444';
    }
  };

  const setupTasks = [
    'task_001', 'task_002', 'task_003', 'task_004', 'task_005', 'task_006', 'task_007'
  ];

  const completedTasksCount = setupTasks.filter(taskId => {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    return completedTasks.includes(taskId);
  }).length;

  const completionPercentage = (completedTasksCount / setupTasks.length) * 100;

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Archive size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Prior Payroll</h1>
          <p className={styles.settingsSubtitle}>
            View, manage, and import historical payroll data and records
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Progress Bar */}
        <div className={styles.progressBarContainer}>
          <LinearProgress 
            variant="determinate" 
            value={completionPercentage} 
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'white',
                borderRadius: 4,
              }
            }}
          />
          <span className={styles.progressPercentage}>
            {Math.round(completionPercentage)}% Complete
          </span>
        </div>

        {/* Import/Export Section */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Import & Export</h3>
          
          <div className={styles.infoBox}>
            <div className={styles.infoTitle}>Data Migration</div>
            <div className={styles.infoText}>
              Import historical payroll data from previous systems or export current data for backup and analysis purposes.
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Upload Payroll Data</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="file"
                  className={styles.formInput}
                  accept=".csv,.xlsx,.xls"
                  style={{ flex: 1 }}
                />
                <button
                  className={styles.saveButton}
                  onClick={handleImportPayroll}
                  style={{ background: '#10b981', whiteSpace: 'nowrap' }}
                >
                  <Upload size={16} />
                  Import Data
                </button>
              </div>
              <div className={styles.infoText} style={{ marginTop: '0.5rem' }}>
                Supported formats: CSV, Excel (.xlsx, .xls)
              </div>
            </div>
          </div>

          {/* Import Settings */}
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
              Import Settings
            </h4>
            
            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Allow Overwrite</div>
                <div className={styles.toggleDescription}>Overwrite existing records if duplicates are found</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${importSettings.allowOverwrite ? styles.active : ''}`}
                onClick={() => handleImportSettingChange('allowOverwrite', !importSettings.allowOverwrite)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Validate Data</div>
                <div className={styles.toggleDescription}>Validate imported data for consistency and errors</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${importSettings.validateData ? styles.active : ''}`}
                onClick={() => handleImportSettingChange('validateData', !importSettings.validateData)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Backup Before Import</div>
                <div className={styles.toggleDescription}>Create backup of existing data before importing</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${importSettings.backupBeforeImport ? styles.active : ''}`}
                onClick={() => handleImportSettingChange('backupBeforeImport', !importSettings.backupBeforeImport)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Notify on Completion</div>
                <div className={styles.toggleDescription}>Send notification when import process is completed</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${importSettings.notifyOnCompletion ? styles.active : ''}`}
                onClick={() => handleImportSettingChange('notifyOnCompletion', !importSettings.notifyOnCompletion)}
              />
            </div>
          </div>
        </div>

        {/* Payroll History */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Payroll History</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {priorRecords.map((record) => (
              <div key={record.id} className={styles.settingsCard}>
                <div className={styles.cardContent}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                    <div>
                      <div className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} />
                        {record.period}
                      </div>
                      <div className={styles.cardDescription}>
                        Processed: {new Date(record.processedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Employees
                      </div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                        {record.employees}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Total Amount
                      </div>
                      <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                        ₹{record.totalAmount}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Status
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        background: `${getStatusColor(record.status)}20`,
                        color: getStatusColor(record.status),
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        width: 'fit-content'
                      }}>
                        {getStatusIcon(record.status)}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        className={styles.saveButton}
                        onClick={() => handleViewDetails(record.id)}
                        style={{ background: '#6b7280', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        <FileText size={14} />
                        View Details
                      </button>
                      <button
                        className={styles.saveButton}
                        onClick={() => handleExportPayroll(record.id)}
                        style={{ background: '#3b82f6', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        <Download size={14} />
                        Export
                      </button>
                    </div>
                  </div>

                  {record.approvedBy && (
                    <div style={{ 
                      marginTop: '1rem', 
                      paddingTop: '1rem', 
                      borderTop: '1px solid #f3f4f6',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      Approved by: <span style={{ fontWeight: 500 }}>{record.approvedBy}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Data Retention Policy</h3>
          
          <div className={styles.infoBox}>
            <div className={styles.infoTitle}>Retention Settings</div>
            <div className={styles.infoText}>
              Configure how long payroll data should be retained in the system. Ensure compliance with local regulations and organizational policies.
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Retention Period (Years)</label>
              <select className={styles.formInput} defaultValue="7">
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
                <option value="7">7 Years</option>
                <option value="10">10 Years</option>
                <option value="indefinite">Indefinite</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Archive After (Years)</label>
              <select className={styles.formInput} defaultValue="2">
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
} 
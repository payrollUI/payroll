'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Calendar, Clock } from 'lucide-react';
import styles from '../settings.module.css';

export default function PaySchedulePage() {
  const router = useRouter();
  const [scheduleData, setScheduleData] = useState({
    payFrequency: 'monthly',
    payDay: '1',
    payWeek: '1',
    payPeriodStart: '1',
    payPeriodEnd: '30',
    overtimePolicy: 'enabled',
    overtimeRate: '1.5',
    weeklyHours: '40',
    monthlyWorkingDays: '22',
    timeTrackingEnabled: true,
    autoProcessPayroll: false,
    payrollCutoffDay: '25',
    payrollApprovalRequired: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setScheduleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving pay schedule:', scheduleData);
    
    // Mark this task as completed
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes('task_003')) {
      completedTasks.push('task_003');
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    alert('Pay schedule saved successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Calendar size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Pay Schedule</h1>
          <p className={styles.settingsSubtitle}>
            Configure payroll frequency, working hours, and payment schedules
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Pay Frequency */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Pay Frequency</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Pay Frequency *</label>
              <select
                className={styles.formInput}
                value={scheduleData.payFrequency}
                onChange={(e) => handleInputChange('payFrequency', e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="semi-monthly">Semi-Monthly</option>
              </select>
            </div>

            {scheduleData.payFrequency === 'monthly' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Pay Day of Month</label>
                <select
                  className={styles.formInput}
                  value={scheduleData.payDay}
                  onChange={(e) => handleInputChange('payDay', e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {scheduleData.payFrequency === 'weekly' && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Pay Day of Week</label>
                <select
                  className={styles.formInput}
                  value={scheduleData.payWeek}
                  onChange={(e) => handleInputChange('payWeek', e.target.value)}
                >
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                </select>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Payroll Cutoff Day</label>
              <select
                className={styles.formInput}
                value={scheduleData.payrollCutoffDay}
                onChange={(e) => handleInputChange('payrollCutoffDay', e.target.value)}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pay Period */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Pay Period</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Pay Period Start Day</label>
              <select
                className={styles.formInput}
                value={scheduleData.payPeriodStart}
                onChange={(e) => handleInputChange('payPeriodStart', e.target.value)}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Pay Period End Day</label>
              <select
                className={styles.formInput}
                value={scheduleData.payPeriodEnd}
                onChange={(e) => handleInputChange('payPeriodEnd', e.target.value)}
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Monthly Working Days</label>
              <input
                type="number"
                className={styles.formInput}
                value={scheduleData.monthlyWorkingDays}
                onChange={(e) => handleInputChange('monthlyWorkingDays', e.target.value)}
                placeholder="Enter working days per month"
                min="1"
                max="31"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Weekly Hours</label>
              <input
                type="number"
                className={styles.formInput}
                value={scheduleData.weeklyHours}
                onChange={(e) => handleInputChange('weeklyHours', e.target.value)}
                placeholder="Enter hours per week"
                min="1"
                max="168"
              />
            </div>
          </div>
        </div>

        {/* Overtime Settings */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Overtime Settings</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Overtime Policy</label>
              <select
                className={styles.formInput}
                value={scheduleData.overtimePolicy}
                onChange={(e) => handleInputChange('overtimePolicy', e.target.value)}
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
                <option value="approval-required">Approval Required</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Overtime Rate (Multiplier)</label>
              <input
                type="number"
                className={styles.formInput}
                value={scheduleData.overtimeRate}
                onChange={(e) => handleInputChange('overtimeRate', e.target.value)}
                placeholder="Enter overtime rate"
                step="0.1"
                min="1"
                max="3"
              />
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Automation Settings</h3>
          
          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Time Tracking</div>
              <div className={styles.toggleDescription}>Enable automatic time tracking for employees</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${scheduleData.timeTrackingEnabled ? styles.active : ''}`}
              onClick={() => handleInputChange('timeTrackingEnabled', !scheduleData.timeTrackingEnabled)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Auto Process Payroll</div>
              <div className={styles.toggleDescription}>Automatically process payroll on schedule</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${scheduleData.autoProcessPayroll ? styles.active : ''}`}
              onClick={() => handleInputChange('autoProcessPayroll', !scheduleData.autoProcessPayroll)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Payroll Approval Required</div>
              <div className={styles.toggleDescription}>Require approval before processing payroll</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${scheduleData.payrollApprovalRequired ? styles.active : ''}`}
              onClick={() => handleInputChange('payrollApprovalRequired', !scheduleData.payrollApprovalRequired)}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save Pay Schedule
          </button>
        </div>
      </div>
    </div>
  );
} 
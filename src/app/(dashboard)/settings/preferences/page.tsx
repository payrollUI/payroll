'use client';
import React, { useState } from 'react';
import { Save, Settings, Globe, Clock, DollarSign, Bell, Eye, Palette } from 'lucide-react';
import styles from '../settings.module.css';

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    // General Preferences
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'INR',
    currencyPosition: 'before',
    numberFormat: 'indian',
    
    // Display Preferences
    theme: 'light',
    sidebarCollapsed: false,
    showWelcomeMessage: true,
    showQuickActions: true,
    dashboardRefreshInterval: 300,
    
    // Notification Preferences
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    
    // Payroll Preferences
    defaultPayrollFrequency: 'monthly',
    autoSaveInterval: 60,
    showPayrollPreview: true,
    requireApprovalForChanges: true,
    
    // Privacy Preferences
    shareUsageData: false,
    allowAnalytics: true,
    showOnlineStatus: true,
    publicProfile: false
  });

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
    alert('Preferences saved successfully!');
  };

  const handleResetToDefault = () => {
    if (confirm('Are you sure you want to reset all preferences to default values?')) {
      // Reset logic here
      alert('Preferences reset to default values');
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Settings size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Preferences</h1>
          <p className={styles.settingsSubtitle}>
            Customize your application experience and default settings
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* General Preferences */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <Globe size={20} style={{ marginRight: '0.5rem' }} />
            General Preferences
          </h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Language</label>
              <select
                className={styles.formInput}
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="gu">Gujarati</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Timezone</label>
              <select
                className={styles.formInput}
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              >
                <option value="Asia/Kolkata">India Standard Time (IST)</option>
                <option value="UTC">Coordinated Universal Time (UTC)</option>
                <option value="America/New_York">Eastern Time (EST)</option>
                <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date Format</label>
              <select
                className={styles.formInput}
                value={preferences.dateFormat}
                onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Time Format</label>
              <select
                className={styles.formInput}
                value={preferences.timeFormat}
                onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
              >
                <option value="24h">24 Hour (14:30)</option>
                <option value="12h">12 Hour (2:30 PM)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Currency</label>
              <select
                className={styles.formInput}
                value={preferences.currency}
                onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="AED">UAE Dirham (د.إ)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Number Format</label>
              <select
                className={styles.formInput}
                value={preferences.numberFormat}
                onChange={(e) => handlePreferenceChange('numberFormat', e.target.value)}
              >
                <option value="indian">Indian (1,00,000)</option>
                <option value="international">International (100,000)</option>
                <option value="european">European (100.000,00)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <Palette size={20} style={{ marginRight: '0.5rem' }} />
            Display Preferences
          </h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Theme</label>
              <select
                className={styles.formInput}
                value={preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Dashboard Refresh (seconds)</label>
              <select
                className={styles.formInput}
                value={preferences.dashboardRefreshInterval}
                onChange={(e) => handlePreferenceChange('dashboardRefreshInterval', parseInt(e.target.value))}
              >
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
                <option value="1800">30 minutes</option>
                <option value="0">Never</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Collapsed Sidebar</div>
                <div className={styles.toggleDescription}>Start with sidebar collapsed by default</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${preferences.sidebarCollapsed ? styles.active : ''}`}
                onClick={() => handlePreferenceChange('sidebarCollapsed', !preferences.sidebarCollapsed)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Show Welcome Message</div>
                <div className={styles.toggleDescription}>Display welcome message on dashboard</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${preferences.showWelcomeMessage ? styles.active : ''}`}
                onClick={() => handlePreferenceChange('showWelcomeMessage', !preferences.showWelcomeMessage)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Show Quick Actions</div>
                <div className={styles.toggleDescription}>Display quick action buttons on dashboard</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${preferences.showQuickActions ? styles.active : ''}`}
                onClick={() => handlePreferenceChange('showQuickActions', !preferences.showQuickActions)}
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <Bell size={20} style={{ marginRight: '0.5rem' }} />
            Notification Preferences
          </h3>
          
          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Email Notifications</div>
              <div className={styles.toggleDescription}>Receive notifications via email</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.emailNotifications ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('emailNotifications', !preferences.emailNotifications)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Push Notifications</div>
              <div className={styles.toggleDescription}>Receive browser push notifications</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.pushNotifications ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('pushNotifications', !preferences.pushNotifications)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>SMS Notifications</div>
              <div className={styles.toggleDescription}>Receive critical notifications via SMS</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.smsNotifications ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('smsNotifications', !preferences.smsNotifications)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Desktop Notifications</div>
              <div className={styles.toggleDescription}>Show desktop notifications when app is open</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.desktopNotifications ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('desktopNotifications', !preferences.desktopNotifications)}
            />
          </div>
        </div>

        {/* Payroll Preferences */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <DollarSign size={20} style={{ marginRight: '0.5rem' }} />
            Payroll Preferences
          </h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Default Payroll Frequency</label>
              <select
                className={styles.formInput}
                value={preferences.defaultPayrollFrequency}
                onChange={(e) => handlePreferenceChange('defaultPayrollFrequency', e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Auto-save Interval (seconds)</label>
              <select
                className={styles.formInput}
                value={preferences.autoSaveInterval}
                onChange={(e) => handlePreferenceChange('autoSaveInterval', parseInt(e.target.value))}
              >
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="120">2 minutes</option>
                <option value="300">5 minutes</option>
                <option value="0">Disabled</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Show Payroll Preview</div>
                <div className={styles.toggleDescription}>Display preview before processing payroll</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${preferences.showPayrollPreview ? styles.active : ''}`}
                onClick={() => handlePreferenceChange('showPayrollPreview', !preferences.showPayrollPreview)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Require Approval for Changes</div>
                <div className={styles.toggleDescription}>Require approval for payroll modifications</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${preferences.requireApprovalForChanges ? styles.active : ''}`}
                onClick={() => handlePreferenceChange('requireApprovalForChanges', !preferences.requireApprovalForChanges)}
              />
            </div>
          </div>
        </div>

        {/* Privacy Preferences */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <Eye size={20} style={{ marginRight: '0.5rem' }} />
            Privacy Preferences
          </h3>
          
          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Share Usage Data</div>
              <div className={styles.toggleDescription}>Help improve the application by sharing anonymous usage data</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.shareUsageData ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('shareUsageData', !preferences.shareUsageData)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Allow Analytics</div>
              <div className={styles.toggleDescription}>Enable analytics tracking for better user experience</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.allowAnalytics ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('allowAnalytics', !preferences.allowAnalytics)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Show Online Status</div>
              <div className={styles.toggleDescription}>Show your online status to other users</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.showOnlineStatus ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('showOnlineStatus', !preferences.showOnlineStatus)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Public Profile</div>
              <div className={styles.toggleDescription}>Make your profile visible to other users in the organization</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${preferences.publicProfile ? styles.active : ''}`}
              onClick={() => handlePreferenceChange('publicProfile', !preferences.publicProfile)}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            className={styles.cancelButton} 
            onClick={handleResetToDefault}
            style={{ marginRight: '1rem' }}
          >
            Reset to Default
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
} 
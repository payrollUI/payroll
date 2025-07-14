'use client';
import React, { useState } from 'react';
import { Save, Bell, Mail, Smartphone, Monitor, Clock, User, DollarSign, FileText } from 'lucide-react';
import styles from '../settings.module.css';

interface NotificationSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
}

export default function NotificationsSettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      category: 'Payroll',
      name: 'Payroll Processing',
      description: 'Notifications when payroll is processed or requires approval',
      email: true,
      push: true,
      sms: false,
      desktop: true
    },
    {
      id: '2',
      category: 'Payroll',
      name: 'Payroll Errors',
      description: 'Critical errors during payroll processing',
      email: true,
      push: true,
      sms: true,
      desktop: true
    },
    {
      id: '3',
      category: 'Payroll',
      name: 'Payment Confirmations',
      description: 'Confirmations when payments are successfully processed',
      email: true,
      push: false,
      sms: false,
      desktop: false
    },
    {
      id: '4',
      category: 'Employee',
      name: 'New Employee Registration',
      description: 'When a new employee is added to the system',
      email: true,
      push: true,
      sms: false,
      desktop: true
    },
    {
      id: '5',
      category: 'Employee',
      name: 'Employee Profile Updates',
      description: 'When employee information is modified',
      email: false,
      push: true,
      sms: false,
      desktop: false
    },
    {
      id: '6',
      category: 'Employee',
      name: 'Leave Requests',
      description: 'New leave requests requiring approval',
      email: true,
      push: true,
      sms: false,
      desktop: true
    },
    {
      id: '7',
      category: 'System',
      name: 'System Maintenance',
      description: 'Scheduled maintenance and system updates',
      email: true,
      push: false,
      sms: false,
      desktop: false
    },
    {
      id: '8',
      category: 'System',
      name: 'Security Alerts',
      description: 'Security-related notifications and alerts',
      email: true,
      push: true,
      sms: true,
      desktop: true
    },
    {
      id: '9',
      category: 'Reports',
      name: 'Report Generation',
      description: 'When reports are generated and ready for download',
      email: true,
      push: false,
      sms: false,
      desktop: true
    },
    {
      id: '10',
      category: 'Reports',
      name: 'Compliance Reminders',
      description: 'Reminders for compliance deadlines and requirements',
      email: true,
      push: true,
      sms: false,
      desktop: true
    }
  ]);

  const [globalSettings, setGlobalSettings] = useState({
    emailEnabled: true,
    pushEnabled: true,
    smsEnabled: false,
    desktopEnabled: true,
    quietHoursEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    weekendNotifications: false,
    notificationSound: true,
    groupNotifications: true,
    summaryFrequency: 'daily'
  });

  const handleNotificationChange = (id: string, channel: 'email' | 'push' | 'sms' | 'desktop', value: boolean) => {
    setNotificationSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, [channel]: value } : setting
    ));
  };

  const handleGlobalSettingChange = (field: string, value: any) => {
    setGlobalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving notification settings:', { notificationSettings, globalSettings });
    alert('Notification settings saved successfully!');
  };

  const handleTestNotification = (channel: string) => {
    alert(`Test ${channel} notification sent!`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Payroll':
        return <DollarSign size={18} />;
      case 'Employee':
        return <User size={18} />;
      case 'System':
        return <Monitor size={18} />;
      case 'Reports':
        return <FileText size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Payroll':
        return '#10b981';
      case 'Employee':
        return '#3b82f6';
      case 'System':
        return '#f59e0b';
      case 'Reports':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const groupedSettings = notificationSettings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, NotificationSetting[]>);

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Bell size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Notification Settings</h1>
          <p className={styles.settingsSubtitle}>
            Configure how and when you receive notifications across different channels
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Global Settings */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Global Notification Settings</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Summary Frequency</label>
              <select
                className={styles.formInput}
                value={globalSettings.summaryFrequency}
                onChange={(e) => handleGlobalSettingChange('summaryFrequency', e.target.value)}
              >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="never">Never</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Quiet Hours Start</label>
              <input
                type="time"
                className={styles.formInput}
                value={globalSettings.quietHoursStart}
                onChange={(e) => handleGlobalSettingChange('quietHoursStart', e.target.value)}
                disabled={!globalSettings.quietHoursEnabled}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Quiet Hours End</label>
              <input
                type="time"
                className={styles.formInput}
                value={globalSettings.quietHoursEnd}
                onChange={(e) => handleGlobalSettingChange('quietHoursEnd', e.target.value)}
                disabled={!globalSettings.quietHoursEnabled}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Enable Email Notifications</div>
                <div className={styles.toggleDescription}>Master switch for all email notifications</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.emailEnabled ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('emailEnabled', !globalSettings.emailEnabled)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Enable Push Notifications</div>
                <div className={styles.toggleDescription}>Master switch for all push notifications</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.pushEnabled ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('pushEnabled', !globalSettings.pushEnabled)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Enable SMS Notifications</div>
                <div className={styles.toggleDescription}>Master switch for all SMS notifications</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.smsEnabled ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('smsEnabled', !globalSettings.smsEnabled)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Enable Desktop Notifications</div>
                <div className={styles.toggleDescription}>Master switch for all desktop notifications</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.desktopEnabled ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('desktopEnabled', !globalSettings.desktopEnabled)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Quiet Hours</div>
                <div className={styles.toggleDescription}>Suppress non-critical notifications during specified hours</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.quietHoursEnabled ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('quietHoursEnabled', !globalSettings.quietHoursEnabled)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Weekend Notifications</div>
                <div className={styles.toggleDescription}>Receive notifications on weekends</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.weekendNotifications ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('weekendNotifications', !globalSettings.weekendNotifications)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Notification Sound</div>
                <div className={styles.toggleDescription}>Play sound for desktop notifications</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.notificationSound ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('notificationSound', !globalSettings.notificationSound)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Group Similar Notifications</div>
                <div className={styles.toggleDescription}>Combine similar notifications to reduce clutter</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${globalSettings.groupNotifications ? styles.active : ''}`}
                onClick={() => handleGlobalSettingChange('groupNotifications', !globalSettings.groupNotifications)}
              />
            </div>
          </div>
        </div>

        {/* Test Notifications */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Test Notifications</h3>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className={styles.saveButton}
              onClick={() => handleTestNotification('email')}
              style={{ background: '#3b82f6' }}
            >
              <Mail size={16} />
              Test Email
            </button>
            <button
              className={styles.saveButton}
              onClick={() => handleTestNotification('push')}
              style={{ background: '#10b981' }}
            >
              <Smartphone size={16} />
              Test Push
            </button>
            <button
              className={styles.saveButton}
              onClick={() => handleTestNotification('desktop')}
              style={{ background: '#f59e0b' }}
            >
              <Monitor size={16} />
              Test Desktop
            </button>
          </div>
        </div>

        {/* Detailed Notification Settings */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Detailed Notification Settings</h3>
          
          {Object.entries(groupedSettings).map(([category, settings]) => (
            <div key={category} className={styles.settingsCard} style={{ marginBottom: '1.5rem' }}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: getCategoryColor(category) }}>
                  {getCategoryIcon(category)}
                  {category}
                </div>
              </div>
              <div className={styles.cardContent}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Header row */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', 
                    gap: '1rem', 
                    paddingBottom: '0.5rem', 
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#6b7280'
                  }}>
                    <div>Notification Type</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                      <Mail size={14} />
                      Email
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                      <Bell size={14} />
                      Push
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                      <Smartphone size={14} />
                      SMS
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                      <Monitor size={14} />
                      Desktop
                    </div>
                  </div>

                  {/* Settings rows */}
                  {settings.map((setting) => (
                    <div key={setting.id} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', 
                      gap: '1rem', 
                      alignItems: 'center' 
                    }}>
                      <div>
                        <div style={{ fontWeight: 500, color: '#1f2937' }}>{setting.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                          {setting.description}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                          className={`${styles.toggleSwitch} ${setting.email && globalSettings.emailEnabled ? styles.active : ''}`}
                          onClick={() => handleNotificationChange(setting.id, 'email', !setting.email)}
                          style={{ opacity: globalSettings.emailEnabled ? 1 : 0.5 }}
                        />
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                          className={`${styles.toggleSwitch} ${setting.push && globalSettings.pushEnabled ? styles.active : ''}`}
                          onClick={() => handleNotificationChange(setting.id, 'push', !setting.push)}
                          style={{ opacity: globalSettings.pushEnabled ? 1 : 0.5 }}
                        />
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                          className={`${styles.toggleSwitch} ${setting.sms && globalSettings.smsEnabled ? styles.active : ''}`}
                          onClick={() => handleNotificationChange(setting.id, 'sms', !setting.sms)}
                          style={{ opacity: globalSettings.smsEnabled ? 1 : 0.5 }}
                        />
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                          className={`${styles.toggleSwitch} ${setting.desktop && globalSettings.desktopEnabled ? styles.active : ''}`}
                          onClick={() => handleNotificationChange(setting.id, 'desktop', !setting.desktop)}
                          style={{ opacity: globalSettings.desktopEnabled ? 1 : 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
} 
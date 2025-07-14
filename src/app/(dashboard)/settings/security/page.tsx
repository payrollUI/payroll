'use client';
import React, { useState } from 'react';
import { Save, Shield, Lock, Key, Eye, EyeOff, Smartphone, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import styles from '../settings.module.css';

interface SecurityLog {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'suspicious';
}

export default function SecurityPage() {
  const [securitySettings, setSecuritySettings] = useState({
    // Password Settings
    requireStrongPassword: true,
    passwordExpiry: 90,
    passwordHistory: 5,
    requireMFA: false,
    
    // Session Settings
    sessionTimeout: 30,
    maxConcurrentSessions: 3,
    rememberDevice: true,
    
    // Login Settings
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    requireEmailVerification: true,
    
    // Access Control
    restrictIPAccess: false,
    allowedIPs: '',
    requireVPN: false,
    
    // Audit & Monitoring
    logAllActions: true,
    alertSuspiciousActivity: true,
    emailSecurityAlerts: true,
    dataEncryption: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
  });

  const [mfaSettings, setMfaSettings] = useState({
    enabled: false,
    method: 'totp',
    backupCodes: [] as string[],
    trustedDevices: [] as string[]
  });

  const [securityLogs] = useState<SecurityLog[]>([
    {
      id: '1',
      action: 'Successful Login',
      timestamp: '2024-01-15 10:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      status: 'success'
    },
    {
      id: '2',
      action: 'Password Changed',
      timestamp: '2024-01-14 15:45:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0',
      status: 'success'
    },
    {
      id: '3',
      action: 'Failed Login Attempt',
      timestamp: '2024-01-13 09:15:00',
      ipAddress: '203.45.67.89',
      userAgent: 'Firefox 121.0.0.0',
      status: 'failed'
    },
    {
      id: '4',
      action: 'Multiple Failed Logins',
      timestamp: '2024-01-12 22:30:00',
      ipAddress: '45.67.89.123',
      userAgent: 'Unknown',
      status: 'suspicious'
    }
  ]);

  const handleSecuritySettingChange = (field: string, value: any) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMfaSettingChange = (field: string, value: any) => {
    setMfaSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    });
  };

  const handleEnableMFA = () => {
    if (mfaSettings.enabled) {
      if (confirm('Are you sure you want to disable Two-Factor Authentication?')) {
        setMfaSettings(prev => ({ ...prev, enabled: false }));
      }
    } else {
      alert('MFA setup process would start here');
      setMfaSettings(prev => ({ ...prev, enabled: true }));
    }
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );
    setMfaSettings(prev => ({ ...prev, backupCodes: codes }));
    alert('Backup codes generated successfully!');
  };

  const handleSave = () => {
    console.log('Saving security settings:', securitySettings);
    alert('Security settings saved successfully!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} color="#10b981" />;
      case 'failed':
        return <AlertTriangle size={16} color="#f59e0b" />;
      case 'suspicious':
        return <AlertTriangle size={16} color="#ef4444" />;
      default:
        return <AlertTriangle size={16} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#10b981';
      case 'failed':
        return '#f59e0b';
      case 'suspicious':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Shield size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Security Settings</h1>
          <p className={styles.settingsSubtitle}>
            Manage your account security, authentication, and access controls
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Password Management */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <Lock size={20} style={{ marginRight: '0.5rem' }} />
            Password Management
          </h3>
          
          <div className={styles.settingsCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Change Password</div>
              <div className={styles.cardDescription}>Update your account password</div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Current Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={passwordData.showCurrentPassword ? 'text' : 'password'}
                      className={styles.formInput}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => handlePasswordChange('showCurrentPassword', !passwordData.showCurrentPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6b7280'
                      }}
                    >
                      {passwordData.showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={passwordData.showNewPassword ? 'text' : 'password'}
                      className={styles.formInput}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => handlePasswordChange('showNewPassword', !passwordData.showNewPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6b7280'
                      }}
                    >
                      {passwordData.showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={passwordData.showConfirmPassword ? 'text' : 'password'}
                      className={styles.formInput}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => handlePasswordChange('showConfirmPassword', !passwordData.showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6b7280'
                      }}
                    >
                      {passwordData.showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'end' }}>
                  <button
                    className={styles.saveButton}
                    onClick={handlePasswordUpdate}
                    style={{ background: '#3b82f6' }}
                  >
                    <Lock size={16} />
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Password Policy */}
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
              Password Policy
            </h4>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password Expiry (days)</label>
                <select
                  className={styles.formInput}
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => handleSecuritySettingChange('passwordExpiry', parseInt(e.target.value))}
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                  <option value="0">Never</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Password History</label>
                <select
                  className={styles.formInput}
                  value={securitySettings.passwordHistory}
                  onChange={(e) => handleSecuritySettingChange('passwordHistory', parseInt(e.target.value))}
                >
                  <option value="0">No restriction</option>
                  <option value="3">Last 3 passwords</option>
                  <option value="5">Last 5 passwords</option>
                  <option value="10">Last 10 passwords</option>
                </select>
              </div>
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Require Strong Password</div>
                <div className={styles.toggleDescription}>Enforce complex password requirements</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${securitySettings.requireStrongPassword ? styles.active : ''}`}
                onClick={() => handleSecuritySettingChange('requireStrongPassword', !securitySettings.requireStrongPassword)}
              />
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <Smartphone size={20} style={{ marginRight: '0.5rem' }} />
            Two-Factor Authentication
          </h3>
          
          <div className={styles.settingsCard}>
            <div className={styles.cardContent}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <div className={styles.cardTitle}>
                    Two-Factor Authentication {mfaSettings.enabled && <span style={{ color: '#10b981' }}>(Enabled)</span>}
                  </div>
                  <div className={styles.cardDescription}>
                    Add an extra layer of security to your account
                  </div>
                </div>
                <button
                  className={styles.saveButton}
                  onClick={handleEnableMFA}
                  style={{ background: mfaSettings.enabled ? '#ef4444' : '#10b981' }}
                >
                  <Key size={16} />
                  {mfaSettings.enabled ? 'Disable MFA' : 'Enable MFA'}
                </button>
              </div>

              {mfaSettings.enabled && (
                <div>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Authentication Method</label>
                      <select
                        className={styles.formInput}
                        value={mfaSettings.method}
                        onChange={(e) => handleMfaSettingChange('method', e.target.value)}
                      >
                        <option value="totp">TOTP (Google Authenticator)</option>
                        <option value="sms">SMS</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <button
                      className={styles.saveButton}
                      onClick={generateBackupCodes}
                      style={{ background: '#6b7280' }}
                    >
                      Generate Backup Codes
                    </button>
                  </div>

                  {mfaSettings.backupCodes.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Backup Codes (Save these securely):
                      </div>
                      <div style={{ 
                        background: '#f9fafb', 
                        padding: '1rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '0.5rem'
                      }}>
                        {mfaSettings.backupCodes.map((code, index) => (
                          <div key={index}>{code}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Session & Access Control */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <Clock size={20} style={{ marginRight: '0.5rem' }} />
            Session & Access Control
          </h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Session Timeout (minutes)</label>
              <select
                className={styles.formInput}
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="480">8 hours</option>
                <option value="0">Never</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Max Concurrent Sessions</label>
              <select
                className={styles.formInput}
                value={securitySettings.maxConcurrentSessions}
                onChange={(e) => handleSecuritySettingChange('maxConcurrentSessions', parseInt(e.target.value))}
              >
                <option value="1">1 session</option>
                <option value="3">3 sessions</option>
                <option value="5">5 sessions</option>
                <option value="10">10 sessions</option>
                <option value="0">Unlimited</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Max Login Attempts</label>
              <select
                className={styles.formInput}
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e.target.value))}
              >
                <option value="3">3 attempts</option>
                <option value="5">5 attempts</option>
                <option value="10">10 attempts</option>
                <option value="0">Unlimited</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Lockout Duration (minutes)</label>
              <select
                className={styles.formInput}
                value={securitySettings.lockoutDuration}
                onChange={(e) => handleSecuritySettingChange('lockoutDuration', parseInt(e.target.value))}
              >
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="1440">24 hours</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Remember Device</div>
                <div className={styles.toggleDescription}>Allow users to mark devices as trusted</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${securitySettings.rememberDevice ? styles.active : ''}`}
                onClick={() => handleSecuritySettingChange('rememberDevice', !securitySettings.rememberDevice)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Require Email Verification</div>
                <div className={styles.toggleDescription}>Send verification email for new logins</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${securitySettings.requireEmailVerification ? styles.active : ''}`}
                onClick={() => handleSecuritySettingChange('requireEmailVerification', !securitySettings.requireEmailVerification)}
              />
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleLabel}>
                <div className={styles.toggleTitle}>Restrict IP Access</div>
                <div className={styles.toggleDescription}>Only allow access from specific IP addresses</div>
              </div>
              <div
                className={`${styles.toggleSwitch} ${securitySettings.restrictIPAccess ? styles.active : ''}`}
                onClick={() => handleSecuritySettingChange('restrictIPAccess', !securitySettings.restrictIPAccess)}
              />
            </div>

            {securitySettings.restrictIPAccess && (
              <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                <label className={styles.formLabel}>Allowed IP Addresses (comma separated)</label>
                <textarea
                  className={styles.formTextarea}
                  value={securitySettings.allowedIPs}
                  onChange={(e) => handleSecuritySettingChange('allowedIPs', e.target.value)}
                  placeholder="192.168.1.100, 203.45.67.89"
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        {/* Security Monitoring */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Security Monitoring & Audit</h3>
          
          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Log All Actions</div>
              <div className={styles.toggleDescription}>Keep detailed logs of all user actions</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${securitySettings.logAllActions ? styles.active : ''}`}
              onClick={() => handleSecuritySettingChange('logAllActions', !securitySettings.logAllActions)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Alert Suspicious Activity</div>
              <div className={styles.toggleDescription}>Send alerts for unusual login patterns</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${securitySettings.alertSuspiciousActivity ? styles.active : ''}`}
              onClick={() => handleSecuritySettingChange('alertSuspiciousActivity', !securitySettings.alertSuspiciousActivity)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Email Security Alerts</div>
              <div className={styles.toggleDescription}>Send security notifications via email</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${securitySettings.emailSecurityAlerts ? styles.active : ''}`}
              onClick={() => handleSecuritySettingChange('emailSecurityAlerts', !securitySettings.emailSecurityAlerts)}
            />
          </div>

          <div className={styles.toggleGroup}>
            <div className={styles.toggleLabel}>
              <div className={styles.toggleTitle}>Data Encryption</div>
              <div className={styles.toggleDescription}>Encrypt sensitive data at rest and in transit</div>
            </div>
            <div
              className={`${styles.toggleSwitch} ${securitySettings.dataEncryption ? styles.active : ''}`}
              onClick={() => handleSecuritySettingChange('dataEncryption', !securitySettings.dataEncryption)}
            />
          </div>
        </div>

        {/* Security Logs */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Recent Security Activity</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {securityLogs.map((log) => (
              <div key={log.id} className={styles.listItem}>
                <div className={styles.listItemContent}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getStatusIcon(log.status)}
                    <div className={styles.listItemTitle}>{log.action}</div>
                    <span style={{ 
                      padding: '0.125rem 0.5rem', 
                      borderRadius: '0.25rem', 
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      background: `${getStatusColor(log.status)}20`,
                      color: getStatusColor(log.status)
                    }}>
                      {log.status}
                    </span>
                  </div>
                  <div className={styles.listItemDescription}>
                    {log.timestamp} • {log.ipAddress} • {log.userAgent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save Security Settings
          </button>
        </div>
      </div>
    </div>
  );
} 
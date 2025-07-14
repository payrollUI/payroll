'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle, Clock, ExternalLink, Building2, FileText, Bell, DollarSign, Settings } from 'lucide-react';
import styles from './EnhancedDashboard.module.css';
import {
  setupTasks as initialSetupTasks,
  dashboardStats,
  additionalFeatures,
  mockUserProfile,
  type SetupTask
} from '@/data/PayrollData';

interface EnhancedDashboardProps {
  userName?: string | null;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ userName }) => {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [setupTasks, setSetupTasks] = useState<SetupTask[]>(initialSetupTasks);
  
  // Calculate completion data
  const completedTasksCount = setupTasks.filter(task => task.status === 'COMPLETED').length;
  const completionPercentage = (completedTasksCount / setupTasks.length) * 100;
  const completionData = { completed: completedTasksCount, total: setupTasks.length };

  // Listen for task completion from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
      setSetupTasks(prevTasks => 
        prevTasks.map(task => ({
          ...task,
          status: completedTasks.includes(task.id) ? 'COMPLETED' : 'Pending'
        }))
      );
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Check on mount

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleTaskClick = (task: SetupTask) => {
    if (task.isClickable && task.route) {
      router.push(task.route);
    }
  };

  const handleCompleteNowClick = (task: SetupTask) => {
    if (task.route) {
      router.push(task.route);
    }
  };

  const getFeatureIcon = (iconName: string) => {
    const iconProps = { size: 32, className: styles.featureIcon };
    switch (iconName) {
      case 'Building2': return <Building2 {...iconProps} />;
      case 'FileText': return <FileText {...iconProps} />;
      case 'Bell': return <Bell {...iconProps} />;
      default: return <Building2 {...iconProps} />;
    }
  };

  return (
    <div className={styles.dashboardContent}>
      <h1 className={styles.dashboardHeading}>Dashboard</h1>
      
      {/* Welcome Card - Zoho Style */}
      {showWelcome && (
        <div className={styles.welcomeCard}>
          <button 
            className={styles.closeButton}
            onClick={() => setShowWelcome(false)}
            aria-label="Close welcome card"
          >
            <X size={20} />
          </button>

          <div className={styles.welcomeHeader}>
            <h2 className={styles.welcomeTitle}>
              Welcome! {userName || mockUserProfile.name}
            </h2>
            <p className={styles.welcomeSubtitle}>
              Set up your organization before you run your first payroll.
            </p>
          </div>

          {/* Progress Section */}
          <div className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <h3 className={styles.progressTitle}>Get started with Worksy Payroll</h3>
              <div className={styles.progressIndicator}>
                <span className={styles.progressText}>
                  {completionData.completed}/{completionData.total} Completed
                </span>
              </div>
            </div>
            
            <p className={styles.progressSubtitle}>
              Complete the following steps to have a hassle-free payroll experience
            </p>

            {/* Progress Bar */}
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressBarFill} 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className={styles.progressPercentage}>
                {Math.round(completionPercentage)}% Complete
              </span>
            </div>

            {/* Task List */}
            <div className={styles.taskList}>
              {setupTasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className={`${styles.taskItem} ${task.isClickable ? styles.clickable : ''}`}
                  onClick={() => handleTaskClick(task)}
                >
                  <div className={styles.taskLeft}>
                    <div className={`${styles.taskNumber} ${styles[task.status.toLowerCase()]}`}>
                      {task.status === 'COMPLETED' ? (
                        <CheckCircle size={16} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className={styles.taskTitle}>
                      {index + 1}. {task.title} {task.isClickable && <ExternalLink size={14} />}
                    </span>
                  </div>
                  <div className={styles.taskRight}>
                    {task.status === 'COMPLETED' ? (
                      <span className={styles.statusCompleted}>COMPLETED</span>
                    ) : (
                      <button 
                        className={styles.completeNowButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteNowClick(task);
                        }}
                      >
                        Complete Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div className={styles.additionalFeatures}>
            <h4 className={styles.featuresTitle}>ADDITIONAL NOTABLE FEATURES</h4>
            <div className={styles.featuresGrid}>
              {additionalFeatures.map((feature, index) => (
                <div key={feature.id} className={styles.featureCard}>
                  <div className={styles.featureIconContainer}>
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <div className={styles.featureContent}>
                    <h5 className={styles.featureTitle}>{feature.title}</h5>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{dashboardStats.totalEmployees}</div>
          <div className={styles.statLabel}>Total Employees</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{dashboardStats.activePayrolls}</div>
          <div className={styles.statLabel}>Active Payrolls</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{dashboardStats.pendingApprovals}</div>
          <div className={styles.statLabel}>Pending Approvals</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{dashboardStats.completedPayruns}</div>
          <div className={styles.statLabel}>Completed Payruns</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h3 className={styles.sectionTitle}>Quick Actions</h3>
        <div className={styles.quickActionsGrid}>
          <button 
            className={styles.quickActionButton}
            onClick={() => router.push('/employees/add')}
          >
            <Building2 size={24} />
            <span>Add Employee</span>
          </button>
          <button 
            className={styles.quickActionButton}
            onClick={() => router.push('/pay-runs/new')}
          >
            <DollarSign size={24} />
            <span>Run Payroll</span>
          </button>
          <button 
            className={styles.quickActionButton}
            onClick={() => router.push('/reports')}
          >
            <FileText size={24} />
            <span>Generate Report</span>
          </button>
          <button 
            className={styles.quickActionButton}
            onClick={() => router.push('/settings')}
          >
            <Settings size={24} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard; 
import React from 'react';
import styles from './Welcomecard.module.css';

const SetupProgress = ({ progress, children }) => {
  const percentage = (progress.completed / progress.total) * 100;

  return (
    <div className={styles.setupBlock}>
      <div className={styles.setupHeader}>
        <h3 className={styles.setupTitle}>Get started with Worksy Payroll</h3>
        <span className={styles.progressText}>
          {progress.completed}/{progress.total} Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className={styles.setupDescription}>
        Complete the following steps to have a hassle-free payroll experience
      </p>

      {children}
    </div>
  );
};

export default SetupProgress;

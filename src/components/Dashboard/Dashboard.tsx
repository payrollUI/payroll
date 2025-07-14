'use client';
import React, { useState } from 'react';
import WelcomeCard from './Welcomecard/Welcomecard';
import StatsGrid from './Statsgrid/Statsgrid';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className={styles.dashboard_content}>
      <h1 className={styles.dashboard_heading}>Dashboard</h1>
      {showWelcome && <WelcomeCard onClose={() => setShowWelcome(false)} />}
      <StatsGrid />
    </div>
  );
};

export default Dashboard;

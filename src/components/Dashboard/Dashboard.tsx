'use client';
import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar/Navbar';
import WelcomeCard from './Welcomecard/Welcomecard';
import StatsGrid from './Statsgrid/Statsgrid';

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className={styles.dashboard_container}>
      <Sidebar />
      <main className={styles.content}>
        <Navbar />
        {showWelcome && <WelcomeCard onClose={() => setShowWelcome(false)} />}
        <StatsGrid />
      </main>
    </div>
  );
};

export default Dashboard;

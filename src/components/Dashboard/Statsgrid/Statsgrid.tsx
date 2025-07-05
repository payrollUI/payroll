'use client';
import React from 'react';
import styles from './Statsgrid.module.css';
import { dashboardData } from '../../../data/DashboardData';

const StatsGrid = () => (
  <div className={styles.stats_grid}>
    <div className={styles.stat_card}><p>Total Employees</p><h2>{dashboardData.stats.totalEmployees}</h2></div>
    <div className={styles.stat_card}><p>Active Payrolls</p><h2>{dashboardData.stats.activePayrolls}</h2></div>
    <div className={styles.stat_card}><p>Pending Approvals</p><h2>{dashboardData.stats.pendingApprovals}</h2></div>
    <div className={styles.stat_card}><p>Completed Payruns</p><h2>{dashboardData.stats.completedPayruns}</h2></div>
  </div>
);

export default StatsGrid;

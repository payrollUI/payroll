import React from 'react';
import { X } from 'lucide-react';
import styles from './Welcomecard.module.css';
import SetupProgress from './SetupProgress';
import TaskList from './TaskList';
import FeatureCard from './FeatureCard';

const WelcomeCard = () => {
  const user = { name: 'Biplob Chakraborty' };
  const progress = { completed: 7, total: 7 };
  const completedTasks = [
    { id: 1, title: 'Add Organisation Details >', status: 'COMPLETED' },
    { id: 2, title: 'Provide your Tax Details >', status: 'COMPLETED' },
    { id: 3, title: 'Configure your Pay Schedule >', status: 'COMPLETED' },
    { id: 4, title: 'Set up Statutory Components >', status: 'COMPLETED' },
    { id: 5, title: 'Set up Salary Components >', status: 'COMPLETED' },
    { id: 6, title: 'Add Employees >', status: 'Pending' },
    { id: 7, title: 'Configure Prior Payroll >', status: 'Pending' }
  ];
  const additionalFeatures = [
    {
      icon: 'Building2',
      title: 'Direct Deposit',
      description: 'Set up direct deposit for employees'
    },
    {
      icon: 'FileText',
      title: 'Salary Templates',
      description: 'Create salary templates for faster processing'
    },
    {
      icon: 'Bell',
      title: 'Auto Reminder for IT & PCI Declaration',
      description: 'Automated reminders for compliance'
    }
  ];

  return (
    <div className={styles.welcomeCard}>
      <button className={styles.closeBtn}>
        <X size={20} />
      </button>

      <h2 className={styles.title}>Welcome! {user.name}</h2>
      <p className={styles.subtitle}>
        Set up your organization before you run your first payroll.
      </p>

      <SetupProgress progress={progress}>
        <TaskList tasks={completedTasks} />
      </SetupProgress>

      <h4 className={styles.featuresTitle}>ADDITIONAL NOTABLE FEATURES</h4>

      <div className={styles.features}>
        {additionalFeatures.map((feature, idx) => (
          <FeatureCard key={idx} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default WelcomeCard;

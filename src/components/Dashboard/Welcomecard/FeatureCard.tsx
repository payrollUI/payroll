import React from 'react';
import { Building2, FileText, Bell } from 'lucide-react';
import styles from './Welcomecard.module.css';

const iconMap = {
  Building2: Building2,
  FileText: FileText,
  Bell: Bell
};

export type Feature = {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
};

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = iconMap[feature.icon] || FileText;
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        <Icon size={32} />
      </div>
      <h5 className={styles.featureTitle}>{feature.title}</h5>
      <p className={styles.featureDescription}>{feature.description}</p>
    </div>
  );
};

export default FeatureCard;

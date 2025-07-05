'use client';
import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import {
  ChevronDown, ChevronUp, LayoutDashboard, Users, DollarSign, CheckCircle,
  FileText, TrendingUp, Settings, HelpCircle, Lightbulb
} from 'lucide-react';

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Employees',
    icon: Users
  },
  {
    label: 'Pay Runs',
    icon: DollarSign
  },
  {
    label: 'Approvals',
    icon: CheckCircle,
    submenu: ['Pending', 'Reviewed']
  },
  {
    label: 'Taxes and Forms',
    icon: FileText,
    submenu: ['Form 16', 'Form 24Q']
  },
  {
    label: 'Loans',
    icon: TrendingUp
  },
  {
    label: 'Documents',
    icon: FileText
  },
  {
    label: 'Reports',
    icon: TrendingUp
  },
  {
    label: 'Settings',
    icon: Settings
  }
];

const Sidebar = () => {
  const [activeLabel, setActiveLabel] = useState('Dashboard');
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleItemClick = (label: string, hasSubmenu: boolean) => {
    setActiveLabel(label);
    if (hasSubmenu) {
      setOpenSubmenu(openSubmenu === label ? null : label);
    } else {
      setOpenSubmenu(null);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar_logo}>
        <span className={styles.logo_text}>worksy</span>
        <span className={styles.logo_sub}>Payroll</span>
      </div>

      <nav className={styles.sidebar_menu}>
        {sidebarItems.map((item) => (
          <div key={item.label}>
            <button
              className={`${styles.sidebar_item} ${
                activeLabel === item.label ? styles.active : ''
              }`}
              onClick={() => handleItemClick(item.label, !!item.submenu)}
            >
              <item.icon width={28} height={28} style={{ marginRight: 12 }} />
              <span className={styles.label}>{item.label}</span>
              {item.submenu && (
                openSubmenu === item.label ? (
                  <ChevronUp size={24} className={styles.chevron_icon} />
                ) : (
                  <ChevronDown size={24} className={styles.chevron_icon} />
                )
              )}
            </button>

            {item.submenu && openSubmenu === item.label && (
              <div className={styles.submenu}>
                {item.submenu.map((sub, idx) => (
                  <div key={idx} className={styles.submenu_item}>
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={styles.sidebar_footer}>
        <div className={styles.sidebar_item}>
          <Lightbulb width={40} height={40} style={{ marginRight: 12 }} />
          What's new
        </div>
        <div className={styles.sidebar_item}>
          <HelpCircle width={40} height={40} style={{ marginRight: 12 }} />
          Help and support
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

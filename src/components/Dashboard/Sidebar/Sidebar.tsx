'use client';
import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import {
  ChevronDown, ChevronUp, LayoutDashboard, Users, DollarSign, CheckCircle,
  FileText, TrendingUp, Settings, HelpCircle, Lightbulb
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    label: 'Employees',
    icon: Users,
    path: '/employees'
  },
  {
    label: 'Pay Runs',
    icon: DollarSign,
    path: '/pay-run'
  },
  {
    label: 'Approvals',
    icon: CheckCircle,
    submenu: [
      { label: 'Pending', path: '/approvals/pending' },
      { label: 'Reviewed', path: '/approvals/reviewed' }
    ]
  },
  {
    label: 'Taxes and Forms',
    icon: FileText,
    submenu: [
      { label: 'Form 16', path: '/taxes-and-forms/form-16' },
      { label: 'Form 24Q', path: '/taxes-and-forms/form-24q' }
    ]
  },
  {
    label: 'Loans',
    icon: TrendingUp,
    path: '/loans'
  },
  {
    label: 'Documents',
    icon: FileText,
    path: '/documents'
  },
  {
    label: 'Reports',
    icon: TrendingUp,
    path: '/reports'
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings'
  }
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Helper to find the label for the current path
  const getLabelByPath = (path: string) => {
    for (const item of sidebarItems) {
      if (item.path === path) return item.label;
      if (item.submenu) {
        const found = item.submenu.find((sub: any) => sub.path === path);
        if (found) return found.label;
      }
    }
    return 'Dashboard'; // fallback
  };

  const [activeLabel, setActiveLabel] = useState(() => getLabelByPath(pathname));
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  React.useEffect(() => {
    setActiveLabel(getLabelByPath(pathname));
  }, [pathname]);

  const handleItemClick = (label: string, hasSubmenu: boolean, path?: string) => {
    console.log(label, hasSubmenu, path);
    setActiveLabel(label);
    if (hasSubmenu) {
      setOpenSubmenu(openSubmenu === label ? null : label);
    } else {
      setOpenSubmenu(null);
      if (path) router.push(path);
    }
  };

  const handleSubmenuClick = (sub: { label: string; path: string }) => {
    setActiveLabel(sub.label);
    setOpenSubmenu(null);
    router.push(sub.path);
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
              onClick={() => handleItemClick(item.label, !!item.submenu, item.path)}
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
                {item.submenu.map((sub: any, idx: number) => (
                  <div
                    key={idx}
                    className={styles.submenu_item}
                    onClick={() => handleSubmenuClick(sub)}
                    style={{ cursor: 'pointer' }}
                  >
                    {sub.label}
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

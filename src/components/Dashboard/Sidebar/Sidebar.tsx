'use client';
import React, { useState, useEffect } from 'react';
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
    path: '/pay-runs'
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
    submenu: [
      { label: 'Organization', path: '/settings/organization' },
      { label: 'Profile', path: '/settings/profile' },
      { label: 'Tax Details', path: '/settings/tax-details' },
      { label: 'Pay Schedule', path: '/settings/pay-schedule' },
      { label: 'Statutory Components', path: '/settings/statutory-components' },
      { label: 'Salary Components', path: '/settings/salary-components' },
      { label: 'Prior Payroll', path: '/settings/prior-payroll' },
      { label: 'Preferences', path: '/settings/preferences' },
      { label: 'Notifications', path: '/settings/notifications' },
      { label: 'Security', path: '/settings/security' }
    ]
  }
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    return pathname === path;
  };

  // Helper function to check if parent menu should be active
  const isParentActive = (item: any) => {
    if (item.path && pathname === item.path) return true;
    if (item.submenu) {
      return item.submenu.some((sub: any) => pathname === sub.path);
    }
    return false;
  };

  // Helper function to check if submenu item is active
  const isSubmenuActive = (submenuPath: string) => {
    return pathname === submenuPath;
  };

  // Helper function to find which parent menu contains the current path
  const findParentMenuForPath = (searchPath: string) => {
    for (const item of sidebarItems) {
      if (item.submenu) {
        const hasActiveSubmenu = item.submenu.some((sub: any) => searchPath === sub.path);
        if (hasActiveSubmenu) {
          return item.label;
        }
      }
    }
    return null;
  };

  // Auto-open submenu if current path is in it, and ensure it stays open
  useEffect(() => {
    const parentMenu = findParentMenuForPath(pathname);
    if (parentMenu) {
      setOpenSubmenu(parentMenu);
    } else {
      // If not in a submenu, check if we're on a main menu item that has submenus
      // and close any open submenu unless user explicitly wants it open
      const currentItem = sidebarItems.find(item => item.path === pathname);
      if (currentItem && !currentItem.submenu) {
        // Only close submenu if we're navigating to a non-submenu item
        // This prevents closing when navigating within the same submenu group
        const wasInSubmenu = findParentMenuForPath(pathname);
        if (!wasInSubmenu) {
          setOpenSubmenu(null);
        }
      }
    }
  }, [pathname]);

  // Handle clicking on main menu items
  const handleItemClick = (item: any) => {
    if (item.submenu) {
      // Simple toggle: if it's open, close it; if it's closed, open it
      setOpenSubmenu(openSubmenu === item.label ? null : item.label);
    } else {
      // For regular items, navigate and close any open submenu
      setOpenSubmenu(null);
      router.push(item.path);
    }
  };

  // Handle clicking on submenu items
  const handleSubmenuClick = (submenuItem: { label: string; path: string }) => {
    // Navigate to the submenu item but keep the submenu open
    router.push(submenuItem.path);
    // The submenu will stay open due to the useEffect above
  };

  // Handle clicking on footer items
  const handleFooterItemClick = (item: string) => {
    // Close any open submenu when clicking footer items
    setOpenSubmenu(null);
    // Add navigation logic for footer items
    if (item === 'Help and support') {
      router.push('/help');
    } else if (item === 'What\'s new') {
      // Add navigation for What's new when needed
      console.log(`Footer item clicked: ${item}`);
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
                isParentActive(item) ? styles.active : ''
              }`}
              onClick={() => handleItemClick(item)}
              title={item.label}
            >
              <item.icon size={20} />
              <span className={styles.label}>{item.label}</span>
              {item.submenu && (
                <span className={styles.chevron_icon}>
                  {openSubmenu === item.label ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              )}
            </button>

            {/* Render submenu if it exists and is open */}
            {item.submenu && openSubmenu === item.label && (
              <div className={styles.submenu}>
                {item.submenu.map((submenuItem: any, idx: number) => (
                  <div
                    key={`${item.label}-${idx}`}
                    className={`${styles.submenu_item} ${
                      isSubmenuActive(submenuItem.path) ? styles.active : ''
                    }`}
                    onClick={() => handleSubmenuClick(submenuItem)}
                    title={submenuItem.label}
                  >
                    {submenuItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={styles.section_footer}>
        <div 
          className={styles.footer_item}
          onClick={() => handleFooterItemClick('What\'s new')}
        >
          <Lightbulb size={18} />
          What's new
        </div>
        <div 
          className={styles.footer_item}
          onClick={() => handleFooterItemClick('Help and support')}
        >
          <HelpCircle size={18} />
          Help and support
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

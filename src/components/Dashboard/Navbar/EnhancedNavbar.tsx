'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  Settings, 
  Shield, 
  HelpCircle, 
  LogOut,
  MapPin,
  ExternalLink 
} from 'lucide-react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from './EnhancedNavbar.module.css';
import {
  mockEmployees,
  mockNotifications,
  mockOffices,
  userMenuOptions,
  mockUserProfile,
  type Employee,
  type Notification,
  type Office
} from '@/data/PayrollData';

interface EnhancedNavbarProps {
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const EnhancedNavbar: React.FC<EnhancedNavbarProps> = ({ 
  userName, 
  userEmail, 
  userImage,
  onMobileMenuToggle,
  isMobileMenuOpen = false
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(mockOffices[0]);
  const [isMobile, setIsMobile] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false);
      }
      if (officeRef.current && !officeRef.current.contains(event.target as Node)) {
        setShowOfficeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter employees based on search query
  const filteredEmployees = mockEmployees.filter((employee: Employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unread notifications count
  const unreadCount = mockNotifications.filter((notif: Notification) => !notif.isRead).length;

  // Handle ESS button click
  const handleESSClick = () => {
    window.open('/ess', '_blank', 'noopener,noreferrer');
  };

  // Handle user menu item click
  const handleUserMenuClick = (option: any) => {
    if (option.id === 'logout') {
      signOut({ callbackUrl: '/login' });
    } else {
      router.push(option.route);
    }
    setShowUserDropdown(false);
  };

  // Handle employee selection from search
  const handleEmployeeSelect = (employee: Employee) => {
    router.push(`/employees/${employee.id}`);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    // Mark as read and navigate if needed
    console.log('Notification clicked:', notification);
    setShowNotificationDropdown(false);
  };

  // Handle office selection
  const handleOfficeSelect = (office: Office) => {
    setSelectedOffice(office);
    setShowOfficeDropdown(false);
    // You could implement office switching logic here
    console.log('Office selected:', office);
  };

  // Get appropriate icon for user menu items
  const getMenuIcon = (iconName: string) => {
    const iconProps = { size: 16, className: styles.menuItemIcon };
    switch (iconName) {
      case 'User': return <User {...iconProps} />;
      case 'Settings': return <Settings {...iconProps} />;
      case 'Bell': return <Bell {...iconProps} />;
      case 'Shield': return <Shield {...iconProps} />;
      case 'HelpCircle': return <HelpCircle {...iconProps} />;
      case 'LogOut': return <LogOut {...iconProps} />;
      default: return <User {...iconProps} />;
    }
  };

  // Format notification timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <IconButton
            className={styles.mobileMenuButton}
            onClick={onMobileMenuToggle}
            aria-label="Toggle mobile menu"
            sx={{ 
              color: '#374151',
              marginRight: '0.75rem',
              '&:hover': {
                backgroundColor: 'rgba(55, 65, 81, 0.1)'
              }
            }}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}

        {/* Search Container - Desktop only */}
        {!isMobile && (
          <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <ChevronDown size={14} className={styles.searchChevron} />
              <input
                type="text"
                placeholder="Search Employee"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 150)}
                className={styles.searchInput}
              />
              
              {showSearchDropdown && searchQuery && (
                <div className={styles.searchDropdown}>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.slice(0, 5).map((employee: Employee) => (
                      <div
                        key={employee.id}
                        className={styles.searchDropdownItem}
                        onClick={() => handleEmployeeSelect(employee)}
                      >
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className={styles.employeeAvatar}
                        />
                        <div className={styles.employeeInfo}>
                          <div className={styles.employeeName}>{employee.name}</div>
                          <div className={styles.employeePosition}>{employee.position}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.searchDropdownItem}>
                      No employees found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Always visible with responsive design */}
      <div className={styles.rightSection}>
        {/* Go to ESS Button - Always visible with responsive design */}
        <button 
          className={`${styles.essButton} ${isMobile ? styles.mobileEssButton : ''}`}
          onClick={handleESSClick}
          title="Go to Employee Self Service"
        >
          {isMobile ? (
            /* Mobile: Show only icon or abbreviated text */
            <>
              <span className={styles.mobileEssText}>ESS</span>
              <ExternalLink size={14} className={styles.essIcon} />
            </>
          ) : (
            /* Desktop: Show full text */
            <>
              Go to ESS
              <ExternalLink size={14} className={styles.essIcon} />
            </>
          )}
        </button>

        {/* Office Dropdown - Always visible */}
        <div className={styles.officeContainer} ref={officeRef}>
          <button
            className={`${styles.officeButton} ${isMobile ? styles.mobileOfficeButton : ''}`}
            onClick={() => setShowOfficeDropdown(!showOfficeDropdown)}
            title={isMobile ? selectedOffice.shortName || selectedOffice.name : selectedOffice.name}
          >
            <MapPin size={isMobile ? 18 : 16} className={styles.officeIcon} />
            {isMobile ? (
              /* Mobile: Show only short name or abbreviated */
              <span className={styles.mobileOfficeName}>
                {selectedOffice.shortName || selectedOffice.name.split(' ')[0]}
              </span>
            ) : (
              /* Desktop: Show full name */
              <span className={styles.officeName}>{selectedOffice.name}</span>
            )}
            <ChevronDown size={isMobile ? 14 : 16} className={styles.chevronIcon} />
          </button>
          
          {showOfficeDropdown && (
            <div className={styles.officeDropdown}>
              {mockOffices.map((office) => (
                <div
                  key={office.id}
                  className={`${styles.officeDropdownItem} ${
                    selectedOffice.id === office.id ? styles.selected : ''
                  }`}
                  onClick={() => handleOfficeSelect(office)}
                >
                  <div className={styles.officeName}>{office.name}</div>
                  <div className={styles.officeLocation}>{office.location}</div>
                  {office.isHeadOffice && (
                    <span className={styles.headOfficeBadge}>Head Office</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Dropdown - Always visible */}
        <div className={styles.notificationContainer} ref={notificationRef}>
          <button
            className={`${styles.notificationButton} ${isMobile ? styles.mobileNotificationButton : ''}`}
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            title="Notifications"
          >
            <Bell size={isMobile ? 20 : 20} className={styles.notificationIcon} />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          
          {showNotificationDropdown && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h3>Notifications</h3>
                <span className={styles.notificationCount}>
                  {unreadCount} unread
                </span>
              </div>
              
              <div className={styles.notificationList}>
                {mockNotifications.slice(0, 5).map((notification: Notification) => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${
                      !notification.isRead ? styles.unread : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className={styles.notificationContent}>
                      <div className={styles.notificationTitle}>
                        {notification.title}
                      </div>
                      <div className={styles.notificationMessage}>
                        {notification.message}
                      </div>
                      <div className={styles.notificationTime}>
                        {notification.time}
                      </div>
                    </div>
                    {!notification.isRead && (
                      <div className={styles.unreadIndicator}></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className={styles.notificationFooter}>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => {
                    router.push('/notifications');
                    setShowNotificationDropdown(false);
                  }}
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown - Always visible */}
        <div className={styles.userContainer} ref={userRef}>
          <button
            className={`${styles.userButton} ${isMobile ? styles.mobileUserButton : ''}`}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            title={userName || mockUserProfile.name}
          >
            <img
              src={userImage || mockUserProfile.avatar}
              alt={userName || mockUserProfile.name}
              className={`${styles.userAvatar} ${isMobile ? styles.mobileUserAvatar : ''}`}
            />
            {!isMobile && (
              <span className={styles.userName}>
                {userName || mockUserProfile.name}
              </span>
            )}
            <ChevronDown size={isMobile ? 14 : 16} className={styles.userChevron} />
          </button>
          
          {showUserDropdown && (
            <div className={styles.userDropdown}>
              <div className={styles.userDropdownHeader}>
                <img
                  src={userImage || mockUserProfile.avatar}
                  alt={userName || mockUserProfile.name}
                  className={styles.userDropdownAvatar}
                />
                <div className={styles.userDropdownInfo}>
                  <div className={styles.userDropdownName}>
                    {userName || mockUserProfile.name}
                  </div>
                  <div className={styles.userDropdownEmail}>
                    {userEmail || mockUserProfile.email}
                  </div>
                  <div className={styles.userDropdownPosition}>
                    {mockUserProfile.position}
                  </div>
                </div>
              </div>
              
              <div className={styles.userDropdownMenu}>
                {userMenuOptions.map((option) => (
                  <button
                    key={option.id}
                    className={styles.userMenuItem}
                    onClick={() => handleUserMenuClick(option)}
                  >
                    {getMenuIcon(option.icon)}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EnhancedNavbar; 
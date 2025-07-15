'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import EnhancedNavbar from '@/components/Dashboard/Navbar/EnhancedNavbar';
import styles from './layout.module.css';

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  session: any;
}

const DashboardLayoutClient: React.FC<DashboardLayoutClientProps> = ({ 
  children, 
  session 
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close sidebar when switching from mobile to desktop
      if (window.innerWidth > 768) {
        setIsMobileSidebarOpen(false);
      }
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Sidebar 
        isOpen={isMobile ? isMobileSidebarOpen : true}
        onClose={handleCloseMobileSidebar}
      />
      <main className={`${styles.main} ${isMobile && isMobileSidebarOpen ? styles.mainWithMobileNav : ''}`}>
        <EnhancedNavbar 
          userName={session.user?.name} 
          userEmail={session.user?.email}
          userImage={session.user?.image}
          onMobileMenuToggle={handleMobileMenuToggle}
          isMobileMenuOpen={isMobileSidebarOpen}
        />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayoutClient; 
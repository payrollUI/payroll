import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import EnhancedNavbar from '@/components/Dashboard/Navbar/EnhancedNavbar';
import React from 'react';
import styles from './layout.module.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <EnhancedNavbar 
          userName={session.user?.name} 
          userEmail={session.user?.email}
          userImage={session.user?.image}
        />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
} 
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function NotificationsPage() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh', 
      fontSize: 32, 
      fontWeight: 600,
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <h1>Notifications</h1>
      <p style={{ fontSize: '18px', fontWeight: 400, color: '#6b7280' }}>
        All notifications will be displayed here
      </p>
    </div>
  );
} 
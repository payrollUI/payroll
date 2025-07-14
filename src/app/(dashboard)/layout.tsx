import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';
import Navbar from '@/components/Dashboard/Navbar/Navbar';
import React from 'react';

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
    <section>
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        Welcome, {session.user?.name}
      </header>
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar userName={session.user?.name} />
        <div style={{ flex: 1 }}>{children}</div>
      </main>
    </div>
    </section>
  );
} 
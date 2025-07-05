import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
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
      <main>{children}</main>
    </section>
  );
}

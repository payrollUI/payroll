import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Form16Page() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontSize: 32, fontWeight: 600 }}>
      taxes-and-forms/form-16
    </main>
  );
} 
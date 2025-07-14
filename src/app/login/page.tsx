import LoginForm from '../../components/LogIn/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    // ✅ If session exists, redirect to dashboard
    redirect('/dashboard');
  }
  return <LoginForm />;
}
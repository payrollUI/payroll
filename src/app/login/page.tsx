import LoginForm from '../../components/LogIn/LoginForm';
import { getServerSession } from 'next-auth';
// Make sure the path and file exist; adjust if necessary:
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    // ✅ If session exists, redirect to dashboard
    redirect('/dashboard');
  }
  return <LoginForm />;
}
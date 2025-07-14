import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import EnhancedDashboard from '@/components/Dashboard/EnhancedDashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  return <EnhancedDashboard userName={session?.user?.name} />;
} 
// Comprehensive payroll demo data matching Zoho Payroll structure

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface SetupTask {
  id: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'Pending';
  route?: string;
  isClickable: boolean;
  completedAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  isRead: boolean;
}

export interface Office {
  id: string;
  name: string;
  location: string;
  isHeadOffice: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  position: string;
  organization: string;
  provider?: 'google' | 'linkedin' | 'credentials';
}

export interface DashboardStats {
  totalEmployees: number;
  activePayrolls: number;
  pendingApprovals: number;
  completedPayruns: number;
}

// Demo user profile
export const mockUserProfile: UserProfile = {
  id: 'user_001',
  name: 'Anurag K',
  email: '210622anurag@gmail.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  position: 'HR Manager',
  organization: 'ABC Head Office',
  provider: 'google'
};

// Demo employees data
export const mockEmployees: Employee[] = [
  { id: 'emp_001', name: 'John Doe', email: 'john@company.com', position: 'Software Engineer', department: 'IT', salary: 75000, status: 'active', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 'emp_002', name: 'Jane Smith', email: 'jane@company.com', position: 'HR Specialist', department: 'HR', salary: 65000, status: 'active', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 'emp_003', name: 'Michael Johnson', email: 'michael@company.com', position: 'Marketing Manager', department: 'Marketing', salary: 80000, status: 'active', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 'emp_004', name: 'Emily Williams', email: 'emily@company.com', position: 'Financial Analyst', department: 'Finance', salary: 70000, status: 'active', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 'emp_005', name: 'Anurag Kumar', email: 'anurag@company.com', position: 'DevOps Engineer', department: 'IT', salary: 85000, status: 'active', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

// Setup tasks matching Zoho Payroll structure
export const setupTasks: SetupTask[] = [
  {
    id: 'task_001',
    title: 'Add Organisation Details',
    description: 'Complete your organization information',
    status: 'Pending',
    route: '/settings/organization',
    isClickable: true
  },
  {
    id: 'task_002',
    title: 'Provide your Tax Details',
    description: 'Set up tax configuration for payroll',
    status: 'Pending',
    route: '/settings/tax-details',
    isClickable: true
  },
  {
    id: 'task_003',
    title: 'Configure your Pay Schedule',
    description: 'Define payment frequencies and schedules',
    status: 'Pending',
    route: '/settings/pay-schedule',
    isClickable: true
  },
  {
    id: 'task_004',
    title: 'Set up Statutory Components',
    description: 'Configure required statutory deductions',
    status: 'Pending',
    route: '/settings/statutory-components',
    isClickable: true
  },
  {
    id: 'task_005',
    title: 'Set up Salary Components',
    description: 'Define salary structure and components',
    status: 'Pending',
    route: '/settings/salary-components',
    isClickable: true
  },
  {
    id: 'task_006',
    title: 'Add Employees',
    description: 'Add employee information to the system',
    status: 'Pending',
    route: '/employees',
    isClickable: true
  },
  {
    id: 'task_007',
    title: 'Configure Prior Payroll',
    description: 'Set up historical payroll data',
    status: 'Pending',
    route: '/settings/prior-payroll',
    isClickable: true
  }
];

// Demo notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    title: 'Payroll Reminder',
    message: 'Monthly payroll processing is due in 3 days',
    type: 'warning',
    timestamp: '2024-01-20T10:30:00Z',
    isRead: false
  },
  {
    id: 'notif_002',
    title: 'Employee Added',
    message: 'New employee John Doe has been added to the system',
    type: 'success',
    timestamp: '2024-01-19T14:20:00Z',
    isRead: false
  },
  {
    id: 'notif_003',
    title: 'Tax Update Required',
    message: 'Please update tax settings for the new financial year',
    type: 'info',
    timestamp: '2024-01-18T09:15:00Z',
    isRead: true
  },
  {
    id: 'notif_004',
    title: 'Compliance Check',
    message: 'Annual compliance report needs to be submitted',
    type: 'warning',
    timestamp: '2024-01-17T16:45:00Z',
    isRead: false
  }
];

// Demo offices
export const mockOffices: Office[] = [
  {
    id: 'office_001',
    name: 'ABC Head Office',
    location: 'Mumbai, India',
    isHeadOffice: true
  },
  {
    id: 'office_002',
    name: 'ABC Bangalore Branch',
    location: 'Bangalore, India',
    isHeadOffice: false
  },
  {
    id: 'office_003',
    name: 'ABC Delhi Branch',
    location: 'New Delhi, India',
    isHeadOffice: false
  },
  {
    id: 'office_004',
    name: 'ABC Chennai Branch',
    location: 'Chennai, India',
    isHeadOffice: false
  }
];

// Dashboard statistics
export const dashboardStats: DashboardStats = {
  totalEmployees: 24,
  activePayrolls: 3,
  pendingApprovals: 2,
  completedPayruns: 15
};

// User menu options for dropdown
export const userMenuOptions = [
  { id: 'profile', label: 'My Account', icon: 'User', route: '/settings/profile' },
  { id: 'preferences', label: 'Preferences', icon: 'Settings', route: '/settings/preferences' },
  { id: 'notifications', label: 'Notification Settings', icon: 'Bell', route: '/settings/notifications' },
  { id: 'security', label: 'Security', icon: 'Shield', route: '/settings/security' },
  { id: 'help', label: 'Help & Support', icon: 'HelpCircle', route: '/help' },
  { id: 'logout', label: 'Sign Out', icon: 'LogOut', route: '/logout' }
];

// Additional features for dashboard
export const additionalFeatures = [
  {
    id: 'direct-deposit',
    icon: 'Building2',
    title: 'Direct Deposit',
    description: 'Set up direct deposit for employees'
  },
  {
    id: 'salary-templates',
    icon: 'FileText',
    title: 'Salary Templates',
    description: 'Create salary templates for faster processing'
  },
  {
    id: 'auto-reminder',
    icon: 'Bell',
    title: 'Auto Reminder for IT & PCI Declaration',
    description: 'Automated reminders for compliance'
  }
];

// Calculate completion percentage
export const getCompletionPercentage = (): number => {
  const completedTasks = setupTasks.filter(task => task.status === 'COMPLETED').length;
  return Math.round((completedTasks / setupTasks.length) * 100);
};

// Get completed tasks count
export const getCompletedTasksCount = (): { completed: number; total: number } => {
  const completed = setupTasks.filter(task => task.status === 'COMPLETED').length;
  return { completed, total: setupTasks.length };
}; 
'use client';
import React from 'react';
import { 
  User, 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock, 
  Download,
  Edit,
  Eye,
  Building2,
  Phone,
  Mail
} from 'lucide-react';
import styles from './ess.module.css';
import { mockUserProfile, mockEmployees } from '@/data/PayrollData';

export default function ESSPage() {
  // Using mock data for demonstration
  const employee = mockEmployees[0]; // Using first employee as example
  const userProfile = mockUserProfile;

  const essServices = [
    {
      icon: FileText,
      title: 'View Payslips',
      description: 'Download and view your monthly payslips',
      action: 'View Payslips',
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Leave Management',
      description: 'Apply for leave and check balance',
      action: 'Manage Leave',
      color: 'green'
    },
    {
      icon: DollarSign,
      title: 'Tax Documents',
      description: 'Access Form 16 and other tax documents',
      action: 'View Documents',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Attendance',
      description: 'View your attendance and working hours',
      action: 'View Attendance',
      color: 'orange'
    },
    {
      icon: User,
      title: 'Profile Management',
      description: 'Update your personal information',
      action: 'Edit Profile',
      color: 'teal'
    },
    {
      icon: Building2,
      title: 'Company Policies',
      description: 'Read company policies and guidelines',
      action: 'View Policies',
      color: 'indigo'
    }
  ];

  const recentPayslips = [
    { month: 'December 2023', amount: '₹75,000', status: 'Paid' },
    { month: 'November 2023', amount: '₹75,000', status: 'Paid' },
    { month: 'October 2023', amount: '₹75,000', status: 'Paid' }
  ];

  const leaveBalance = [
    { type: 'Annual Leave', available: 12, total: 20 },
    { type: 'Sick Leave', available: 8, total: 10 },
    { type: 'Personal Leave', available: 3, total: 5 }
  ];

  return (
    <div className={styles.essContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>worksy</span>
          <span className={styles.logoSub}>Employee Self Service</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeCard}>
            <div className={styles.employeeInfo}>
              <img 
                src={employee.avatar} 
                alt={employee.name}
                className={styles.employeeAvatar}
              />
              <div className={styles.employeeDetails}>
                <h1 className={styles.employeeName}>Welcome, {employee.name}!</h1>
                <p className={styles.employeePosition}>{employee.position}</p>
                <p className={styles.employeeId}>Employee ID: {employee.id}</p>
              </div>
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>{employee.email}</span>
              </div>
              <div className={styles.contactItem}>
                <Building2 size={16} />
                <span>{employee.department}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className={styles.servicesGrid}>
          {essServices.map((service, index) => (
            <div key={index} className={`${styles.serviceCard} ${styles[service.color]}`}>
              <div className={styles.serviceIcon}>
                <service.icon size={24} />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <button className={styles.serviceButton}>
                {service.action}
              </button>
            </div>
          ))}
        </div>

        {/* Dashboard Widgets */}
        <div className={styles.widgetsContainer}>
          {/* Recent Payslips */}
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>
              <h3>Recent Payslips</h3>
              <button className={styles.viewAllButton}>View All</button>
            </div>
            <div className={styles.widgetContent}>
              {recentPayslips.map((payslip, index) => (
                <div key={index} className={styles.payslipItem}>
                  <div className={styles.payslipInfo}>
                    <span className={styles.payslipMonth}>{payslip.month}</span>
                    <span className={styles.payslipAmount}>{payslip.amount}</span>
                  </div>
                  <div className={styles.payslipActions}>
                    <span className={styles.payslipStatus}>{payslip.status}</span>
                    <button className={styles.downloadButton}>
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Balance */}
          <div className={styles.widget}>
            <div className={styles.widgetHeader}>
              <h3>Leave Balance</h3>
              <button className={styles.viewAllButton}>Apply Leave</button>
            </div>
            <div className={styles.widgetContent}>
              {leaveBalance.map((leave, index) => (
                <div key={index} className={styles.leaveItem}>
                  <div className={styles.leaveInfo}>
                    <span className={styles.leaveType}>{leave.type}</span>
                    <span className={styles.leaveBalance}>
                      {leave.available} of {leave.total} days
                    </span>
                  </div>
                  <div className={styles.leaveBar}>
                    <div 
                      className={styles.leaveProgress}
                      style={{ width: `${(leave.available / leave.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h3>Quick Links</h3>
          <div className={styles.linksGrid}>
            <a href="#" className={styles.quickLink}>
              <FileText size={20} />
              <span>Employee Handbook</span>
            </a>
            <a href="#" className={styles.quickLink}>
              <Calendar size={20} />
              <span>Company Calendar</span>
            </a>
            <a href="#" className={styles.quickLink}>
              <Phone size={20} />
              <span>HR Contact</span>
            </a>
            <a href="#" className={styles.quickLink}>
              <User size={20} />
              <span>Organization Chart</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>&copy; 2024 Worksy Payroll. All rights reserved.</p>
        <p>For technical support, contact: support@worksy.com</p>
      </div>
    </div>
  );
} 
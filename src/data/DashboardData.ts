// src/data/dashboardData.js
import { Building2, Receipt, Bell } from 'lucide-react';

export const dashboardData = {
  user: {
    name: "Biplob Chakraborty",
    organization: "Tech Solutions Inc."
  },
  progress: {
    completed: 7,
    total: 7,
    percentage: 100
  },
  completedTasks: [
    { id: 1, title: "Add Organization Details", status: "COMPLETED" },
    { id: 2, title: "Provide your Tax Details", status: "COMPLETED" },
    { id: 3, title: "Configure your Pay Schedule", status: "COMPLETED" },
    { id: 4, title: "Set up Statutory Components", status: "COMPLETED" },
    { id: 5, title: "Set up Salary Components", status: "COMPLETED" },
    { id: 6, title: "Add Employees", status: "COMPLETED" },
    { id: 7, title: "Configure Pay Payroll", status: "COMPLETED" }
  ],
  additionalFeatures: [
    {
      icon: Building2,
      title: "Direct Dequeue",
      description: "Set up direct bank transfers"
    },
    {
      icon: Receipt,
      title: "Salary Templates",
      description: "Create reusable salary structures"
    },
    {
      icon: Bell,
      title: "Auto Reminders for P&L Deductions",
      description: "Never miss important deductions"
    }
  ],
  stats: {
    totalEmployees: 24,
    activePayrolls: 3,
    pendingApprovals: 2,
    completedPayruns: 15
  }
};

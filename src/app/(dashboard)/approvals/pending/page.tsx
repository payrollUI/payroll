'use client';
import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  User, 
  Calendar, 
  DollarSign,
  AlertTriangle,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Check,
  X,
  MessageSquare,
  FileText,
  TrendingUp
} from 'lucide-react';
import styles from './pending-approvals.module.css';

interface PendingApproval {
  id: string;
  type: 'Leave Request' | 'Expense Claim' | 'Timesheet' | 'Salary Adjustment' | 'Overtime Request';
  employee: {
    name: string;
    id: string;
    avatar: string;
    department: string;
  };
  title: string;
  description: string;
  amount?: string;
  requestDate: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending Review' | 'Manager Approved' | 'HR Review' | 'Final Approval';
  daysOverdue?: number;
  approver: string;
}

const mockPendingApprovals: PendingApproval[] = [
  {
    id: 'APP-001',
    type: 'Leave Request',
    employee: {
      name: 'John Smith',
      id: 'EMP001',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      department: 'Engineering'
    },
    title: 'Annual Leave - Family Vacation',
    description: '5 days annual leave for family vacation from March 15-19, 2024',
    requestDate: '2024-03-01',
    urgency: 'Medium',
    status: 'Pending Review',
    approver: 'Sarah Johnson'
  },
  {
    id: 'APP-002',
    type: 'Expense Claim',
    employee: {
      name: 'Emily Davis',
      id: 'EMP004',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      department: 'Marketing'
    },
    title: 'Conference Travel Expenses',
    description: 'Travel and accommodation expenses for Tech Marketing Summit 2024',
    amount: '$2,450.00',
    requestDate: '2024-02-28',
    urgency: 'High',
    status: 'Manager Approved',
    daysOverdue: 2,
    approver: 'Michael Chen'
  },
  {
    id: 'APP-003',
    type: 'Overtime Request',
    employee: {
      name: 'David Wilson',
      id: 'EMP005',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      department: 'Sales'
    },
    title: 'Q1 Project Overtime',
    description: 'Additional 20 hours overtime for Q1 project completion',
    amount: '$850.00',
    requestDate: '2024-03-05',
    urgency: 'Low',
    status: 'HR Review',
    approver: 'Sarah Johnson'
  },
  {
    id: 'APP-004',
    type: 'Salary Adjustment',
    employee: {
      name: 'Sarah Johnson',
      id: 'EMP002',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c51ad4?w=150',
      department: 'Product'
    },
    title: 'Performance-based Salary Increase',
    description: 'Annual performance review salary adjustment for exceptional performance',
    amount: '+$8,500 annually',
    requestDate: '2024-02-25',
    urgency: 'Medium',
    status: 'Final Approval',
    approver: 'HR Director'
  },
  {
    id: 'APP-005',
    type: 'Timesheet',
    employee: {
      name: 'Michael Chen',
      id: 'EMP003',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      department: 'Design'
    },
    title: 'Weekly Timesheet Correction',
    description: 'Correction for missed clock-in on March 3rd, 2024',
    requestDate: '2024-03-04',
    urgency: 'Low',
    status: 'Pending Review',
    approver: 'Team Lead'
  }
];

export default function PendingApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('');
  const [selectedApprovals, setSelectedApprovals] = useState<string[]>([]);

  const types = [...new Set(mockPendingApprovals.map(approval => approval.type))];
  const urgencies = [...new Set(mockPendingApprovals.map(approval => approval.urgency))];

  const filteredApprovals = mockPendingApprovals.filter(approval => {
    const matchesSearch = 
      approval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !filterType || approval.type === filterType;
    const matchesUrgency = !filterUrgency || approval.urgency === filterUrgency;

    return matchesSearch && matchesType && matchesUrgency;
  });

  const handleSelectApproval = (approvalId: string) => {
    setSelectedApprovals(prev => 
      prev.includes(approvalId) 
        ? prev.filter(id => id !== approvalId)
        : [...prev, approvalId]
    );
  };

  const handleSelectAll = () => {
    if (selectedApprovals.length === filteredApprovals.length) {
      setSelectedApprovals([]);
    } else {
      setSelectedApprovals(filteredApprovals.map(approval => approval.id));
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return styles.urgencyHigh;
      case 'Medium': return styles.urgencyMedium;
      case 'Low': return styles.urgencyLow;
      default: return styles.urgencyLow;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Review': return styles.statusPending;
      case 'Manager Approved': return styles.statusApproved;
      case 'HR Review': return styles.statusReview;
      case 'Final Approval': return styles.statusFinal;
      default: return styles.statusPending;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Leave Request': return <Calendar size={16} />;
      case 'Expense Claim': return <DollarSign size={16} />;
      case 'Timesheet': return <Clock size={16} />;
      case 'Salary Adjustment': return <TrendingUp size={16} />;
      case 'Overtime Request': return <Clock size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <Clock size={28} />
            Pending Approvals
          </h1>
          <p className={styles.subtitle}>
            Review and manage pending approval requests
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <CheckCircle size={18} />
            Bulk Approve
          </button>
          <button className={styles.dangerButton}>
            <XCircle size={18} />
            Bulk Reject
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Pending Requests</h3>
            <p className={styles.statNumber}>24</p>
            <span className={styles.statChange}>3 overdue</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>High Priority</h3>
            <p className={styles.statNumber}>5</p>
            <span className={styles.statChange}>Requires attention</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <User size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Your Queue</h3>
            <p className={styles.statNumber}>12</p>
            <span className={styles.statChange}>Assigned to you</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <DollarSign size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Total Value</h3>
            <p className={styles.statNumber}>$15,200</p>
            <span className={styles.statChange}>Pending approval</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <div className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <AlertTriangle size={32} />
          </div>
          <div className={styles.actionContent}>
            <h3>Overdue Items</h3>
            <p>3 requests are overdue and require immediate attention</p>
            <button className={styles.actionDangerButton}>
              Review Overdue
            </button>
          </div>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <CheckCircle size={32} />
          </div>
          <div className={styles.actionContent}>
            <h3>Batch Processing</h3>
            <p>Process multiple similar requests at once</p>
            <button className={styles.actionSecondaryButton}>
              Start Batch Review
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search approvals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filters}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Urgency</option>
            {urgencies.map(urgency => (
              <option key={urgency} value={urgency}>{urgency}</option>
            ))}
          </select>
          
          <button className={styles.filterButton}>
            <Filter size={18} />
            More Filters
          </button>
        </div>
      </div>

      {/* Approvals Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedApprovals.length === filteredApprovals.length}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Request</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Days Pending</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApprovals.map((approval) => (
              <tr key={approval.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedApprovals.includes(approval.id)}
                    onChange={() => handleSelectApproval(approval.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>
                  <div className={styles.requestCell}>
                    <div className={styles.requestInfo}>
                      <div className={styles.requestTitle}>{approval.title}</div>
                      <div className={styles.requestId}>{approval.id}</div>
                      <div className={styles.requestDescription}>{approval.description}</div>
                    </div>
                    {approval.daysOverdue && (
                      <div className={styles.overdueFlag}>
                        <AlertTriangle size={14} />
                        {approval.daysOverdue}d overdue
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.employeeCell}>
                    <img 
                      src={approval.employee.avatar} 
                      alt={approval.employee.name}
                      className={styles.avatar}
                    />
                    <div className={styles.employeeInfo}>
                      <div className={styles.employeeName}>{approval.employee.name}</div>
                      <div className={styles.employeeDept}>{approval.employee.department}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.typeTag}>
                    {getTypeIcon(approval.type)}
                    {approval.type}
                  </span>
                </td>
                <td className={styles.amount}>
                  {approval.amount || 'N/A'}
                </td>
                <td>
                  <span className={`${styles.urgency} ${getUrgencyColor(approval.urgency)}`}>
                    {approval.urgency}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${getStatusColor(approval.status)}`}>
                    {approval.status}
                  </span>
                </td>
                <td className={styles.daysPending}>
                  {Math.floor((new Date().getTime() - new Date(approval.requestDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.approveButton} title="Approve">
                      <Check size={16} />
                    </button>
                    <button className={styles.rejectButton} title="Reject">
                      <X size={16} />
                    </button>
                    <button className={styles.actionIcon} title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionIcon} title="Add Comment">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className={styles.tableFooter}>
        <div className={styles.tableInfo}>
          Showing {filteredApprovals.length} of {mockPendingApprovals.length} pending approvals
          {selectedApprovals.length > 0 && (
            <span className={styles.selectedInfo}>
              • {selectedApprovals.length} selected
            </span>
          )}
        </div>
        <div className={styles.pagination}>
          <button className={styles.paginationButton}>Previous</button>
          <span className={styles.paginationInfo}>Page 1 of 1</span>
          <button className={styles.paginationButton}>Next</button>
        </div>
      </div>
    </div>
  );
} 
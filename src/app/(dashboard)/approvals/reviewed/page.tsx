'use client';
import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  DollarSign,
  Filter,
  Search,
  Eye,
  Download,
  History,
  FileText,
  TrendingUp,
  BarChart
} from 'lucide-react';
import styles from './reviewed-approvals.module.css';

interface ReviewedApproval {
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
  reviewDate: string;
  status: 'Approved' | 'Rejected';
  reviewedBy: string;
  comments?: string;
}

const mockReviewedApprovals: ReviewedApproval[] = [
  {
    id: 'APP-R001',
    type: 'Leave Request',
    employee: {
      name: 'Alice Cooper',
      id: 'EMP006',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      department: 'HR'
    },
    title: 'Sick Leave - Medical Appointment',
    description: '3 days sick leave for medical treatment',
    requestDate: '2024-02-15',
    reviewDate: '2024-02-16',
    status: 'Approved',
    reviewedBy: 'Sarah Johnson',
    comments: 'Medical documentation provided. Approved for recovery time.'
  },
  {
    id: 'APP-R002',
    type: 'Expense Claim',
    employee: {
      name: 'Robert Brown',
      id: 'EMP007',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
      department: 'Sales'
    },
    title: 'Client Dinner Expenses',
    description: 'Business dinner with potential client - ABC Corp',
    amount: '$340.00',
    requestDate: '2024-02-20',
    reviewDate: '2024-02-22',
    status: 'Rejected',
    reviewedBy: 'Michael Chen',
    comments: 'Exceeded per-person limit for client entertainment. Please resubmit with adjusted amount.'
  },
  {
    id: 'APP-R003',
    type: 'Overtime Request',
    employee: {
      name: 'Lisa Garcia',
      id: 'EMP008',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      department: 'Engineering'
    },
    title: 'Sprint Completion Overtime',
    description: 'Weekend work for critical sprint completion',
    amount: '$1,200.00',
    requestDate: '2024-02-18',
    reviewDate: '2024-02-19',
    status: 'Approved',
    reviewedBy: 'Technical Director',
    comments: 'Critical for project timeline. Approved with appreciation for dedication.'
  },
  {
    id: 'APP-R004',
    type: 'Salary Adjustment',
    employee: {
      name: 'James Wilson',
      id: 'EMP009',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      department: 'Marketing'
    },
    title: 'Annual Performance Review Increase',
    description: 'Merit-based salary increase following annual review',
    amount: '+$5,000 annually',
    requestDate: '2024-01-30',
    reviewDate: '2024-02-05',
    status: 'Approved',
    reviewedBy: 'HR Director',
    comments: 'Exceptional performance metrics. Well-deserved increase.'
  }
];

export default function ReviewedApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const types = [...new Set(mockReviewedApprovals.map(approval => approval.type))];
  const statuses = [...new Set(mockReviewedApprovals.map(approval => approval.status))];

  const filteredApprovals = mockReviewedApprovals.filter(approval => {
    const matchesSearch = 
      approval.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !filterType || approval.type === filterType;
    const matchesStatus = !filterStatus || approval.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === 'Approved' ? styles.statusApproved : styles.statusRejected;
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

  const approvedCount = mockReviewedApprovals.filter(a => a.status === 'Approved').length;
  const rejectedCount = mockReviewedApprovals.filter(a => a.status === 'Rejected').length;
  const totalValue = mockReviewedApprovals
    .filter(a => a.amount && a.status === 'Approved')
    .reduce((sum, a) => sum + parseFloat(a.amount!.replace(/[^0-9.-]+/g, "")), 0);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <History size={28} />
            Reviewed Approvals
          </h1>
          <p className={styles.subtitle}>
            View completed approval requests and their outcomes
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <Download size={18} />
            Export Report
          </button>
          <button className={styles.actionButton}>
            <BarChart size={18} />
            Analytics
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Approved Requests</h3>
            <p className={styles.statNumber}>{approvedCount}</p>
            <span className={styles.statChange}>This month</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <XCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Rejected Requests</h3>
            <p className={styles.statNumber}>{rejectedCount}</p>
            <span className={styles.statChange}>Needs follow-up</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <DollarSign size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Approved Value</h3>
            <p className={styles.statNumber}>${totalValue.toLocaleString()}</p>
            <span className={styles.statChange}>Financial impact</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Avg Review Time</h3>
            <p className={styles.statNumber}>1.2 days</p>
            <span className={styles.statChange}>Improved efficiency</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search reviewed approvals..."
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
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
              <th>Request</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Review Date</th>
              <th>Reviewed By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApprovals.map((approval) => (
              <tr key={approval.id} className={styles.tableRow}>
                <td>
                  <div className={styles.requestCell}>
                    <div className={styles.requestInfo}>
                      <div className={styles.requestTitle}>{approval.title}</div>
                      <div className={styles.requestId}>{approval.id}</div>
                      <div className={styles.requestDescription}>{approval.description}</div>
                      {approval.comments && (
                        <div className={styles.comments}>
                          <strong>Review Comments:</strong> {approval.comments}
                        </div>
                      )}
                    </div>
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
                <td className={styles.reviewDate}>
                  {new Date(approval.reviewDate).toLocaleDateString()}
                </td>
                <td className={styles.reviewer}>
                  {approval.reviewedBy}
                </td>
                <td>
                  <span className={`${styles.status} ${getStatusColor(approval.status)}`}>
                    {approval.status === 'Approved' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {approval.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionIcon} title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionIcon} title="Download Report">
                      <Download size={16} />
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
          Showing {filteredApprovals.length} of {mockReviewedApprovals.length} reviewed approvals
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
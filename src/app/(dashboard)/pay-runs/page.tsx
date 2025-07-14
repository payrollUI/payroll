'use client';
import React, { useState } from 'react';
import { 
  Play, 
  Plus, 
  Calendar, 
  Users, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Download,
  Filter,
  Search,
  MoreVertical,
  Eye,
  Edit3,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import styles from './pay-runs.module.css';

interface PayRun {
  id: string;
  name: string;
  period: string;
  startDate: string;
  endDate: string;
  payDate: string;
  status: 'Draft' | 'Processing' | 'Completed' | 'Failed';
  employeeCount: number;
  totalAmount: string;
  netPay: string;
  taxes: string;
  deductions: string;
  createdAt: string;
  createdBy: string;
}

const mockPayRuns: PayRun[] = [
  {
    id: 'PR-2024-001',
    name: 'January 2024 Payroll',
    period: 'January 2024',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    payDate: '2024-02-01',
    status: 'Completed',
    employeeCount: 156,
    totalAmount: '$485,600',
    netPay: '$398,420',
    taxes: '$72,840',
    deductions: '$14,340',
    createdAt: '2024-02-01T10:30:00Z',
    createdBy: 'John Smith'
  },
  {
    id: 'PR-2024-002',
    name: 'February 2024 Payroll',
    period: 'February 2024',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    payDate: '2024-03-01',
    status: 'Processing',
    employeeCount: 158,
    totalAmount: '$492,800',
    netPay: '$404,296',
    taxes: '$73,920',
    deductions: '$14,584',
    createdAt: '2024-03-01T09:15:00Z',
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'PR-2024-003',
    name: 'March 2024 Payroll',
    period: 'March 2024',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    payDate: '2024-04-01',
    status: 'Draft',
    employeeCount: 160,
    totalAmount: '$499,200',
    netPay: '$410,172',
    taxes: '$74,880',
    deductions: '$14,148',
    createdAt: '2024-03-25T14:20:00Z',
    createdBy: 'Michael Chen'
  }
];

export default function PayRunsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedPayRuns, setSelectedPayRuns] = useState<string[]>([]);

  const statuses = [...new Set(mockPayRuns.map(run => run.status))];

  const filteredPayRuns = mockPayRuns.filter(payRun => {
    const matchesSearch = 
      payRun.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payRun.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payRun.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !filterStatus || payRun.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleSelectPayRun = (payRunId: string) => {
    setSelectedPayRuns(prev => 
      prev.includes(payRunId) 
        ? prev.filter(id => id !== payRunId)
        : [...prev, payRunId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPayRuns.length === filteredPayRuns.length) {
      setSelectedPayRuns([]);
    } else {
      setSelectedPayRuns(filteredPayRuns.map(run => run.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return styles.statusCompleted;
      case 'Processing': return styles.statusProcessing;
      case 'Draft': return styles.statusDraft;
      case 'Failed': return styles.statusFailed;
      default: return styles.statusDraft;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} />;
      case 'Processing': return <Clock size={16} />;
      case 'Draft': return <Edit3 size={16} />;
      case 'Failed': return <AlertCircle size={16} />;
      default: return <Edit3 size={16} />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <Play size={28} />
            Pay Runs
          </h1>
          <p className={styles.subtitle}>
            Manage payroll processing and payment cycles
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <RefreshCw size={18} />
            Sync Data
          </button>
          <button className={styles.actionButton}>
            <Download size={18} />
            Export
          </button>
          <button className={styles.primaryButton}>
            <Plus size={18} />
            New Pay Run
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calendar size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Current Period</h3>
            <p className={styles.statNumber}>March 2024</p>
            <span className={styles.statChange}>15 days remaining</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Active Employees</h3>
            <p className={styles.statNumber}>160</p>
            <span className={styles.statChange}>+4 from last month</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <DollarSign size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Monthly Payroll</h3>
            <p className={styles.statNumber}>$499,200</p>
            <span className={styles.statChange}>+1.3% from last month</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>YTD Total</h3>
            <p className={styles.statNumber}>$1.48M</p>
            <span className={styles.statChange}>On track for budget</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <div className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <Play size={32} />
          </div>
          <div className={styles.actionContent}>
            <h3>Run Current Payroll</h3>
            <p>Process March 2024 payroll for 160 employees</p>
            <button className={styles.actionPrimaryButton}>
              Start Processing
            </button>
          </div>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <Calendar size={32} />
          </div>
          <div className={styles.actionContent}>
            <h3>Schedule Pay Run</h3>
            <p>Set up automatic payroll for future periods</p>
            <button className={styles.actionSecondaryButton}>
              Setup Schedule
            </button>
          </div>
        </div>
        <div className={styles.actionCard}>
          <div className={styles.actionIcon}>
            <Download size={32} />
          </div>
          <div className={styles.actionContent}>
            <h3>Download Reports</h3>
            <p>Export payroll summaries and detailed reports</p>
            <button className={styles.actionSecondaryButton}>
              View Reports
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
            placeholder="Search pay runs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filters}>
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

      {/* Pay Runs Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedPayRuns.length === filteredPayRuns.length}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Pay Run</th>
              <th>Period</th>
              <th>Pay Date</th>
              <th>Employees</th>
              <th>Total Amount</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayRuns.map((payRun) => (
              <tr key={payRun.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPayRuns.includes(payRun.id)}
                    onChange={() => handleSelectPayRun(payRun.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>
                  <div className={styles.payRunCell}>
                    <div className={styles.payRunInfo}>
                      <div className={styles.payRunName}>{payRun.name}</div>
                      <div className={styles.payRunId}>{payRun.id}</div>
                      <div className={styles.payRunMeta}>
                        Created by {payRun.createdBy}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={styles.period}>
                  <div className={styles.periodInfo}>
                    <div>{payRun.period}</div>
                    <div className={styles.dateRange}>
                      {new Date(payRun.startDate).toLocaleDateString()} - {new Date(payRun.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className={styles.payDate}>
                  {new Date(payRun.payDate).toLocaleDateString()}
                </td>
                <td className={styles.employeeCount}>
                  <span className={styles.countBadge}>
                    <Users size={14} />
                    {payRun.employeeCount}
                  </span>
                </td>
                <td className={styles.totalAmount}>
                  <div className={styles.amountInfo}>
                    <div className={styles.mainAmount}>{payRun.totalAmount}</div>
                    <div className={styles.breakdown}>
                      Taxes: {payRun.taxes} • Deductions: {payRun.deductions}
                    </div>
                  </div>
                </td>
                <td className={styles.netPay}>{payRun.netPay}</td>
                <td>
                  <span className={`${styles.status} ${getStatusColor(payRun.status)}`}>
                    {getStatusIcon(payRun.status)}
                    {payRun.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionIcon} title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionIcon} title="Edit Pay Run">
                      <Edit3 size={16} />
                    </button>
                    <button className={styles.actionIcon} title="More Options">
                      <MoreVertical size={16} />
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
          Showing {filteredPayRuns.length} of {mockPayRuns.length} pay runs
          {selectedPayRuns.length > 0 && (
            <span className={styles.selectedInfo}>
              • {selectedPayRuns.length} selected
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
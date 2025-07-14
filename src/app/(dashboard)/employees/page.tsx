'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import styles from './employees.module.css';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  joinDate: string;
  salary: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  avatar: string;
}

const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Developer',
    department: 'Engineering',
    location: 'New York',
    joinDate: '2022-03-15',
    salary: '$95,000',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: 'EMP002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Product Manager',
    department: 'Product',
    location: 'San Francisco',
    joinDate: '2021-08-22',
    salary: '$110,000',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c51ad4?w=150'
  },
  {
    id: 'EMP003',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 345-6789',
    position: 'UX Designer',
    department: 'Design',
    location: 'Los Angeles',
    joinDate: '2023-01-10',
    salary: '$85,000',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'EMP004',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 456-7890',
    position: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Chicago',
    joinDate: '2022-11-05',
    salary: '$70,000',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  },
  {
    id: 'EMP005',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 567-8901',
    position: 'Sales Manager',
    department: 'Sales',
    location: 'Boston',
    joinDate: '2020-06-18',
    salary: '$105,000',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  }
];

export default function EmployeesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const departments = [...new Set(mockEmployees.map(emp => emp.department))];
  const statuses = [...new Set(mockEmployees.map(emp => emp.status))];

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
    const matchesStatus = !filterStatus || employee.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return styles.statusActive;
      case 'Inactive': return styles.statusInactive;
      case 'On Leave': return styles.statusOnLeave;
      default: return styles.statusActive;
    }
  };

  const handleAddEmployee = () => {
    // Mark this task as completed
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes('task_006')) {
      completedTasks.push('task_006');
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    alert('Employee added successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <Users size={28} />
            Employees
          </h1>
          <p className={styles.subtitle}>
            Manage your workforce and employee information
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <Upload size={18} />
            Import
          </button>
          <button className={styles.actionButton}>
            <Download size={18} />
            Export
          </button>
          <button className={styles.primaryButton} onClick={handleAddEmployee}>
            <Plus size={18} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Total Employees</h3>
            <p className={styles.statNumber}>156</p>
            <span className={styles.statChange}>+12 this month</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calendar size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Active Today</h3>
            <p className={styles.statNumber}>142</p>
            <span className={styles.statChange}>91% attendance</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MapPin size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Departments</h3>
            <p className={styles.statNumber}>8</p>
            <span className={styles.statChange}>Engineering: 45</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={styles.controlsBar}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filters}>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
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

      {/* Employee Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === filteredEmployees.length}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
              </th>
              <th>Employee</th>
              <th>Position</th>
              <th>Department</th>
              <th>Location</th>
              <th>Join Date</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className={styles.tableRow}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => handleSelectEmployee(employee.id)}
                    className={styles.checkbox}
                  />
                </td>
                <td>
                  <div className={styles.employeeCell}>
                    <img 
                      src={employee.avatar} 
                      alt={employee.name}
                      className={styles.avatar}
                    />
                    <div className={styles.employeeInfo}>
                      <div className={styles.employeeName}>{employee.name}</div>
                      <div className={styles.employeeId}>{employee.id}</div>
                      <div className={styles.employeeContact}>
                        <Mail size={12} />
                        {employee.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className={styles.position}>{employee.position}</td>
                <td className={styles.department}>{employee.department}</td>
                <td className={styles.location}>{employee.location}</td>
                <td className={styles.joinDate}>
                  {new Date(employee.joinDate).toLocaleDateString()}
                </td>
                <td className={styles.salary}>{employee.salary}</td>
                <td>
                  <span className={`${styles.status} ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionIcon} title="View Details">
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionIcon} title="Edit Employee">
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
          Showing {filteredEmployees.length} of {mockEmployees.length} employees
          {selectedEmployees.length > 0 && (
            <span className={styles.selectedInfo}>
              • {selectedEmployees.length} selected
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
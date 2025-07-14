'use client';
import React, { useState } from 'react';
import styles from './help.module.css';
import {
  Search,
  HelpCircle,
  MessageCircle,
  FileText,
  Video,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Users,
  Download,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  category: string;
  description: string;
}

const HelpAndSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ticketForm, setTicketForm] = useState<SupportTicket>({
    subject: '',
    priority: 'Medium',
    category: 'General',
    description: ''
  });

  // Mock data for FAQ
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How do I process a new pay run?",
      answer: "Navigate to Pay Runs > Create New Run. Select the pay period, review employee data, calculate gross amounts, apply deductions, and approve the run. The system will automatically generate payslips.",
      category: "Payroll"
    },
    {
      id: 2,
      question: "How do I add a new employee to the system?",
      answer: "Go to Employees > Add Employee. Fill in personal details, job information, salary structure, and tax details. The employee will receive login credentials via email.",
      category: "Employee Management"
    },
    {
      id: 3,
      question: "How can I generate Form 16 for employees?",
      answer: "Navigate to Taxes and Forms > Form 16. Select the financial year, choose employees or departments, and click Generate. The system will create individualized Form 16 documents.",
      category: "Tax Forms"
    },
    {
      id: 4,
      question: "What should I do if payroll calculations seem incorrect?",
      answer: "First, verify employee salary components and tax settings. Check for recent changes in tax rates or statutory deductions. If issues persist, contact support with specific employee details.",
      category: "Troubleshooting"
    },
    {
      id: 5,
      question: "How do I set up statutory components like PF and ESI?",
      answer: "Go to Settings > Statutory Components. Configure PF rates, ESI percentages, and professional tax settings. The system will automatically apply these to eligible employees.",
      category: "Configuration"
    },
    {
      id: 6,
      question: "Can I import employee data from another system?",
      answer: "Yes, go to Employees > Import. Download the template, fill in employee data, and upload the file. The system supports CSV and Excel formats.",
      category: "Data Management"
    }
  ];

  const categories = ['All', 'Payroll', 'Employee Management', 'Tax Forms', 'Troubleshooting', 'Configuration', 'Data Management'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission logic here
    console.log('Support ticket submitted:', ticketForm);
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setTicketForm({
      subject: '',
      priority: 'Medium',
      category: 'General',
      description: ''
    });
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Help & Support</h1>
          <p className={styles.subtitle}>
            Get help with payroll management, find answers to common questions, and contact our support team
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <HelpCircle className={styles.statIcon} />
          <div className={styles.statContent}>
            <div className={styles.statNumber}>250+</div>
            <div className={styles.statLabel}>Articles</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <Video className={styles.statIcon} />
          <div className={styles.statContent}>
            <div className={styles.statNumber}>45</div>
            <div className={styles.statLabel}>Video Tutorials</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <Users className={styles.statIcon} />
          <div className={styles.statContent}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Support</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <Clock className={styles.statIcon} />
          <div className={styles.statContent}>
            <div className={styles.statNumber}>&lt; 2hrs</div>
            <div className={styles.statLabel}>Response Time</div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for help articles, tutorials, or common questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tab} ${activeTab === 'faq' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          <HelpCircle size={18} />
          FAQ
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'knowledge' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('knowledge')}
        >
          <FileText size={18} />
          Knowledge Base
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'videos' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <Video size={18} />
          Tutorials
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'contact' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <MessageCircle size={18} />
          Contact Support
        </button>
      </div>

      {/* Content Area */}
      <div className={styles.contentArea}>
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className={styles.faqSection}>
            <div className={styles.sectionHeader}>
              <h2>Frequently Asked Questions</h2>
              <div className={styles.categoryFilter}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.categorySelect}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.faqList}>
              {filteredFAQs.map(faq => (
                <div key={faq.id} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    {expandedFAQ === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                      <div className={styles.faqCategory}>Category: {faq.category}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Knowledge Base Tab */}
        {activeTab === 'knowledge' && (
          <div className={styles.knowledgeSection}>
            <h2>Knowledge Base</h2>
            <div className={styles.knowledgeGrid}>
              <div className={styles.knowledgeCard}>
                <FileText className={styles.knowledgeIcon} />
                <h3>Getting Started Guide</h3>
                <p>Complete guide to setting up your payroll system and processing your first pay run.</p>
                <div className={styles.knowledgeActions}>
                  <button className={styles.downloadBtn}>
                    <Download size={16} />
                    Download PDF
                  </button>
                  <button className={styles.viewBtn}>
                    <ExternalLink size={16} />
                    View Online
                  </button>
                </div>
              </div>
              
              <div className={styles.knowledgeCard}>
                <FileText className={styles.knowledgeIcon} />
                <h3>Employee Management</h3>
                <p>Learn how to add, edit, and manage employee records, departments, and roles.</p>
                <div className={styles.knowledgeActions}>
                  <button className={styles.downloadBtn}>
                    <Download size={16} />
                    Download PDF
                  </button>
                  <button className={styles.viewBtn}>
                    <ExternalLink size={16} />
                    View Online
                  </button>
                </div>
              </div>

              <div className={styles.knowledgeCard}>
                <FileText className={styles.knowledgeIcon} />
                <h3>Tax Calculations</h3>
                <p>Understanding tax deductions, Form 16 generation, and statutory compliance.</p>
                <div className={styles.knowledgeActions}>
                  <button className={styles.downloadBtn}>
                    <Download size={16} />
                    Download PDF
                  </button>
                  <button className={styles.viewBtn}>
                    <ExternalLink size={16} />
                    View Online
                  </button>
                </div>
              </div>

              <div className={styles.knowledgeCard}>
                <FileText className={styles.knowledgeIcon} />
                <h3>Reports & Analytics</h3>
                <p>Generate comprehensive payroll reports and analyze workforce data.</p>
                <div className={styles.knowledgeActions}>
                  <button className={styles.downloadBtn}>
                    <Download size={16} />
                    Download PDF
                  </button>
                  <button className={styles.viewBtn}>
                    <ExternalLink size={16} />
                    View Online
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Tutorials Tab */}
        {activeTab === 'videos' && (
          <div className={styles.videoSection}>
            <h2>Video Tutorials</h2>
            <div className={styles.videoGrid}>
              <div className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                  <Video className={styles.playIcon} />
                </div>
                <div className={styles.videoContent}>
                  <h3>Setting Up Your First Pay Run</h3>
                  <p>A step-by-step walkthrough of creating and processing your first payroll.</p>
                  <div className={styles.videoMeta}>
                    <span className={styles.duration}>12:34</span>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                  <Video className={styles.playIcon} />
                </div>
                <div className={styles.videoContent}>
                  <h3>Employee Onboarding Process</h3>
                  <p>Learn how to efficiently add and onboard new employees to the system.</p>
                  <div className={styles.videoMeta}>
                    <span className={styles.duration}>8:45</span>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                  <Video className={styles.playIcon} />
                </div>
                <div className={styles.videoContent}>
                  <h3>Tax Configuration and Compliance</h3>
                  <p>Configure tax settings and ensure compliance with statutory requirements.</p>
                  <div className={styles.videoMeta}>
                    <span className={styles.duration}>15:20</span>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} />
                      <span>4.7</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                  <Video className={styles.playIcon} />
                </div>
                <div className={styles.videoContent}>
                  <h3>Generating Reports and Analytics</h3>
                  <p>Create comprehensive reports and analyze your payroll data effectively.</p>
                  <div className={styles.videoMeta}>
                    <span className={styles.duration}>10:15</span>
                    <div className={styles.rating}>
                      <Star className={styles.starIcon} />
                      <span>4.6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Support Tab */}
        {activeTab === 'contact' && (
          <div className={styles.contactSection}>
            <div className={styles.contactGrid}>
              {/* Contact Methods */}
              <div className={styles.contactMethods}>
                <h2>Get in Touch</h2>
                <p>Our support team is here to help you with any questions or issues.</p>

                <div className={styles.contactOptions}>
                  <div className={styles.contactOption}>
                    <MessageCircle className={styles.contactIcon} />
                    <div className={styles.contactInfo}>
                      <h3>Live Chat</h3>
                      <p>Available 24/7 for immediate assistance</p>
                      <button className={styles.contactBtn}>Start Chat</button>
                    </div>
                  </div>

                  <div className={styles.contactOption}>
                    <Mail className={styles.contactIcon} />
                    <div className={styles.contactInfo}>
                      <h3>Email Support</h3>
                      <p>support@worksy.com</p>
                      <span className={styles.responseTime}>Response within 2 hours</span>
                    </div>
                  </div>

                  <div className={styles.contactOption}>
                    <Phone className={styles.contactIcon} />
                    <div className={styles.contactInfo}>
                      <h3>Phone Support</h3>
                      <p>+1 (555) 123-4567</p>
                      <span className={styles.responseTime}>Mon-Fri 9AM-6PM PST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Ticket Form */}
              <div className={styles.ticketForm}>
                <h2>Submit a Support Ticket</h2>
                <form onSubmit={handleTicketSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="priority">Priority</label>
                      <select
                        id="priority"
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value as 'Low' | 'Medium' | 'High' | 'Urgent'})}
                        className={styles.formSelect}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                        className={styles.formSelect}
                      >
                        <option value="General">General</option>
                        <option value="Payroll">Payroll</option>
                        <option value="Employee Management">Employee Management</option>
                        <option value="Tax Forms">Tax Forms</option>
                        <option value="Technical">Technical</option>
                        <option value="Billing">Billing</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                      placeholder="Please provide detailed information about your issue, including any error messages or steps you've already tried..."
                      rows={6}
                      required
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <Send size={16} />
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Resources */}
      <div className={styles.resourcesSection}>
        <h2>Additional Resources</h2>
        <div className={styles.resourcesGrid}>
          <div className={styles.resourceCard}>
            <CheckCircle className={styles.resourceIcon} />
            <h3>System Status</h3>
            <p>Check current system status and maintenance schedules</p>
            <button className={styles.resourceBtn}>View Status</button>
          </div>

          <div className={styles.resourceCard}>
            <FileText className={styles.resourceIcon} />
            <h3>API Documentation</h3>
            <p>Comprehensive API docs for developers and integrations</p>
            <button className={styles.resourceBtn}>View Docs</button>
          </div>

          <div className={styles.resourceCard}>
            <Users className={styles.resourceIcon} />
            <h3>Community Forum</h3>
            <p>Join our community to share tips and ask questions</p>
            <button className={styles.resourceBtn}>Join Forum</button>
          </div>

          <div className={styles.resourceCard}>
            <AlertCircle className={styles.resourceIcon} />
            <h3>Known Issues</h3>
            <p>View known issues and their current resolution status</p>
            <button className={styles.resourceBtn}>View Issues</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupportPage; 
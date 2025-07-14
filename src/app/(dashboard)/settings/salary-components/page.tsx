'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, DollarSign, Plus, Trash2, Edit3 } from 'lucide-react';
import styles from '../settings.module.css';

interface SalaryComponent {
  id: string;
  name: string;
  type: 'allowance' | 'deduction';
  category: 'basic' | 'allowance' | 'bonus' | 'reimbursement' | 'other';
  calculation: 'percentage' | 'fixed' | 'variable';
  value: string;
  baseComponent: string;
  taxable: boolean;
  enabled: boolean;
}

export default function SalaryComponentsPage() {
  const router = useRouter();
  const [components, setComponents] = useState<SalaryComponent[]>([
    {
      id: '1',
      name: 'Basic Salary',
      type: 'allowance',
      category: 'basic',
      calculation: 'fixed',
      value: '50000',
      baseComponent: '',
      taxable: true,
      enabled: true
    },
    {
      id: '2',
      name: 'House Rent Allowance',
      type: 'allowance',
      category: 'allowance',
      calculation: 'percentage',
      value: '50',
      baseComponent: 'Basic Salary',
      taxable: true,
      enabled: true
    },
    {
      id: '3',
      name: 'Transport Allowance',
      type: 'allowance',
      category: 'allowance',
      calculation: 'fixed',
      value: '3000',
      baseComponent: '',
      taxable: false,
      enabled: true
    },
    {
      id: '4',
      name: 'Special Allowance',
      type: 'allowance',
      category: 'allowance',
      calculation: 'percentage',
      value: '20',
      baseComponent: 'Basic Salary',
      taxable: true,
      enabled: true
    },
    {
      id: '5',
      name: 'Performance Bonus',
      type: 'allowance',
      category: 'bonus',
      calculation: 'variable',
      value: '0',
      baseComponent: '',
      taxable: true,
      enabled: false
    }
  ]);

  const [newComponent, setNewComponent] = useState<Partial<SalaryComponent>>({
    name: '',
    type: 'allowance',
    category: 'allowance',
    calculation: 'fixed',
    value: '',
    baseComponent: '',
    taxable: true,
    enabled: true
  });

  const handleComponentChange = (id: string, field: keyof SalaryComponent, value: any) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const handleNewComponentChange = (field: keyof SalaryComponent, value: any) => {
    setNewComponent(prev => ({ ...prev, [field]: value }));
  };

  const addComponent = () => {
    if (newComponent.name && newComponent.value) {
      const component: SalaryComponent = {
        id: Date.now().toString(),
        name: newComponent.name!,
        type: newComponent.type!,
        category: newComponent.category!,
        calculation: newComponent.calculation!,
        value: newComponent.value!,
        baseComponent: newComponent.baseComponent || '',
        taxable: newComponent.taxable!,
        enabled: newComponent.enabled!
      };
      setComponents(prev => [...prev, component]);
      setNewComponent({
        name: '',
        type: 'allowance',
        category: 'allowance',
        calculation: 'fixed',
        value: '',
        baseComponent: '',
        taxable: true,
        enabled: true
      });
    }
  };

  const removeComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const handleSave = () => {
    console.log('Saving salary components:', components);
    
    // Mark this task as completed
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes('task_005')) {
      completedTasks.push('task_005');
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    alert('Salary components saved successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const getBaseComponents = () => {
    return components.filter(comp => comp.type === 'allowance' && comp.category === 'basic');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <DollarSign size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Salary Components</h1>
          <p className={styles.settingsSubtitle}>
            Configure salary structure, allowances, and deductions for payroll calculation
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Component Categories */}
        <div className={styles.infoBox}>
          <div className={styles.infoTitle}>Salary Structure Information</div>
          <div className={styles.infoText}>
            Configure your organization's salary components including basic salary, allowances, bonuses, and deductions. 
            Each component can be calculated as a fixed amount, percentage of another component, or variable amount.
          </div>
        </div>

        {/* Existing Components */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Configured Components</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {components.map((component) => (
              <div key={component.id} className={styles.settingsCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>
                    {component.name}
                    <span style={{ 
                      marginLeft: '0.5rem', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '0.25rem', 
                      fontSize: '0.75rem',
                      background: component.type === 'allowance' ? '#10b981' : '#ef4444',
                      color: 'white'
                    }}>
                      {component.type}
                    </span>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Component Name</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={component.name}
                        onChange={(e) => handleComponentChange(component.id, 'name', e.target.value)}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Type</label>
                      <select
                        className={styles.formInput}
                        value={component.type}
                        onChange={(e) => handleComponentChange(component.id, 'type', e.target.value)}
                      >
                        <option value="allowance">Allowance</option>
                        <option value="deduction">Deduction</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Category</label>
                      <select
                        className={styles.formInput}
                        value={component.category}
                        onChange={(e) => handleComponentChange(component.id, 'category', e.target.value)}
                      >
                        <option value="basic">Basic</option>
                        <option value="allowance">Allowance</option>
                        <option value="bonus">Bonus</option>
                        <option value="reimbursement">Reimbursement</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Calculation Method</label>
                      <select
                        className={styles.formInput}
                        value={component.calculation}
                        onChange={(e) => handleComponentChange(component.id, 'calculation', e.target.value)}
                      >
                        <option value="fixed">Fixed Amount</option>
                        <option value="percentage">Percentage</option>
                        <option value="variable">Variable</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        {component.calculation === 'percentage' ? 'Rate (%)' : 
                         component.calculation === 'fixed' ? 'Amount (₹)' : 'Default Value'}
                      </label>
                      <input
                        type="number"
                        className={styles.formInput}
                        value={component.value}
                        onChange={(e) => handleComponentChange(component.id, 'value', e.target.value)}
                        step={component.calculation === 'percentage' ? '0.01' : '1'}
                        min="0"
                      />
                    </div>

                    {component.calculation === 'percentage' && (
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Base Component</label>
                        <select
                          className={styles.formInput}
                          value={component.baseComponent}
                          onChange={(e) => handleComponentChange(component.id, 'baseComponent', e.target.value)}
                        >
                          <option value="">Select base component</option>
                          {getBaseComponents().map(baseComp => (
                            <option key={baseComp.id} value={baseComp.name}>
                              {baseComp.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div className={styles.toggleGroup} style={{ margin: 0 }}>
                        <div className={styles.toggleLabel}>
                          <div className={styles.toggleTitle}>Taxable</div>
                        </div>
                        <div
                          className={`${styles.toggleSwitch} ${component.taxable ? styles.active : ''}`}
                          onClick={() => handleComponentChange(component.id, 'taxable', !component.taxable)}
                        />
                      </div>

                      <div className={styles.toggleGroup} style={{ margin: 0 }}>
                        <div className={styles.toggleLabel}>
                          <div className={styles.toggleTitle}>Enabled</div>
                        </div>
                        <div
                          className={`${styles.toggleSwitch} ${component.enabled ? styles.active : ''}`}
                          onClick={() => handleComponentChange(component.id, 'enabled', !component.enabled)}
                        />
                      </div>
                      
                      <button
                        className={styles.cancelButton}
                        onClick={() => removeComponent(component.id)}
                        style={{ background: '#ef4444', color: 'white', padding: '0.5rem', borderRadius: '0.375rem' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Component */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Add New Component</h3>
          
          <div className={styles.settingsCard}>
            <div className={styles.cardContent}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Component Name *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={newComponent.name || ''}
                    onChange={(e) => handleNewComponentChange('name', e.target.value)}
                    placeholder="Enter component name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Type *</label>
                  <select
                    className={styles.formInput}
                    value={newComponent.type || 'allowance'}
                    onChange={(e) => handleNewComponentChange('type', e.target.value)}
                  >
                    <option value="allowance">Allowance</option>
                    <option value="deduction">Deduction</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category *</label>
                  <select
                    className={styles.formInput}
                    value={newComponent.category || 'allowance'}
                    onChange={(e) => handleNewComponentChange('category', e.target.value)}
                  >
                    <option value="basic">Basic</option>
                    <option value="allowance">Allowance</option>
                    <option value="bonus">Bonus</option>
                    <option value="reimbursement">Reimbursement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Calculation Method *</label>
                  <select
                    className={styles.formInput}
                    value={newComponent.calculation || 'fixed'}
                    onChange={(e) => handleNewComponentChange('calculation', e.target.value)}
                  >
                    <option value="fixed">Fixed Amount</option>
                    <option value="percentage">Percentage</option>
                    <option value="variable">Variable</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {newComponent.calculation === 'percentage' ? 'Rate (%) *' : 
                     newComponent.calculation === 'fixed' ? 'Amount (₹) *' : 'Default Value *'}
                  </label>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={newComponent.value || ''}
                    onChange={(e) => handleNewComponentChange('value', e.target.value)}
                    placeholder={newComponent.calculation === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                    step={newComponent.calculation === 'percentage' ? '0.01' : '1'}
                    min="0"
                  />
                </div>

                {newComponent.calculation === 'percentage' && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Base Component</label>
                    <select
                      className={styles.formInput}
                      value={newComponent.baseComponent || ''}
                      onChange={(e) => handleNewComponentChange('baseComponent', e.target.value)}
                    >
                      <option value="">Select base component</option>
                      {getBaseComponents().map(baseComp => (
                        <option key={baseComp.id} value={baseComp.name}>
                          {baseComp.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className={styles.toggleGroup} style={{ margin: 0 }}>
                    <div className={styles.toggleLabel}>
                      <div className={styles.toggleTitle}>Taxable</div>
                    </div>
                    <div
                      className={`${styles.toggleSwitch} ${newComponent.taxable ? styles.active : ''}`}
                      onClick={() => handleNewComponentChange('taxable', !newComponent.taxable)}
                    />
                  </div>

                  <button
                    className={styles.saveButton}
                    onClick={addComponent}
                    style={{ background: '#10b981' }}
                  >
                    <Plus size={16} />
                    Add Component
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button className={styles.saveButton} onClick={handleSave}>
            <Save size={16} />
            Save All Components
          </button>
        </div>
      </div>
    </div>
  );
} 
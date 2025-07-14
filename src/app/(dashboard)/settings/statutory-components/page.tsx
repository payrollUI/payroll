'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Shield, Plus, Trash2 } from 'lucide-react';
import styles from '../settings.module.css';

interface StatutoryComponent {
  id: string;
  name: string;
  type: 'deduction' | 'contribution';
  calculation: 'percentage' | 'fixed';
  value: string;
  maxLimit: string;
  enabled: boolean;
}

export default function StatutoryComponentsPage() {
  const router = useRouter();
  const [components, setComponents] = useState<StatutoryComponent[]>([
    {
      id: '1',
      name: 'Provident Fund',
      type: 'deduction',
      calculation: 'percentage',
      value: '12',
      maxLimit: '1800',
      enabled: true
    },
    {
      id: '2',
      name: 'Employee State Insurance',
      type: 'deduction',
      calculation: 'percentage',
      value: '0.75',
      maxLimit: '178',
      enabled: true
    },
    {
      id: '3',
      name: 'Professional Tax',
      type: 'deduction',
      calculation: 'fixed',
      value: '200',
      maxLimit: '2400',
      enabled: true
    },
    {
      id: '4',
      name: 'Labour Welfare Fund',
      type: 'deduction',
      calculation: 'fixed',
      value: '20',
      maxLimit: '240',
      enabled: false
    }
  ]);

  const [newComponent, setNewComponent] = useState<Partial<StatutoryComponent>>({
    name: '',
    type: 'deduction',
    calculation: 'percentage',
    value: '',
    maxLimit: '',
    enabled: true
  });

  const handleComponentChange = (id: string, field: keyof StatutoryComponent, value: any) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const handleNewComponentChange = (field: keyof StatutoryComponent, value: any) => {
    setNewComponent(prev => ({ ...prev, [field]: value }));
  };

  const addComponent = () => {
    if (newComponent.name && newComponent.value) {
      const component: StatutoryComponent = {
        id: Date.now().toString(),
        name: newComponent.name!,
        type: newComponent.type!,
        calculation: newComponent.calculation!,
        value: newComponent.value!,
        maxLimit: newComponent.maxLimit || '0',
        enabled: newComponent.enabled!
      };
      setComponents(prev => [...prev, component]);
      setNewComponent({
        name: '',
        type: 'deduction',
        calculation: 'percentage',
        value: '',
        maxLimit: '',
        enabled: true
      });
    }
  };

  const removeComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const handleSave = () => {
    console.log('Saving statutory components:', components);
    
    // Mark this task as completed
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (!completedTasks.includes('task_004')) {
      completedTasks.push('task_004');
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
    
    alert('Statutory components saved successfully!');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <div className={styles.headerIcon}>
          <Shield size={32} />
        </div>
        <div>
          <h1 className={styles.settingsTitle}>Statutory Components</h1>
          <p className={styles.settingsSubtitle}>
            Configure statutory deductions and contributions for payroll compliance
          </p>
        </div>
      </div>

      <div className={styles.settingsContent}>
        {/* Existing Components */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Configured Components</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {components.map((component) => (
              <div key={component.id} className={styles.settingsCard}>
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
                        <option value="deduction">Deduction</option>
                        <option value="contribution">Contribution</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Calculation Method</label>
                      <select
                        className={styles.formInput}
                        value={component.calculation}
                        onChange={(e) => handleComponentChange(component.id, 'calculation', e.target.value)}
                      >
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        {component.calculation === 'percentage' ? 'Rate (%)' : 'Amount (₹)'}
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

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Maximum Limit (₹)</label>
                      <input
                        type="number"
                        className={styles.formInput}
                        value={component.maxLimit}
                        onChange={(e) => handleComponentChange(component.id, 'maxLimit', e.target.value)}
                        min="0"
                      />
                    </div>

                    <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                    value={newComponent.type || 'deduction'}
                    onChange={(e) => handleNewComponentChange('type', e.target.value)}
                  >
                    <option value="deduction">Deduction</option>
                    <option value="contribution">Contribution</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Calculation Method *</label>
                  <select
                    className={styles.formInput}
                    value={newComponent.calculation || 'percentage'}
                    onChange={(e) => handleNewComponentChange('calculation', e.target.value)}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {newComponent.calculation === 'percentage' ? 'Rate (%) *' : 'Amount (₹) *'}
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

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Maximum Limit (₹)</label>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={newComponent.maxLimit || ''}
                    onChange={(e) => handleNewComponentChange('maxLimit', e.target.value)}
                    placeholder="Enter maximum limit"
                    min="0"
                  />
                </div>

                <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center' }}>
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
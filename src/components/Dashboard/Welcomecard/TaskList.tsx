import React from 'react';
import styles from './Welcomecard.module.css';

export type Task = {
  id: number;
  title: string;
  status: string;
};

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => (
  <ul className={styles.taskList}>
    {tasks.map(task => (
      <li key={task.id} className={styles.taskRow}>
        <div className={styles.taskLeft}>
          <div className={styles.checkmark}>
            <div className={styles.checkmarkInner}></div>
          </div>
          <span className={styles.taskText}>
            {task.id}. {task.title}
          </span>
        </div>
        <span className={styles.statusTag}>{task.status}</span>
      </li>
    ))}
  </ul>
);

export default TaskList;

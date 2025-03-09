import React, { useEffect, useState } from 'react';
import { Inbox, LayoutDashboard, Calendar, Star, CheckSquare, Hash } from 'lucide-react';
import { Task, Project } from '../../types';
import TaskItem from '../TaskItem';

interface TaskListProps {
  activeTab: string;
  filteredTasks: Task[];
  projects: Project[];
  showTaskMenu: string | null;
  setShowTaskMenu: React.Dispatch<React.SetStateAction<string | null>>;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  activeTab, 
  projects, 
  showTaskMenu, 
  setShowTaskMenu, 
  toggleTaskCompletion, 
  deleteTask 
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/tasks/');
        if (!response.ok) {
          throw new Error('No tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'inbox':
        return 'Inbox';
      case 'today':
        return 'Today';
      case 'upcoming':
        return 'Upcoming';
      case 'important':
        return 'Important';
      case 'completed':
        return 'Completed';
      default:
        if (activeTab.startsWith('project-')) {
          const projectId = activeTab.replace('project-', '');
          const project = projects.find(p => p.id === projectId);
          return project ? project.name : 'Project';
        }
        return 'Tasks';
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case 'inbox':
        return <Inbox size={16} className="mr-2" />;
      case 'today':
        return <LayoutDashboard size={16} className="mr-2" />;
      case 'upcoming':
        return <Calendar size={16} className="mr-2" />;
      case 'important':
        return <Star size={16} className="mr-2" />;
      case 'completed':
        return <CheckSquare size={16} className="mr-2" />;
      default:
        if (activeTab.startsWith('project-')) {
          return <Hash size={16} className="mr-2" />;
        }
        return <LayoutDashboard size={16} className="mr-2" />;
    }
  };

  // Filter tasks based on activeTab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'completed') return task.completed;
    if (activeTab === 'important') return task.important;
    if (activeTab.startsWith('project-')) {
      const projectId = activeTab.replace('project-', '');
      return task.project === projectId;
    }
    return !task.completed; // Default: show incomplete tasks
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">{getTabTitle()}</h1>
      <div className="flex items-center text-gray-500 mb-6">
        {getTabIcon()}
        <span>To do ({filteredTasks.filter(t => !t.completed).length})</span>
      </div>

      <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-white">
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks found</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              showTaskMenu={showTaskMenu}
              setShowTaskMenu={setShowTaskMenu}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

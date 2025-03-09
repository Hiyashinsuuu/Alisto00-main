import React, { useState, useEffect } from 'react';
import { Task, Project } from '../types';
import Sidebar from '../components/Sidebar';
import AddTaskModal from '../components/AddTaskModal';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TaskList from '../components/dashboard/TaskList';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Update this with your actual API URL

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    { id: 'school', name: 'School', count: 0 },
    { id: 'home', name: 'Home', count: 0 },
    { id: 'random', name: 'Random', count: 0 },
    { id: 'friends', name: 'Friends', count: 0 },
  ]);
  const [activeTab, setActiveTab] = useState('today');
  const [newTask, setNewTask] = useState({
    title: '',
    location: '',
    category: '',
    tag: '',
    project: '',
    dueDate: null as Date | null,
    dueTime: ''
  });
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskMenu, setShowTaskMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState(''); // Define the userName variable

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/`); 
        if (!response.ok) throw new Error('Failed to fetch user info');
        const data = await response.json();
        console.log('Fetched user data:', data); // Debugging line
        setUserName(data.name); // Assuming the API returns an object with a 'name' field
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    fetchUser();
  }, []);

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/`);
        if (!response.ok) throw new Error('No tasks found');
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;
  const uncompletedTasksCount = totalTasksCount - completedTasksCount;
  const upcomingTasksCount = tasks.filter(task => task.dueDate && new Date(task.dueDate).getTime() > Date.now() && !task.completed).length;

  const getFilteredTasks = () => {
    let filtered = tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.location && task.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.tag && task.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    switch (activeTab) {
      case 'today':
        return filtered.filter(task => task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString());
      case 'upcoming':
        return filtered.filter(task => task.dueDate && new Date(task.dueDate).getTime() > Date.now());
      case 'completed':
        return filtered.filter(task => task.completed);
      case 'important':
        return filtered.filter(task => task.tag === 'School');
      default:
        if (activeTab.startsWith('project-')) {
          const projectId = activeTab.replace('project-', '');
          return filtered.filter(task => task.project === projectId);
        }
        return filtered;
    }
  };

  const handleAddTask = async () => {
    if (newTask.title.trim() === '') return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error('Failed to add task');
      
      const addedTask: Task = await response.json();
      setTasks(prevTasks => [...prevTasks, addedTask]);
      setNewTask({ title: '', location: '', category: '', tag: '', project: '', dueDate: null, dueTime: '' });
      setShowAddTaskModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;

      const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !taskToUpdate.completed }),
      });

      if (!response.ok) throw new Error('Failed to update task');

      const updatedTask = await response.json();
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setShowTaskMenu(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        projects={projects}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowAddTaskModal={setShowAddTaskModal}
        completedTasksCount={completedTasksCount}
        totalTasksCount={totalTasksCount}
        uncompletedTasksCount={uncompletedTasksCount}
        upcomingTasksCount={upcomingTasksCount}
        userName={userName}
      />

      <div className="flex-1 flex flex-col bg-white">
        <DashboardHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <TaskList 
            activeTab={activeTab}
            filteredTasks={getFilteredTasks()}
            projects={projects}
            showTaskMenu={showTaskMenu}
            setShowTaskMenu={setShowTaskMenu}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        </main>
      </div>

      {showAddTaskModal && (
        <AddTaskModal 
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          setShowAddTaskModal={setShowAddTaskModal}
          projects={projects}
        />
      )}
    </div>
  );
};

export default Dashboard;

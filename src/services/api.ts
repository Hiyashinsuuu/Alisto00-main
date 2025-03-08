import axios from 'axios';

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Define the Task interface
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get('/todos/');
  return response.data;
};

// Create a new task
export const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
  const response = await axiosInstance.post('/todos/', taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId: number): Promise<void> => {
  await axiosInstance.delete(`/todos/${taskId}/`);
};

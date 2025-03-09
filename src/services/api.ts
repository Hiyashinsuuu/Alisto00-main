import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api"; // Update if needed

export const getTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/`);
  return response.data;
};

export const createTask = async (taskData: { title: string; completed: boolean }) => {
  const response = await axios.post(`${BASE_URL}/tasks/create/`, taskData);
  return response.data;
};

export const updateTask = async (taskId: number, updatedTask: { title: string; completed: boolean }) => {
  const response = await axios.put(`${BASE_URL}/tasks/update/${taskId}/`, updatedTask);
  return response.data;
};

export const deleteTask = async (taskId: number) => {
  await axios.delete(`${BASE_URL}/tasks/delete/${taskId}/`);
};

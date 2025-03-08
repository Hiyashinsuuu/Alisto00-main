import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // Update if necessary
});

// ✅ Fetch all tasks
export const getTasks = async () => {
    try {
        const response = await API.get("/tasks/");
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

// ✅ Create a new task
export const createTask = async (taskData) => {
    try {
        const response = await API.post("/tasks/create/", taskData);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
    }
};

// ✅ Update a task
export const updateTask = async (taskId, updatedData) => {
    try {
        const response = await API.put(`/tasks/update/${taskId}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

// ✅ Delete a task
export const deleteTask = async (taskId) => {
    try {
        await API.delete(`/tasks/delete/${taskId}/`);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

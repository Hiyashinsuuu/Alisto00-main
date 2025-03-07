
import React from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';

interface AddTaskModalProps {
  newTask: {
    title: string;
    location: string;
    category: string;
    tag: string;
    project: string;
  };
  setNewTask: React.Dispatch<React.SetStateAction<{
    title: string;
    location: string;
    category: string;
    tag: string;
    project: string;
  }>>;
  handleAddTask: () => void;
  setShowAddTaskModal: (show: boolean) => void;
  projects: Project[];
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  newTask, 
  setNewTask, 
  handleAddTask, 
  setShowAddTaskModal,
  projects
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in-50 zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Task</h2>
          <button 
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setShowAddTaskModal(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={newTask.location}
              onChange={(e) => setNewTask({...newTask, location: e.target.value})}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Enter location (optional)"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={newTask.category}
              onChange={(e) => setNewTask({...newTask, category: e.target.value})}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Enter category (optional)"
            />
          </div>
          
          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              value={newTask.tag}
              onChange={(e) => setNewTask({...newTask, tag: e.target.value})}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder="Enter tag (optional)"
            />
          </div>
          
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              id="project"
              value={newTask.project}
              onChange={(e) => setNewTask({...newTask, project: e.target.value})}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            >
              <option value="">Select a project (optional)</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowAddTaskModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
              onClick={handleAddTask}
              disabled={!newTask.title.trim()}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

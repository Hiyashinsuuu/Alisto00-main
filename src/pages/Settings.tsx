
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pencil, User, Upload, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'account'>('account');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const { toast } = useToast();

  const handleTabChange = (tab: 'general' | 'account') => {
    setActiveTab(tab);
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your settings have been updated successfully",
    });
  };

  const handleDeleteAccount = () => {
    if (currentPassword.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      });
      return;
    }
    // In a real application, we would validate the password here
    setShowDeleteModal(false);
    toast({
      title: "Account deleted",
      description: "Your account has been deleted successfully",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <div className="relative">
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto p-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b flex">
            <button
              className={`px-6 py-3 text-sm font-medium flex items-center ${
                activeTab === 'general' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => handleTabChange('general')}
            >
              <span className="mr-2">🔍</span>
              General
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium flex items-center ${
                activeTab === 'account' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => handleTabChange('account')}
            >
              <span className="mr-2">👤</span>
              Account
            </button>
          </div>
        </div>

        {/* Account Content */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <p className="text-sm text-gray-500 mb-6">Please update your profile settings here.</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="text-gray-900">KazutoKei03</div>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <Pencil size={18} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="text-gray-900">••••••••••••••••••</div>
                </div>
                <button className="text-blue-500 hover:text-blue-600">
                  <Pencil size={18} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                    <User size={32} className="text-gray-400" />
                  </div>
                  <div className="space-x-2">
                    <button 
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      onClick={() => setShowUploadModal(true)}
                    >
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-red-500 mb-2">Delete Account</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Please enter your current password to proceed to account deletion.
                </p>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* General Content */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <p className="text-sm text-gray-500 mb-6">Customize your application preferences.</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">Receive email notifications for task reminders</p>
                </div>
                <div className="form-switch">
                  <input 
                    type="checkbox" 
                    className="h-5 w-10 rounded-full cursor-pointer" 
                    defaultChecked 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">
                    Dark Mode
                  </label>
                  <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                </div>
                <div className="form-switch">
                  <input 
                    type="checkbox" 
                    className="h-5 w-10 rounded-full cursor-pointer" 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">
                    Sound Effects
                  </label>
                  <p className="text-sm text-gray-500">Play sounds when completing tasks</p>
                </div>
                <div className="form-switch">
                  <input 
                    type="checkbox" 
                    className="h-5 w-10 rounded-full cursor-pointer" 
                  />
                </div>
              </div>
              
              <div className="border-t pt-6 flex justify-end">
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upload Image Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upload Image</h2>
              <button 
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowUploadModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
              <Upload size={24} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Click or drag file to upload</p>
              <p className="text-xs text-gray-400">Formats accepted are .jpg, .png, and .gif</p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => setShowUploadModal(false)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Are you sure?</h2>
              <button 
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowDeleteModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              This action is permanent. Once you delete your account, all your data will be lost and cannot be recovered.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your password:
              </label>
              <input 
                type="password" 
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            
            <div className="flex justify-center space-x-3 pt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
              <button
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

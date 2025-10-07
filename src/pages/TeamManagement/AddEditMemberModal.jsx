import React, { useState, useEffect, useCallback } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const AddEditMemberModal = ({ onClose, onSave, mode, member }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: 'agent',
    status: 'active',
    temporaryPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation rules
  const validationRules = {
    name: (value) => !value.trim() ? "Full Name is required" : "",
    username: (value) => !value.trim() ? "Username is required" : "",
    email: (value) => {
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
      return "";
    },
    role: (value) => !value.trim() ? "Role is required" : "",
    status: (value) => !value.trim() ? "Status is required" : "",
    temporaryPassword: (value) => {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) 
        return "Password must contain uppercase, lowercase, and number";
      return "";
    }
  };

  // Memoized validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      // Skip password validation in edit mode
      if (mode === 'edit' && field === 'temporaryPassword') return;
      
      const error = validationRules[field](formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, mode]);

  // Validate field on change
  const validateField = useCallback((name, value) => {
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, []);

  useEffect(() => {
    if (mode === 'edit' && member) {
      setFormData({
        name: member.name || '',
        username: member.username || '',
        email: member.email || '',
        role: member.role || 'agent',
        status: member.status || 'active',
        temporaryPassword: ''
      });
    }
  }, [mode, member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const saveData = mode === 'edit' && member 
        ? { ...formData, id: member.id, joinDate: member.joinDate, lastActive: member.lastActive }
        : { ...formData, lastActive: new Date().toISOString() };
      
      await onSave(saveData);
    } catch (error) {
      console.error('Error saving member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Validate field after a short delay (debounce)
    setTimeout(() => validateField(name, value), 300);
  };

  const handleClose = () => {
    if (isLoading) return; // Prevent closing while loading
    
    setFormData({
      name: '',
      username: '',
      email: '',
      role: 'agent',
      status: 'active',
      temporaryPassword: ''
    });
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  // Generate secure password
  const generateSecurePassword = () => {
    if (isLoading) return; // Prevent generation while loading
    
    const length = 12;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*';
    
    const allChars = lowercase + uppercase + numbers + specialChars;
    
    // Ensure at least one of each required character type
    let password = [
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)]
    ];
    
    // Fill the rest with random characters
    for (let i = password.length; i < length; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }
    
    // Shuffle the password array
    password = password.sort(() => Math.random() - 0.5).join('');
    
    setFormData(prev => ({
      ...prev,
      temporaryPassword: password
    }));
    
    // Clear any existing password error
    if (errors.temporaryPassword) {
      setErrors(prev => ({ ...prev, temporaryPassword: '' }));
    }
  };

  const getInputClassName = (fieldName) => 
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
      errors[fieldName] 
        ? 'border-red-300 focus:ring-red-500' 
        : 'border-gray-300'
    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`;

  // Fixed button text logic
  const getButtonText = () => {
    console.log('isLoading', isLoading)
    if (isLoading) {
      return mode === 'add' ? 'Adding...' : 'Saving...';
    }
    return mode === 'add' ? 'Add Member' : 'Save Changes';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">
            {mode === 'add' ? 'Add Team Member' : 'Edit Team Member'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className={getInputClassName('name')}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isLoading}
              className={getInputClassName('username')}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={getInputClassName('email')}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Temporary Password Field - Only in Add Mode */}
          {mode === 'add' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Temporary Password *
                </label>
                <button
                  type="button"
                  onClick={generateSecurePassword}
                  disabled={isLoading}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Secure Password
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="temporaryPassword"
                  value={formData.temporaryPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`${getInputClassName('temporaryPassword')} pr-10`}
                  placeholder="Set temporary password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.temporaryPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.temporaryPassword}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                User will be required to change this password on first login
              </p>
            </div>
          )}

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={isLoading}
              className={getInputClassName('role')}
            >
              <option value="agent">Agent</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          {/* Status Field - Only in Edit Mode */}
          {mode === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={isLoading}
                className={getInputClassName('status')}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-24 justify-center"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {getButtonText()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditMemberModal;
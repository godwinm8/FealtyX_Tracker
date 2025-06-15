import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Input from "../ui/Input";
import Button from "../ui/Button";
import allUsers from "../../data/users.json";

const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
const initialState = {
  title: "",
  description: "",
  priority: "Medium",
  assigneeId: "",
};

const TaskForm = ({ onSubmit, onCancel, taskToEdit }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const isEditMode = !!taskToEdit;
  const developers = allUsers.filter((user) => user.role === "Developer");

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "Medium",
        assigneeId: taskToEdit.assigneeId || "",
      });
      setErrors({});
    } else {
      setFormData(initialState);
    }
  }, [taskToEdit, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.assigneeId) newErrors.assigneeId = "An assignee is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const sharedInputStyle =
    "w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md transition-colors duration-200 focus:outline-none dark:bg-gray-800 dark:text-gray-100 border-gray-300 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 dark:border-gray-600";
  const errorStyle = "text-red-700 text-xs mt-1";

  return (
    <div className="p-6 bg-white dark:bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-00">
        {isEditMode ? "Edit Task" : "Create New Task"}
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-1"
            >
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isError={!!errors.title}
              required
            />
            {errors.title && <p className={errorStyle}>{errors.title}</p>}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium   text-gray-700 dark:text-gray-800 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`${sharedInputStyle} ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className={errorStyle}>{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={sharedInputStyle}
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="assigneeId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-1"
              >
                Assignee
              </label>
              <select
                id="assigneeId"
                name="assigneeId"
                value={formData.assigneeId}
                onChange={handleChange}
                className={`${sharedInputStyle} ${
                  errors.assigneeId ? "border-red-500" : ""
                }`}
                required
              >
                <option value="" disabled>
                  Select a developer
                </option>
                {developers.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name}
                  </option>
                ))}
              </select>
              {errors.assigneeId && (
                <p className={errorStyle}>{errors.assigneeId}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditMode ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  taskToEdit: PropTypes.object,
};

TaskForm.defaultProps = {
  taskToEdit: null,
};

export default TaskForm;

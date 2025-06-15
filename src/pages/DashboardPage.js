import React, { useState, useMemo } from "react";
import { PlusCircle, AlertTriangle } from "lucide-react";

import useAuth from "../hooks/useAuth";
import useTaskStore from "../store/useTaskStore";

import TaskList from "../components/task/TaskList";
import TaskFilters from "../components/task/TaskFilters";
import ConcurrentTasksChart from "../components/charts/ConcurrentTasksChart";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import TaskForm from "../components/task/TaskForm";

const initialFilters = {
  searchTerm: "",
  status: "All",
  priority: "All",
};

const DashboardPage = () => {
  const { user: currentUser } = useAuth();
  const { tasks: allTasks, addTask, updateTask, deleteTask } = useTaskStore();

  const [filters, setFilters] = useState(initialFilters);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (
        currentUser.role === "Developer" &&
        task.assigneeId !== currentUser.id
      ) {
        return false;
      }
      const searchMatch = task.title
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const statusMatch =
        filters.status === "All" || task.status === filters.status;
      const priorityMatch =
        filters.priority === "All" || task.priority === filters.priority;
      return searchMatch && statusMatch && priorityMatch;
    });
  }, [allTasks, filters, currentUser]);

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setFormModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setFormModalOpen(true);
  };

  const handleOpenDeleteModal = (taskId) => {
    setTaskToDeleteId(taskId);
    setDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setFormModalOpen(false);
    setDeleteModalOpen(false);
    setTaskToEdit(null);
    setTaskToDeleteId(null);
  };

  const handleFormSubmit = (formData) => {
    if (taskToEdit) {
      updateTask({ ...taskToEdit, ...formData });
    } else {
      addTask(formData, currentUser.id);
    }
    handleCloseModals();
  };

  const handleConfirmDelete = () => {
    if (taskToDeleteId) {
      deleteTask(taskToDeleteId);
    }
    handleCloseModals();
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const task = allTasks.find((t) => t.id === taskId);
    if (task) {
      updateTask({ ...task, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome, {currentUser.name}!
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Here's what's on your plate today.
          </p>
        </div>
        {currentUser.role === "Developer" && (
          <Button variant="primary" onClick={handleOpenCreateModal}>
            <PlusCircle size={16} className="mr-2" />
            Create Task
          </Button>
        )}
      </div>

      {currentUser.role === "Manager" && (
        <ConcurrentTasksChart tasks={allTasks} />
      )}

      <TaskFilters
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={() => setFilters(initialFilters)}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        onUpdateStatus={handleUpdateStatus}
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        title={taskToEdit ? "Edit Task" : "Create New Task"}
        size="lg"
      >
        <TaskForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModals}
          taskToEdit={taskToEdit}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Are you sure?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
            This action cannot be undone. All data associated with this task
            will be permanently deleted.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="secondary" onClick={handleCloseModals}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;

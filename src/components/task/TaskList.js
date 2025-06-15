import React from "react";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";
import { ClipboardList } from "lucide-react";

const TaskList = ({ tasks, onEdit, onDelete, onUpdateStatus }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 mt-8 bg-white dark:bg-gray-300 rounded-lg shadow-md">
        <ClipboardList
          size={48}
          className="text-gray-400 dark:text-gray-800 mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-800">
          No Tasks Found
        </h3>
        <p className="text-gray-500 dark:text-gray-600 mt-2">
          Try adjusting your filters or create a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default TaskList;

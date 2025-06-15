import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Clock, Edit, Trash2 } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import Button from "../ui/Button";
import { formatTotalTime } from "../../utils/dateUtils";
import { formatTimeAgo } from "../../utils/dateUtils";
import {
  getStatusStyles,
  getPriorityStyles,
  findUserNameById,
} from "../../utils/helpers";

const TaskCard = ({ task, onEdit, onDelete, onUpdateStatus }) => {
  const { user: currentUser } = useAuth();
  const assigneeName = findUserNameById(task.assigneeId);
  const isDeveloper = currentUser.role === "Developer";
  const isManager = currentUser.role === "Manager";
  const isTaskOwner = isDeveloper && currentUser.id === task.assigneeId;

  const canMarkAsDone =
    isTaskOwner && ["Open", "In Progress", "Re-opened"].includes(task.status);
  const canApproveOrReopen = isManager && task.status === "Pending Approval";

  const renderActionButtons = () => (
    <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      {canMarkAsDone && (
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            onUpdateStatus(task.id, "Pending Approval");
          }}
        >
          Mark as Done
        </Button>
      )}
      {canApproveOrReopen && (
        <>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onUpdateStatus(task.id, "Closed");
            }}
          >
            Approve
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onUpdateStatus(task.id, "Re-opened");
            }}
          >
            Re-open
          </Button>
        </>
      )}
      {isTaskOwner && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            aria-label="Edit Task"
            onClick={(e) => {
              e.preventDefault();
              onEdit(task);
            }}
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40"
            aria-label="Delete Task"
            onClick={(e) => {
              e.preventDefault();
              onDelete(task.id);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Link
      to={`/task/${task.id}`}
      className="block bg-white dark:bg-gray-200 shadow-lg rounded-lg transition-all hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-800 pr-2">
              {task.title}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${getPriorityStyles(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
          <div className="mb-4">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyles(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-800">
            <div className="flex items-center">
              <span className="font-medium text-gray-800 dark:text-gray-800">
                {assigneeName}
              </span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-2 flex-shrink-0" />
              <span>
                Time Logged:{" "}
                <span className="font-medium text-gray-800 dark:text-gray-800">
                  {formatTotalTime(task.timeLogs)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          {renderActionButtons()}
          <p className="text-xs text-gray-500 dark:text-gray-800 pt-2 text-right">
            Updated {formatTimeAgo(task.updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    assigneeId: PropTypes.string,
    timeLogs: PropTypes.arrayOf(
      PropTypes.shape({ durationMs: PropTypes.number })
    ),
    updatedAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default TaskCard;

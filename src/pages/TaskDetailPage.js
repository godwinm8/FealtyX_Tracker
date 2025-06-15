import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  UserPlus,
  Calendar,
  Clock,
  BarChart2,
  Info,
} from "lucide-react";

import useTaskStore from "../store/useTaskStore";
import useAuth from "../hooks/useAuth";

import TimeTracker from "../components/task/TimeTracker";
import { formatDate } from "../utils/dateUtils";
import {
  getStatusStyles,
  getPriorityStyles,
  findUserNameById,
} from "../utils/helpers";

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById } = useTaskStore();
  const { user: currentUser } = useAuth();

  const task = getTaskById(taskId);

  if (!task) {
    setTimeout(() => {
      if (!useTaskStore.getState().getTaskById(taskId)) {
        navigate("/");
      }
    }, 200);

    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <BarChart2 size={48} className="animate-pulse mx-auto mb-4" />
          <p>Loading task details...</p>
        </div>
      </div>
    );
  }

  if (currentUser.role === "Developer" && task.assigneeId !== currentUser.id) {
    navigate("/");
    return null;
  }

  const assignee = findUserNameById(task.assigneeId);
  const reporter = findUserNameById(task.reporterId);

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {task.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white dark:bg-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-3 flex items-center">
              <Info size={20} className="mr-2" />
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-800 whitespace-pre-wrap">
              {task.description || "No description provided."}
            </p>
          </div>
          <TimeTracker task={task} />
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 bg-white dark:bg-gray-200 rounded-lg shadow-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-800 border-b pb-3 mb-3 dark:border-gray-700">
              Task Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 dark:text-gray-800">Status</dt>
                <dd
                  className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusStyles(
                    task.status
                  )}`}
                >
                  {task.status}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 dark:text-gray-800">Priority</dt>
                <dd
                  className={`px-3 py-1 text-xs font-bold rounded-full ${getPriorityStyles(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="flex items-center text-gray-500 dark:text-gray-800">
                  <User size={14} className="mr-2" />
                  Assignee
                </dt>
                <dd className="font-medium text-gray-800 dark:text-gray-800">
                  {assignee}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="flex items-center text-gray-500 dark:text-gray-800">
                  <UserPlus size={14} className="mr-2" />
                  Reporter
                </dt>
                <dd className="font-medium text-gray-800 dark:text-gray-800">
                  {reporter}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="flex items-center text-gray-500 dark:text-gray-800">
                  <Calendar size={14} className="mr-2" />
                  Created
                </dt>
                <dd className="font-medium text-gray-800 dark:text-gray-800">
                  {formatDate(task.createdAt)}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="flex items-center text-gray-500 dark:text-gray-800">
                  <Clock size={14} className="mr-2" />
                  Last Updated
                </dt>
                <dd className="font-medium text-gray-800 dark:text-gray-800">
                  {formatDate(task.updatedAt)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;

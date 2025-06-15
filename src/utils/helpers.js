import {
  subDays,
  eachDayOfInterval,
  format,
  startOfDay,
  endOfDay,
} from "date-fns";
import allUsers from "../data/users.json";

export const getStatusStyles = (status) => {
  switch (status) {
    case "Open":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Pending Approval":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Closed":
      return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200";
    case "Re-opened":
      return "bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

export const getPriorityStyles = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-300 dark:bg-red-900 dark:text-red-200";
    case "Medium":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "Low":
      return "bg-gray-100 text-gray-800 dark:bg-teal-800 dark:text-teal-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

export const findUserNameById = (userId) => {
  if (!userId) return "Unassigned";
  const user = allUsers.find((u) => u.id === userId);
  return user ? user.name : "Unknown User";
};

export const processChartData = (tasks, days = 30) => {
  if (!tasks || tasks.length === 0) {
    return [];
  }

  const endDate = new Date();
  const startDate = subDays(endDate, days - 1);

  const dateRange = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const chartData = dateRange.map((day) => {
    const currentDay = startOfDay(day);

    const concurrentCount = tasks.filter((task) => {
      const taskStart = startOfDay(new Date(task.createdAt));
      const taskEnd = task.closedAt
        ? endOfDay(new Date(task.closedAt))
        : endOfDay(endDate);

      return currentDay >= taskStart && currentDay <= taskEnd;
    }).length;

    return {
      date: format(day, "MMM d"),
      "Active Tasks": concurrentCount,
    };
  });

  return chartData;
};

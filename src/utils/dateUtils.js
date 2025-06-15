import { format, formatDistanceToNow, parseISO } from "date-fns";

export const formatTimeAgo = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch (error) {
    console.error("Invalid date string for formatTimeAgo:", dateString, error);
    return "N/A";
  }
};

export const formatDurationHHMMSS = (ms) => {
  if (typeof ms !== "number" || ms < 0) ms = 0;

  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

export const formatTotalTime = (timeLogs) => {
  if (!timeLogs || timeLogs.length === 0) {
    return "0m";
  }

  const totalMs = timeLogs.reduce((sum, log) => sum + (log.durationMs || 0), 0);
  const totalMinutes = Math.floor(totalMs / 60000);

  if (totalMinutes === 0) return "0m";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${(totalMinutes / 60).toFixed(1)}h`;
  } else {
    return `${minutes}m`;
  }
};

export const formatDate = (dateString, formatStr = "MMM d, yyyy") => {
  if (!dateString) return "";
  try {
    return format(parseISO(dateString), formatStr);
  } catch (error) {
    console.error("Invalid date string for formatDate:", dateString, error);
    return "";
  }
};

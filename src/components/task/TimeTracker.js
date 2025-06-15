import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Play, StopCircle, Timer, History } from "lucide-react";

import useTaskStore from "../../store/useTaskStore";
import useAuth from "../../hooks/useAuth";
import Button from "../ui/Button";
import {
  formatTotalTime,
  formatDurationHHMMSS,
  formatTimeAgo,
} from "../../utils/dateUtils";
import { findUserNameById } from "../../utils/helpers";

const TimeTracker = ({ task }) => {
  const { updateTask } = useTaskStore();
  const { user: currentUser } = useAuth();

  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isTracking) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setElapsedTime(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [isTracking, startTime]);

  const handleStartTracking = () => {
    setStartTime(Date.now());
    setIsTracking(true);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    const endTime = Date.now();
    const durationMs = endTime - startTime;

    const newLog = {
      userId: currentUser.id,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      durationMs,
    };

    const updatedTask = {
      ...task,
      timeLogs: [...(task.timeLogs || []), newLog],
      updatedAt: new Date().toISOString(),
    };

    updateTask(updatedTask);
    setStartTime(null);
  };

  const sortedTimeLogs = task.timeLogs?.slice().reverse() || [];

  return (
    <div className="p-6 bg-white dark:bg-gray-200 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-800 mb-2 flex items-center">
            <Timer size={20} className="mr-2" />
            Time Tracker
          </h3>
          {!isTracking ? (
            <Button
              onClick={handleStartTracking}
              variant="primary"
              className="w-full md:w-auto"
            >
              <Play size={16} className="mr-2" /> Start Timer
            </Button>
          ) : (
            <Button
              onClick={handleStopTracking}
              variant="destructive"
              className="w-full md:w-auto"
            >
              <StopCircle size={16} className="mr-2" /> Stop Timer
            </Button>
          )}
        </div>

        <div className="text-center md:text-right">
          {isTracking && (
            <div className="text-2xl font-mono text-indigo-600 dark:text-indigo-400">
              {formatDurationHHMMSS(elapsedTime)}
            </div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-800">
            Total Time Logged:{" "}
            <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
              {formatTotalTime(task.timeLogs)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-800 mb-4 flex items-center">
          <History size={18} className="mr-2" />
          Log History
        </h4>
        {sortedTimeLogs.length > 0 ? (
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {sortedTimeLogs.map((log) => (
              <li
                key={log.startTime}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <div>
                  <p className="font-medium text-sm text-gray-800 dark:text-gray-100">
                    {findUserNameById(log.userId)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(log.endTime)}
                  </p>
                </div>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                  {formatTotalTime([log])}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-800 text-center py-4">
            No time has been logged for this task yet.
          </p>
        )}
      </div>
    </div>
  );
};

TimeTracker.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timeLogs: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        durationMs: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default TimeTracker;

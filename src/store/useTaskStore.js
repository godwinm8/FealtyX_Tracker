import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";
import initialTasks from "../data/tasks.json";

const useTaskStore = create(
  persist(
    immer((set, get) => ({
      tasks: initialTasks,

      addTask: (taskData, reporterId) =>
        set((state) => {
          const newTask = {
            id: `task-${uuidv4()}`,
            ...taskData,
            status: "Open",
            reporterId: reporterId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            closedAt: null,
            timeLogs: [],
          };
          state.tasks.push(newTask);
        }),

      updateTask: (updatedTask) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex(
            (t) => t.id === updatedTask.id
          );
          if (taskIndex !== -1) {
            state.tasks[taskIndex] = {
              ...updatedTask,
              updatedAt: new Date().toISOString(),
            };
          }
        }),

      deleteTask: (taskId) =>
        set((state) => {
          state.tasks = state.tasks.filter((t) => t.id !== taskId);
        }),

      getTaskById: (taskId) => {
        return get().tasks.find((task) => task.id === taskId);
      },
    })),
    {
      name: "fealtyx-task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;

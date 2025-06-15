import React from "react";
import PropTypes from "prop-types";
import { Search, FilterX } from "lucide-react";

import Input from "../ui/Input";
import Button from "../ui/Button";

const STATUS_OPTIONS = [
  "All",
  "Open",
  "In Progress",
  "Pending Approval",
  "Closed",
  "Re-opened",
];
const PRIORITY_OPTIONS = ["All", "Low", "Medium", "High"];

const TaskFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const selectStyle =
    "w-full py-2 px-3 text-sm text-gray-800 bg-white border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-500";

  return (
    <div className="p-4 mb-6 bg-white dark:bg-gray-200 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow">
          <label htmlFor="searchTerm" className="sr-only">
            Search Tasks
          </label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-200" />
          </div>
          <Input
            type="text"
            id="searchTerm"
            name="searchTerm"
            placeholder="Search by title..."
            value={filters.searchTerm}
            onChange={handleInputChange}
            className="pl-10"
          />
        </div>

        <div className="min-w-[150px]">
          <label htmlFor="status" className="sr-only">
            Filter by Status
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className={selectStyle}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Statuses" : status}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[150px]">
          <label htmlFor="priority" className="sr-only">
            Filter by Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleInputChange}
            className={selectStyle}
          >
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {priority === "All" ? "All Priorities" : priority}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Button
            onClick={onClearFilters}
            variant="secondary"
            className="w-full md:w-auto"
            aria-label="Clear all filters"
          >
            <FilterX size={16} className="mr-2" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

TaskFilters.propTypes = {
  filters: PropTypes.shape({
    searchTerm: PropTypes.string,
    status: PropTypes.string,
    priority: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default TaskFilters;

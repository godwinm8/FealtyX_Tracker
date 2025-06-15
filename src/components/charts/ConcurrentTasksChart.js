import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart2 } from "lucide-react";
import { processChartData } from "../../utils/helpers";

const ConcurrentTasksChart = ({ tasks }) => {
  const chartData = useMemo(() => processChartData(tasks, 30), [tasks]);

  if (!chartData || chartData.length < 2) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center h-[300px]">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <BarChart2 size={40} className="mx-auto mb-2" />
          <p>Not enough data to display the trend line.</p>
          <p className="text-xs">
            At least two days of task activity are needed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Active Tasks Trend (Last 30 Days)
      </h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                color: "#1f2937",
              }}
              cursor={{
                stroke: "#4f46e5",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "14px" }} />
            <Line
              type="monotone"
              dataKey="Active Tasks"
              stroke="#4f46e5"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

ConcurrentTasksChart.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ConcurrentTasksChart;

import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
  ({ className = "", type = "text", isError = false, ...props }, ref) => {
    const baseStyles =
      "w-full px-3 py-2 text-sm text-gray-900 bg-gray-800 border rounded-md transition-colors duration-200 focus:outline-none dark:bg-gray-800 dark:text-gray-100";

    const borderStyles = isError
      ? "border-red-500 focus:ring-1  dark:border-gray-600"
      : "border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-800 dark:border-gray-600";

    const disabledStyles =
      "disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-75 dark:disabled:bg-gray-800";

    const combinedClasses = `
      ${baseStyles}
      ${borderStyles}
      ${disabledStyles}
      ${className}
    `.trim();

    return (
      <input type={type} ref={ref} className={combinedClasses} {...props} />
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  isError: PropTypes.bool,
};

export default Input;

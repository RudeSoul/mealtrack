import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Card = ({ children, title, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {title && (
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

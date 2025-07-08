import React, { ReactNode } from 'react';

interface AnalyticsCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 bg-blue-50 rounded-lg">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default AnalyticsCard;
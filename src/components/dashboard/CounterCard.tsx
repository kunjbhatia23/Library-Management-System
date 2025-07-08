import React, { ReactNode } from 'react';

interface CounterCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange';
}

const CounterCard: React.FC<CounterCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      accent: 'text-blue-700'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      accent: 'text-green-700'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      accent: 'text-purple-700'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      accent: 'text-red-700'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      accent: 'text-orange-700'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {trend && (
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-xl ${colors.bg}`}>
            <div className={`w-8 h-8 ${colors.text}`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterCard;
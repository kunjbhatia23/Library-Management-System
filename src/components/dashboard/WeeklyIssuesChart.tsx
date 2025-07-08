import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const WeeklyIssuesChart: React.FC = () => {
  const data = [
    { week: 'Week 1', issues: 45, returns: 38 },
    { week: 'Week 2', issues: 52, returns: 41 },
    { week: 'Week 3', issues: 38, returns: 49 },
    { week: 'Week 4', issues: 61, returns: 44 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.dataKey === 'issues' ? 'Books Issued' : 'Books Returned'}: {entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AnalyticsCard 
      title="Weekly Book Activity" 
      icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="issues" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              name="Issues"
            />
            <Bar 
              dataKey="returns" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]}
              name="Returns"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600 font-medium">Books Issued</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 font-medium">Books Returned</span>
        </div>
      </div>
    </AnalyticsCard>
  );
};

export default WeeklyIssuesChart;
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

const BookStatusChart: React.FC = () => {
  const data = [
    { name: 'Available', value: 245, color: '#10B981' },
    { name: 'Issued', value: 89, color: '#3B82F6' },
    { name: 'Overdue', value: 23, color: '#EF4444' },
    { name: 'Reserved', value: 12, color: '#F59E0B' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold" style={{ color: data.payload.color }}>
              {data.value} books
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AnalyticsCard 
      title="Book Status Distribution" 
      icon={<PieChartIcon className="w-5 h-5 text-blue-600" />}
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            <div className="text-sm text-gray-600">{item.name}</div>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
};

export default BookStatusChart;
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const pieData = [
  { name: 'Admins', value: 400 },
  { name: 'Editors', value: 300 },
  { name: 'Viewers', value: 200 },
  { name: 'Guests', value: 100 },
];

const COLORS = ['#3e4093', '#5d62a7', '#7e85bc', '#aeb0d6'];

const UsersPie: React.FC = () => {
  return (
    <div className="min-h-screen p-10 bg-[#f8faff] font-sans mb-8">
      <h1 className="text-2xl font-bold text-indigo-800 mb-8">Users Pie Chart</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: 12,
                border: '1px solid #ddd',
              }}
            />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsersPie;

// import React from 'react';
// import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

// const data = [
//   { name: 'Jan', value: 30 },
//   { name: 'Feb', value: 60 },
//   { name: 'Mar', value: 45 },
//   { name: 'Apr', value: 80 },
// ];

// const AnalyticsLine: React.FC = () => {
//   return (
//     <div className="min-h-screen p-8 bg-[#f8f9ff]">
//       <h1 className="text-2xl font-bold text-indigo-800 mb-6">Analytics Line Chart</h1>
//       <div className="bg-white rounded-xl shadow p-4 max-w-xl mx-auto">
//         <ResponsiveContainer width="100%" height={200}>
//           <LineChart data={data}>
//             <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} dot={false} />
//             <Tooltip />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsLine;

import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 80 },
];

const AnalyticsLine: React.FC = () => {
  return (
    <div className="min-h-screen p-10 bg-[#f8faff] font-sans">
      <h1 className="text-2xl font-bold text-indigo-800 mb-8">Analytics Line Chart</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#A5B4FC" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f1f1f1" vertical={false} />
            <XAxis dataKey="name" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: 12,
                border: '1px solid #ddd',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsLine;

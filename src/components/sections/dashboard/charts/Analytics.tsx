import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useClients } from '../../../../context/ClientsContext'; // Adjust path if needed

const AnalyticsLine: React.FC = () => {
  const { clients } = useClients();

  // Generate analytics data based on client registration timestamps
  const data = useMemo(() => {
    const monthMap: Record<string, number> = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    clients.forEach((client) => {
      try {
        const timestampHex = client._id.toString().slice(0, 8);
        const createdDate = new Date(parseInt(timestampHex, 16) * 1000);
        const month = createdDate.toLocaleString('default', { month: 'short' });

        if (monthMap[month] !== undefined) {
          monthMap[month]++;
        }
      } catch (error) {
        console.error('Error parsing client date:', error);
      }
    });

    return Object.entries(monthMap)
      .map(([month, count]) => ({ name: month, value: count }))
      .filter((entry) => entry.value > 0); // Skip months with no data
  }, [clients]);

  return (
    <div className="min-h-screen p-10 bg-[#f8faff] font-sans">
      <h1 className="text-2xl font-bold text-indigo-800 mb-8">Client Registration Analytics</h1>
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

import React from 'react';
import { Box, Grid, Typography, Paper, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';

const stats = [
  { title: 'Visitors', value: '8,534', icon: <PeopleIcon fontSize="large" />, color: '#1976d2' },
  { title: 'Sales', value: '1,230', icon: <ShoppingCartIcon fontSize="large" />, color: '#388e3c' },
  { title: 'Growth', value: '23%', icon: <TrendingUpIcon fontSize="large" />, color: '#fbc02d' },
  { title: 'Reports', value: '312', icon: <BarChartIcon fontSize="large" />, color: '#d32f2f' },
];

const AnalyticsDashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 1.5,
                borderLeft: `6px solid ${stat.color}`,
                height: '100%',
              }}
            >
              <Box sx={{ color: stat.color }}>{stat.icon}</Box>
              <Typography variant="h6">{stat.title}</Typography>
              <Typography variant="h5" fontWeight={600}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add your chart area or recent activity here */}
      <Box mt={5}>
        <Paper elevation={3} sx={{ padding: 3, height: 300 }}>
          <Typography variant="h6" gutterBottom>
            Charts & Trends
          </Typography>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            {/* Placeholder for chart component */}
            (Chart component will be added here)
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   LineChart,
//   Line,
// } from 'recharts';

// interface Client {
//   id: number | string;
//   name: string;
//   entity_type: string;
//   compliant: boolean; // dummy field for filing compliance
//   revenue: number; // dummy revenue field
// }

// interface CategoryData {
//   name: string;
//   value: number;
// }

// const COLORS = ['#00A6FB', '#0077B6', '#48CAE4', '#90E0EF', '#5F5F5F'];

// const AnalyticsDashboard: React.FC = () => {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [entityData, setEntityData] = useState<CategoryData[]>([]);
//   const [complianceData, setComplianceData] = useState<CategoryData[]>([]);
//   const [revenueData, setRevenueData] = useState<{ name: string; revenue: number }[]>([]);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const response = await axios.get<Client[]>('http://localhost:5000/clients');
//         const dataWithDummy = response.data.map((client) => ({
//           ...client,
//           compliant: Math.random() < 0.7, // Random dummy compliance
//           revenue: Math.floor(Math.random() * 100000), // Random revenue
//         }));
//         setClients(dataWithDummy);

//         // Entity type pie chart data
//         const entityGrouped = dataWithDummy.reduce((acc: Record<string, number>, client) => {
//           acc[client.entity_type] = (acc[client.entity_type] || 0) + 1;
//           return acc;
//         }, {});
//         setEntityData(Object.entries(entityGrouped).map(([name, value]) => ({ name, value })));

//         // Compliance rate bar chart data
//         const compliantCount = dataWithDummy.filter((c) => c.compliant).length;
//         const nonCompliantCount = dataWithDummy.length - compliantCount;
//         setComplianceData([
//           { name: 'Compliant', value: compliantCount },
//           { name: 'Non-Compliant', value: nonCompliantCount },
//         ]);

//         // Revenue chart by client name
//         const revenueList = dataWithDummy.map((c) => ({
//           name: c.name,
//           revenue: c.revenue,
//         }));
//         setRevenueData(revenueList);
//       } catch (err) {
//         console.error('Error loading clients:', err);
//       }
//     };

//     fetchClients();
//   }, []);

//   return (
//     <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>

//       {/* Clients by Entity Type */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Clients by Entity Type</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={entityData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {entityData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Filing Compliance Rate */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Filing Compliance Rate</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={complianceData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#00A6FB" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Client Revenue Distribution */}
//       <div className="bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Client Revenue Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={revenueData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" hide />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="revenue" stroke="#48CAE4" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;

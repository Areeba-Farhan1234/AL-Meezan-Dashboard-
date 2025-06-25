import { FC } from 'react';

const UpcomingDeadlines: FC = () => {
  return <div>UpcomingDeadlines</div>;
};

export default UpcomingDeadlines;

// import React from 'react';
// import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
// import { Bar, Line, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// );

// const Dashboard: React.FC = () => {
//   const barData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//     datasets: [
//       {
//         label: 'New Clients',
//         data: [12, 19, 14, 8, 15],
//         backgroundColor: '#413F91',
//       },
//     ],
//   };

//   const lineData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         label: 'Revenue ($)',
//         data: [400, 600, 800, 700, 950],
//         borderColor: '#00A6FB',
//         tension: 0.4,
//         fill: true,
//         backgroundColor: 'rgba(0,166,251,0.2)',
//       },
//     ],
//   };

//   const doughnutData = {
//     labels: ['Pending', 'Completed', 'Cancelled'],
//     datasets: [
//       {
//         label: 'Tasks',
//         data: [10, 70, 20],
//         backgroundColor: ['#FF9800', '#4CAF50', '#F44336'],
//       },
//     ],
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Dashboard Analytics
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">New Clients</Typography>
//               <Bar data={barData} />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Revenue Growth</Typography>
//               <Line data={lineData} />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Task Distribution</Typography>
//               <Doughnut data={doughnutData} />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;

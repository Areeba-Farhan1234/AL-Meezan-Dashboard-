import { Box, BoxProps } from '@mui/material';
import { Icon, IconProps } from '@iconify/react';

interface IconifyProps extends BoxProps {
  icon: IconProps['icon'];
}

const IconifyIcon = ({ icon, ...rest }: IconifyProps) => {
  return <Box component={Icon} icon={icon} {...rest} />;
};

export default IconifyIcon;

// import React from 'react';
// import * as echarts from 'echarts/core';
// import { BarChart, LineChart } from 'echarts/charts';
// import {
//   TooltipComponent,
//   LegendComponent,
//   GridComponent,
//   TitleComponent,
// } from 'echarts/components';
// import { CanvasRenderer } from 'echarts/renderers';

// import { Box, Typography } from '@mui/material';
// import ReactEchart from './ReactEchart';

// // Register required components
// echarts.use([
//   TooltipComponent,
//   LegendComponent,
//   GridComponent,
//   BarChart,
//   LineChart,
//   TitleComponent,
//   CanvasRenderer,
// ]);

// const chartOption = {
//   title: {
//     text: 'Weekly Sales & Growth',
//     left: 'center',
//     textStyle: {
//       color: '#1e1e2d',
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//   },
//   tooltip: {
//     trigger: 'axis',
//     backgroundColor: '#fff',
//     borderColor: '#eee',
//     borderWidth: 1,
//     textStyle: {
//       color: '#333',
//     },
//   },
//   legend: {
//     data: ['Sales', 'Growth'],
//     bottom: 0,
//   },
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '10%',
//     containLabel: true,
//   },
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//     axisLine: { lineStyle: { color: '#ccc' } },
//   },
//   yAxis: {
//     type: 'value',
//     name: 'Amount',
//     axisLine: { lineStyle: { color: '#ccc' } },
//     splitLine: { lineStyle: { type: 'dashed' } },
//   },
//   series: [
//     {
//       name: 'Sales',
//       type: 'bar',
//       barWidth: '35%',
//       itemStyle: {
//         color: '#00BFFF',
//         borderRadius: [6, 6, 0, 0],
//       },
//       data: [120, 200, 150, 80, 70],
//     },
//     {
//       name: 'Growth',
//       type: 'line',
//       smooth: true,
//       symbol: 'circle',
//       symbolSize: 10,
//       itemStyle: {
//         color: '#FF6B6B',
//         borderColor: '#fff',
//         borderWidth: 2,
//       },
//       lineStyle: {
//         width: 3,
//       },
//       data: [100, 180, 130, 90, 105],
//     },
//   ],
// };

// const WeeklySalesChart: React.FC = () => {
//   return (
//     <Box p={6} bgcolor="#f8faff" minHeight="100vh">
//       <Typography variant="h4" color="primary" fontWeight={700} mb={4}>
//         Weekly Sales & Growth
//       </Typography>
//       <ReactEchart
//         echartsInstance={echarts}
//         option={chartOption}
//         style={{ height: 400, width: '100%' }}
//       />
//     </Box>
//   );
// };

// export default WeeklySalesChart;

import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import TopCards from 'components/sections/dashboard/top-cards';
import Document from 'components/sections/dashboard/Document/DocumentDownload';
// import Balance from 'components/sections/dashboard/balance/index';
import AvatarCard from 'components/base/ReactEchart';
import * as echarts from 'echarts/core';
// import { AnalyticsChart, SalesChart, UsersPieChart } from 'components/sections/dashboard/Chart';
import Analytics from 'components/sections/dashboard/charts/Analytics';
import UsersPie from 'components/sections/dashboard/charts/UsersPie';
// import TransactionHistory from 'components/sec/tions/dashboard/transaction-history/TransactionHistoryTable';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    navigate('/aut/signin'); // Redirect to SignIn if not authenticated
    return null;
  }

  const chartOption = {
    title: {
      text: 'Sample Dashboard Chart',
    },
    tooltip: {},
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [120, 200, 150, 80, 70],
      },
    ],
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>

      {/* <Grid item xs={12} md={4}>
        <AnalyticsChart />
      </Grid>
      <Grid item xs={12} md={4}>
        <UsersPieChart />
      </Grid> */}

      <Grid item xs={6}>
        <Analytics />
      </Grid>
      <Grid item xs={6}>
        <UsersPie />
      </Grid>
      <Grid item xs={12}>
        <AvatarCard echarts={echarts} option={chartOption} />
      </Grid>
      <Grid item xs={12}>
        <Document />
      </Grid>

      {/* <Grid item xs={12}>
        <Balance />
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;

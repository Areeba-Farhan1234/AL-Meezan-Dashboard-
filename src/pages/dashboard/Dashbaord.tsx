import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import TopCards from 'components/sections/dashboard/top-cards';
import TotalSpent from 'components/sections/dashboard/total-spent';
import SpentThisMonth from 'components/sections/dashboard/spent-this-month';
import Tasks from 'components/sections/dashboard/tasks';
import TransactionHistory from 'components/sections/dashboard/transaction-history';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    navigate('/aut/signin'); // Redirect to SignIn if not authenticated
    return null;
  }

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>

      <Grid item xs={12} md={8}>
        <TotalSpent />
      </Grid>

      <Grid item xs={12} md={4}>
        <SpentThisMonth />
      </Grid>

      <Grid item xs={12} md={4}>
        <Tasks />
      </Grid>

      <Grid item xs={12} md={8}>
        <TransactionHistory />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import TopCards from 'components/sections/dashboard/top-cards';
import Document from 'components/sections/dashboard/Document/DocumentDownload';

// import TransactionHistory from 'components/sections/dashboard/transaction-history/TransactionHistoryTable';

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

      <Grid item xs={12}>
        <Document />
      </Grid>

      {/* <Grid item xs={12} md={8}>
        <TransactionHistory />
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;

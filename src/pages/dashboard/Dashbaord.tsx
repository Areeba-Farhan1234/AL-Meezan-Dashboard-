import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import TopCards from 'components/sections/dashboard/top-cards';
import Document from 'components/sections/dashboard/Document/DocumentDownload';

import Analytics from 'components/sections/dashboard/charts/Analytics';
import UsersPie from 'components/sections/dashboard/charts/UsersPie';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    navigate('/aut/signin');
    return null;
  }

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>

      <Grid item xs={6}>
        <Analytics />
      </Grid>
      <Grid item xs={6}>
        <UsersPie />
      </Grid>

      <Grid item xs={12}>
        <Document />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

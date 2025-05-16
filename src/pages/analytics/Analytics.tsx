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

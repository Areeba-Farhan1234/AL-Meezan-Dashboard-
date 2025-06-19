import React, { useState } from 'react';
import { TextField, Container, Grid, Button, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const KYCForm: React.FC = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    office_no: '',
    building_name: '',
    street_address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    telephone_no: '',
    fax_number: '',
    email: '',
    annual_business: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Do something with formData if needed
    console.log('Form Submitted:', formData);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h3" marginBottom="8px" gutterBottom>
          KYC Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={2}>
                  <Box fontWeight="bold">Company Name:</Box>
                </Grid>
                <Grid item xs={12} sm={9} sx={{ ml: 1 }}>
                  <TextField
                    placeholder="Enter company name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box fontWeight="bold" fontSize="1.2rem">
                    Business Address:
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box fontWeight="bold">Office No:</Box>
                  <TextField
                    placeholder="Enter office number"
                    name="office_no"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.office_no}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box fontWeight="bold">Building Name:</Box>
                  <TextField
                    placeholder="Enter building name"
                    name="building_name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.building_name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box fontWeight="bold">Street Address:</Box>
                  <TextField
                    placeholder="Enter street address"
                    name="street_address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.street_address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box fontWeight="bold">City:</Box>
                  <TextField
                    placeholder="Enter city name"
                    name="city"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box fontWeight="bold">State:</Box>
                  <TextField
                    placeholder="Enter state name"
                    name="state"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box fontWeight="bold">Country:</Box>
                  <TextField
                    placeholder="Enter country name"
                    name="country"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box fontWeight="bold">Zip:</Box>
                  <TextField
                    placeholder="Enter zip code"
                    name="zip"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={4} sx={{ mt: 0.5 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Telephone Number"
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="telephone_no"
                    value={formData.telephone_no}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Fax Number"
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="fax_number"
                    value={formData.fax_number}
                    onChange={handleChange}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Expected Annual Business Turnover"
                    type="text"
                    variant="outlined"
                    fullWidth
                    name="annual_business"
                    value={formData.annual_business}
                    onChange={handleChange}
                    required
                    InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit Form
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default KYCForm;

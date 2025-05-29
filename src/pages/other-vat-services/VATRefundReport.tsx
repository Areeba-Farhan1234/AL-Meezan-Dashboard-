import React, { useState } from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  Container,
  Grid,
  Select,
  Typography,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import axios from 'axios';

const VatRegistration: React.FC = () => {
  // const theme = useTheme();
  const [emailError, setEmailError] = useState('');
  const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);
  const [formDetail, setFormDetail] = useState({
    clientname: '',
    threshold: '',
    docstatus: '',
    approvaldate: '',
    returnperiod: '',
    email: '',
    password: '',
    comment: '',
    theme: '',
  });

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formDetail,
      approvaldate: approvalDate ? approvalDate.format('YYYY-MM-DD') : '',
    };

    try {
      const res = await axios.post('http://localhost:5000/clients', dataToSubmit);
      alert('Client registered successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Submission failed.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
          VAT Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client Name"
                variant="outlined"
                fullWidth
                name="clientname"
                value={formDetail.clientname}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="threshold"
                  value={formDetail.threshold}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Threshold
                  </MenuItem>
                  <MenuItem value="Voluntary">Voluntary</MenuItem>
                  <MenuItem value="Mandatory">Mandatory</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="docstatus"
                  value={formDetail.docstatus}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Document Status
                  </MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Received">Received</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Approval Date"
                  value={approvalDate}
                  onChange={(newValue) => setApprovalDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Return Period"
                variant="outlined"
                fullWidth
                name="returnperiod"
                value={formDetail.returnperiod}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formDetail.email}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(e);
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setEmailError(value && !emailPattern.test(value) ? 'Invalid email address' : '');
                }}
                required
                error={Boolean(emailError)}
                helperText={emailError}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={formDetail.password}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Comment"
                variant="outlined"
                fullWidth
                name="comment"
                value={formDetail.comment}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Submit VAT Registration
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default VatRegistration;

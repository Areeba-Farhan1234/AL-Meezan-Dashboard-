import React, { useState } from 'react';
import {
  FormControl,
  MenuItem,
  TextField,
  Container,
  Grid,
  Select,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const VATRefundClaims: React.FC = () => {
  const theme = useTheme();

  const [formRefund, setFormRefund] = useState({
    clientname: '',
    refundperiod: '',
    refundamount: '',
    documentstatus: '',
    appicationsubmission: '',
    docstatus: '',
    approvaldate: '',
    email: '',
    password: '',
    comment: '',
    status: '',
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormRefund((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormRefund((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: Do something with formData if needed
    console.log('Form Submitted:', formRefund);
  };
  return (
    <Container maxWidth="md">
      <Box
        mt={4}
        p={4}
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 4,
          // height: '600px',
        }}
      >
        <Typography variant="h3" marginBottom="10px" gutterBottom>
          VAT Refund
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter Client Name"
                type="clientname"
                variant="outlined"
                fullWidth
                name="clientname"
                value={formRefund.clientname}
                onChange={handleChange}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  placeholder="First Return Period"
                  type="refundperiod"
                  variant="outlined"
                  fullWidth
                  name="returnperiod"
                  value={formRefund.refundperiod}
                  onChange={handleChange}
                  required
                  InputProps={{
                    style: {
                      backgroundColor: theme.palette.info.main,
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <TextField
                  placeholder="First Return Period"
                  type="refundamount"
                  variant="outlined"
                  fullWidth
                  name="returnperiod"
                  value={formRefund.refundamount}
                  onChange={handleChange}
                  required
                  InputProps={{
                    style: {
                      backgroundColor: theme.palette.info.main,
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="docstatus"
                  value={formRefund.docstatus}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Document Status
                  </MenuItem>
                  <MenuItem value="Draft">Pending</MenuItem>
                  <MenuItem value="Submitted">Received</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Application Submission Date" />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="status"
                  value={formRefund.status}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Status
                  </MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Submitted">Submitted</MenuItem>
                  <MenuItem value="UnderReview">Under Review</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Resubmission">Resubmission</MenuItem>
                  <MenuItem value="Resubmission">Reviewed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Application Approval Date" />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formRefund.email}
                onChange={handleChange}
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter Password"
                type="clientname"
                variant="outlined"
                fullWidth
                name="password"
                value={formRefund.password}
                onChange={handleChange}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter Comment"
                type="comment"
                variant="outlined"
                fullWidth
                name="password"
                value={formRefund.comment}
                onChange={handleChange}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Grid>

            <Grid item xs={2} textAlign="right">
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default VATRefundClaims;

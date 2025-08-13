import React, { useState } from 'react';
import { useClients } from '../../context/ClientsContext';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  DialogContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';

interface ClientFormData {
  name: string;
  email: string;
  vat_number: string;
  ct_number: string;
  password: string;
  entity_type: string;
  business_type: string;
  emirates: string;
  location: string;
  upcoming_due: string;
  company: string;
  ct_due_date: Dayjs | null;
  vat_due_date: Dayjs | null;
  trade_licence_expiry: Dayjs | null;
  password_expiry: Dayjs | null;
  emirate: string;
  Revenue: string;
  contact_number: string;
  address: string;
  status: string;
}

const AddClients: React.FC = () => {
  const { addClient } = useClients();
  const theme = useTheme();
  const navigate = useNavigate();

  const [businessTypes, setBusinessTypes] = useState([
    'Jewellery',
    'Real Estate',
    'General Trading',
  ]);

  const handleAddNewType = () => {
    const type = prompt('Enter a new Business Type:');
    if (type && !businessTypes.includes(type)) {
      setBusinessTypes((prev) => [...prev, type]);
      setClientData((prev) => ({ ...prev, business_type: type }));
    }
  };

  const [clientData, setClientData] = useState<ClientFormData>({
    name: '',
    email: '',
    vat_number: '',
    ct_number: '',
    password: '',
    entity_type: '',
    business_type: '',
    emirates: '',
    location: '',
    upcoming_due: '',
    company: '',
    ct_due_date: null,
    vat_due_date: null,
    trade_licence_expiry: null,
    password_expiry: null,
    emirate: '',
    Revenue: '',
    contact_number: '',
    address: '',
    status: '',
  });

  // const [open, setOpen] = useState(0);
  // const [page, setPage] = useState(0);
  // const [dates, setDates] = useState<(dayjs.Dayjs | null)[]>(Array(12).fill(null));

  // const handleDateChange = (index: number, newValue: dayjs.Dayjs | null) => {
  //   const updated = [...dates];
  //   updated[index] = newValue;
  //   setDates(updated);

  //   const monthYearValues = updated.filter((d) => d !== null).map((d) => d?.format('MMMM YYYY')); // Format: e.g., July 2025

  //   setClientData((prev) => ({
  //     ...prev,
  //     Revenue: monthYearValues.join(', '),
  //   }));
  // };

  // const handleRevenueSave = () => {
  //   const selectedDates = dates.filter((d) => d !== null);
  //   const formatted = selectedDates.map((d) => d?.format('MMMM YYYY'));
  //   const uniqueValues = [...new Set(formatted)];

  //   setClientData((prev) => ({
  //     ...prev,
  //     Revenue: uniqueValues.join(', '),
  //   }));

  //   setOpen(0); // Close the dialog
  // };

  // const [open, setOpen] = useState<boolean>(false);

  // const [page, setPage] = useState<number>(0);

  // const handleRevenueSave = () => {
  //   const combined = dates
  //     .map((date, i) => {
  //       if (!date) return null;
  //       return `${date.format('MMMM YYYY')}: ${amounts[i]}`;
  //     })
  //     .filter(Boolean);

  //   setClientData((prev) => ({
  //     ...prev,
  //     Revenue: combined.join(', '),
  //   }));

  //   setOpen(false); // Close dialog
  // };

  // const startIndex = open * 6;
  // const visiblePickers = Array.from({ length: 6 }, (_, i) => startIndex + i);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;

    setClientData((prev) => ({
      ...prev,
      [name]: name === 'Revenue' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedClientData = {
      ...clientData,
      ct_due_date: clientData.ct_due_date ? clientData.ct_due_date.format('YYYY-MM-DD') : '',
      vat_due_date: clientData.vat_due_date ? clientData.vat_due_date.format('YYYY-MM-DD') : '',
      trade_licence_expiry: clientData.trade_licence_expiry
        ? clientData.trade_licence_expiry.format('YYYY-MM-DD')
        : '',
      password_expiry: clientData.password_expiry
        ? clientData.password_expiry.format('YYYY-MM-DD')
        : '',
    };

    try {
      await addClient(formattedClientData); // now TypeScript will be happy
      navigate('/clients/all-clients');
    } catch (error) {
      console.error('Failed to add client:', error);
      alert('Something went wrong while adding the client.');
    }
  };

  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  // 24 months by default
  const totalDates = 24;
  const [dates, setDates] = useState<(Dayjs | null)[]>(Array(totalDates).fill(null));
  const [amounts, setAmounts] = useState<string[]>(Array(totalDates).fill(''));

  const handleDateChange = (index: number, newValue: Dayjs | null) => {
    const updated = [...dates];
    updated[index] = newValue;
    setDates(updated);
  };

  const handleAmountChange = (index: number, value: string) => {
    const updated = [...amounts];
    updated[index] = value;
    setAmounts(updated);
  };

  const handleRevenueSave = () => {
    const combined = dates
      .map((date, i) => {
        if (!date) return null;
        return `${date.format('MMMM YYYY')}: ${amounts[i]}`;
      })
      .filter(Boolean);

    setClientData((prev) => ({
      ...prev,
      Revenue: combined.join(', '),
    }));

    setOpen(false);
  };

  // Pagination logic
  const itemsPerPage = 6;
  const startIndex = page * itemsPerPage;
  const visiblePickers = Array.from({ length: itemsPerPage }, (_, i) => startIndex + i);

  return (
    <Container maxWidth="xl">
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
        <Typography variant="h3" marginBottom="16px" gutterBottom>
          Add New Client
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Name
              </Typography>
              <TextField
                // placeholder="Name"
                type="name"
                variant="outlined"
                fullWidth
                name="name"
                value={clientData.name}
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
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Entity Type
              </Typography>
              <FormControl fullWidth required>
                <Select
                  name="entity_type"
                  value={clientData.entity_type}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Entity Type
                  </MenuItem>
                  <MenuItem value="Legal Person">Legal Person</MenuItem>
                  <MenuItem value="Natural Person">Natural Person</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Business Type
              </Typography>
              <FormControl fullWidth required>
                <Select
                  displayEmpty
                  value={clientData.business_type}
                  onChange={handleChange}
                  name="business_type"
                >
                  <MenuItem value="" disabled>
                    Select Business Type
                  </MenuItem>
                  {businessTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleAddNewType}>
                    <AddIcon fontSize="small" sx={{ mr: 1 }} />
                    Add New Business Type
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Emirates
              </Typography>
              <FormControl fullWidth required>
                <Select
                  name="emirates"
                  value={clientData.emirates}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Emirates
                  </MenuItem>
                  <MenuItem value="Abu Dhabi">Abu Dhabi</MenuItem>
                  <MenuItem value="Dubai">Dubai</MenuItem>
                  <MenuItem value="Sharjah">Sharjah</MenuItem>
                  <MenuItem value="Ajman">Ajman</MenuItem>
                  <MenuItem value="Umm al Quwain">Umm al Quwain</MenuItem>
                  <MenuItem value="Ras Al Khaimah">Ras Al Khaimah</MenuItem>
                  <MenuItem value="Fujairah">Fujairah</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Location
              </Typography>
              <FormControl fullWidth required>
                <Select
                  // placeholder="Location"
                  name="location"
                  value={clientData.location}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Location
                  </MenuItem>
                  <MenuItem value="Free Zone">Free Zone</MenuItem>
                  <MenuItem value="Main Land">Main Land</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                VAT Number
              </Typography>
              <TextField
                // placeholder="VAT Number"
                variant="outlined"
                fullWidth
                type="text"
                name="vat_number"
                value={clientData.vat_number}
                onChange={handleChange}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                CT Number
              </Typography>
              <TextField
                // placeholder="CT Number"
                variant="outlined"
                fullWidth
                type="text"
                name="ct_number"
                value={clientData.ct_number}
                onChange={handleChange}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Email
              </Typography>
              <TextField
                // placeholder="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={clientData.email}
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
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Password
              </Typography>
              <TextField
                // placeholder="Password"
                type="text"
                variant="outlined"
                fullWidth
                name="password"
                value={clientData.password}
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
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Upcoming CT Due Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // label="Upcoming CT Due Date"
                  value={clientData.ct_due_date}
                  onChange={(newValue: Dayjs | null) =>
                    setClientData((prev) => ({
                      ...prev,
                      ct_due_date: newValue,
                    }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        style: {
                          color: '#3e4095',
                          fontWeight: '500',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Upcoming VAT Due Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // label="Upcoming VAT Due Date"
                  value={clientData.vat_due_date}
                  onChange={(newValue: Dayjs | null) =>
                    setClientData((prev) => ({
                      ...prev,
                      vat_due_date: newValue,
                    }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        style: {
                          color: '#3e4095',
                          fontWeight: '500',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Trade Licence Expiry Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // label="Trade Licence Expiry Date"
                  value={clientData.trade_licence_expiry}
                  onChange={(newValue: Dayjs | null) =>
                    setClientData((prev) => ({
                      ...prev,
                      trade_licence_expiry: newValue,
                    }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        style: {
                          color: '#3e4095',
                          fontWeight: '500',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Emirate ID
              </Typography>
              <TextField
                // placeholder="Emirate ID"
                variant="outlined"
                fullWidth
                type="text"
                name="emirate"
                value={clientData.emirate}
                onChange={handleChange}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Passport Expiry Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // label="Passport Expiry Date"
                  value={clientData.password_expiry}
                  onChange={(newValue: Dayjs | null) =>
                    setClientData((prev) => ({
                      ...prev,
                      password_expiry: newValue,
                    }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        style: {
                          color: '#3e4095',
                          fontWeight: '500',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Revenue
              </Typography>
              <FormControl fullWidth required>
                <TextField
                  name="Revenue"
                  // placeholder="Revenue"
                  value={clientData.Revenue}
                  onClick={() => setOpen(true)}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    sx: { cursor: 'pointer' },
                  }}
                />
              </FormControl>
            </Grid>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
              <DialogContent dividers>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={2}>
                    {visiblePickers.map((index) => (
                      <Grid item xs={12} container spacing={2} key={index}>
                        <Grid item xs={6}>
                          <DatePicker
                            views={['year', 'month']}
                            label={`Date ${index + 1}`}
                            value={dates[index]}
                            onChange={(newValue) => handleDateChange(index, newValue)}
                            format="MMMM YYYY"
                            slotProps={{
                              textField: {
                                fullWidth: true,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            type="number"
                            label="Amount"
                            value={amounts[index]}
                            onChange={(e) => handleAmountChange(index, e.target.value)}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </LocalizationProvider>

                <Box mt={3} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#fff',
                        color: 'primary.main',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        boxShadow: 4,
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#ccc',
                        color: '#666',
                        border: 'none',
                      },
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setPage(page + 1)}
                    disabled={(page + 1) * 6 >= dates.length}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#fff',
                        color: 'primary.main',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        boxShadow: 4,
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#ccc',
                        color: '#666',
                        border: 'none',
                      },
                    }}
                  >
                    Next
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleRevenueSave}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#fff',
                        color: 'primary.main',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        boxShadow: 4,
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#ccc',
                        color: '#666',
                        border: 'none',
                      },
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Contact Number
              </Typography>
              <TextField
                // placeholder="Contact Number"
                variant="outlined"
                fullWidth
                type="text"
                name="contact_number"
                value={clientData.contact_number}
                onChange={handleChange}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
                required
                InputProps={{
                  style: {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Address
              </Typography>
              <TextField
                // placeholder="Address"
                variant="outlined"
                fullWidth
                type="text"
                name="address"
                value={clientData.address}
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
              <Typography variant="subtitle2" ml="4px" fontSize="16px">
                Status
              </Typography>
              <FormControl fullWidth required>
                <Select
                  placeholder="Status"
                  name="status"
                  value={clientData.status}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Status
                  </MenuItem>
                  <MenuItem value="Active ">Active </MenuItem>
                  <MenuItem value="InActive">InActive </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* Left: Add Client Button */}
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: 'primary.main',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      boxShadow: 4,
                    },
                  }}
                >
                  Add Client
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddClients;

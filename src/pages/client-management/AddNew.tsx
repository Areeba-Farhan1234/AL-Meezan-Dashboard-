import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
import dayjs from 'dayjs';
import axios from 'axios';

interface ClientFormData {
  _id?: string;
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
  passport_expiry: Dayjs | null;
  emirate_id_expiry: Dayjs | null;
  Revenue: string;
  contact_number: string;
  address: string;
  status: string;
}

const AddClients: React.FC = () => {
  const { addClient } = useClients();
  const theme = useTheme();
  const navigate = useNavigate();

  const [businessTypes, setBusinessTypes] = useState<string[]>([
    'Jewellery',
    'Real Estate',
    'General Trading',
  ]);

  useEffect(() => {
    const savedTypes = localStorage.getItem('businessTypes');
    if (savedTypes) {
      setBusinessTypes(JSON.parse(savedTypes));
    }
  }, []);

  const handleAddNewType = () => {
    const newType = prompt('Enter a new Business Type:');
    if (!newType) return;

    setBusinessTypes((prev) => {
      const updatedTypes = [...prev, newType];
      localStorage.setItem('businessTypes', JSON.stringify(updatedTypes)); // Save to localStorage
      return updatedTypes;
    });

    // Also set selected value in form
    setClientData((prev) => ({
      ...prev,
      business_type: newType,
    }));
  };

  const [clientData, setClientData] = useState<ClientFormData>({
    _id: '',
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
    passport_expiry: null,
    emirate_id_expiry: null,
    Revenue: '',
    contact_number: '',
    address: '',
    status: '',
  });

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const openRevenueDialog = (id: string) => {
    setSelectedClientId(id);
    setOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;

    setClientData((prev) => ({
      ...prev,
      [name]: name === 'Revenue' ? Number(value) : value,
    }));
  };

  const handleChanges = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedClientData = {
      ...clientData,
      ct_due_date: clientData.ct_due_date ? clientData.ct_due_date.format('DD-MM-YYYY') : '',
      vat_due_date: clientData.vat_due_date ? clientData.vat_due_date.format('DD-MM-YYYY') : '',
      trade_licence_expiry: clientData.trade_licence_expiry
        ? clientData.trade_licence_expiry.format('DD-MM-YYYY')
        : '',
      emirate_id_expiry: clientData.emirate_id_expiry
        ? clientData.emirate_id_expiry.format('DD-MM-YYYY')
        : '',

      passport_expiry: clientData.passport_expiry
        ? clientData.passport_expiry.format('DD-MM-YYYY')
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

  const [open, setOpen] = useState(false);
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

  const handleRevenueSave = async () => {
    if (!selectedClientId) {
      toast.error('Client ID not found. Save the client first.');
      return;
    }

    const revenueData = dates
      .map((date, i) => {
        if (!date) return null;
        return {
          month: date.format('YYYY-MM'), // clean format
          amount: parseFloat(amounts[i]) || 0,
        };
      })
      .filter(Boolean);

    try {
      const response = await axios.post(`/clients/${selectedClientId}/revenue`, {
        revenue: revenueData,
      });

      if (response.status === 200) {
        const summary = revenueData
          .filter((item): item is { month: string; amount: number } => item !== null)
          .map((item) => `${dayjs(item.month).format('MMMM YYYY')}: ${item.amount}`)
          .join(', ');

        setClientData((prev) => ({
          ...prev,
          Revenue: summary,
        }));

        toast.success('Revenue saved successfully!');
        setOpen(false); // ✅ Close the dialog
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save revenue. Please try again.');
    }
  };

  const itemsPerPage = 6;
  const startIndex = page * itemsPerPage;
  const visiblePickers = Array.from({ length: itemsPerPage }, (_, i) => startIndex + i).filter(
    (i) => i < dates.length,
  );

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
                  onChange={handleChanges}
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
                  value={
                    clientData.ct_due_date ? dayjs(clientData.ct_due_date, 'DD-MM-YYYY') : null
                  }
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
                  value={
                    clientData.vat_due_date ? dayjs(clientData.vat_due_date, 'DD-MM-YYYY') : null
                  }
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
                  value={
                    clientData.trade_licence_expiry
                      ? dayjs(clientData.trade_licence_expiry, 'DD-MM-YYYY')
                      : null
                  }
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
                Emirate Expiry Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={
                    clientData.emirate_id_expiry
                      ? dayjs(clientData.emirate_id_expiry, 'DD-MM-YYYY')
                      : null
                  }
                  onChange={(newValue: Dayjs | null) =>
                    setClientData((prev) => ({
                      ...prev,
                      emirate_id_expiry: newValue,
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
                Passport Expiry Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={
                    clientData.passport_expiry
                      ? dayjs(clientData.passport_expiry, 'DD-MM-YYYY')
                      : null
                  }
                  onChange={(newValue: Dayjs | null) =>
                    setClientData((prev) => ({
                      ...prev,
                      passport_expiry: newValue,
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
                  onClick={() => {
                    setOpen(true);
                    openRevenueDialog(clientData._id!);
                  }}
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
                            label={`Month ${index + 1}`}
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
                            placeholder="Amount"
                            value={amounts[index]}
                            onChange={(e) => handleAmountChange(index, e.target.value)}
                            fullWidth
                            sx={{
                              '& .MuiInputBase-root': {
                                height: 50,
                              },
                              '& .MuiInputLabel-root': {
                                top: -6,
                              },
                            }}
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
                    disabled={(page + 1) * itemsPerPage >= dates.length}
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

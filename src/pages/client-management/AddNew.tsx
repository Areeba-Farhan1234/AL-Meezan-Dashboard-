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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';
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
  contact_number: string;
  address: string;
}

const AddClients: React.FC = () => {
  const { addClient } = useClients();
  const theme = useTheme();
  const navigate = useNavigate();
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
    contact_number: '',
    address: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     // Just send the clientData — no need to generate an id
  //     await addClient(clientData); // it will POST and update context inside ClientsProvider
  //     navigate('/clients/all-clients');
  //   } catch (error) {
  //     console.error('Failed to add client:', error);
  //     alert('Something went wrong while adding the client.');
  //   }
  // };
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
              <TextField
                placeholder="Name"
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
              <FormControl fullWidth required>
                <Select
                  name="business_type"
                  value={clientData.business_type}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Business Type
                  </MenuItem>
                  <MenuItem value="Jewellery">Jewellery</MenuItem>
                  <MenuItem value="Real Estate">Real Estate</MenuItem>
                  <MenuItem value="General Trading">General Trading</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
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
              <FormControl fullWidth required>
                <Select
                  placeholder="Location"
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
              <TextField
                placeholder="VAT Number"
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
              <TextField
                placeholder="CT Number"
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
              <TextField
                placeholder="Email"
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
              <TextField
                placeholder="Password"
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="CT Due Date"
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
                          background: '#fffffd',
                          color: '#3e4095',
                          fontWeight: '500',
                          backgroundColor: theme.palette.info.main,
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="VAT Due Date"
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
                          background: '#fffffd',
                          color: '#3e4095',
                          fontWeight: '500',
                          backgroundColor: theme.palette.info.main,
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Trade Licence Expiry"
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
                          background: '#fffffd',
                          color: '#3e4095',
                          fontWeight: '500',
                          backgroundColor: theme.palette.info.main,
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Emirate ID"
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Password Expiry Date"
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
                          background: '#fffffd',
                          color: '#3e4095',
                          fontWeight: '500',
                          backgroundColor: theme.palette.info.main,
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Contact Number"
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
              <TextField
                placeholder="Address"
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

            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddClients;

import React, { useRef, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  Grid,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,
  Paper,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useClients, Client } from '../../context/ClientsContext';
import axios from 'axios';

const ClientsList: React.FC = () => {
  const { clients, updateClient, setClients } = useClients();
  const navigate = useNavigate();
  const theme = useTheme();
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [editingClientId, setEditingClientId] = useState<string | number | null>(null);
  const [editedClient, setEditedClient] = useState<Partial<Client>>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const open = Boolean(anchorEl);

  const [isOn, setIsOn] = useState(true);

  const filteredClients = clients.filter((client) => {
    const status = (client.status || '').toLowerCase().trim();
    return isOn ? status === 'active' : status === 'inactive';
  });

  const [ShareholderOpen, setShareholderOpen] = useState(false);

  type Shareholder = {
    name: string;
    id: string;
    expiry: Dayjs | null;
  };

  const [shareholders, setShareholders] = useState<Shareholder[]>([
    { name: '', id: '', expiry: null },
  ]);

  const handleShareholderChange = <K extends keyof Shareholder>(
    index: number,
    field: K,
    value: Shareholder[K],
  ) => {
    const updated = [...shareholders];
    updated[index][field] = value;
    setShareholders(updated);
  };

  interface ShareholderFromBackend {
    name: string;
    id: string;
    expiry?: string | null;
  }

  const handleOpenShareholderDialog = async (clientId: string) => {
    setSelectedClientId(clientId);
    try {
      const res = await fetch(`/shareholders/${clientId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch shareholders');
      }
      const data: ShareholderFromBackend[] = await res.json();

      // Convert expiry string to dayjs or null
      const processedData = data.map((s) => ({
        ...s,
        expiry: s.expiry ? dayjs(s.expiry) : null,
      }));

      setShareholders(processedData.length ? processedData : [{ name: '', id: '', expiry: null }]);
    } catch (error) {
      console.error('Error fetching shareholders:', error);
      setShareholders([{ name: '', id: '', expiry: null }]);
    }
    setShareholderOpen(true);
  };

  const handleAddShareholder = () => {
    const last = shareholders[shareholders.length - 1];
    if (!last.name || !last.id || !last.expiry) {
      alert('Please fill all fields before adding a new shareholder.');
      return;
    }
    setShareholders([...shareholders, { name: '', id: '', expiry: null }]);
  };

  const handleSaveShareholders = async () => {
    if (!selectedClientId) {
      alert('No client selected!');
      return;
    }

    try {
      // Convert expiry Dayjs to string or null before sending
      const payload = shareholders.map((sh) => ({
        ...sh,
        expiry: sh.expiry ? sh.expiry.toISOString() : null,
      }));

      const response = await fetch(`/shareholders/${selectedClientId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save shareholders');
      }

      const data: ShareholderFromBackend[] = await response.json();

      // Process returned data (convert expiry string to dayjs)
      const processedData = data.map((s) => ({
        ...s,
        expiry: s.expiry ? dayjs(s.expiry) : null,
      }));

      setShareholders(processedData);
      setShareholderOpen(false); // close dialog after successful save
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving shareholders');
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 1;
    const walkY = (y - startY) * 1;
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };
  // Start editing whole row
  const handleEditRow = (client: Client) => {
    setEditingClientId(client._id);
    setEditedClient({ ...client });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingClientId(null);
    setEditedClient({});
  };

  // Save whole row
  const handleSaveRow = async () => {
    if (editingClientId === null) return;
    await updateClient(editingClientId, editedClient);
    setEditingClientId(null);
    setEditedClient({});
  };

  const handleDeleteClient = async (id: string | number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/clients/${id}`);
      setClients((prevClients) => prevClients.filter((client) => client._id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Failed to delete the client. Please try again.');
    }
  };

  const fields: { key: keyof Client; label: string; align?: 'left' | 'center' }[] = [
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'entity_type', label: 'Entity Type' },
    { key: 'business_type', label: 'Business Type' },
    { key: 'emirates', label: 'Emirates' },
    { key: 'location', label: 'Location' },
    { key: 'vat_number', label: 'VAT Number' },
    { key: 'ct_number', label: 'CT Number' },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password' },
    { key: 'ct_due_date', label: 'CT Due' },
    { key: 'vat_due_date', label: 'VAT Due' },
    { key: 'trade_licence_expiry', label: 'Licence Expiry' },
    { key: 'emirate_id_expiry', label: 'Emirate Expiry' },
    { key: 'passport_expiry', label: 'Passport Expiry' },
    { key: 'contact_number', label: 'Contact' },
    { key: 'address', label: 'Address', align: 'left' },
    { key: 'Revenue', label: 'Revenue' },
    { key: 'status', label: 'Status' },
  ];

  const commonCellStyles = {
    padding: '10px 20px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '14px',
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, position: 'relative' }}>
      <Box>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
              marginTop: 4,
            }}
          >
            {/* Left Side */}
            <Typography variant="h3" gutterBottom>
              Clients List
            </Typography>

            {/* Right Side: Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="subtitle1">
                {isOn ? 'Active Clients' : 'InActive Clients'}
              </Typography>

              <Box
                onClick={() => setIsOn(!isOn)}
                sx={{
                  width: '80px',
                  height: '32px',
                  borderRadius: '999px',
                  backgroundColor: isOn ? '#3e4595' : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isOn ? 'flex-end' : 'flex-start',
                  padding: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'background-color 0.3s',
                }}
              >
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    transition: 'transform 0.3s',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        {filteredClients.length > 0 ? (
          // {clients.length > 0 ? (
          <>
            <Box
              ref={containerRef}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              sx={{
                width: '100%',
                maxHeight: '500px',
                overflowX: 'auto',
                overflowY: 'auto',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                marginBottom: '8px',

                scrollbarWidth: 'auto',
                scrollbarColor: '#3e4095 #f0f0f0',

                '&::-webkit-scrollbar': {
                  width: '20px',
                  height: '20px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f0f0f0',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#3e4095',
                  borderRadius: '10px',
                  border: '2px solid transparent',
                  backgroundClip: 'content-box',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555',
                },
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  minWidth: 1600,
                  width: 'fit-content',
                  backgroundColor: '#fff',
                  borderRadius: '2px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  '&::-webkit-scrollbar': {
                    width: '20px',
                    height: '20px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#eaeaea',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#666',
                  },
                }}
              >
                <Table sx={{ minWidth: 1600, tableLayout: 'auto' }} stickyHeader>
                  <TableHead>
                    <TableRow>
                      {fields.map(({ label, key, align }) => (
                        <TableCell
                          key={key}
                          align={align || 'center'}
                          sx={{
                            ...commonCellStyles,
                            fontWeight: 800,
                            color: '#2d2d63',
                            backgroundColor: '#f9faff',
                          }}
                        >
                          {label}
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 700,
                          color: '#2d2d63',
                          backgroundColor: '#f9faff',
                          padding: '6px 16px',
                          whiteSpace: 'nowrap',
                          minWidth: 120,
                        }}
                      >
                        Files
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 700,
                          color: '#2d2d63',
                          backgroundColor: '#f9faff',
                          padding: '6px 16px',
                          whiteSpace: 'nowrap',
                          minWidth: 140,
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredClients.map((client) => {
                      // {clients.map((client) => {
                      const isEditing = editingClientId === client._id;

                      return (
                        <TableRow
                          key={client._id}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#f1f5ff',
                            },
                          }}
                        >
                          {fields.map(({ key, align }) => {
                            // Password field (read-only if not editing)
                            if (key === 'password' && !isEditing) {
                              return (
                                <TableCell
                                  key={key}
                                  align={align || 'center'}
                                  sx={{ padding: '6px 16px', whiteSpace: 'nowrap' }}
                                >
                                  {client[key]}
                                </TableCell>
                              );
                            }

                            // Name field – clickable for dialog
                            if (key === 'passport_expiry') {
                              return (
                                <TableCell
                                  key={key}
                                  align={align || 'left'}
                                  sx={{
                                    ...commonCellStyles,
                                    color: '#3e4095',
                                    fontWeight: '500',
                                  }}
                                  // onClick={() => {
                                  //   setShareholders([
                                  //     {
                                  //       name: client.name,
                                  //       id: client._id ?? '',
                                  //       expiry: null,
                                  //     },
                                  //   ]);
                                  //   setShareholderOpen(true);
                                  // }}
                                  onClick={() => handleOpenShareholderDialog(client._id)}
                                >
                                  {client[key]}
                                </TableCell>
                              );
                            }

                            if (key === 'emirate_id_expiry') {
                              return (
                                <TableCell
                                  key={key}
                                  align={align || 'left'}
                                  sx={{
                                    ...commonCellStyles,
                                    color: '#3e4095',
                                    fontWeight: '500',
                                  }}
                                  // onClick={() => {
                                  //   setShareholders([
                                  //     {
                                  //       name: client.name,
                                  //       id: client._id ?? '',
                                  //       expiry: null,
                                  //     },
                                  //   ]);
                                  //   setShareholderOpen(true);
                                  // }}
                                  onClick={() => handleOpenShareholderDialog(client._id)}
                                >
                                  {client[key]}
                                </TableCell>
                              );
                            }

                            return (
                              <TableCell
                                key={key}
                                align={align || 'center'}
                                sx={{
                                  ...commonCellStyles,
                                  minWidth: key === 'address' ? 200 : 'auto',
                                }}
                              >
                                {isEditing ? (
                                  <input
                                    type={key === 'email' ? 'email' : 'text'}
                                    value={
                                      editedClient[key] !== undefined && editedClient[key] !== null
                                        ? String(editedClient[key])
                                        : ''
                                    }
                                    onChange={(e) =>
                                      setEditedClient((prev) => ({
                                        ...prev,
                                        [key]: e.target.value,
                                      }))
                                    }
                                    style={{
                                      width: '100%',
                                      border: '2px solid #413f91',
                                      padding: '6px 16px',
                                    }}
                                    autoFocus={key === fields[0].key}
                                    title={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                  />
                                ) : (
                                  client[key]
                                )}
                              </TableCell>
                            );
                          })}

                          {/* Files menu button */}
                          <TableCell align="center" sx={{ ...commonCellStyles }}>
                            <IconButton onClick={(e) => handleMenuClick(e, String(client._id))}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>

                          {/* Actions: Edit/Delete or Save/Cancel */}
                          <TableCell align="center" sx={{ ...commonCellStyles }}>
                            {isEditing ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={handleSaveRow}
                                  sx={{ mr: 1 }}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="text"
                                  color="secondary"
                                  size="small"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <IconButton
                                  onClick={() => handleEditRow(client)}
                                  aria-label="edit"
                                  size="small"
                                  color="primary"
                                  disabled={editingClientId !== null}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDeleteClient(client._id)}
                                  disabled={editingClientId !== null}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>
            No clients found.
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/clients/add-new')}>
            Add Client
          </Button>
        </Box>

        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem>
            <UploadIcon fontSize="small" sx={{ mr: 1 }} />
            Upload Files
          </MenuItem>
          <MenuItem>
            <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
            Download All
          </MenuItem>
          <MenuItem onClick={() => selectedClientId && console.log(selectedClientId)}>
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            View Files
          </MenuItem>
        </Menu>

        <Dialog
          open={ShareholderOpen}
          onClose={() => setShareholderOpen(false)}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>Add Client Details</DialogTitle>
          <DialogContent dividers>
            {shareholders.map((sh, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" ml="4px" fontSize="16px">
                    Client Name
                  </Typography>
                  <TextField
                    value={sh.name}
                    onChange={(e) => handleShareholderChange(index, 'name', e.target.value)}
                    fullWidth
                    InputProps={{
                      style: { backgroundColor: theme.palette.info.main, height: '50px' },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" ml="4px" fontSize="16px">
                    Client ID
                  </Typography>
                  <TextField
                    value={sh.id}
                    onChange={(e) => handleShareholderChange(index, 'id', e.target.value)}
                    fullWidth
                    InputProps={{
                      style: { backgroundColor: theme.palette.info.main, height: '50px' },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography variant="subtitle2" ml="4px" fontSize="16px">
                      Expiry Date
                    </Typography>
                    {/* <DatePicker
                      value={sh.expiry}
                      onChange={(newDate) => handleShareholderChange(index, 'expiry', newDate)}
                      views={['day', 'month', 'year']}
                      slotProps={{ textField: { fullWidth: true } }}
                    /> */}

                    <DatePicker
                      value={sh.expiry}
                      onChange={(newDate) => handleShareholderChange(index, 'expiry', newDate)}
                      views={['day', 'month', 'year']}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            ))}

            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddShareholder}
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
              Add New Shareholder
            </Button>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => setShareholderOpen(false)}
              variant="outlined"
              color="primary"
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
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              // onClick={() => {
              //   console.log('Saving shareholders:', shareholders);
              //   handleSaveShareholders();
              // }}

              onClick={handleSaveShareholders}
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
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ClientsList;

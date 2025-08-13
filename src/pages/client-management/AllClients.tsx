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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useClients, Client } from '../../context/ClientsContext';
import axios from 'axios';

const ClientsList: React.FC = () => {
  const { clients, updateClient, setClients } = useClients();
  const navigate = useNavigate();
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
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const open = Boolean(anchorEl);
  const [isOn, setIsOn] = useState(true);

  const toggle = () => {
    setIsOn((prev) => !prev);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file || !selectedClientId) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   axios
  //     .post(`/clients/${selectedClientId}/upload`, formData)
  //     .then(() => {
  //       toast.success('File uploaded successfully 🎉');
  //     })
  //     .catch(() => {
  //       toast.error('Upload failed ❌');
  //     })
  //     .finally(() => {
  //       handleCloseMenu();
  //     });
  // };

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (!files || !selectedClientId) return;

  //   const formData = new FormData();
  //   Array.from(files).forEach((file) => {
  //     formData.append('files', file); // must match backend field name
  //   });

  //   axios
  //     .post(`/clients/${selectedClientId}/upload`, formData)
  //     .then(() => {
  //       toast.success('Files uploaded successfully 🎉');
  //       fetchClientFiles(selectedClientId); // refresh list
  //     })
  //     .catch(() => {
  //       toast.error('Upload failed ❌');
  //     })
  //     .finally(() => {
  //       handleCloseMenu();
  //     });
  // };

  // const [clientFiles, setClientFiles] = useState<{ name: string }[]>([]);

  // const fetchClientFiles = async (id: string) => {
  //   try {
  //     const res = await axios.get(`/clients/${id}/files`);
  //     setClientFiles(res.data.files); // [{ name: "file1.pdf" }, ...]
  //   } catch (err) {
  //     toast.error('Failed to load files');
  //   }
  // };

  // const handleFileDownload = () => {
  //   if (!selectedClientId) return;

  //   axios
  //     .get(`/clients/${selectedClientId}/download`, { responseType: 'blob' })
  //     .then((res) => {
  //       const url = window.URL.createObjectURL(new Blob([res.data]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', 'client_file.pdf');
  //       document.body.appendChild(link);
  //       link.click();
  //       toast.success('File downloaded 🎉');
  //     })
  //     .catch(() => toast.error('Download failed ❌'))
  //     .finally(() => handleCloseMenu());
  // };

  // const handleFileDownloadAll = () => {
  //   if (!selectedClientId) return;

  //   axios
  //     .get(`/clients/${selectedClientId}/download-all`, { responseType: 'blob' })
  //     .then((res) => {
  //       const url = window.URL.createObjectURL(new Blob([res.data]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', `client_${selectedClientId}_files.zip`);
  //       document.body.appendChild(link);
  //       link.click();
  //       toast.success('All files downloaded 🎉');
  //     })
  //     .catch(() => toast.error('Download failed ❌'))
  //     .finally(() => handleCloseMenu());
  // };

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
    { key: 'emirate', label: 'Emirate ID' },
    { key: 'password_expiry', label: 'Password Expiry' },
    { key: 'contact_number', label: 'Contact' },
    { key: 'address', label: 'Address', align: 'left' },
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
                {isOn ? 'Active Clients' : 'Inactive Clients'}
              </Typography>

              <Box
                onClick={toggle}
                sx={{
                  width: '60px',
                  height: '32px',
                  borderRadius: '999px',
                  backgroundColor: isOn ? '#3e4595' : '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
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
                    backgroundColor: '#ccc',
                    transform: isOn ? 'translateX(28px)' : 'translateX(0)',
                    transition: 'transform 0.3s',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        {clients.length > 0 ? (
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
                    {clients.map((client) => {
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

                          <TableCell align="center" sx={{ ...commonCellStyles }}>
                            <IconButton onClick={(e) => handleMenuClick(e, String(client._id))}>
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>

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
        {/* <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={() => fileInputRef.current?.click()}>
            <UploadIcon fontSize="small" sx={{ mr: 1 }} />
            Upload
          </MenuItem>
          <MenuItem onClick={handleFileDownload}>
            <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
            Download
          </MenuItem>
        </Menu> */}

        {/* <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={() => fileInputRef.current?.click()}>
            <UploadIcon fontSize="small" sx={{ mr: 1 }} />
            Upload Files
          </MenuItem>
          <MenuItem> onClick={handleFileDownloadAll}
            <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
            Download All
          </MenuItem>
          <MenuItem >  onClick={() => selectedClientId && fetchClientFiles(selectedClientId)}
            📂 View Files
          </MenuItem>
        </Menu>

        <input
          title="file"
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.jpg,.png,.xlsx"
          multiple
          hidden
        /> */}

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
      </Box>
    </Container>
  );
};

export default ClientsList;

import React, { useRef, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { useClients } from '../../context/ClientsContext';

const ClientsList: React.FC = () => {
  const { clients, deleteClient } = useClients();
  const navigate = useNavigate();

  // --- Drag to scroll state and refs ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleEdit = (id: string) => {
    navigate(`/clients/add-new/${id}`);
  };

  const handleDelete = (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient(id);
    }
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2d2d63' }}>
          Clients List
        </Typography>

        {clients.length > 0 ? (
          <Box
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            sx={{
              width: '100%',
              overflowX: 'auto',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ccc',
                borderRadius: 2,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#999',
              },
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                minWidth: 1400, // Enough width to trigger horizontal scroll
                borderRadius: '2px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                backgroundColor: '#fff',
              }}
            >
              <Table sx={{ minWidth: 1200 }} aria-label="clients table">
                <TableHead>
                  <TableRow>
                    {[
                      'Name',
                      'Entity Type',
                      'Business Type',
                      'Emirates',
                      'Location',
                      'VAT Number',
                      'CT Number',
                      'Email',
                      'Password',
                      'Upcoming Due',
                      'Actions',
                    ].map((head) => (
                      <TableCell
                        key={head}
                        align={head === 'Name' ? 'left' : 'center'}
                        sx={{
                          fontWeight: 400,
                          color: '#2d2d63',
                          backgroundColor: '#f9faff',
                          padding: '6px 10px',
                          whiteSpace: 'nowrap',
                          minWidth: head === 'Actions' ? 140 : undefined,
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow
                      key={client.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f1f5ff',
                        },
                      }}
                    >
                      <TableCell sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.name}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.entity_type}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.business_type}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.emirates}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.location}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.vat_number}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.ct_number}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.email}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.password}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
                        {client.upcoming_due}
                      </TableCell>

                      <TableCell align="center" sx={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(String(client.id))}
                            title="Edit Client"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(client.id)}
                            title="Delete Client"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" mt={2}>
            No clients found. Please add a new client.
          </Typography>
        )}

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/clients/add-new"
            sx={{
              paddingX: 2.5,
              paddingY: 1.5,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#fff',
                color: 'primary.main',
                border: '2px solid',
                borderColor: 'primary.main',
                boxShadow: 4,
              },
            }}
          >
            Add New Client
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClientsList;

// import React, { useRef, useState } from 'react';
// import {
//   Container,
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   TableContainer,
//   Paper,
//   Button,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link, useNavigate } from 'react-router-dom';
// import { useClients } from '../../context/ClientsContext';

// const ClientsList: React.FC = () => {
//   const { clients, deleteClient } = useClients();
//   const navigate = useNavigate();

//   // --- Drag to scroll state and refs ---
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   const handleEdit = (id: string) => {
//     navigate(`/clients/add-new/${id}`);
//   };

//   const handleDelete = (id: string | number) => {
//     if (window.confirm('Are you sure you want to delete this client?')) {
//       deleteClient(id);
//     }
//   };

//   // Drag handlers
//   const onMouseDown = (e: React.MouseEvent) => {
//     if (!containerRef.current) return;
//     setIsDragging(true);
//     setStartX(e.pageX - containerRef.current.offsetLeft);
//     setScrollLeft(containerRef.current.scrollLeft);
//   };

//   const onMouseLeave = () => {
//     setIsDragging(false);
//   };

//   const onMouseUp = () => {
//     setIsDragging(false);
//   };

//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !containerRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - containerRef.current.offsetLeft;
//     const walk = (x - startX) * 1; // scroll speed multiplier
//     containerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Box>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2d2d63' }}>
//           Clients List
//         </Typography>

//         {clients.length > 0 ? (
//           <Box
//             ref={containerRef}
//             onMouseDown={onMouseDown}
//             onMouseLeave={onMouseLeave}
//             onMouseUp={onMouseUp}
//             onMouseMove={onMouseMove}
//             sx={{
//               width: '100%',
//               overflowX: 'auto',
//               cursor: isDragging ? 'grabbing' : 'grab',
//               userSelect: 'none',
//               '&::-webkit-scrollbar': {
//                 height: 8,
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#ccc',
//                 borderRadius: 2,
//               },
//               '&::-webkit-scrollbar-thumb:hover': {
//                 backgroundColor: '#999',
//               },
//             }}
//           >
//             <TableContainer
//               component={Paper}
//               sx={{
//                 minWidth: 1400, // Enough width to trigger horizontal scroll
//                 borderRadius: '2px',
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <Table sx={{ minWidth: 1200 }} aria-label="clients table">
//                 <TableHead>
//                   <TableRow>
//                     {[
//                       'Name',
//                       'Entity Type',
//                       'Business Type',
//                       'Emirates',
//                       'Location',
//                       'VAT Number',
//                       'CT Number',
//                       'Email',
//                       'Password',
//                       'Upcoming Due',
//                       'Actions',
//                     ].map((head) => (
//                       <TableCell
//                         key={head}
//                         align={head === 'Name' ? 'left' : 'center'}
//                         sx={{
//                           fontWeight: 400,
//                           color: '#2d2d63',
//                           backgroundColor: '#f9faff',
//                           padding: '6px 10px',
//                           whiteSpace: 'nowrap',
//                           minWidth: head === 'Actions' ? 140 : undefined,
//                         }}
//                       >
//                         {head}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {clients.map((client) => (
//                     <TableRow
//                       key={client.id}
//                       sx={{
//                         '&:hover': {
//                           backgroundColor: '#f1f5ff',
//                         },
//                       }}
//                     >
//                       <TableCell sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.name}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.entity_type}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.business_type}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.emirates}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.location}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.vat_number}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.ct_number}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.email}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.password}
//                       </TableCell>
//                       <TableCell align="center" sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}>
//                         {client.upcoming_due}
//                       </TableCell>

//                       <TableCell align="center" sx={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>
//                         <Box
//                           sx={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}
//                         >
//                           <IconButton
//                             color="primary"
//                             onClick={() => handleEdit(String(client.id))}
//                             title="Edit Client"
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             color="error"
//                             onClick={() => handleDelete(client.id)}
//                             title="Delete Client"
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         ) : (
//           <Typography variant="body1" color="text.secondary" mt={2}>
//             No clients found. Please add a new client.
//           </Typography>
//         )}

//         <Box mt={4}>
//           <Button
//             variant="contained"
//             color="primary"
//             component={Link}
//             to="/clients/add-new"
//             sx={{
//               paddingX: 2.5,
//               paddingY: 1.5,
//               fontWeight: 600,
//               '&:hover': {
//                 backgroundColor: '#fff',
//                 color: 'primary.main',
//                 border: '2px solid',
//                 borderColor: 'primary.main',
//                 boxShadow: 4,
//               },
//             }}
//           >
//             Add New Client
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ClientsList;

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
import { useNavigate } from 'react-router-dom';
import { useClients, Client } from '..//../context/ClientsContext';

const ClientsList: React.FC = () => {
  const { clients, deleteClient, updateClient } = useClients();
  const navigate = useNavigate();

  // Drag to scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Editing state for single row - stores client ID or null
  const [editingClientId, setEditingClientId] = useState<string | number | null>(null);
  // Local copy of client being edited
  const [editedClient, setEditedClient] = useState<Partial<Client>>({});

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

  // Start editing whole row
  const handleEditRow = (client: Client) => {
    setEditingClientId(client.id);
    setEditedClient({ ...client }); // create a copy for editing
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

  // Delete client
  const handleDelete = async (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await deleteClient(id);
    }
  };

  // Helper: Fields to display in table and their labels
  const fields: { key: keyof Client; label: string; align?: 'left' | 'center' }[] = [
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'entity_type', label: 'Entity Type', align: 'center' },
    { key: 'business_type', label: 'Business Type', align: 'center' },
    { key: 'emirates', label: 'Emirates', align: 'center' },
    { key: 'location', label: 'Location', align: 'center' },
    { key: 'vat_number', label: 'VAT Number', align: 'center' },
    { key: 'ct_number', label: 'CT Number', align: 'center' },
    { key: 'email', label: 'Email', align: 'center' },
    { key: 'password', label: 'Password', align: 'center' },
    { key: 'upcoming_due', label: 'Upcoming Due', align: 'center' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2d2d63' }}>
          Clients List
        </Typography>

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
                overflowX: 'auto',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                maxHeight: '500px',
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
                  minWidth: 1600,
                  borderRadius: '2px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  backgroundColor: '#fff',
                }}
              >
                <Table sx={{ minWidth: 1600 }} aria-label="clients table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      {fields.map(({ label, key, align }) => (
                        <TableCell
                          key={key}
                          align={align || 'center'}
                          sx={{
                            fontWeight: 400,
                            color: '#2d2d63',
                            backgroundColor: '#f9faff',
                            padding: '6px 10px',
                            whiteSpace: 'nowrap',
                            minWidth: key === 'upcoming_due' ? 140 : undefined,
                          }}
                        >
                          {label}
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 400,
                          color: '#2d2d63',
                          backgroundColor: '#f9faff',
                          padding: '6px 10px',
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
                      const isEditing = editingClientId === client.id;

                      return (
                        <TableRow
                          key={client.id}
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
                                  sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
                                >
                                  ••••••••
                                </TableCell>
                              );
                            }

                            return (
                              <TableCell
                                key={key}
                                align={align || 'center'}
                                sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
                              >
                                {isEditing ? (
                                  <input
                                    type={
                                      key === 'email'
                                        ? 'email'
                                        : key === 'password'
                                          ? 'password'
                                          : 'text'
                                    }
                                    value={
                                      // Use editedClient's value or empty string fallback
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
                                    style={{ width: '100%', padding: '4px 6px' }}
                                    autoFocus={key === fields[0].key} // autofocus first input
                                  />
                                ) : (
                                  client[key]
                                )}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            align="center"
                            sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
                          >
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
                                  onClick={() => handleDelete(client.id)}
                                  aria-label="delete"
                                  size="small"
                                  color="error"
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
          <Button variant="contained" color="primary" onClick={() => navigate('/addClient')}>
            Add Client
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClientsList;

// import React, { useRef, useState } from 'react';
// import {
//   Container,
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   TableContainer,
//   Paper,
//   Button,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
// import { useClients, Client } from '../../context/ClientsContext';

// const ClientsList: React.FC = () => {
//   const { clients, deleteClient, updateClient } = useClients();
//   const navigate = useNavigate();

//   // Drag to scroll
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   // Track which row is being edited, and the editable client data
//   const [editingRowId, setEditingRowId] = useState<string | number | null>(null);
//   const [editRowData, setEditRowData] = useState<Partial<Client>>({});

//   const onMouseDown = (e: React.MouseEvent) => {
//     if (!containerRef.current) return;
//     setIsDragging(true);
//     setStartX(e.pageX - containerRef.current.offsetLeft);
//     setScrollLeft(containerRef.current.scrollLeft);
//   };

//   const onMouseLeave = () => {
//     setIsDragging(false);
//   };

//   const onMouseUp = () => {
//     setIsDragging(false);
//   };

//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !containerRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - containerRef.current.offsetLeft;
//     const walk = (x - startX) * 1; // scroll speed multiplier
//     containerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   // Start editing entire row
//   const handleEditRow = (client: Client) => {
//     setEditingRowId(client.id);
//     setEditRowData({ ...client });
//   };

//   // Cancel editing row
//   const handleCancelEdit = () => {
//     setEditingRowId(null);
//     setEditRowData({});
//   };

//   // Handle change in input fields for the editing row
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: keyof Client,
//   ) => {
//     setEditRowData((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));
//   };

//   // Save edited row
//   const handleSaveRow = async () => {
//     if (editingRowId == null) return;
//     await updateClient(editingRowId, editRowData);
//     setEditingRowId(null);
//     setEditRowData({});
//   };

//   // Delete client
//   const handleDelete = async (id: string | number) => {
//     if (window.confirm('Are you sure you want to delete this client?')) {
//       await deleteClient(id);
//     }
//   };

//   const fields: { key: keyof Client; label: string; align?: 'left' | 'center' }[] = [
//     { key: 'name', label: 'Name', align: 'left' },
//     { key: 'entity_type', label: 'Entity Type', align: 'center' },
//     { key: 'business_type', label: 'Business Type', align: 'center' },
//     { key: 'emirates', label: 'Emirates', align: 'center' },
//     { key: 'location', label: 'Location', align: 'center' },
//     { key: 'vat_number', label: 'VAT Number', align: 'center' },
//     { key: 'ct_number', label: 'CT Number', align: 'center' },
//     { key: 'email', label: 'Email', align: 'center' },
//     { key: 'password', label: 'Password', align: 'center' },
//     { key: 'upcoming_due', label: 'Upcoming Due', align: 'center' },
//   ];

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
//       <Box>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2d2d63' }}>
//           Clients List
//         </Typography>

//         {clients.length > 0 ? (
//           <>
//             <Box
//               ref={containerRef}
//               onMouseDown={onMouseDown}
//               onMouseLeave={onMouseLeave}
//               onMouseUp={onMouseUp}
//               onMouseMove={onMouseMove}
//               sx={{
//                 width: '100%',
//                 overflowX: 'auto',
//                 cursor: isDragging ? 'grabbing' : 'grab',
//                 userSelect: 'none',
//                 maxHeight: '500px',
//                 '&::-webkit-scrollbar': {
//                   height: 8,
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   backgroundColor: '#ccc',
//                   borderRadius: 2,
//                 },
//                 '&::-webkit-scrollbar-thumb:hover': {
//                   backgroundColor: '#999',
//                 },
//               }}
//             >
//               <TableContainer
//                 component={Paper}
//                 sx={{
//                   minWidth: 1600,
//                   borderRadius: '2px',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//                   backgroundColor: '#fff',
//                 }}
//               >
//                 <Table sx={{ minWidth: 1600 }} aria-label="clients table" stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       {fields.map(({ label, key, align }) => (
//                         <TableCell
//                           key={key}
//                           align={align || 'center'}
//                           sx={{
//                             fontWeight: 400,
//                             color: '#2d2d63',
//                             backgroundColor: '#f9faff',
//                             padding: '6px 10px',
//                             whiteSpace: 'nowrap',
//                             minWidth: key === 'upcoming_due' ? 140 : undefined,
//                           }}
//                         >
//                           {label}
//                         </TableCell>
//                       ))}
//                       <TableCell
//                         align="center"
//                         sx={{
//                           fontWeight: 400,
//                           color: '#2d2d63',
//                           backgroundColor: '#f9faff',
//                           padding: '6px 10px',
//                           whiteSpace: 'nowrap',
//                           minWidth: 140,
//                         }}
//                       >
//                         Actions
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {clients.map((client) => {
//                       const isEditing = editingRowId === client.id;

//                       return (
//                         <TableRow
//                           key={client.id}
//                           sx={{
//                             '&:hover': {
//                               backgroundColor: '#f1f5ff',
//                             },
//                           }}
//                         >
//                           {fields.map(({ key, align }) => {
//                             if (isEditing) {
//                               // Editable inputs for all fields in the editing row
//                               // Password input type for password field, email for email, else text
//                               return (
//                                 <TableCell
//                                   key={key}
//                                   align={align || 'center'}
//                                   sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
//                                 >
//                                   <input
//                                     type={
//                                       key === 'email'
//                                         ? 'email'
//                                         : key === 'password'
//                                           ? 'password'
//                                           : 'text'
//                                     }
//                                     name={key}
//                                     value={editRowData[key] ?? ''}
//                                     onChange={(e) => handleInputChange(e, key)}
//                                     style={{ width: '100%', padding: '4px 6px' }}
//                                     autoComplete="off"
//                                   />
//                                 </TableCell>
//                               );
//                             } else {
//                               // Not editing, show normal cell content
//                               // For password, show dots only
//                               if (key === 'password') {
//                                 return (
//                                   <TableCell
//                                     key={key}
//                                     align={align || 'center'}
//                                     sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
//                                   >
//                                     ••••••••
//                                   </TableCell>
//                                 );
//                               }
//                               return (
//                                 <TableCell
//                                   key={key}
//                                   align={align || 'center'}
//                                   sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
//                                 >
//                                   {client[key]}
//                                 </TableCell>
//                               );
//                             }
//                           })}

//                           <TableCell
//                             align="center"
//                             sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
//                           >
//                             {isEditing ? (
//                               <>
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   size="small"
//                                   onClick={handleSaveRow}
//                                   sx={{ mr: 1 }}
//                                 >
//                                   Save
//                                 </Button>
//                                 <Button
//                                   variant="outlined"
//                                   color="secondary"
//                                   size="small"
//                                   onClick={handleCancelEdit}
//                                 >
//                                   Cancel
//                                 </Button>
//                               </>
//                             ) : (
//                               <>
//                                 <IconButton
//                                   onClick={() => handleEditRow(client)}
//                                   aria-label="edit"
//                                   size="small"
//                                   color="primary"
//                                   disabled={!!editingRowId}
//                                 >
//                                   <EditIcon />
//                                 </IconButton>
//                                 <IconButton
//                                   onClick={() => handleDelete(client.id)}
//                                   aria-label="delete"
//                                   size="small"
//                                   color="error"
//                                   disabled={!!editingRowId}
//                                 >
//                                   <DeleteIcon />
//                                 </IconButton>
//                               </>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </>
//         ) : (
//           <Typography variant="body1" sx={{ mt: 4 }}>
//             No clients found.
//           </Typography>
//         )}

//         <Box sx={{ mt: 2 }}>
//           <Button variant="contained" color="primary" onClick={() => navigate('/addClient')}>
//             Add Client
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ClientsList;

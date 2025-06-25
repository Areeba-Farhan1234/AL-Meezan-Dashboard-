// import React, { useRef, useState } from 'react';
// import {
//   Container,
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TextField,
//   TableBody,
//   IconButton,
//   TableContainer,
//   Paper,
//   Button,
//   Grid,
//   MenuItem,
//   Select,
//   FormControl,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// // import { useNavigate } from 'react-router-dom';
// import { useClients, Client } from '../../context/ClientsContext';
// import axios from 'axios';

// import { v4 as uuidv4 } from 'uuid';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';

// interface ClientFormData {
//   name: string;
//   email: string;
//   vat_number: string;
//   ct_number: string;
//   password: string;
//   entity_type: string;
//   business_type: string;
//   emirates: string;
//   location: string;
//   upcoming_due: string;
//   company: string;
// }

// const Clients: React.FC = () => {
//   const { addClient } = useClients();
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [clientData, setClientData] = useState<ClientFormData>({
//     name: '',
//     email: '',
//     vat_number: '',
//     ct_number: '',
//     password: '',
//     entity_type: '',
//     business_type: '',
//     emirates: '',
//     location: '',
//     upcoming_due: '',
//     company: '',
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
//   ) => {
//     const { name, value } = e.target;
//     setClientData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newClient = {
//       ...clientData,
//       id: uuidv4(),
//     };

//     addClient(newClient);
//     navigate('/clients/all-clients');
//   };
//   const { clients, updateClient, setClients } = useClients();
//   // const navigate = useNavigate();

//   // Drag to scroll
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [scrollTop, setScrollTop] = useState(0);
//   // Editing state for single row - stores client ID or null
//   const [editingClientId, setEditingClientId] = useState<string | number | null>(null);
//   // Local copy of client being edited
//   const [editedClient, setEditedClient] = useState<Partial<Client>>({});

//   // const onMouseDown = (e: React.MouseEvent) => {
//   //   if (!containerRef.current) return;
//   //   setIsDragging(true);
//   //   setStartX(e.pageX - containerRef.current.offsetLeft);
//   //   setScrollLeft(containerRef.current.scrollLeft);
//   // };

//   const onMouseLeave = () => {
//     setIsDragging(false);
//   };

//   const onMouseUp = () => {
//     setIsDragging(false);
//   };

//   // const onMouseMove = (e: React.MouseEvent) => {
//   //   if (!isDragging || !containerRef.current) return;
//   //   e.preventDefault();
//   //   const x = e.pageX - containerRef.current.offsetLeft;
//   //   const walk = (x - startX) * 1; // scroll speed multiplier
//   //   containerRef.current.scrollLeft = scrollLeft - walk;
//   // };

//   const onMouseDown = (e: React.MouseEvent) => {
//     if (!containerRef.current) return;
//     setIsDragging(true);
//     setStartX(e.pageX - containerRef.current.offsetLeft);
//     setStartY(e.pageY - containerRef.current.offsetTop);
//     setScrollLeft(containerRef.current.scrollLeft);
//     setScrollTop(containerRef.current.scrollTop);
//   };

//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !containerRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - containerRef.current.offsetLeft;
//     const y = e.pageY - containerRef.current.offsetTop;
//     const walkX = (x - startX) * 1; // horizontal speed multiplier
//     const walkY = (y - startY) * 1; // vertical speed multiplier
//     containerRef.current.scrollLeft = scrollLeft - walkX;
//     containerRef.current.scrollTop = scrollTop - walkY;
//   };
//   // Start editing whole row
//   const handleEditRow = (client: Client) => {
//     setEditingClientId(client._id);
//     setEditedClient({ ...client }); // create a copy for editing
//   };

//   // Cancel editing
//   const handleCancelEdit = () => {
//     setEditingClientId(null);
//     setEditedClient({});
//   };

//   // Save whole row
//   const handleSaveRow = async () => {
//     if (editingClientId === null) return;
//     await updateClient(editingClientId, editedClient);
//     setEditingClientId(null);
//     setEditedClient({});
//   };

//   const handleDeleteClient = async (id: string | number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this client?');
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:5000/clients/${id}`);
//       setClients((prevClients) => prevClients.filter((client) => client._id !== id));
//     } catch (error) {
//       console.error('Error deleting client:', error);
//       alert('Failed to delete the client. Please try again.');
//     }
//   };

//   // Helper: Fields to display in table and their labels
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
//     <>
//       <Container maxWidth="md">
//         <Box
//           mt={4}
//           p={4}
//           sx={{
//             backgroundColor: '#fff',
//             borderRadius: 2,
//             boxShadow: 4,
//             // height: '600px',
//           }}
//         >
//           <Typography variant="h3" marginBottom="16px" gutterBottom>
//             Add New Client
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={4}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   placeholder="Name"
//                   type="name"
//                   variant="outlined"
//                   fullWidth
//                   name="name"
//                   value={clientData.name}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     style: {
//                       backgroundColor: theme.palette.info.main,
//                     },
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <Select
//                     name="entity_type"
//                     value={clientData.entity_type}
//                     onChange={handleChange}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Select Entity Type
//                     </MenuItem>
//                     <MenuItem value="Legal Person">Legal Person</MenuItem>
//                     <MenuItem value="Natural Person">Natural Person</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <Select
//                     name="business_type"
//                     value={clientData.business_type}
//                     onChange={handleChange}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Select Business Type
//                     </MenuItem>
//                     <MenuItem value="Jewellery">Jewellery</MenuItem>
//                     <MenuItem value="Real Estate">Real Estate</MenuItem>
//                     <MenuItem value="General Trading">General Trading</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <Select
//                     name="emirates"
//                     value={clientData.emirates}
//                     onChange={handleChange}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Select Emirates
//                     </MenuItem>
//                     <MenuItem value="Abu Dhabi">Abu Dhabi</MenuItem>
//                     <MenuItem value="Dubai">Dubai</MenuItem>
//                     <MenuItem value="Sharjah">Sharjah</MenuItem>
//                     <MenuItem value="Ajman">Ajman</MenuItem>
//                     <MenuItem value="Umm al Quwain">Umm al Quwain</MenuItem>
//                     <MenuItem value="Ras Al Khaimah">Ras Al Khaimah</MenuItem>
//                     <MenuItem value="Fujairah">Fujairah</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <Select
//                     placeholder="Location"
//                     name="location"
//                     value={clientData.location}
//                     onChange={handleChange}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Select Location
//                     </MenuItem>
//                     <MenuItem value="Free Zone">Free Zone</MenuItem>
//                     <MenuItem value="Main Land">Main Land</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   placeholder="VAT Number"
//                   variant="outlined"
//                   fullWidth
//                   type="text"
//                   name="vat_number"
//                   value={clientData.vat_number}
//                   onChange={handleChange}
//                   inputProps={{
//                     inputMode: 'numeric',
//                     pattern: '[0-9]*',
//                   }}
//                   required
//                   InputProps={{
//                     style: {
//                       backgroundColor: theme.palette.info.main,
//                     },
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   placeholder="CT Number"
//                   variant="outlined"
//                   fullWidth
//                   type="text"
//                   name="ct_number"
//                   value={clientData.ct_number}
//                   onChange={handleChange}
//                   inputProps={{
//                     inputMode: 'numeric',
//                     pattern: '[0-9]*',
//                   }}
//                   required
//                   InputProps={{
//                     style: {
//                       backgroundColor: theme.palette.info.main,
//                     },
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   placeholder="Email"
//                   variant="outlined"
//                   fullWidth
//                   type="email"
//                   name="email"
//                   value={clientData.email}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     style: {
//                       backgroundColor: theme.palette.info.main,
//                     },
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   placeholder="Password"
//                   type="text"
//                   variant="outlined"
//                   fullWidth
//                   name="password"
//                   value={clientData.password}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     style: {
//                       backgroundColor: theme.palette.info.main,
//                     },
//                   }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth required>
//                   <Select
//                     name="upcoming_due"
//                     value={clientData.upcoming_due}
//                     onChange={handleChange}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>
//                       Upcoming Due Dates
//                     </MenuItem>
//                     <MenuItem value="VAT Due">VAT Due</MenuItem>
//                     <MenuItem value="CT Due">CT Due</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   onClick={handleSubmit}
//                   variant="contained"
//                   type="submit"
//                   sx={{
//                     backgroundColor: 'primary.main',
//                     color: '#fff',
//                     '&:hover': {
//                       backgroundColor: '#fff',
//                       color: 'primary.main',
//                       border: '2px solid',
//                       borderColor: 'primary.main',
//                       boxShadow: 4,
//                     },
//                   }}
//                 >
//                   Add Client
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </Container>

//       <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
//         <Box>
//           <Typography variant="h3" marginBottom="16px" gutterBottom>
//             Clients List
//           </Typography>

//           {clients.length > 0 ? (
//             <>
//               <Box
//                 ref={containerRef}
//                 onMouseDown={onMouseDown}
//                 onMouseLeave={onMouseLeave}
//                 onMouseUp={onMouseUp}
//                 onMouseMove={onMouseMove}
//                 sx={{
//                   width: '100%',
//                   overflowX: 'auto',
//                   cursor: isDragging ? 'grabbing' : 'grab',
//                   userSelect: 'none',
//                   maxHeight: '500px',
//                   '&::-webkit-scrollbar': {
//                     height: 8,
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: '#ccc',
//                     borderRadius: 2,
//                   },
//                   '&::-webkit-scrollbar-thumb:hover': {
//                     backgroundColor: '#999',
//                   },
//                 }}
//               >
//                 <TableContainer
//                   component={Paper}
//                   sx={{
//                     minWidth: 1600,
//                     borderRadius: '2px',
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//                     backgroundColor: '#fff',
//                   }}
//                 >
//                   <Table sx={{ minWidth: 1600 }} aria-label="clients table" stickyHeader>
//                     <TableHead>
//                       <TableRow>
//                         {fields.map(({ label, key, align }) => (
//                           <TableCell
//                             key={key}
//                             align={align || 'center'}
//                             sx={{
//                               fontWeight: 700,
//                               color: '#2d2d63',
//                               backgroundColor: '#f9faff',
//                               fontSize: '14px',
//                               padding: '6px 10px',
//                               whiteSpace: 'nowrap',
//                               minWidth: key === 'upcoming_due' ? 140 : undefined,
//                             }}
//                           >
//                             {label}
//                           </TableCell>
//                         ))}
//                         <TableCell
//                           align="center"
//                           sx={{
//                             fontWeight: 400,
//                             color: '#2d2d63',
//                             backgroundColor: '#f9faff',
//                             padding: '6px 10px',
//                             whiteSpace: 'nowrap',
//                             minWidth: 140,
//                           }}
//                         >
//                           Actions
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {clients.map((client) => {
//                         const isEditing = editingClientId === client._id;

//                         return (
//                           <TableRow
//                             key={client._id}
//                             sx={{
//                               '&:hover': {
//                                 backgroundColor: '#f1f5ff',
//                               },
//                             }}
//                           >
//                             {fields.map(({ key, align }) => {
//                               if (key === 'password' && !isEditing) {
//                                 return (
//                                   <TableCell
//                                     key={key}
//                                     align={align || 'center'}
//                                     sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
//                                   >
//                                     {client[key]}
//                                   </TableCell>
//                                 );
//                               }

//                               return (
//                                 <TableCell
//                                   key={key}
//                                   align={align || 'center'}
//                                   sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
//                                 >
//                                   {isEditing ? (
//                                     <input
//                                       type={key === 'email' ? 'email' : 'text'}
//                                       value={
//                                         editedClient[key] !== undefined &&
//                                         editedClient[key] !== null
//                                           ? String(editedClient[key])
//                                           : ''
//                                       }
//                                       onChange={(e) =>
//                                         setEditedClient((prev) => ({
//                                           ...prev,
//                                           [key]: e.target.value,
//                                         }))
//                                       }
//                                       style={{
//                                         width: '100%',
//                                         border: '2px solid #413f91',
//                                         padding: '4px 6px',
//                                       }}
//                                       autoFocus={key === fields[0].key}
//                                       title={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                                     />
//                                   ) : (
//                                     client[key]
//                                   )}
//                                 </TableCell>
//                               );
//                             })}
//                             <TableCell
//                               align="center"
//                               sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
//                             >
//                               {isEditing ? (
//                                 <>
//                                   <Button
//                                     variant="contained"
//                                     color="primary"
//                                     size="small"
//                                     onClick={handleSaveRow}
//                                     sx={{ mr: 1 }}
//                                   >
//                                     Save
//                                   </Button>
//                                   <Button
//                                     variant="text"
//                                     color="secondary"
//                                     size="small"
//                                     onClick={handleCancelEdit}
//                                   >
//                                     Cancel
//                                   </Button>
//                                 </>
//                               ) : (
//                                 <>
//                                   <IconButton
//                                     onClick={() => handleEditRow(client)}
//                                     aria-label="edit"
//                                     size="small"
//                                     color="primary"
//                                     disabled={editingClientId !== null}
//                                   >
//                                     <EditIcon />
//                                   </IconButton>
//                                   <IconButton
//                                     aria-label="delete"
//                                     onClick={() => handleDeleteClient(client._id)}
//                                     disabled={editingClientId !== null} // prevent deletion while editing
//                                   >
//                                     <DeleteIcon />
//                                   </IconButton>
//                                 </>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Box>
//             </>
//           ) : (
//             <Typography variant="body1" sx={{ mt: 4 }}>
//               No clients found.
//             </Typography>
//           )}

//           {/* <Box sx={{ mt: 2 }}>
//           <Button variant="contained" color="primary" onClick={() => navigate('/clients/add-new')}>
//             Add Client
//           </Button>
//         </Box> */}
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default Clients;

import { FC } from 'react';

const UpcomingDeadlines: FC = () => {
  return <div>UpcomingDeadlines</div>;
};

export default UpcomingDeadlines;

// import React from 'react';
// import { useClients } from '../../context/ClientsContext';
// import { Container, Box, Typography, List, ListItem, Grid, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// const ClientsList: React.FC = () => {
//   const { clients } = useClients();

//   return (
//     <Container maxWidth="md">
//       <Box mt={4}>
//         <Typography variant="h4" gutterBottom>
//           Clients List
//         </Typography>

//         {clients.length > 0 ? (
//           <List>
//             {clients.map((client) => (
//               <ListItem key={client.id} disablePadding sx={{ mb: 2 }}>
//                 <Box
//                   component="div"
//                   sx={{
//                     width: '100%',
//                     p: 2,
//                     border: '1px solid #ccc',
//                     borderRadius: 2,
//                     boxShadow: 1,
//                     backgroundColor: '#fafafa',
//                   }}
//                 >
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {client.name}
//                   </Typography>
//                   <Grid container spacing={1}>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body2">Email: {client.email}</Typography>
//                       <Typography variant="body2">VAT Number: {client.vat_number}</Typography>
//                       <Typography variant="body2">CT Number: {client.ct_number}</Typography>
//                       <Typography variant="body2">Password: {client.password}</Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body2">Entity Type: {client.entity_type}</Typography>
//                       <Typography variant="body2">Business Type: {client.business_type}</Typography>
//                       <Typography variant="body2">Emirates: {client.emirates}</Typography>
//                       <Typography variant="body2">Location: {client.location}</Typography>
//                       <Typography variant="body2">Upcoming Due: {client.upcoming_due}</Typography>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </ListItem>
//             ))}
//           </List>
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
//             sx={{ textDecoration: 'none', color: '#fff' }}
//           >
//             Add New Client
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ClientsList;

// import React from 'react';
// import { useClients } from '../../context/ClientsContext';
// import { Container, Box, Typography, List, ListItem, Grid, Button, Stack } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';

// const ClientsList: React.FC = () => {
//   const { clients, deleteClient } = useClients(); // Assume deleteClient is available in context
//   const navigate = useNavigate();

//   const handleEdit = (id: string) => {
//     navigate(`/clients/add-new/${id}`);
//   };

//   const handleDelete = (id: string | number) => {
//     if (window.confirm('Are you sure you want to delete this client?')) {
//       deleteClient(id);
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Box mt={4}>
//         <Typography variant="h4" gutterBottom>
//           Clients List
//         </Typography>

//         {clients.length > 0 ? (
//           <List>
//             {clients.map((client) => (
//               <ListItem key={client.id} disablePadding sx={{ mb: 2 }}>
//                 <Box
//                   component="div"
//                   sx={{
//                     width: '100%',
//                     p: 2,
//                     border: '1px solid #ccc',
//                     borderRadius: 2,
//                     boxShadow: 1,
//                     backgroundColor: '#fafafa',
//                   }}
//                 >
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {client.name}
//                   </Typography>
//                   <Grid container spacing={1}>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body2">Email: {client.email}</Typography>
//                       <Typography variant="body2">VAT Number: {client.vat_number}</Typography>
//                       <Typography variant="body2">CT Number: {client.ct_number}</Typography>
//                       <Typography variant="body2">Password: {client.password}</Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body2">Entity Type: {client.entity_type}</Typography>
//                       <Typography variant="body2">Business Type: {client.business_type}</Typography>
//                       <Typography variant="body2">Emirates: {client.emirates}</Typography>
//                       <Typography variant="body2">Location: {client.location}</Typography>
//                       <Typography variant="body2">Upcoming Due: {client.upcoming_due}</Typography>
//                     </Grid>
//                   </Grid>
//                   <Stack direction="row" spacing={2} mt={2}>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => handleEdit(String(client.id))}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       onClick={() => handleDelete(client.id)}
//                     >
//                       Delete
//                     </Button>
//                   </Stack>
//                 </Box>
//               </ListItem>
//             ))}
//           </List>
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
//             sx={{ textDecoration: 'none', color: '#fff' }}
//           >
//             Add New Client
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ClientsList;

// import React from 'react';
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

//   const handleEdit = (id: string) => {
//     navigate(`/clients/add-new/${id}`);
//   };

//   const handleDelete = (id: string | number) => {
//     if (window.confirm('Are you sure you want to delete this client?')) {
//       deleteClient(id);
//     }
//   };

//   return (
//     <Container maxWidth="xl">
//       <Box mt={4}>
//         <Typography variant="h4" gutterBottom>
//           Clients List
//         </Typography>

//         {clients.length > 0 ? (
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>Name</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Entity Type</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Entered On</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Business Type</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Emirates</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Location</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>VAT Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong> CT Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Email</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Password</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Upcoming Due</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Action</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {clients.map((client) => (
//                   <TableRow key={client.id}>
//                     {/* <TableCell>{client.company}</TableCell> */}
//                     <TableCell>{client.name}</TableCell>
//                     {/* <TableCell>{client.entered_on}</TableCell> */}
//                     <TableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(String(client.id))}
//                         title="Edit Customer"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(client.id)}
//                         title="Delete Customer"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Typography variant="body1" color="text.secondary" mt={2}>
//             No clients found. Please add a new client.
//           </Typography>
//         )}

//         <Box mt={4}>
//           <Button variant="contained" color="primary" component={Link} to="/clients/add-new">
//             Add New Client
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ClientsList;

import React from 'react';
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

  const handleEdit = (id: string) => {
    navigate(`/clients/add-new/${id}`);
  };

  const handleDelete = (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient(id);
    }
  };

  return (
    // <Container maxWidth="xl">
    //   <Box mt={4}>
    //     <Typography variant="h4" gutterBottom>
    //       Clients List
    //     </Typography>

    //     {clients.length > 0 ? (
    //       <TableContainer component={Paper}>
    //         <Table>
    //           <TableHead>
    //             <TableRow>
    //               <TableCell>
    //                 <strong>Name</strong>
    //               </TableCell>
    //               <TableCell align="center">Entity Type</TableCell>
    //               <TableCell align="center">
    //                 <strong>Entered On</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>Business Type</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>Emirates</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>Location</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>VAT Number</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>CT Number</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>Email</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>Password</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>Upcoming Due</strong>
    //               </TableCell>
    //               <TableCell align="center">
    //                 <strong>Action</strong>
    //               </TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {clients.map((client) => (
    //               <TableRow key={client.id}>
    //                 <TableCell>{client.name}</TableCell>
    //                 <TableCell align="center">{client.entity_type}</TableCell>

    //                 <TableCell align="center">{client.business_type}</TableCell>
    //                 <TableCell align="center">{client.emirates}</TableCell>
    //                 <TableCell align="center">{client.location}</TableCell>
    //                 <TableCell align="center">{client.vat_number}</TableCell>
    //                 <TableCell align="center">{client.ct_number}</TableCell>
    //                 <TableCell align="center">{client.email}</TableCell>
    //                 <TableCell align="center">{client.password}</TableCell>
    //                 <TableCell align="center">{client.upcoming_due}</TableCell>
    //                 <TableCell align="center">
    //                   <IconButton
    //                     color="primary"
    //                     onClick={() => handleEdit(String(client.id))}
    //                     title="Edit Client"
    //                   >
    //                     <EditIcon />
    //                   </IconButton>
    //                   <IconButton
    //                     color="error"
    //                     onClick={() => handleDelete(client.id)}
    //                     title="Delete Client"
    //                   >
    //                     <DeleteIcon />
    //                   </IconButton>
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </TableContainer>
    //     ) : (
    //       <Typography variant="body1" color="text.secondary" mt={2}>
    //         No clients found. Please add a new client.
    //       </Typography>
    //     )}

    //     <Box mt={4}>
    //       <Button variant="contained" color="primary" component={Link} to="/clients/add-new">
    //         Add New Client
    //       </Button>
    //     </Box>
    //   </Box>
    // </Container>

    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2d2d63' }}>
          Clients List
        </Typography>

        {clients.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              backgroundColor: '#fff',
            }}
          >
            <Table sx={{ minWidth: 1600 }} aria-label="clients table">
              <TableHead>
                <TableRow>
                  {[
                    'Name',
                    'Entity Type',
                    'Entered On',
                    'Business Type',
                    'Emirates',
                    'Location',
                    'VAT Number',
                    'CT Number',
                    'Email',
                    'Password',
                    'Upcoming Due',
                    'Action',
                  ].map((head) => (
                    <TableCell
                      key={head}
                      align={head === 'Name' ? 'left' : 'center'}
                      sx={{
                        fontWeight: 400,
                        color: '#2d2d63',
                        backgroundColor: '#f9faff',
                        padding: '12px 16px',
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
                    <TableCell sx={{ padding: '12px 16px' }}>{client.name}</TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.entity_type}
                    </TableCell>

                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.business_type}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.emirates}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.location}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.vat_number}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.ct_number}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.email}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.password}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
                      {client.upcoming_due}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: '12px 16px' }}>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            sx={{ paddingX: 4, paddingY: 1.5, fontWeight: 600 }}
          >
            Add New Client
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClientsList;

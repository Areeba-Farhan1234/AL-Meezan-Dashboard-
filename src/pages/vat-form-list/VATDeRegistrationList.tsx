// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   Pagination,
//   Stack,
//   TextField,
//   IconButton,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';

// interface VatDeregForm {
//   _id: string;
//   clientname?: string;
//   email?: string;
//   BasisofDeregistration?: string;
//   returnperiod?: string;
//   entity_type?: string;
//   comment?: string;
//   approvaldate?: string;
// }

// const VatDeregistrationList: React.FC = () => {
//   const [data, setData] = useState<VatDeregForm[]>([]);
//   const [editRowId, setEditRowId] = useState<string | null>(null);
//   const [editFormData, setEditFormData] = useState<Partial<VatDeregForm>>({});
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const hasAutoScrolled = useRef(false);

//   const formatDate = (date: string) => {
//     return date ? new Date(date).toLocaleDateString('en-GB') : '';
//   };

//   const onMouseDown = (e: React.MouseEvent) => {
//     if (!containerRef.current) return;
//     setIsDragging(true);
//     setStartX(e.pageX - containerRef.current.offsetLeft);
//     setScrollLeft(containerRef.current.scrollLeft);
//   };

//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !containerRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - containerRef.current.offsetLeft;
//     const walk = x - startX;
//     containerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const onMouseUp = () => setIsDragging(false);
//   const onMouseLeave = () => setIsDragging(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (containerRef.current && !hasAutoScrolled.current) {
//       containerRef.current.scrollLeft = containerRef.current.scrollWidth;
//       hasAutoScrolled.current = true;
//     }
//   }, [data.length]);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get<VatDeregForm[]>('/dereg');
//       setData(res.data);
//     } catch (err) {
//       alert('Failed to fetch data');
//     }
//   };

//   const handleEdit = (item: VatDeregForm) => {
//     setEditRowId(item._id);
//     setEditFormData(item);
//   };

//   const handleCancel = () => {
//     setEditRowId(null);
//     setEditFormData({});
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`/dereg/${id}`);
//       alert('Record deleted successfully');
//       fetchData();
//     } catch (error) {
//       alert('Failed to delete record');
//     }
//   };
//   const handleSave = async (id: string) => {
//     try {
//       await axios.put(`/dereg/${id}`, editFormData);
//       alert('Record updated successfully');
//       fetchData();
//       setEditRowId(null);
//       setEditFormData({});
//     } catch (error) {
//       alert('Failed to update record');
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditFormData({ ...editFormData, [name]: value });
//   };

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   const startIndex = (page - 1) * itemsPerPage;
//   const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

//   const getValue = (field: keyof VatDeregForm) => editFormData[field] || '';

//   return (
//     <Container maxWidth="xl">
//       {/* Header */}
//       <Box mt={4} mb={2} display="flex" justifyContent="space-between">
//         <Typography variant="h3" marginBottom="16px" gutterBottom>
//           VAT Deregistration List
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={() => navigate('/vat/vat-de-registration')}
//           sx={{
//             backgroundColor: 'primary.main',
//             color: '#fff',
//             mr: 2,
//             '&:hover': {
//               backgroundColor: '#fff',
//               color: 'primary.main',
//               border: '1px solid',
//               borderColor: 'primary.main',
//               boxShadow: 4,
//             },
//           }}
//         >
//           + New Entry
//         </Button>
//       </Box>

//       {/* Table */}
//       <Box mt={5}>
//         <Typography variant="h5" gutterBottom>
//           Submitted VAT Deregistration Records
//         </Typography>

//         {currentItems.length === 0 ? (
//           <Typography>No records found.</Typography>
//         ) : (
//           <Box
//             ref={containerRef}
//             onMouseDown={onMouseDown}
//             onMouseMove={onMouseMove}
//             onMouseUp={onMouseUp}
//             onMouseLeave={onMouseLeave}
//             sx={{
//               overflowX: 'auto',
//               cursor: isDragging ? 'grabbing' : 'grab',
//               userSelect: 'none',
//               background: '#fff',
//               borderRadius: '8px',
//               padding: '16px',
//               border: '1px solid #ccc',
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
//             <table
//               style={{
//                 width: '1500px',
//                 minWidth: '1500px',
//                 borderCollapse: 'collapse',
//               }}
//             >
//               <thead>
//                 <tr style={{ background: '#f5f5f5' }}>
//                   {[
//                     'S.No',
//                     'Client Name',
//                     'Email',
//                     'Reason',
//                     'Return Period',
//                     'Entity Type',
//                     'Approval Date',
//                     'Comment',
//                     'Actions',
//                   ].map((header) => (
//                     <th
//                       key={header}
//                       style={{
//                         padding: '8px',
//                         borderBottom: '1px solid #ccc',
//                         textAlign: 'left',
//                         fontWeight: 'bold',
//                         fontSize: '14px',
//                       }}
//                     >
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr key={item._id}>
//                     <td style={cellStyle}>{startIndex + index + 1}</td>

//                     {editRowId === item._id ? (
//                       <>
//                         {[
//                           'clientname',
//                           'email',
//                           'BasisofDeregistration',
//                           'returnperiod',
//                           'entity_type',
//                           'approvaldate',
//                           'comment',
//                         ].map((field) => (
//                           <td key={field} style={cellStyle}>
//                             <TextField
//                               variant="standard"
//                               name={field}
//                               type={field === 'approvaldate' ? 'date' : 'text'}
//                               value={
//                                 field === 'approvaldate'
//                                   ? (getValue('approvaldate') as string)?.split('T')[0] || ''
//                                   : getValue(field as keyof VatDeregForm)
//                               }
//                               onChange={handleInputChange}
//                             />
//                           </td>
//                         ))}
//                       </>
//                     ) : (
//                       <>
//                         <td style={cellStyle}>{item.clientname}</td>
//                         <td style={cellStyle}>{item.email}</td>
//                         <td style={cellStyle}>{item.BasisofDeregistration}</td>
//                         <td style={cellStyle}>{item.returnperiod}</td>
//                         <td style={cellStyle}>{item.entity_type}</td>
//                         <td style={cellStyle}>{formatDate(item.approvaldate!)}</td>
//                         <td style={cellStyle}>{item.comment}</td>
//                       </>
//                     )}

//                     <td style={cellStyle}>
//                       {editRowId === item._id ? (
//                         <>
//                           <IconButton color="success" onClick={() => handleSave(item._id)}>
//                             <SaveIcon />
//                           </IconButton>
//                           <IconButton color="inherit" onClick={handleCancel}>
//                             <CancelIcon />
//                           </IconButton>
//                         </>
//                       ) : (
//                         <>
//                           <IconButton color="primary" onClick={() => handleEdit(item)}>
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton color="error" onClick={() => handleDelete(item._id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Box>
//         )}
//       </Box>

//       {/* Pagination */}
//       <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: 'primary.main',
//             color: '#fff',
//             mr: 2,
//             '&:hover': {
//               backgroundColor: '#fff',
//               color: 'primary.main',
//               border: '1px solid',
//               borderColor: 'primary.main',
//               boxShadow: 4,
//             },
//           }}
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           Previous
//         </Button>

//         <Stack spacing={2}>
//           <Pagination
//             count={Math.ceil(data.length / itemsPerPage)}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             shape="rounded"
//             size="large"
//           />
//         </Stack>

//         <Button
//           variant="contained"
//           sx={{
//             backgroundColor: 'primary.main',
//             color: '#fff',
//             mr: 2,
//             '&:hover': {
//               backgroundColor: '#fff',
//               color: 'primary.main',
//               border: '1px solid',
//               borderColor: 'primary.main',
//               boxShadow: 4,
//             },
//           }}
//           disabled={page >= Math.ceil(data.length / itemsPerPage)}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </Button>
//       </Box>

//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//         toastStyle={{
//           fontSize: '16px',
//           padding: '14px 20px',
//           borderRadius: '10px',
//           minWidth: '300px',
//         }}
//       />
//     </Container>
//   );
// };

// const cellStyle = {
//   padding: '8px',
//   borderBottom: '1px solid #ccc',
//   fontSize: '13px',
// };

// export default VatDeregistrationList;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  Pagination,
  Stack,
  TextField,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface VatDeregForm {
  _id: string;
  clientname?: string;
  email?: string;
  BasisofDeregistration?: string;
  returnperiod?: string;
  entity_type?: string;
  comment?: string;
  approvaldate?: string;
}

const VatDeregistrationList: React.FC = () => {
  const [data, setData] = useState<VatDeregForm[]>([]);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<VatDeregForm>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Drag Scroll
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolled = useRef(false);

  const formatDate = (date?: string) => {
    return date ? new Date(date).toLocaleDateString('en-GB') : '';
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (containerRef.current && !hasAutoScrolled.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
      hasAutoScrolled.current = true;
    }
  }, [data.length]);

  const fetchData = async () => {
    try {
      const res = await axios.get<VatDeregForm[]>('/dereg');
      setData(res.data);
    } catch (err) {
      toast.error('Failed to fetch data');
    }
  };

  const handleEdit = (item: VatDeregForm) => {
    setEditRowId(item._id);
    setEditFormData(item);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/dereg/${id}`);
      toast.success('Record deleted successfully');
      fetchData();
    } catch {
      toast.error('Failed to delete record');
    }
  };

  const handleSave = async (id: string) => {
    try {
      await axios.put(`/dereg/${id}`, editFormData);
      toast.success('Record updated successfully');
      fetchData();
      setEditRowId(null);
      setEditFormData({});
    } catch {
      toast.error('Failed to update record');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);
  const getValue = (field: keyof VatDeregForm) => editFormData[field] || '';

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box mt={4} mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h3" gutterBottom>
          VAT Deregistration List
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/vat/vat-de-registration')}
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#fff',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
              boxShadow: 4,
            },
          }}
        >
          + New Entry
        </Button>
      </Box>

      {/* Table */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Submitted VAT Deregistration Records
        </Typography>

        {currentItems.length === 0 ? (
          <Typography>No records found.</Typography>
        ) : (
          <Box
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            sx={{
              overflowX: 'auto',
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              background: '#fff',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #ccc',
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
            <table style={{ minWidth: '1500px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  {[
                    'S.No',
                    'Client Name',
                    'Email',
                    'Reason',
                    'Return Period',
                    'Entity Type',
                    'Approval Date',
                    'Comment',
                    'Actions',
                  ].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #ccc',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td style={cellStyle}>{startIndex + index + 1}</td>

                    {editRowId === item._id ? (
                      <>
                        {[
                          'clientname',
                          'email',
                          'BasisofDeregistration',
                          'returnperiod',
                          'entity_type',
                          'approvaldate',
                          'comment',
                        ].map((field) => (
                          <td key={field} style={cellStyle}>
                            <TextField
                              variant="standard"
                              name={field}
                              type={field === 'approvaldate' ? 'date' : 'text'}
                              value={
                                field === 'approvaldate'
                                  ? (getValue('approvaldate') as string)?.split('T')[0] || ''
                                  : getValue(field as keyof VatDeregForm)
                              }
                              onChange={handleInputChange}
                            />
                          </td>
                        ))}
                      </>
                    ) : (
                      <>
                        <td style={cellStyle}>{item.clientname}</td>
                        <td style={cellStyle}>{item.email}</td>
                        <td style={cellStyle}>{item.BasisofDeregistration}</td>
                        <td style={cellStyle}>{item.returnperiod}</td>
                        <td style={cellStyle}>{item.entity_type}</td>
                        <td style={cellStyle}>{formatDate(item.approvaldate)}</td>
                        <td style={cellStyle}>{item.comment}</td>
                      </>
                    )}

                    <td style={cellStyle}>
                      {editRowId === item._id ? (
                        <>
                          <IconButton color="success" onClick={() => handleSave(item._id)}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="inherit" onClick={handleCancel}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton color="primary" onClick={() => handleEdit(item)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(item._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </Box>

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#fff',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
              boxShadow: 4,
            },
          }}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Stack>

        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#fff',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
              boxShadow: 4,
            },
          }}
          disabled={page >= Math.ceil(data.length / itemsPerPage)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{
          fontSize: '16px',
          padding: '14px 20px',
          borderRadius: '10px',
          minWidth: '300px',
        }}
      />
    </Container>
  );
};

const cellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ccc',
  fontSize: '13px',
};

export default VatDeregistrationList;

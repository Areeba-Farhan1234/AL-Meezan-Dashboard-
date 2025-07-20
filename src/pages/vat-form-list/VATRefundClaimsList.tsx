// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Box,
//   Pagination,
//   Stack,
//   TextField,
//   IconButton,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';

// interface RefundClaim {
//   _id: string;
//   clientname: string;
//   refundperiod: string;
//   refundamount: string;
//   docstatus: string;
//   applicationsubmission: string;
//   approvaldate: string;
//   email: string;
//   password: string;
//   comment: string;
//   status: string;
// }

// const RefundClaimList: React.FC = () => {
//   const [data, setData] = useState<RefundClaim[]>([]);
//   const [editRowId, setEditRowId] = useState<string | null>(null);
//   const [editFormData, setEditFormData] = useState<Partial<RefundClaim>>({});
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();
//   const fetchData = async () => {
//     try {
//       const res = await axios.get<RefundClaim[]>('/refund');
//       setData(res.data);
//     } catch {
//       toast.error('Failed to fetch refund claims');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleEdit = (item: RefundClaim) => {
//     setEditRowId(item._id);
//     setEditFormData(item);
//   };

//   const handleCancel = () => {
//     setEditRowId(null);
//     setEditFormData({});
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`/refund/${id}`);
//       toast.success('Record deleted');
//       fetchData();
//     } catch {
//       toast.error('Delete failed');
//     }
//   };

//   const handleSave = async (id: string) => {
//     try {
//       await axios.put(`/refund/${id}`, editFormData);
//       toast.success('Record updated');
//       fetchData();
//       handleCancel();
//     } catch {
//       toast.error('Update failed');
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

//   const getValue = (field: keyof RefundClaim) => editFormData[field] || '';

//   return (
//     <Container maxWidth="xl">
//       <Box mt={4} mb={2} display="flex" justifyContent="space-between">
//         <Typography variant="h3" marginBottom="16px" gutterBottom>
//           Refund Claim List
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={() => navigate('/vat/vat-refund-claims')}
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

//       <Box mt={5}>
//         <Typography variant="h5" gutterBottom>
//           Submitted VAT Refund Records
//         </Typography>
//       </Box>
//       <Box sx={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', p: 2 }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ background: '#f5f5f5' }}>
//               {[
//                 'S.No',
//                 'Client Name',
//                 'Email',
//                 'Refund Period',
//                 'Amount',
//                 'Status',
//                 'Approval Date',
//                 'Comment',
//                 'Actions',
//               ].map((header) => (
//                 <th key={header} style={headerStyle}>
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item, index) => (
//               <tr key={item._id}>
//                 <td style={cellStyle}>{startIndex + index + 1}</td>
//                 {editRowId === item._id ? (
//                   <>
//                     {[
//                       'clientname',
//                       'email',
//                       'refundperiod',
//                       'refundamount',
//                       'status',
//                       'approvaldate',
//                       'comment',
//                     ].map((field) => (
//                       <td key={field} style={cellStyle}>
//                         <TextField
//                           variant="standard"
//                           name={field}
//                           value={getValue(field as keyof RefundClaim)}
//                           onChange={handleInputChange}
//                         />
//                       </td>
//                     ))}
//                   </>
//                 ) : (
//                   <>
//                     <td style={cellStyle}>{item.clientname}</td>
//                     <td style={cellStyle}>{item.email}</td>
//                     <td style={cellStyle}>{item.refundperiod}</td>
//                     <td style={cellStyle}>{item.refundamount}</td>
//                     <td style={cellStyle}>{item.status}</td>
//                     <td style={cellStyle}>{item.approvaldate}</td>
//                     <td style={cellStyle}>{item.comment}</td>
//                   </>
//                 )}
//                 <td style={cellStyle}>
//                   {editRowId === item._id ? (
//                     <>
//                       <IconButton color="success" onClick={() => handleSave(item._id)}>
//                         <SaveIcon />
//                       </IconButton>
//                       <IconButton onClick={handleCancel}>
//                         <CancelIcon />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <>
//                       <IconButton color="primary" onClick={() => handleEdit(item)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDelete(item._id)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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

//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </Container>
//   );
// };

// const headerStyle = {
//   padding: '8px',
//   borderBottom: '1px solid #ccc',
//   fontWeight: 'bold',
//   fontSize: '14px',
//   textAlign: 'left' as const,
// };

// const cellStyle = {
//   padding: '8px',
//   borderBottom: '1px solid #ccc',
//   fontSize: '13px',
// };

// export default RefundClaimList;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Pagination,
  Stack,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface RefundClaim {
  _id: string;
  clientname: string;
  refundperiod: string;
  refundamount: string;
  docstatus: string;
  applicationsubmission: string;
  approvaldate: string;
  email: string;
  password: string;
  comment: string;
  status: string;
}

const RefundClaimList: React.FC = () => {
  const [data, setData] = useState<RefundClaim[]>([]);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<RefundClaim>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolled = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get<RefundClaim[]>('/refund');
      setData(res.data);
    } catch {
      toast.error('Failed to fetch refund claims');
    }
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

  const handleEdit = (item: RefundClaim) => {
    setEditRowId(item._id);
    setEditFormData(item);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/refund/${id}`);
      toast.success('Record deleted');
      fetchData();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleSave = async (id: string) => {
    try {
      await axios.put(`/refund/${id}`, editFormData);
      toast.success('Record updated');
      fetchData();
      handleCancel();
    } catch {
      toast.error('Update failed');
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
  const getValue = (field: keyof RefundClaim) => editFormData[field] || '';

  return (
    <Container maxWidth="xl">
      <Box mt={4} mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h3" gutterBottom>
          Refund Claim List
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/vat/vat-refund-claims')}
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            mr: 2,
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

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Submitted VAT Refund Records
        </Typography>
      </Box>

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
          p: 2,
          border: '1px solid #ccc',
          '&::-webkit-scrollbar': { height: 8 },
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
                'Refund Period',
                'Amount',
                'Status',
                'Approval Date',
                'Comment',
                'Actions',
              ].map((header) => (
                <th key={header} style={headerStyle}>
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
                      'refundperiod',
                      'refundamount',
                      'status',
                      'approvaldate',
                      'comment',
                    ].map((field) => (
                      <td key={field} style={cellStyle}>
                        <TextField
                          variant="standard"
                          name={field}
                          value={getValue(field as keyof RefundClaim)}
                          onChange={handleInputChange}
                        />
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    <td style={cellStyle}>{item.clientname}</td>
                    <td style={cellStyle}>{item.email}</td>
                    <td style={cellStyle}>{item.refundperiod}</td>
                    <td style={cellStyle}>{item.refundamount}</td>
                    <td style={cellStyle}>{item.status}</td>
                    <td style={cellStyle}>{item.approvaldate}</td>
                    <td style={cellStyle}>{item.comment}</td>
                  </>
                )}
                <td style={cellStyle}>
                  {editRowId === item._id ? (
                    <>
                      <IconButton color="success" onClick={() => handleSave(item._id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancel}>
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

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            mr: 2,
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
            mr: 2,
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

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

const headerStyle = {
  padding: '8px',
  borderBottom: '1px solid #ccc',
  fontWeight: 'bold',
  fontSize: '14px',
  textAlign: 'left' as const,
};

const cellStyle = {
  padding: '8px',
  borderBottom: '1px solid #ccc',
  fontSize: '13px',
};

export default RefundClaimList;

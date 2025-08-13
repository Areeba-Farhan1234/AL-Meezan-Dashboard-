import React, { useEffect, useState, useRef } from 'react';
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
import { VatForm } from 'context/VATContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNotifications } from 'context/Notification';
import { Timestamp } from 'firebase/firestore';

const VatRegistrationList: React.FC = () => {
  const [data, setData] = useState<VatForm[]>([]);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<VatForm>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    document.body.classList.add('dragging');
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
    const walkX = x - startX;
    const walkY = y - startY;
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const onMouseUp = () => {
    setIsDragging(false);
    document.body.classList.remove('dragging');
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    document.body.classList.remove('dragging');
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    if (containerRef.current && !hasAutoScrolled.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
      hasAutoScrolled.current = true;
    }
  }, [data.length]);

  const formatDate = (date?: string) => {
    return date ? new Date(date).toLocaleDateString('en-GB') : '';
  };

  const { addNotification } = useNotifications();

  useEffect(() => {
    data.forEach((item) => {
      if (!item.approvaldate) return;

      const expiryDate = new Date(item.approvaldate);
      const today = new Date();
      const timeDiff = expiryDate.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysLeft <= 7 && daysLeft >= 0) {
        addNotification({
          message: `VAT for ${item.clientname} is expiring in ${daysLeft} day(s)!`,
          createdAt: Timestamp.fromDate(new Date()),
          seen: false, // ✅ Add this if your Notification type expects it
        });
      }
    });
  }, [data]);

  const fetchData = async () => {
    try {
      const res = await axios.get<VatForm[]>('http://localhost:5000/vat');
      setData(res.data);
    } catch (err) {
      toast.error('Failed to fetch data');
    }
  };

  const handleEdit = (item: VatForm) => {
    setEditRowId(item._id);
    setEditFormData(item);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditFormData({});
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/vat/${id}`);
      toast.success('Record deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete record');
    }
  };

  const handleSave = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/vat/${id}`, editFormData);
      toast.success('Record updated successfully');
      fetchData();
      setEditRowId(null);
      setEditFormData({});
    } catch (error) {
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

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const getValue = (field: keyof VatForm) => editFormData[field] || '';

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box mt={4} mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h3" marginBottom="16px" gutterBottom>
          VAT Registration List
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/vat/vat-registration')}
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

      {/* Table */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Submitted VAT Registration Records
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
              width: '100%',
              background: '#fff',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #ccc',
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
            <table style={{ minWidth: '1200px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  {[
                    'S.No',
                    'Client Name',
                    'Email',
                    'Threshold',
                    'Approval Date',
                    'Return Period',
                    'Entity Type',
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
                          'threshold',
                          'approvaldate',
                          'returnperiod',
                          'entity_type',
                          'comment',
                        ].map((field) => (
                          <td key={field} style={cellStyle}>
                            <TextField
                              variant="standard"
                              name={field}
                              value={getValue(field as keyof VatForm)}
                              onChange={handleInputChange}
                            />
                          </td>
                        ))}
                      </>
                    ) : (
                      <>
                        <td style={cellStyle}>{item.clientname}</td>
                        <td style={cellStyle}>{item.email}</td>
                        <td style={cellStyle}>{item.threshold}</td>
                        <td style={cellStyle}>{formatDate(item.approvaldate)}</td>
                        <td style={cellStyle}>{item.returnperiod}</td>
                        <td style={cellStyle}>{item.entity_type}</td>
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

export default VatRegistrationList;

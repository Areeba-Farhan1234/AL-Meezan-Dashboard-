import React, { useEffect, useState } from 'react';
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

const VatRegistrationList: React.FC = () => {
  const [data, setData] = useState<VatForm[]>([]);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<VatForm>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const formatDate = (date?: string) => {
    return date ? new Date(date).toLocaleDateString('en-GB') : '';
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Typography variant="h5">VAT Clients List</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/vat/vat-registration')}
          sx={{ background: '#3e4095' }}
        >
          + New Entry
        </Button>
      </Box>

      {/* Table */}
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Submitted VAT Records
        </Typography>

        {currentItems.length === 0 ? (
          <Typography>No records found.</Typography>
        ) : (
          <Box sx={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', padding: '16px' }}>
            <table style={{ width: '1200px', minWidth: '1200px', borderCollapse: 'collapse' }}>
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
          sx={{ background: '#3e4095' }}
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
          sx={{ background: '#3e4095' }}
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

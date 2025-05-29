import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  TextField,
  Container,
  Grid,
  Select,
  Typography,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { VatForm } from 'context/VATContext';

const VatRegistration: React.FC = () => {
  const [data, setData] = useState<VatForm[]>([]);
  const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);
  const [emailError, setEmailError] = useState('');
  const [filter, setFilter] = useState({ clientname: '', from: '', to: '', reportType: '' });

  const [formDetail, setFormDetail] = useState({
    clientname: '',
    threshold: '',
    docstatus: '',
    approvaldate: '',
    returnperiod: '',
    email: '',
    password: '',
    comment: '',
    entity_type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formDetail,
      approvaldate: approvalDate ? approvalDate.format('YYYY-MM-DD') : '',
    };

    try {
      const res = await axios.post('http://localhost:5000/vat', dataToSubmit);
      alert('Client registered successfully!');
      console.log(res.data);
      fetchData();

      setFormDetail({
        clientname: '',
        threshold: '',
        docstatus: '',
        approvaldate: '',
        returnperiod: '',
        email: '',
        password: '',
        comment: '',
        entity_type: '',
      });
      setApprovalDate(null);
      setEmailError('');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Submission failed.');
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get<VatForm[]>('http://localhost:5000/vat');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchClient = item.Vatname?.toLowerCase().includes(filter.clientname.toLowerCase());
    const matchType = filter.reportType ? item.entity_type === filter.reportType : true;
    const matchFrom = filter.from
      ? new Date(item.approvaldate || '') >= new Date(filter.from)
      : true;
    const matchTo = filter.to ? new Date(item.approvaldate || '') <= new Date(filter.to) : true;
    return matchClient && matchType && matchFrom && matchTo;
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
    XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
  };

  const exportToCSV = () => {
    const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(filteredData));
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'VAT_Clients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Client Name', 'Email', 'Threshold']],
      body: filteredData.map((d) => [d.Vatname || '', d.email || '', d.threshold || '']),
    });
    doc.save('VAT_Clients.pdf');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
          VAT Registration
        </Typography>

        {/* Filter Section */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Filter VAT Clients
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Client Name"
                name="clientname"
                value={filter.clientname}
                onChange={(e) => setFilter({ ...filter, clientname: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  value={filter.from ? dayjs(filter.from) : null}
                  onChange={(date) =>
                    setFilter((prev) => ({ ...prev, from: date?.format('YYYY-MM-DD') || '' }))
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  value={filter.to ? dayjs(filter.to) : null}
                  onChange={(date) =>
                    setFilter((prev) => ({ ...prev, to: date?.format('YYYY-MM-DD') || '' }))
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={filter.reportType}
                  onChange={(e) => setFilter({ ...filter, reportType: e.target.value })}
                >
                  <MenuItem value="">Select Report Type</MenuItem>
                  <MenuItem value="Voluntary">Voluntary</MenuItem>
                  <MenuItem value="Mandatory">Mandatory</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle1">Filtered Results: {filteredData.length}</Typography>
              <ul>
                {filteredData.map((client, idx) => (
                  <li key={idx}>
                    {client.Vatname} — {client.threshold}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Box>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client Name"
                name="clientname"
                value={formDetail.clientname}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="threshold"
                  value={formDetail.threshold}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Threshold
                  </MenuItem>
                  <MenuItem value="Voluntary">Voluntary</MenuItem>
                  <MenuItem value="Mandatory">Mandatory</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="docstatus"
                  value={formDetail.docstatus}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Document Status
                  </MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Received">Received</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Approval Date"
                  value={approvalDate}
                  onChange={(newValue) => {
                    setApprovalDate(newValue);
                    setFormDetail((prev) => ({
                      ...prev,
                      approvaldate: newValue ? newValue.format('YYYY-MM-DD') : '',
                    }));
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Return Period"
                name="returnperiod"
                value={formDetail.returnperiod}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formDetail.email}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(e);
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setEmailError(value && !emailPattern.test(value) ? 'Invalid email address' : '');
                }}
                fullWidth
                required
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formDetail.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Comment"
                name="comment"
                value={formDetail.comment}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Button variant="contained" onClick={exportToCSV} sx={{ mr: 2 }}>
                Export CSV
              </Button>
              <Button variant="contained" onClick={exportToExcel} sx={{ mr: 2 }}>
                Export Excel
              </Button>
              <Button variant="contained" onClick={exportToPDF} sx={{ mr: 2 }}>
                Export PDF
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default VatRegistration;

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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { useTheme } from '@mui/material/styles';
import autoTable from 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VatForm } from 'context/VATContext';
import { useNavigate } from 'react-router-dom';

const VatRegistration: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState<VatForm[]>([]);
  const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);

  const [timeRange, setTimeRange] = useState<'3months' | 'all'>('3months');

  const [filter, setFilter] = useState({
    clientname: '',
    from: '',
    to: '',
    threshold: '',
  });

  const [formDetail, setFormDetail] = useState({
    clientname: '',
    threshold: '',
    docstatus: '',
    approvaldate: '',
    returnperiod: '',
    email: '',
    password: '',
    comment: '',
    from: '',
    to: '',
    entity_type: '',
  });

  const navigate = useNavigate();

  // ✅ Handlers
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

    if (!approvalDate) {
      toast.error('Please select Approval Date');
      return;
    }

    const dataToSubmit = {
      ...formDetail,
      approvaldate: approvalDate.format('YYYY-MM-DD'),
    };

    try {
      await axios.post('/vat', dataToSubmit);
      toast.success('Client has been registered successfully!');
      navigate('/vat/vat-registration');

      try {
        await axios.post('/sendEmail', {
          to: formDetail.email,
          subject: 'Welcome to VAT Registration',
          text: `Hi ${formDetail.clientname}, your VAT registration is complete.`,
        });
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
        toast.warn('Client registered, but email failed to send.');
      }

      setFormDetail({
        clientname: '',
        threshold: '',
        docstatus: '',
        approvaldate: '',
        returnperiod: '',
        email: '',
        password: '',
        comment: '',
        from: '',
        to: '',
        entity_type: '',
      });
      setApprovalDate(null);

      fetchData();
    } catch (err) {
      console.error('❌ Error submitting form:', err);
      toast.error('Submission failed!');
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

  // ✅ Filter Logic
  const filteredData = data.filter((item) => {
    const itemClient = item.clientname?.toLowerCase() || '';
    const itemThreshold = item.threshold?.toLowerCase() || '';
    const itemDate = item.approvaldate ? new Date(item.approvaldate) : null;

    const fromDate =
      timeRange === '3months'
        ? dayjs().subtract(3, 'month').toDate()
        : filter.from
          ? new Date(filter.from)
          : null;

    const toDate = filter.to ? new Date(filter.to) : null;

    const matchClient = filter.clientname
      ? itemClient.includes(filter.clientname.toLowerCase())
      : true;

    const matchThreshold = filter.threshold
      ? itemThreshold === filter.threshold.toLowerCase()
      : true;

    const matchFrom = fromDate ? (itemDate ? itemDate >= fromDate : false) : true;
    const matchTo = toDate ? (itemDate ? itemDate <= toDate : false) : true;

    return matchClient && matchThreshold && matchFrom && matchTo;
  });

  // ✅ Export Handlers
  const exportToExcel = () => {
    const dataWithSerial = filteredData.map((item, index) => ({
      ID: index + 1,
      ClientName: item.clientname,
      Email: item.email,
      Threshold: item.threshold,
      ApprovalDate: item.approvaldate,
      ReturnPeriod: item.returnperiod,
      EntityType: item.entity_type,
      Comment: item.comment,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
    XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
    toast.success('Excel downloaded!');
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'VAT_Clients.csv';
    link.click();
    toast.success('CSV downloaded!');
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });

    autoTable(doc, {
      head: [
        [
          'S.No',
          'Client Name',
          'Email',
          'Threshold',
          'Approval Date',
          'Return Period',
          'Entity Type',
          'Comment',
        ],
      ],
      body: filteredData.map((item, i) => [
        i + 1,
        item.clientname || '',
        item.email || '',
        item.threshold || '',
        item.approvaldate || '',
        item.returnperiod || '',
        item.entity_type || '',
        item.comment || '',
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 92, 184] },
      margin: { top: 20 },
    });

    doc.save('VAT_Clients.pdf');
    toast.success('PDF downloaded!');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h3" marginBottom="10px" gutterBottom>
          VAT Registration
        </Typography>

        {/* Filter Section */}
        <Box mb={4}>
          <Typography variant="h6" mb={2}>
            Filter VAT Clients
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                placeholder="Client Name"
                name="clientname"
                value={filter.clientname}
                onChange={(e) => setFilter({ ...filter, clientname: e.target.value })}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={filter.from ? dayjs(filter.from) : null}
                  onChange={(date) =>
                    setFilter({ ...filter, from: date ? date.format('YYYY-MM-DD') : '' })
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        style: {
                          color: '#3e4095',
                          fontWeight: '500',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={filter.to ? dayjs(filter.to) : null}
                  onChange={(date) => setFilter({ ...filter, to: date ? date.toISOString() : '' })}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        style: {
                          color: '#3e4095',
                          fontWeight: '500',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Select
                  value={filter.threshold}
                  onChange={(e) => setFilter({ ...filter, threshold: e.target.value })}
                  displayEmpty
                >
                  <MenuItem value="">All Thresholds</MenuItem>
                  <MenuItem value="Voluntary">Voluntary</MenuItem>
                  <MenuItem value="Mandatory">Mandatory</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle1">Filtered Results: {filteredData.length}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Client Name"
                name="clientname"
                value={formDetail.clientname}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
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
                  value={approvalDate}
                  onChange={(newDate) => setApprovalDate(newDate)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        style: {
                          color: '#3e4095',
                          fontWeight: '500',
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Return Period"
                name="returnperiod"
                value={formDetail.returnperiod}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Email"
                name="email"
                type="email"
                value={formDetail.email}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Password"
                name="password"
                value={formDetail.password}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Comment"
                name="comment"
                value={formDetail.comment}
                onChange={handleChange}
                fullWidth
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as '3months' | 'all')}
                  displayEmpty
                >
                  <MenuItem value="3months">Last 3 Months</MenuItem>
                  <MenuItem value="all">All</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <Select
                  name="entity_type"
                  value={formDetail.entity_type}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Entity Type
                  </MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Individual">Individual</MenuItem>
                  <MenuItem value="Partnership">Partnership</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Button
                variant="contained"
                onClick={exportToCSV}
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#fff',
                  mr: 2,
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: 4,
                  },
                }}
              >
                Export CSV
              </Button>
              <Button
                variant="contained"
                onClick={exportToExcel}
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#fff',
                  mr: 2,
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: 4,
                  },
                }}
              >
                Export Excel
              </Button>
              <Button
                variant="contained"
                onClick={exportToPDF}
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#fff',
                  mr: 2,
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: 4,
                  },
                }}
              >
                Export PDF
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'primary.main',
                  color: '#fff',

                  '&:hover': {
                    backgroundColor: '#fff',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: 4,
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </Container>
  );
};

export default VatRegistration;

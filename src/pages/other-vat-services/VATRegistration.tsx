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
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { VatForm } from 'context/VATContext';

const VatRegistration: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState<VatForm[]>([]);
  const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);
  const [filter, setFilter] = useState({ clientname: '', from: '', to: '', reportType: '' });
  const [timeRange, setTimeRange] = useState<'3months' | 'all'>('3months');

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
    theme: '',
    vatname: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Format approvalDate safely
  //   const formattedApprovalDate = approvalDate ? approvalDate.format('YYYY-MM-DD') : '';
  //   const dataToSubmit = {
  //     approvaldate: formattedApprovalDate,
  //   };

  //   try {
  //     const res = await axios.post('http://localhost:5000/vat', dataToSubmit);

  //     alert('Client registered successfully!');
  //     console.log(res.data);
  //     fetchData();

  //     setFormDetail({
  //       clientname: '',
  //       threshold: '',
  //       docstatus: '',
  //       approvaldate: '',
  //       returnperiod: '',
  //       email: '',
  //       password: '',
  //       comment: '',
  //       entity_type: '',
  //     });
  //     setApprovalDate(null);
  //   } catch (err) {
  //     console.error('Error submitting form:', err);
  //     alert('Submission failed.');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedApprovalDate = approvalDate ? approvalDate.format('YYYY-MM-DD') : '';

    const dataToSubmit = {
      ...formDetail,
      approvaldate: formattedApprovalDate,
    };

    try {
      const res = await axios.post('/vat', dataToSubmit);
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
        theme: '',
        vatname: '',
      });
      setApprovalDate(null);
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
    const matchClient = item.clientname?.toLowerCase().includes(filter.clientname.toLowerCase());
    const matchType = filter.reportType ? item.entity_type === filter.reportType : true;

    const fromDate = filter.from ? new Date(filter.from) : null;
    let toDate: Date | null = null;

    if (filter.to) {
      // If both from and to are provided
      toDate = new Date(filter.to);
    } else if (fromDate) {
      // If only from is provided, add 1 month
      toDate = new Date(fromDate);
      toDate.setMonth(toDate.getMonth() + 1);
    }

    const itemDate = new Date(item.approvaldate || '');

    const matchFrom = fromDate ? itemDate >= fromDate : true;
    const matchTo = toDate ? itemDate <= toDate : true;

    return matchClient && matchType && matchFrom && matchTo;
  });

  const exportToExcel = () => {
    const dataWithSerial = filteredData.map((item, index) => ({
      ID: index + 1,
      ClientName: item.clientname || '',
      Email: item.email || '',
      Threshold: item.threshold || '',
      ApprovalDate: item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
      ReturnPeriod: item.returnperiod || '',
      EntityType: item.entity_type || '',
      Comment: item.comment || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
    XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
  };

  const exportToCSV = () => {
    const dataWithSerial = filteredData.map((item, index) => ({
      ID: index + 1,
      ClientName: item.clientname || '',
      Email: item.email || '',
      Threshold: item.threshold || '',
      ApprovalDate: item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
      ReturnPeriod: item.returnperiod || '',
      EntityType: item.entity_type || '',
      Comment: item.comment || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'VAT_Clients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });

    autoTable(doc, {
      head: [
        [
          'S. No.',
          'Client Name',
          'Email',
          'Threshold',
          'Approval Date',
          'Return Period',
          'Entity Type',
          'Comment',
        ],
      ],
      body: filteredData.map((item, index) => [
        index + 1,
        item.clientname || '',
        item.email || '',
        item.threshold || '',
        item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
        item.returnperiod || '',
        item.entity_type || '',
        item.comment || '',
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
      margin: { top: 20 },
    });

    doc.save('VAT_Clients.pdf');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h3" marginBottom="10px" gutterBottom>
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
                    {client.clientname} — {client.threshold}
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
                type="password"
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
    </Container>
  );
};

export default VatRegistration;

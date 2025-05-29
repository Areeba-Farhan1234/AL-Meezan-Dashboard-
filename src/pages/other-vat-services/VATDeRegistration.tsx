import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';

type VATReport = {
  clientname: string;
  reportType: string;
  date: string;
  status: string;
};

const VATDeRegistration: React.FC = () => {
  const theme = useTheme();

  const [filters, setFilters] = useState({
    clientname: '',
    reportType: 'VAT',
    fromDate: null as Dayjs | null,
    toDate: null as Dayjs | null,
  });

  const getExportData = () => {
    return filteredData.map((row) => ({
      ...row,
      Threshold: formDereg.threshold,
      Status: formDereg.docstatus,
      ReturnPeriod: formDereg.returnperiod,
      Email: formDereg.email,
      Comment: formDereg.comment,
    }));
  };
  const [formDereg, setFormDereg] = useState({
    threshold: '',
    docstatus: '',
    returnperiod: '',
    email: '',
    password: '',
    comment: '',
  });
  const [reportData, setReportData] = useState<VATReport[]>([]);
  const [emailError, setEmailError] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (key: 'fromDate' | 'toDate', date: Dayjs | null) => {
    setFilters((prev) => ({ ...prev, [key]: date }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDereg({ ...formDereg, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormDereg({ ...formDereg, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/vat-deregistration', {
        ...formDereg,
        ...filters,
        fromDate: filters.fromDate?.format('YYYY-MM-DD') || '',
        toDate: filters.toDate?.format('YYYY-MM-DD') || '',
      });

      if (response.data && Array.isArray(response.data)) {
        setReportData(response.data); // Yahan data set ho raha hai kya?
      } else {
        setReportData([]);
        console.warn('Unexpected response:', response.data);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const filteredData = reportData.filter((item) => {
    const itemDate = dayjs(item.date);
    const from = filters.fromDate;
    const to = filters.toDate;

    return (
      (!filters.clientname ||
        item.clientname.toLowerCase().includes(filters.clientname.toLowerCase())) &&
      (!from || itemDate.isAfter(from.subtract(1, 'day'))) &&
      (!to || itemDate.isBefore(to.add(1, 'day')))
    );
  });

  const exportToExcel = () => {
    setTimeout(() => {
      const exportData = getExportData();
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Reports');
      XLSX.writeFile(workbook, 'VAT_Report.xlsx');
    }, 100);
  };

  const exportToCSV = () => {
    setTimeout(() => {
      const exportData = getExportData();
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'VAT_Report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 100);
  };

  // const exportToPDF = () => {
  //   setTimeout(() => {
  //     const input = document.getElementById('reportTable');
  //     if (!input) return;
  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       const imgProps = jsPDF.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //       pdf.save('VATDeReg_Report.pdf');
  //     });
  //   }, 100);
  // };

  const exportToPDF = () => {
    setTimeout(() => {
      const input = document.getElementById('reportTable');
      if (!input) return;

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // @ts-ignore - Ignore TS error for getImageProperties
        const imgProps = jsPDF.getImageProperties(imgData);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('VATDeReg_Report.pdf');
      });
    }, 100);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          VAT Deregistration
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter Client Name"
                name="clientname"
                value={filters.clientname}
                onChange={handleFilterChange}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="threshold"
                  value={formDereg.threshold}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Basis of De-Registration
                  </MenuItem>
                  <MenuItem value="Legal Person">No longer making taxable supplies</MenuItem>
                  <MenuItem value="Natural Person">
                    Making taxable supplies, but under threshold
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="docstatus"
                  value={formDereg.docstatus}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Status
                  </MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Submitted">Submitted</MenuItem>
                  <MenuItem value="UnderReview">Under Review</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                  <MenuItem value="Resubmission">Resubmission</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={filters.fromDate}
                  onChange={(date) => handleDateChange('fromDate', date)}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To Date"
                  value={filters.toDate}
                  onChange={(date) => handleDateChange('toDate', date)}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="First Return Period"
                name="returnperiod"
                value={formDereg.returnperiod}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Email"
                type="email"
                name="email"
                value={formDereg.email}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(e);
                  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setEmailError(value && !pattern.test(value) ? 'Invalid email address' : '');
                }}
                fullWidth
                required
                error={Boolean(emailError)}
                helperText={emailError}
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Enter Password"
                type="password"
                name="password"
                value={formDereg.password}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                placeholder="Enter Comment"
                name="comment"
                value={formDereg.comment}
                onChange={handleChange}
                fullWidth
                required
                multiline
                minRows={3}
                InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit Form
              </Button>
              <Button variant="contained" onClick={exportToCSV}>
                Export CSV
              </Button>
              <Button variant="contained" onClick={exportToExcel}>
                Export Excel
              </Button>
              <Button variant="contained" onClick={exportToPDF}>
                Export PDF
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box id="reportTable" mt={3}>
        <table width="100%" border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Report Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.clientname}</td>
                <td>{row.reportType}</td>
                <td>{row.date}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Container>
  );
};

export default VATDeRegistration;

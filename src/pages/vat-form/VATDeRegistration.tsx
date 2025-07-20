import React, { useState } from 'react';
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
import { useTheme } from '@mui/material/styles';
import { Dayjs } from 'dayjs';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useVatDereg } from 'context/VATDeregContext';

const VatDeRegistration: React.FC = () => {
  const theme = useTheme();
  const { vatDeregList, fetchVatDeregList } = useVatDereg();
  const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);

  const [formDetail, setFormDetail] = useState({
    clientname: '',
    BasisofDeregistration: '',
    docstatus: '',
    returnperiod: '',
    email: '',
    password: '',
    comment: '',
    entity_type: '',
    submissionDate: '',
    status: '',
    approvaldate: '',
    reportType: '',
    fromDate: null as Dayjs | null,
    toDate: null as Dayjs | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleFromDateChange = (date: Dayjs | null) => {
    setFormDetail((prev) => ({ ...prev, fromDate: date }));
  };

  const handleToDateChange = (date: Dayjs | null) => {
    setFormDetail((prev) => ({ ...prev, toDate: date }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const dataToSubmit = {
  //     ...formDetail,
  //     approvaldate: approvalDate ? approvalDate.format('YYYY-MM-DD') : '',
  //   };

  //   try {
  //     await axios.post('http://localhost:5000/vat-deregistration', dataToSubmit);
  //     alert('Client registered successfully!');
  //     fetchVatDeregList();
  //     setFormDetail({
  //       clientname: '',
  //       BasisofDeregistration: '',
  //       docstatus: '',
  //       returnperiod: '',
  //       email: '',
  //       password: '',
  //       comment: '',
  //       entity_type: '',
  //       submissionDate: '',
  //       status: '',
  //       approvaldate: '',
  //       reportType: '',
  //       fromDate: null,
  //       toDate: null,
  //     });
  //     setApprovalDate(null);
  //     setEmailError('');
  //   } catch (err) {
  //     console.error('Error submitting form:', err);
  //     alert('Submission failed.');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formDetail,
      approvaldate: approvalDate ? approvalDate.format('YYYY-MM-DD') : '',
    };

    try {
      // Save client to DB
      await axios.post('/dereg', dataToSubmit);

      fetchVatDeregList();

      // Send email
      const emailResponse = await axios.post('/sendEmail', {
        to: formDetail.email,
        subject: 'VAT Deregistration Submitted',
        text: `Dear ${formDetail.clientname}, your VAT deregistration has been successfully submitted.`,
      });

      if (emailResponse.status === 200) {
        alert('Client registered and email sent successfully!');
      } else {
        alert('Client registered, but email failed to send.');
      }

      // Reset form
      setFormDetail({
        clientname: '',
        BasisofDeregistration: '',
        docstatus: '',
        returnperiod: '',
        email: '',
        password: '',
        comment: '',
        entity_type: '',
        submissionDate: '',
        status: '',
        approvaldate: '',
        reportType: '',
        fromDate: null,
        toDate: null,
      });
      setApprovalDate(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Submission failed.');
    }
  };

  const filteredData = vatDeregList.filter((item) => {
    const matchClient = item.clientname
      ?.toLowerCase()
      .includes(formDetail.clientname.toLowerCase());
    const matchType = formDetail.reportType ? item.entity_type === formDetail.reportType : true;
    const matchFrom = formDetail.fromDate
      ? new Date(item.approvaldate || '') >= new Date(formDetail.fromDate.toISOString())
      : true;
    const matchTo = formDetail.toDate
      ? new Date(item.approvaldate || '') <= new Date(formDetail.toDate.toISOString())
      : true;
    return matchClient && matchType && matchFrom && matchTo;
  });

  const exportToExcel = () => {
    const dataWithSerial = filteredData.map((item, index) => ({
      ID: index + 1,
      clientname: item.clientname,
      Email: item.email,
      BasisofDeregistration: item.BasisofDeregistration,
      ApprovalDate: item.approvaldate,
      ReturnPeriod: item.returnperiod,
      EntityType: item.entity_type,
      Comment: item.comment,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
    XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
  };

  const exportToCSV = () => {
    const dataWithSerial = filteredData.map((item, index) => ({
      ID: index + 1,
      clientname: item.clientname,
      Email: item.email,
      BasisofDeregistration: item.BasisofDeregistration,
      ApprovalDate: item.approvaldate,
      ReturnPeriod: item.returnperiod,
      EntityType: item.entity_type,
      Comment: item.comment,
    }));
    const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(dataWithSerial));
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
      head: [['S. No.', 'Client Name', 'Email', 'BasisofDeregistration', 'Report Type']],
      body: filteredData.map((item, index) => [
        index + 1,
        item.clientname || '',
        item.email || '',
        item.BasisofDeregistration || '',
        item.entity_type || '',
      ]),
    });
    doc.save('VAT_Clients.pdf');
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={6} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          VAT Deregistration
        </Typography>
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
                  name="BasisofDeregistration"
                  value={formDetail.BasisofDeregistration}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Deregistration Reason
                  </MenuItem>
                  <MenuItem value="No Supplies">No longer making taxable supplies</MenuItem>
                  <MenuItem value="Below Threshold">
                    Making taxable supplies, but under threshold
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <Select
                  name="status"
                  value={formDetail.status}
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
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formDetail.fromDate}
                  onChange={(newDate: Dayjs | null) => {
                    setApprovalDate(newDate);
                    handleFromDateChange(newDate);
                  }}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formDetail.toDate}
                  onChange={(newDate: Dayjs | null) => {
                    setApprovalDate(newDate);
                    handleToDateChange(newDate);
                  }}
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Select
                  name="reportType"
                  value={formDetail.reportType}
                  onChange={handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Individual">Individual</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                placeholder="Comment"
                name="comment"
                value={formDetail.comment}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={approvalDate}
                  onChange={setApprovalDate}
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

export default VatDeRegistration;

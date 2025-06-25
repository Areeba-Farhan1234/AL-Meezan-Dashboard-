// import React, { useState, useEffect } from 'react';
// import {
//   Button, FormControl, MenuItem, TextField, Container,
//   Grid, Select, Typography, Box, SelectChangeEvent
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Dayjs } from 'dayjs'; 
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const VatRegistration: React.FC = () => {
//   const [emailError, setEmailError] = useState('');
//   const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);
//   const [formDetail, setFormDetail] = useState({
//     clientname: '',
//     threshold: '',
//     docstatus: '',
//     approvaldate: '',
//     returnperiod: '',
//     email: '',
//     password: '',
//     comment: '',
//   });
//   const [data, setData] = useState<any[]>([]);
//   const [filter, setFilter] = useState({ clientname: '', from: '', to: '', reportType: '' });

//   const handleSelectChange = (e: SelectChangeEvent<string>) => {
//     const { name, value } = e.target;
//     setFormDetail(prev => ({ ...prev, [name]: value }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormDetail(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const dataToSubmit = {
//       ...formDetail,
//       approvaldate: approvalDate ? approvalDate.format('YYYY-MM-DD') : '',
//     };
//     try {
//       const res = await axios.post('http://localhost:5000/clients', dataToSubmit);
//       alert('Client registered successfully!');
//       console.log(res.data);
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       alert('Submission failed.');
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/clients');
//       setData(res.data);
//     } catch (err) {
//       console.error('Failed to fetch data:', err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
//     XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
//   };

//   const exportToCSV = () => {
//     const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute('download', 'VAT_Clients.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.autoTable({ head: [['Client Name', 'Email', 'Threshold']], body: data.map(d => [d.clientname, d.email, d.threshold]) });
//     doc.save('VAT_Clients.pdf');
//   };

//   return (
//     <Container maxWidth="md">
//       <Box mt={4} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
//         <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
//           VAT Registration
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Form Inputs (Same as your existing code) */}
//             {/* ... */}
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" fullWidth>
//                 Submit VAT Registration
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//         <Box mt={5}>
//           <Typography variant="h5" gutterBottom>Report Filters</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={6} sm={3}>
//               <TextField label="Client Name" fullWidth onChange={(e) => setFilter(f => ({ ...f, clientname: e.target.value }))} />
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <TextField label="From Date" type="date" InputLabelProps={{ shrink: true }} fullWidth onChange={(e) => setFilter(f => ({ ...f, from: e.target.value }))} />
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <TextField label="To Date" type="date" InputLabelProps={{ shrink: true }} fullWidth onChange={(e) => setFilter(f => ({ ...f, to: e.target.value }))} />
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <FormControl fullWidth>
//                 <Select displayEmpty value={filter.reportType} onChange={(e) => setFilter(f => ({ ...f, reportType: e.target.value }))}>
//                   <MenuItem value="">Select Report Type</MenuItem>
//                   <MenuItem value="CSV">CSV</MenuItem>
//                   <MenuItem value="Excel">Excel</MenuItem>
//                   <MenuItem value="PDF">PDF</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant="contained" onClick={() => {
//                 if (filter.reportType === 'CSV') exportToCSV();
//                 else if (filter.reportType === 'Excel') exportToExcel();
//                 else if (filter.reportType === 'PDF') exportToPDF();
//               }}>Export Report</Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
   
    
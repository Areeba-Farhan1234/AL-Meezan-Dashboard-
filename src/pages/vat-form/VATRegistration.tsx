// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   FormControl,
//   MenuItem,
//   TextField,
//   Container,
//   Grid,
//   Select,
//   Typography,
//   Box,
//   SelectChangeEvent,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { useTheme } from '@mui/material/styles';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { VatForm } from 'context/VATContext';

// const VatRegistration: React.FC = () => {
//   const theme = useTheme();
//   const [data, setData] = useState<VatForm[]>([]);
//   const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);
//   const [filter, setFilter] = useState({ clientname: '', from: '', to: '', reportType: '' });
//   const [timeRange, setTimeRange] = useState<'3months' | 'all'>('3months');

//   const [formDetail, setFormDetail] = useState({
//     clientname: '',
//     threshold: '',
//     docstatus: '',
//     approvaldate: '',
//     returnperiod: '',
//     email: '',
//     password: '',
//     comment: '',
//     entity_type: '',
//     theme: '',
//     vatname: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormDetail((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target;
//     setFormDetail((prev) => ({ ...prev, [name]: value }));
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   // Format approvalDate safely
//   //   const formattedApprovalDate = approvalDate ? approvalDate.format('YYYY-MM-DD') : '';
//   //   const dataToSubmit = {
//   //     approvaldate: formattedApprovalDate,
//   //   };

//   //   try {
//   //     const res = await axios.post('http://localhost:5000/vat', dataToSubmit);

//   //     alert('Client registered successfully!');
//   //     console.log(res.data);
//   //     fetchData();

//   //     setFormDetail({
//   //       clientname: '',
//   //       threshold: '',
//   //       docstatus: '',
//   //       approvaldate: '',
//   //       returnperiod: '',
//   //       email: '',
//   //       password: '',
//   //       comment: '',
//   //       entity_type: '',
//   //     });
//   //     setApprovalDate(null);
//   //   } catch (err) {
//   //     console.error('Error submitting form:', err);
//   //     alert('Submission failed.');
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // const formattedApprovalDate = approvalDate ? approvalDate.format('YYYY-MM-DD') : '';
//     const formattedApprovalDate = approvalDate ? approvalDate.format('YYYY-MM-DD') : null;

//     const dataToSubmit = {
//       ...formDetail,
//       approvaldate: formattedApprovalDate,
//     };

//     try {
//       const res = await axios.post('/vat', dataToSubmit);
//       alert('Client registered successfully!');
//       console.log(res.data);
//       fetchData();

//       setFormDetail({
//         clientname: '',
//         threshold: '',
//         docstatus: '',
//         approvaldate: '',
//         returnperiod: '',
//         email: '',
//         password: '',
//         comment: '',
//         entity_type: '',
//         theme: '',
//         vatname: '',
//       });
//       setApprovalDate(null);
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       alert('Submission failed.');
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const res = await axios.get<VatForm[]>('http://localhost:5000/vat');
//       setData(res.data);
//     } catch (err) {
//       console.error('Failed to fetch data:', err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const filteredData = data.filter((item) => {
//     const matchClient = item.clientname?.toLowerCase().includes(filter.clientname.toLowerCase());
//     const matchType = filter.reportType ? item.entity_type === filter.reportType : true;

//     const fromDate = filter.from ? new Date(filter.from) : null;
//     let toDate: Date | null = null;

//     if (filter.to) {
//       // If both from and to are provided
//       toDate = new Date(filter.to);
//     } else if (fromDate) {
//       // If only from is provided, add 1 month
//       toDate = new Date(fromDate);
//       toDate.setMonth(toDate.getMonth() + 1);
//     }

//     const itemDate = new Date(item.approvaldate || '');

//     const matchFrom = fromDate ? itemDate >= fromDate : true;
//     const matchTo = toDate ? itemDate <= toDate : true;

//     return matchClient && matchType && matchFrom && matchTo;
//   });

//   const exportToExcel = () => {
//     const dataWithSerial = filteredData.map((item, index) => ({
//       ID: index + 1,
//       ClientName: item.clientname || '',
//       Email: item.email || '',
//       Threshold: item.threshold || '',
//       ApprovalDate: item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
//       ReturnPeriod: item.returnperiod || '',
//       EntityType: item.entity_type || '',
//       Comment: item.comment || '',
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
//     XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
//   };

//   const exportToCSV = () => {
//     const dataWithSerial = filteredData.map((item, index) => ({
//       ID: index + 1,
//       ClientName: item.clientname || '',
//       Email: item.email || '',
//       Threshold: item.threshold || '',
//       ApprovalDate: item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
//       ReturnPeriod: item.returnperiod || '',
//       EntityType: item.entity_type || '',
//       Comment: item.comment || '',
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
//     const csvContent = XLSX.utils.sheet_to_csv(worksheet);

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute('download', 'VAT_Clients.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF({ orientation: 'landscape' });

//     autoTable(doc, {
//       head: [
//         [
//           'S. No.',
//           'Client Name',
//           'Email',
//           'Threshold',
//           'Approval Date',
//           'Return Period',
//           'Entity Type',
//           'Comment',
//         ],
//       ],
//       body: filteredData.map((item, index) => [
//         index + 1,
//         item.clientname || '',
//         item.email || '',
//         item.threshold || '',
//         item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
//         item.returnperiod || '',
//         item.entity_type || '',
//         item.comment || '',
//       ]),
//       styles: { fontSize: 8 },
//       headStyles: { fillColor: [22, 160, 133] },
//       margin: { top: 20 },
//     });

//     doc.save('VAT_Clients.pdf');
//   };

//   return (
//     <Container maxWidth="md">
//       <Box mt={4} mb={6} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
//         <Typography variant="h3" marginBottom="10px" gutterBottom>
//           VAT Registration
//         </Typography>

//         {/* Filter Section */}
//         <Box mb={4}>
//           <Typography variant="h6" gutterBottom>
//             Filter VAT Clients
//           </Typography>

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 placeholder="Client Name"
//                 name="clientname"
//                 value={filter.clientname}
//                 onChange={(e) => setFilter({ ...filter, clientname: e.target.value })}
//                 fullWidth
//                 required
//                 InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="From"
//                   value={filter.from ? dayjs(filter.from) : null}
//                   onChange={(date) =>
//                     setFilter((prev) => ({ ...prev, from: date?.format('YYYY-MM-DD') || '' }))
//                   }
//                   slotProps={{ textField: { fullWidth: true } }}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="To"
//                   value={filter.to ? dayjs(filter.to) : null}
//                   onChange={(date) =>
//                     setFilter((prev) => ({ ...prev, to: date?.format('YYYY-MM-DD') || '' }))
//                   }
//                   slotProps={{ textField: { fullWidth: true } }}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <Select
//                   displayEmpty
//                   value={filter.reportType}
//                   onChange={(e) => setFilter({ ...filter, reportType: e.target.value })}
//                 >
//                   <MenuItem value="">Select Report Type</MenuItem>
//                   <MenuItem value="Voluntary">Voluntary</MenuItem>
//                   <MenuItem value="Mandatory">Mandatory</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={8}>
//               <Typography variant="subtitle1">Filtered Results: {filteredData.length}</Typography>
//               <ul>
//                 {filteredData.map((client, idx) => (
//                   <li key={idx}>
//                     {client.clientname} — {client.threshold}
//                   </li>
//                 ))}
//               </ul>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Registration Form */}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Client Name"
//                 name="clientname"
//                 value={formDetail.clientname}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="threshold"
//                   value={formDetail.threshold}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select Threshold
//                   </MenuItem>
//                   <MenuItem value="Voluntary">Voluntary</MenuItem>
//                   <MenuItem value="Mandatory">Mandatory</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="docstatus"
//                   value={formDetail.docstatus}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Document Status
//                   </MenuItem>
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Received">Received</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="Approval Date"
//                   value={approvalDate}
//                   onChange={(newValue) => {
//                     setApprovalDate(newValue);
//                     setFormDetail((prev) => ({
//                       ...prev,
//                       approvaldate: newValue ? newValue.format('YYYY-MM-DD') : '',
//                     }));
//                   }}
//                   slotProps={{ textField: { fullWidth: true } }}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Return Period"
//                 name="returnperiod"
//                 value={formDetail.returnperiod}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Email"
//                 name="email"
//                 type="email"
//                 value={formDetail.email}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Password"
//                 name="password"
//                 type="password"
//                 value={formDetail.password}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//                 InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Comment"
//                 name="comment"
//                 value={formDetail.comment}
//                 onChange={handleChange}
//                 fullWidth
//                 InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <Select
//                   value={timeRange}
//                   onChange={(e) => setTimeRange(e.target.value as '3months' | 'all')}
//                   displayEmpty
//                 >
//                   <MenuItem value="3months">Last 3 Months</MenuItem>
//                   <MenuItem value="all">All</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="entity_type"
//                   value={formDetail.entity_type}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select Entity Type
//                   </MenuItem>
//                   <MenuItem value="Company">Company</MenuItem>
//                   <MenuItem value="Individual">Individual</MenuItem>
//                   <MenuItem value="Partnership">Partnership</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} textAlign="right">
//               <Button
//                 variant="contained"
//                 onClick={exportToCSV}
//                 sx={{
//                   backgroundColor: 'primary.main',
//                   color: '#fff',
//                   mr: 2,
//                   '&:hover': {
//                     backgroundColor: '#fff',
//                     color: 'primary.main',
//                     border: '2px solid',
//                     borderColor: 'primary.main',
//                     boxShadow: 4,
//                   },
//                 }}
//               >
//                 Export CSV
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={exportToExcel}
//                 sx={{
//                   backgroundColor: 'primary.main',
//                   color: '#fff',
//                   mr: 2,
//                   '&:hover': {
//                     backgroundColor: '#fff',
//                     color: 'primary.main',
//                     border: '2px solid',
//                     borderColor: 'primary.main',
//                     boxShadow: 4,
//                   },
//                 }}
//               >
//                 Export Excel
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={exportToPDF}
//                 sx={{
//                   backgroundColor: 'primary.main',
//                   color: '#fff',
//                   mr: 2,
//                   '&:hover': {
//                     backgroundColor: '#fff',
//                     color: 'primary.main',
//                     border: '2px solid',
//                     borderColor: 'primary.main',
//                     boxShadow: 4,
//                   },
//                 }}
//               >
//                 Export PDF
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{
//                   backgroundColor: 'primary.main',
//                   color: '#fff',

//                   '&:hover': {
//                     backgroundColor: '#fff',
//                     color: 'primary.main',
//                     border: '2px solid',
//                     borderColor: 'primary.main',
//                     boxShadow: 4,
//                   },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default VatRegistration;

// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   FormControl,
//   MenuItem,
//   TextField,
//   Container,
//   Grid,
//   Select,
//   Typography,
//   Box,
//   SelectChangeEvent,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { VatForm } from 'context/VATContext';

// const VatRegistration: React.FC = () => {
//   const [data, setData] = useState<VatForm[]>([]);
//   const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);
//   const [emailError, setEmailError] = useState('');
//   // const [clients, setClients] = useState<VatForm[]>([]); // ✅ uncommented this
//   const [filter, setFilter] = useState({
//     clientname: '',
//     from: '',
//     to: '',
//     threshold: '',
//     reportType: '',
//   });
//   const [timeRange, setTimeRange] = useState<'3months' | 'all'>('3months');
//   const [formDetail, setFormDetail] = useState({
//     clientname: '',
//     threshold: '',
//     docstatus: '',
//     approvaldate: '',
//     returnperiod: '',
//     email: '',
//     password: '',
//     comment: '',
//     from: '',
//     to: '',
//     reportType: '',
//     entity_type: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormDetail((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target;
//     setFormDetail((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!approvalDate) {
//       alert('Please select Approval Date');
//       return;
//     }

//     const dataToSubmit = {
//       ...formDetail,
//       approvaldate: approvalDate.format('YYYY-MM-DD'),
//     };

//     try {
//       const registrationRes = await axios.post('http://localhost:5000/vat', dataToSubmit);
//       console.log('Registration Response:', registrationRes.data);
//       alert('Client registered successfully!');
//       toast.success('Client has been registered successfully!');

//       try {
//         const emailRes = await axios.post('http://localhost:5000/send-email', {
//           to: formDetail.email || 'sarahasif206@gmail.com',
//           subject: 'Welcome to VAT Registration',
//           text: `Hi ${formDetail.clientname}, your registration is complete.`,
//         });
//         console.log('Email Response:', emailRes.data);
//       } catch (emailErr) {
//         console.error('Error sending email:', emailErr);
//         alert('Client registered, but email failed to send.');
//       }

//       setFormDetail({
//         clientname: '',
//         threshold: '',
//         docstatus: '',
//         approvaldate: '',
//         returnperiod: '',
//         email: '',
//         password: '',
//         comment: '',
//         entity_type: '',
//         from: '',
//         to: '',
//         reportType: '',
//       });
//       setApprovalDate(null);
//       setEmailError('');
//       fetchData();
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       alert('Submission failed.');
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const res = await axios.get<VatForm[]>('http://localhost:5000/vat');
//       setData(res.data);
//     } catch (err) {
//       console.error('Failed to fetch data:', err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // axios.get('http://localhost:5000/vat')
//     //     .then(res => setClients(res.data))
//     //     .catch(err => console.error('Error fetching clients:', err));
//   }, []);

//   const filteredData = data.filter((item) => {
//     const itemClient = item.clientname?.toLowerCase() || '';
//     const itemType = item.threshold?.toLowerCase() || '';
//     const itemDate = item.approvaldate ? new Date(item.approvaldate) : null;

//     const matchClient = filter.clientname
//       ? itemClient.includes(filter.clientname.toLowerCase())
//       : true;

//     const matchType = filter.threshold ? itemType === filter.threshold.toLowerCase() : true;

//     // const fromDate = timeRange === '3months'
//     //     ? dayjs().subtract(3, 'month').toDate()
//     //     : filter.from ? new Date(filter.from) : null;

//     // const toDate = filter.to ? new Date(filter.to) : null;

//     const fromDate =
//       timeRange === '3months'
//         ? dayjs().subtract(3, 'month').toDate()
//         : formDetail.from
//           ? new Date(formDetail.from)
//           : null;

//     const toDate = formDetail.to ? new Date(formDetail.to) : null;

//     const matchFrom = fromDate ? (itemDate ? itemDate >= fromDate : false) : true;
//     const matchTo = toDate ? (itemDate ? itemDate <= toDate : false) : true;

//     return matchClient && matchType && matchFrom && matchTo;
//   });
//   const exportToExcel = () => {
//     const dataWithSerial = filteredData.map((item, index) => ({
//       ID: index + 1,
//       ClientName: item.clientname || '',
//       Email: item.email || '',
//       Threshold: item.threshold || '',
//       ApprovalDate: item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
//       ReturnPeriod: item.returnperiod || '',
//       EntityType: item.entity_type || '',
//       Comment: item.comment || '',
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
//     // XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
//     toast.success('Excel file downloaded successfully!');
//   };

//   const exportToCSV = () => {
//     const dataWithSerial = filteredData.map((item, index) => ({
//       ID: index + 1,
//       ClientName: item.clientname || '',
//       Email: item.email || '',
//       Threshold: item.threshold || '',
//       ApprovalDate: item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
//       ReturnPeriod: item.returnperiod || '',
//       EntityType: item.entity_type || '',
//       Comment: item.comment || '',
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
//     const csvContent = XLSX.utils.sheet_to_csv(worksheet);

//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     // link.setAttribute('download', 'VAT_Clients.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     toast.success('CSV file downloaded successfully!');
//   };

//   // const exportToExcel = () => {
//   //     const dataWithSerial = filteredData.map((item, index) => ({
//   //         ID: index + 1,             // Serial number
//   //         ClientName: item.clientname,
//   //         Email: item.email,
//   //         Threshold: item.threshold,
//   //         ApprovalDate: item.approvaldate,
//   //         ReturnPeriod: item.returnperiod,
//   //         EntityType: item.entity_type,
//   //         Comment: item.comment
//   //     }));
//   //     const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
//   //     const workbook = XLSX.utils.book_new();
//   //     XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Clients');
//   //     XLSX.writeFile(workbook, 'VAT_Clients.xlsx');
//   // };

//   // const exportToCSV = () => {
//   //     const dataWithSerial = filteredData.map((item, index) => ({
//   //         ID: index + 1,             // Serial number
//   //         ClientName: item.clientname,
//   //         Email: item.email,
//   //         Threshold: item.threshold,
//   //         ApprovalDate: item.approvaldate,
//   //         ReturnPeriod: item.returnperiod,
//   //         EntityType: item.entity_type,
//   //         Comment: item.comment
//   //     }));
//   //     const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(dataWithSerial));
//   //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   //     const link = document.createElement('a');
//   //     link.href = URL.createObjectURL(blob);
//   //     link.setAttribute('download', 'VAT_Clients.csv');
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);
//   // };

//   // const exportToPDF = () => {
//   //     const doc = new jsPDF();
//   //     autoTable(doc, {
//   //         head: [['S. No.', 'Client Name', 'Email', 'Threshold']],
//   //         body: filteredData.map((d, index) =>
//   //             [index + 1, d.clientname || '', d.email || '', d.threshold || '']),
//   //     });
//   //     doc.save('VAT_Clients.pdf');
//   // };

//   const exportToPDF = () => {
//     const doc = new jsPDF({ orientation: 'landscape' });

//     autoTable(doc, {
//       head: [
//         [
//           'S. No.',
//           'Client Name',
//           'Email',
//           'Threshold',
//           'Approval Date',
//           'Return Period',
//           'Entity Type',
//           'Comment',
//         ],
//       ],
//       body: filteredData.map((item, index) => [
//         index + 1,
//         item.clientname || '',
//         item.email || '',
//         item.threshold || '',
//         item.approvaldate ? dayjs(item.approvaldate).format('YYYY-MM-DD') : '',
//         item.returnperiod || '',
//         item.entity_type || '',
//         item.comment || '',
//       ]),
//       styles: { fontSize: 6 },
//       headStyles: { fillColor: [22, 160, 133] },
//       margin: { top: 20 },
//     });

//     // doc.save('VAT_Clients.pdf');
//     toast.success('PDF file downloaded successfully!');
//   };

//   return (
//     <Container maxWidth="md">
//       <Box mt={4} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
//         <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
//           VAT Registration
//         </Typography>

//         {/* Filter Section */}
//         <Box mb={4}>
//           <Typography variant="h6" gutterBottom>
//             Filter VAT Clients
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Client Name"
//                 name="clientname"
//                 value={filter.clientname}
//                 onChange={(e) => setFilter({ ...filter, clientname: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="From"
//                   value={formDetail.from ? dayjs(formDetail.from) : null}
//                   onChange={(date) =>
//                     setFormDetail((prev) => ({ ...prev, from: date ? date.toISOString() : '' }))
//                   }
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="To"
//                   value={formDetail.to ? dayjs(formDetail.to) : null}
//                   onChange={(date) =>
//                     setFormDetail((prev) => ({ ...prev, to: date ? date.toISOString() : '' }))
//                   }
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <Select
//                   name="threshold"
//                   value={filter.threshold}
//                   onChange={(e) => setFilter({ ...filter, threshold: e.target.value })}
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   <MenuItem value="Voluntary">Voluntary</MenuItem>
//                   <MenuItem value="Mandatory">Mandatory</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={8}>
//               <Typography variant="subtitle1">Filtered Results: {filteredData.length}</Typography>
//               <ul>
//                 {filteredData.map((client) => (
//                   <li>
//                     {client.clientname} — {client.threshold} — {client.approvaldate}
//                   </li>
//                 ))}
//               </ul>
//               <p></p>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Registration Form */}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Client Name"
//                 name="clientname"
//                 value={formDetail.clientname}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="threshold"
//                   value={formDetail.threshold}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select Threshold
//                   </MenuItem>
//                   <MenuItem value="Voluntary">Voluntary</MenuItem>
//                   <MenuItem value="Mandatory">Mandatory</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="docstatus"
//                   value={formDetail.docstatus}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Document Status
//                   </MenuItem>
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Received">Received</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="Approval Date"
//                   value={approvalDate}
//                   onChange={(newDate) => {
//                     setApprovalDate(newDate);

//                     setFormDetail((prev) => ({
//                       ...prev,
//                       approvaldate: newDate ? newDate.format('YYYY-MM-DD') : '',
//                     }));
//                   }}
//                   slotProps={{ textField: { fullWidth: true } }}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Return Period"
//                 name="returnperiod"
//                 value={formDetail.returnperiod}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formDetail.email}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   handleChange(e);
//                   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                   setEmailError(value && !emailPattern.test(value) ? 'Invalid email address' : '');
//                 }}
//                 fullWidth
//                 required
//                 error={!!emailError}
//                 helperText={emailError}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formDetail.password}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Comment"
//                 name="comment"
//                 value={formDetail.comment}
//                 onChange={handleChange}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth>
//                 <Select
//                   value={timeRange}
//                   onChange={(e) => setTimeRange(e.target.value as '3months' | 'all')}
//                   displayEmpty
//                 >
//                   <MenuItem value="3months">Last 3 Months</MenuItem>
//                   <MenuItem value="all">All</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="entity_type"
//                   value={formDetail.entity_type}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select Entity Type
//                   </MenuItem>
//                   <MenuItem value="Company">Company</MenuItem>
//                   <MenuItem value="Individual">Individual</MenuItem>
//                   <MenuItem value="Partnership">Partnership</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} textAlign="right">
//               <Button variant="contained" onClick={exportToCSV} sx={{ mr: 2 }}>
//                 Export CSV
//               </Button>
//               <Button variant="contained" onClick={exportToExcel} sx={{ mr: 2 }}>
//                 Export Excel
//               </Button>
//               <Button variant="contained" onClick={exportToPDF} sx={{ mr: 2 }}>
//                 Export PDF
//               </Button>
//               <Button type="submit" variant="contained">
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//       <Box mt={5}>
//         <Typography variant="h6" gutterBottom>
//           Submitted VAT Records
//         </Typography>
//         <Grid container justifyContent="space-between" alignItems="center" mb={2}>
//           <Grid item>
//             <Typography variant="subtitle2">
//               Showing: {timeRange === 'all' ? 'All Records' : 'Last 3 Months'}
//             </Typography>
//           </Grid>
//         </Grid>

//         {filteredData.length === 0 ? (
//           <Typography>No records found.</Typography>
//         ) : (
//           <Box sx={{ overflowX: 'auto' }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr style={{ background: '#f5f5f5' }}>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     S.No
//                   </th>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     Client Name
//                   </th>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     Email
//                   </th>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     Threshold
//                   </th>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     Approval Date
//                   </th>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     Return Period
//                   </th>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     Entity Type
//                   </th>
//                   <th
//                     style={{
//                       padding: '8px',
//                       border: '1px solid #ccc',
//                       textAlign: 'left',
//                       fontWeight: 'bold',
//                       fontSize: '14px',
//                     }}
//                   >
//                     Comment
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item, index) => (
//                   <tr key={index}>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {index + 1}
//                     </td>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {item.clientname}
//                     </td>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {item.email}
//                     </td>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {item.threshold}
//                     </td>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {item.approvaldate}
//                     </td>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {item.returnperiod}
//                     </td>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {item.entity_type}
//                     </td>
//                     <td style={{ padding: '8px', border: '1px solid #ccc', fontSize: '13px' }}>
//                       {item.comment}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <ToastContainer
//               position="bottom-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//             />
//           </Box>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default VatRegistration;

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
import autoTable from 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VatForm } from 'context/VATContext';
import { useNavigate } from 'react-router-dom';

const VatRegistration: React.FC = () => {
  const [data, setData] = useState<VatForm[]>([]);
  const [approvalDate, setApprovalDate] = useState<Dayjs | null>(null);
  const [emailError, setEmailError] = useState('');
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

    // try {
    //   await axios.post('/vat', dataToSubmit);
    //   toast.success('Client has been registered successfully!');
    //   navigate('/vat/vat-registration');

    //   await axios.post('/sendEmail', {
    //     to: formDetail.email,
    //     subject: 'Welcome to VAT Registration',
    //     text: `Hi ${formDetail.clientname}, your VAT registration is complete.`,
    //   });

    //   setFormDetail({
    //     clientname: '',
    //     threshold: '',
    //     docstatus: '',
    //     approvaldate: '',
    //     returnperiod: '',
    //     email: '',
    //     password: '',
    //     comment: '',
    //     from: '',
    //     to: '',
    //     entity_type: '',
    //   });
    //   setApprovalDate(null);
    //   setEmailError('');
    //   fetchData();
    // } catch (err) {
    //   console.error('Error submitting form:', err);
    //   toast.error('Submission failed!');
    // }
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
      setEmailError('');
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
      <Box mt={4} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h4" mb={3}>
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
                label="Client Name"
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
                  // onChange={(date) => setFilter({ ...filter, from: date ? date.toISOString() : '' })}
                  onChange={(date) =>
                    setFilter({ ...filter, from: date ? date.format('YYYY-MM-DD') : '' })
                  }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  value={filter.to ? dayjs(filter.to) : null}
                  onChange={(date) => setFilter({ ...filter, to: date ? date.toISOString() : '' })}
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
                  onChange={(newDate) => setApprovalDate(newDate)}
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
                  setEmailError(value && !emailPattern.test(value) ? 'Invalid email' : '');
                }}
                error={!!emailError}
                helperText={emailError}
                fullWidth
                required
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

      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </Container>
  );
};

export default VatRegistration;

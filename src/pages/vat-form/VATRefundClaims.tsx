// import React, { useState } from 'react';
// import {
//   FormControl,
//   MenuItem,
//   TextField,
//   Container,
//   Grid,
//   Select,
//   Typography,
//   Box,
//   Button,
// } from '@mui/material';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { useTheme } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// const VATRefundClaims: React.FC = () => {
//   const theme = useTheme();

//   const [formRefund, setFormRefund] = useState({
//     clientname: '',
//     refundperiod: '',
//     refundamount: '',
//     documentstatus: '',
//     appicationsubmission: '',
//     docstatus: '',
//     approvaldate: '',
//     email: '',
//     password: '',
//     comment: '',
//     status: '',
//   });

//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target;
//     if (name) {
//       setFormRefund((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormRefund((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Placeholder: Do something with formData if needed
//     console.log('Form Submitted:', formRefund);
//   };
//   return (
//     <Container maxWidth="md">
//       <Box
//         mt={4}
//         p={4}
//         sx={{
//           backgroundColor: '#fff',
//           borderRadius: 2,
//           boxShadow: 4,
//           // height: '600px',
//         }}
//       >
//         <Typography variant="h3" marginBottom="10px" gutterBottom>
//           VAT Refund
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Enter Client Name"
//                 type="clientname"
//                 variant="outlined"
//                 fullWidth
//                 name="clientname"
//                 value={formRefund.clientname}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   style: {
//                     backgroundColor: theme.palette.info.main,
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <TextField
//                   placeholder="First Return Period"
//                   type="refundperiod"
//                   variant="outlined"
//                   fullWidth
//                   name="returnperiod"
//                   value={formRefund.refundperiod}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     style: {
//                       backgroundColor: theme.palette.info.main,
//                     },
//                   }}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <TextField
//                   placeholder="First Return Period"
//                   type="refundamount"
//                   variant="outlined"
//                   fullWidth
//                   name="returnperiod"
//                   value={formRefund.refundamount}
//                   onChange={handleChange}
//                   required
//                   InputProps={{
//                     style: {
//                       backgroundColor: theme.palette.info.main,
//                     },
//                   }}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="docstatus"
//                   value={formRefund.docstatus}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Document Status
//                   </MenuItem>
//                   <MenuItem value="Draft">Pending</MenuItem>
//                   <MenuItem value="Submitted">Received</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker label="Application Submission Date" />
//                 </LocalizationProvider>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <Select
//                   name="status"
//                   value={formRefund.status}
//                   onChange={handleSelectChange}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Status
//                   </MenuItem>
//                   <MenuItem value="Draft">Draft</MenuItem>
//                   <MenuItem value="Submitted">Submitted</MenuItem>
//                   <MenuItem value="UnderReview">Under Review</MenuItem>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                   <MenuItem value="Rejected">Rejected</MenuItem>
//                   <MenuItem value="Resubmission">Resubmission</MenuItem>
//                   <MenuItem value="Resubmission">Reviewed</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker label="Application Approval Date" />
//                 </LocalizationProvider>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Email"
//                 variant="outlined"
//                 fullWidth
//                 type="email"
//                 name="email"
//                 value={formRefund.email}
//                 onChange={handleChange}
//                 required
//                 InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Enter Password"
//                 type="clientname"
//                 variant="outlined"
//                 fullWidth
//                 name="password"
//                 value={formRefund.password}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   style: {
//                     backgroundColor: theme.palette.info.main,
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 placeholder="Enter Comment"
//                 type="comment"
//                 variant="outlined"
//                 fullWidth
//                 name="password"
//                 value={formRefund.comment}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   style: {
//                     backgroundColor: theme.palette.info.main,
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid item xs={2} textAlign="right">
//               <Button type="submit" variant="contained">
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default VATRefundClaims;

import React, { useState, useEffect } from 'react';
import {
  Button,
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
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Interface for form data
interface RefundClaim {
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
export interface RefundClaimContextType {
  refundClaimList: RefundClaim[];
  setRefundClaimList: React.Dispatch<React.SetStateAction<RefundClaim[]>>;
}

const VATRefundClaims: React.FC = () => {
  const [refundClaimList, setRefundClaimList] = useState<RefundClaim[]>([]);

  const [emailError, setEmailError] = useState('');
  const [filter, setFilter] = useState({
    clientname: '',
    fromDate: null as Dayjs | null,
    toDate: null as Dayjs | null,
    reportType: '',
  });

  // const filteredClaims = refundClaimList.filter((claim) => {
  //   const approval = dayjs(claim.approvaldate);
  //   return approval.isSameOrAfter(filter.fromDate);
  // });

  const [formRefundDetail, setFormRefundDetail] = useState<RefundClaim>({
    clientname: '',
    refundperiod: '',
    refundamount: '',
    docstatus: '',
    applicationsubmission: '',
    approvaldate: '',
    email: '',
    password: '',
    comment: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormRefundDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormRefundDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError) {
      alert('Please fix errors before submitting.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/refund', formRefundDetail);
      alert('Client registered successfully!');
      fetchData();
      setFormRefundDetail({
        clientname: '',
        refundperiod: '',
        refundamount: '',
        docstatus: '',
        applicationsubmission: '',
        approvaldate: '',
        email: '',
        password: '',
        comment: '',
        status: '',
      });
      setEmailError('');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Submission failed.');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<RefundClaim[]>('http://localhost:5000/refund');
      setRefundClaimList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = refundClaimList.filter((item: RefundClaim) => {
    const matchClient = item.clientname?.toLowerCase().includes(filter.clientname.toLowerCase());
    const matchType = filter.reportType ? item.status === filter.reportType : true;
    const approval = item.approvaldate ? dayjs(item.approvaldate) : null;
    const matchFrom = filter.fromDate
      ? approval
        ? approval.isSameOrAfter(filter.fromDate, 'day')
        : false
      : true;
    const matchTo = filter.toDate
      ? approval
        ? approval.isSameOrBefore(filter.toDate, 'day')
        : false
      : true;
    return matchClient && matchType && matchFrom && matchTo;
  });

  const exportToExcel = () => {
    const dataWithSerial = filteredData.map((item: RefundClaim, index: number) => ({
      ID: index + 1,
      ClientName: item.clientname,
      Email: item.email,
      RefundPeriod: item.refundperiod,
      RefundAmount: item.refundamount,
      ApplicationSubmission: item.applicationsubmission,
      ApprovalDate: item.approvaldate,
      Status: item.status,
      Comment: item.comment,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataWithSerial);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'VAT Refunds');
    XLSX.writeFile(workbook, 'VAT_Refunds.xlsx');
  };

  const exportToCSV = () => {
    const dataWithSerial = filteredData.map((item: RefundClaim, index: number) => ({
      ID: index + 1,
      ClientName: item.clientname,
      Email: item.email,
      RefundPeriod: item.refundperiod,
      RefundAmount: item.refundamount,
      ApplicationSubmission: item.applicationsubmission,
      ApprovalDate: item.approvaldate,
      Status: item.status,
      Comment: item.comment,
    }));
    const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(dataWithSerial));
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'VAT_Refunds.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          'S. No.',
          'Client Name',
          'Email',
          'Refund Period',
          'Refund Amount',
          'Application Submission',
          'Approval Date',
          'Status',
          'Comment',
        ],
      ],
      body: filteredData.map((d: RefundClaim, index: number) => [
        index + 1,
        d.clientname,
        d.email,
        d.refundperiod,
        d.refundamount,
        d.applicationsubmission,
        d.approvaldate,
        d.status,
        d.comment,
      ]),
    });
    doc.save('VAT_Refunds.pdf');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Filter UI */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Filter VAT Refunds
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Client Name"
              value={filter.clientname}
              onChange={(e) => setFilter((prev) => ({ ...prev, clientname: e.target.value }))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={filter.fromDate}
                onChange={(date) => setFilter((prev) => ({ ...prev, fromDate: date }))}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                value={filter.toDate}
                onChange={(date) => setFilter((prev) => ({ ...prev, toDate: date }))}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              name="reportType"
              value={filter.reportType}
              onChange={(e) => setFilter((prev) => ({ ...prev, reportType: e.target.value }))}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Submitted">Submitted</MenuItem>
              <MenuItem value="UnderReview">Under Review</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Resubmission">Resubmission</MenuItem>
              <MenuItem value="Reviewed">Reviewed</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>

      {/* Form UI */}
      <Box>
        <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
          VAT Refund
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Client Name"
                name="clientname"
                value={formRefundDetail.clientname}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Refund Period"
                name="refundperiod"
                value={formRefundDetail.refundperiod}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Refund Amount"
                name="refundamount"
                type="number"
                value={formRefundDetail.refundamount}
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value)) && Number(e.target.value) >= 0)
                    handleChange(e);
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="docstatus"
                value={formRefundDetail.docstatus}
                onChange={handleSelectChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Document Status
                </MenuItem>
                <MenuItem value="Draft">Pending</MenuItem>
                <MenuItem value="Submitted">Received</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Application Submission Date"
                  value={
                    formRefundDetail.applicationsubmission
                      ? dayjs(formRefundDetail.applicationsubmission)
                      : null
                  }
                  onChange={(newValue) =>
                    setFormRefundDetail((prev) => ({
                      ...prev,
                      applicationsubmission: newValue ? newValue.format('YYYY-MM-DD') : '',
                    }))
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Approval Date"
                  value={
                    formRefundDetail.approvaldate ? dayjs(formRefundDetail.approvaldate) : null
                  }
                  onChange={(newValue) =>
                    setFormRefundDetail((prev) => ({
                      ...prev,
                      approvaldate: newValue ? newValue.format('YYYY-MM-DD') : '',
                    }))
                  }
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="status"
                value={formRefundDetail.status}
                onChange={handleSelectChange}
                fullWidth
                displayEmpty
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Submitted">Submitted</MenuItem>
                <MenuItem value="UnderReview">Under Review</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Resubmission">Resubmission</MenuItem>
                <MenuItem value="Reviewed">Reviewed</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formRefundDetail.email}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(e);
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setEmailError(value && !emailPattern.test(value) ? 'Invalid email address' : '');
                }}
                required
                error={!!emailError}
                helperText={emailError}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formRefundDetail.password}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comment"
                name="comment"
                value={formRefundDetail.comment}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={exportToCSV} sx={{ mr: 2 }}>
                Export CSV
              </Button>
              <Button variant="contained" onClick={exportToExcel} sx={{ mr: 2 }}>
                Export Excel
              </Button>
              <Button variant="contained" onClick={exportToPDF} sx={{ mr: 2 }}>
                Export PDF
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default VATRefundClaims;

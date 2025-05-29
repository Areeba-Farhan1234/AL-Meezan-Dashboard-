// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, TextField, Grid, Select, MenuItem } from '@mui/material';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const ReportComponent = () => {
//   const [filters, setFilters] = useState({
//     clientname: '',
//     status: '',
//     startDate: '',
//     endDate: ''
//   });
//   const [reports, setReports] = useState([]);

//   const fetchReports = async () => {
//     const res = await axios.get('/api/vatdereg/reports', { params: filters });
//     setReports(res.data);
//   };

//   const handleExportCSV = () => {
//     const csvContent = [
//       ['Client Name', 'Status', 'Email', 'Return Period'],
//       ...reports.map(r => [r.clientname, r.docstatus, r.email, r.returnperiod])
//     ].map(e => e.join(',')).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'vat_dereg_report.csv';
//     a.click();
//   };

//   const handleExportExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(reports);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Reports');
//     XLSX.writeFile(wb, 'vat_dereg_report.xlsx');
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('VAT De-Registration Report', 10, 10);
//     doc.autoTable({
//       head: [['Client Name', 'Status', 'Email', 'Return Period']],
//       body: reports.map(r => [r.clientname, r.docstatus, r.email, r.returnperiod])
//     });
//     doc.save('vat_dereg_report.pdf');
//   };

//   return (
//     <div>
//       <Grid container spacing={2}>
//         <Grid item><TextField label="Client Name" onChange={e => setFilters(f => ({ ...f, clientname: e.target.value }))} /></Grid>
//         <Grid item>
//           <Select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
//             <MenuItem value="">All Status</MenuItem>
//             <MenuItem value="Draft">Draft</MenuItem>
//             <MenuItem value="Approved">Approved</MenuItem>
//           </Select>
//         </Grid>
//         <Grid item><TextField type="date" label="Start Date" InputLabelProps={{ shrink: true }} onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))} /></Grid>
//         <Grid item><TextField type="date" label="End Date" InputLabelProps={{ shrink: true }} onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))} /></Grid>
//         <Grid item><Button onClick={fetchReports}>Filter</Button></Grid>
//         <Grid item><Button onClick={handleExportCSV}>Export CSV</Button></Grid>
//         <Grid item><Button onClick={handleExportExcel}>Export Excel</Button></Grid>
//         <Grid item><Button onClick={handleExportPDF}>Export PDF</Button></Grid>
//       </Grid>

//       {/* Report Table (simple version) */}
//       <table>
//         <thead><tr><th>Client</th><th>Status</th><th>Email</th><th>Return Period</th></tr></thead>
//         <tbody>
//           {reports.map((r, i) => (
//             <tr key={i}>
//               <td>{r.clientname}</td>
//               <td>{r.docstatus}</td>
//               <td>{r.email}</td>
//               <td>{r.returnperiod}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportComponent;

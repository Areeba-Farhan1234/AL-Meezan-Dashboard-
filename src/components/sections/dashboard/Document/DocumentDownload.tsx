import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
} from '@mui/material';
import { PictureAsPdf, Description } from '@mui/icons-material';

interface DocumentEntry {
  name: string;
  createdBy: string;
  createdOn: string;
  status: string;
  fileType: string;
}

const DocumentPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];

    if (!validTypes.includes(file.type)) {
      alert('Only PDF, Excel, and CSV files are allowed!');
      return;
    }

    const newDocument: DocumentEntry = {
      name: file.name,
      createdBy: 'upload Date',
      createdOn: new Date().toLocaleDateString(),
      status: 'Completed',
      fileType: file.type,
    };

    setDocuments((prev) => [newDocument, ...prev]); // Add new file at top
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <PictureAsPdf color="error" />;
    return <Description color="primary" />;
  };

  return (
    <Container maxWidth="xl">
      {/* Upload File Section */}
      <Box
        mt={5}
        p={6}
        textAlign="center"
        sx={{
          border: '2px dashed #3e4095',
          borderRadius: '12px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Description sx={{ fontSize: 50, color: '#3e4095' }} />
        <Typography variant="body1">Drag and drop PDF, Excel, or CSV file here</Typography>
        <Button variant="contained" component="label" sx={{ mt: 2, backgroundColor: '#3e4095' }}>
          Upload file
          <input
            hidden
            type="file"
            accept=".pdf,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
          />
        </Button>
        <Typography variant="caption" display="block" mt={1}>
          Maximum size: 10 MB
        </Typography>
      </Box>

      {/* Recent Documents Section */}
      <Box mt={5} mb={10} width="100%">
        <Typography variant="h6" gutterBottom>
          Recent Documents
        </Typography>
        <Paper elevation={1} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document Name</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {getFileIcon(doc.fileType)}
                      {doc.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography>{doc.createdBy}</Typography>
                    <Typography variant="caption">{doc.createdOn}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={doc.status} color="info" sx={{ fontWeight: 'bold' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  );
};

export default DocumentPage;

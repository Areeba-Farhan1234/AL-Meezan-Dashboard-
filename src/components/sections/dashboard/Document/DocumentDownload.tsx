import React, { useState, useEffect, useRef } from 'react';
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
  IconButton,
  TextField,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Upload,
  Delete,
  Edit,
  Save,
  Download,
  PictureAsPdf,
  Description,
} from '@mui/icons-material';
import axios from 'axios';

interface DocumentEntry {
  _id: string;
  name: string;
  createdAt: string;
  status: string;
  fileUrl: string;
}

const DocumentPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const openSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const openDialog = (message: string) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleDialogClose = () => setDialogOpen(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get<DocumentEntry[]>('/documents');
      setDocuments(res.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) await handleUpload(file);
  // };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post<DocumentEntry>('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDocuments((prev) => [res.data, ...prev]);

      openDialog('Record has been added successfully');
      openSnackbar('Upload completed');
    } catch (error) {
      console.error('Upload failed:', error);
      openSnackbar('Upload failed');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/documents/${id}`);
      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
      openSnackbar('File deleted');
    } catch (error) {
      console.error('Delete failed:', error);
      openSnackbar('Delete failed');
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (id: string, name: string) => {
    try {
      const res = await axios.put<DocumentEntry>(`/documents/${id}`, {
        name,
      });
      setDocuments((prev) => prev.map((doc) => (doc._id === id ? res.data : doc)));
      setEditingId(null);
      openSnackbar('File name updated');
    } catch (error) {
      console.error('Save failed:', error);
      openSnackbar('Save failed');
    }
  };

  const handleDownload = (url: string) => {
    window.open(`http://localhost:5000${url}`, '_blank');
    // openSnackbar('Download started');
  };

  const getFileIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.endsWith('.pdf')) return <PictureAsPdf color="error" />;
    return <Description color="primary" />;
  };

  return (
    <Container maxWidth="xl">
      {/* Upload Section */}
      <Box
        mt={5}
        p={6}
        textAlign="center"
        sx={{
          border: '2px dashed #3e4095',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Description sx={{ fontSize: 50, color: '#3e4095' }} />
        <Typography>Upload PDF, Excel, or CSV file</Typography>

        <input
          type="file"
          title="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />

        <Button
          variant="contained"
          onClick={handlePickFile}
          startIcon={<Upload />}
          sx={{ mt: 2, backgroundColor: '#3e4095', marginBottom: '10px' }}
        >
          Upload
        </Button>

        <Typography variant="caption">Maximum file size: 10 MB</Typography>
      </Box>

      {/* Document Table */}
      <Box mt={5} mb={10}>
        <Typography variant="h6">Recent Documents</Typography>
        <Paper elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document Name</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <TableRow key={doc._id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {getFileIcon(doc.name)}
                        {editingId === doc._id ? (
                          <TextField
                            size="small"
                            value={doc.name}
                            onChange={(e) =>
                              setDocuments((prev) =>
                                prev.map((d) =>
                                  d._id === doc._id ? { ...d, name: e.target.value } : d,
                                ),
                              )
                            }
                          />
                        ) : (
                          doc.name
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip label={doc.status} color="info" />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDownload(doc.fileUrl)}>
                        <Download />
                      </IconButton>
                      {editingId === doc._id ? (
                        <IconButton onClick={() => handleSave(doc._id, doc.name)}>
                          <Save />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleEdit(doc._id)}>
                          <Edit />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDelete(doc._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No documents found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Snackbar Toast */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: '1.1rem',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
            minWidth: '300px',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/*  Center Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="xs" //  Width control (xs, sm, md, lg)
        fullWidth
        PaperProps={{
          sx: {
            padding: 3,
            borderRadius: 3,
            backgroundColor: '#f5f5f5', //  Light background
            boxShadow: '0 5px 25px rgba(0,0,0,0.3)', //  Soft shadow
          },
        }}
      >
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#3e4095', //  Theme color
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            // Request Processed
          </Typography>
          <Typography
            sx={{
              fontSize: '1.2rem',
              color: '#333',
              mb: 3,
            }}
          >
            {dialogMessage || 'Your request has been processed successfully!'}
          </Typography>

          <Button
            variant="contained"
            onClick={handleDialogClose}
            sx={{
              backgroundColor: '#3e4095',
              ':hover': { backgroundColor: '#2c2d70' },
              px: 4,
              py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
            }}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DocumentPage;

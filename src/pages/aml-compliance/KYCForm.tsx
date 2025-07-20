// import React, { useState } from 'react';
// import { TextField, Container, Grid, Button, Typography, Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// const KYCForm: React.FC = () => {
//   const theme = useTheme();

//   const [formData, setFormData] = useState({
//     name: '',
//     office_no: '',
//     building_name: '',
//     street_address: '',
//     city: '',
//     state: '',
//     country: '',
//     zip: '',
//     telephone_no: '',
//     fax_number: '',
//     email: '',
//     annual_business: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Placeholder: Do something with formData if needed
//     console.log('Form Submitted:', formData);
//   };

//   return (
//     <Container maxWidth="md">
//       <Box mt={4} mb={6} p={4} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 4 }}>
//         <Typography variant="h3" marginBottom="8px" gutterBottom>
//           KYC Form
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Grid container alignItems="center">
//                 <Grid item xs={12} sm={2}>
//                   <Box fontWeight="bold">Company Name:</Box>
//                 </Grid>
//                 <Grid item xs={12} sm={9} sx={{ ml: 1 }}>
//                   <TextField
//                     placeholder="Enter company name"
//                     type="text"
//                     variant="outlined"
//                     fullWidth
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid item xs={12}>
//               <Grid container spacing={4}>
//                 <Grid item xs={12}>
//                   <Box fontWeight="bold" fontSize="1.2rem">
//                     Business Address:
//                   </Box>
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Box fontWeight="bold">Office No:</Box>
//                   <TextField
//                     placeholder="Enter office number"
//                     name="office_no"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={formData.office_no}
//                     onChange={handleChange}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Box fontWeight="bold">Building Name:</Box>
//                   <TextField
//                     placeholder="Enter building name"
//                     name="building_name"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={formData.building_name}
//                     onChange={handleChange}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Box fontWeight="bold">Street Address:</Box>
//                   <TextField
//                     placeholder="Enter street address"
//                     name="street_address"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={formData.street_address}
//                     onChange={handleChange}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Box fontWeight="bold">City:</Box>
//                   <TextField
//                     placeholder="Enter city name"
//                     name="city"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={formData.city}
//                     onChange={handleChange}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Box fontWeight="bold">State:</Box>
//                   <TextField
//                     placeholder="Enter state name"
//                     name="state"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={formData.state}
//                     onChange={handleChange}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Box fontWeight="bold">Country:</Box>
//                   <TextField
//                     placeholder="Enter country name"
//                     name="country"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={formData.country}
//                     onChange={handleChange}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Box fontWeight="bold">Zip:</Box>
//                   <TextField
//                     placeholder="Enter zip code"
//                     name="zip"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={formData.zip}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid item xs={12}>
//               <Grid container spacing={4} sx={{ mt: 0.5 }}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     placeholder="Telephone Number"
//                     variant="outlined"
//                     fullWidth
//                     type="text"
//                     name="telephone_no"
//                     value={formData.telephone_no}
//                     onChange={handleChange}
//                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
//                     required
//                     InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     placeholder="Fax Number"
//                     variant="outlined"
//                     fullWidth
//                     type="text"
//                     name="fax_number"
//                     value={formData.fax_number}
//                     onChange={handleChange}
//                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
//                     required
//                     InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     placeholder="Email"
//                     variant="outlined"
//                     fullWidth
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     placeholder="Expected Annual Business Turnover"
//                     type="text"
//                     variant="outlined"
//                     fullWidth
//                     name="annual_business"
//                     value={formData.annual_business}
//                     onChange={handleChange}
//                     required
//                     InputProps={{ style: { backgroundColor: theme.palette.info.main } }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </form>
//         <Grid item xs={12} sx={{ mt: 4 }}>
//           <Button variant="contained" color="primary" type="submit">
//             Submit Form
//           </Button>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default KYCForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Grid, Button, Typography, Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useKYC } from '../../context/KycContext';
import jsPDF from 'jspdf';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Save, PictureAsPdf, Delete } from '@mui/icons-material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Add } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Table, TableBody, TableCell, TableRow } from '@mui/material';
const API_URL = 'http://localhost:5000/kyc';

type Owner = {
  name: string;
  nationality: string;
  contact: string;
  email: string;
  pep: string;
  isEditing: boolean;
};
type Association = {
  companyName: string;
  associationName: string;
  isEditing: boolean;
};

interface RegulatoryInfo {
  id: number | string;
  description: string;
}

type EditableOwnerField = keyof Pick<Owner, 'name' | 'nationality' | 'contact' | 'email' | 'pep'>;

const KYCForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { kycData, setKycData, submitKYC, resetForm } = useKYC();
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [associations, setAssociations] = useState<Association[]>([
    { companyName: '', associationName: '', isEditing: true },
  ]);

  const addressFields = [
    { name: 'business_address', heading: 'Street Address' },
    { name: 'city', heading: 'City' },
    { name: 'state', heading: 'State/Province' },
    { name: 'zip_code', heading: 'Zip Code' },
    { name: 'country', heading: 'Country' },
  ];

  const contactFields = [
    { name: 'phone', heading: 'Phone Number' },
    { name: 'fax', heading: 'Fax Number' },
    { name: 'email', heading: 'Email Address' },
    { name: 'website', heading: 'Website' },
  ];

  const { kycData: formData, setKycData: setFormData } = useKYC();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newInfo, setNewInfo] = useState<RegulatoryInfo>({
    id: uuidv4(),
    description: '',
  });

  const RegulatoryInformationhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewInfo((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  // const RegulatoryInformationhandleAdd = () => {
  //   if (newInfo.description.trim() === '') return;

  //   setFormData((prev) => ({
  //     ...prev,
  //     regulatoryInformation: [...(prev.regulatoryInformation || []), newInfo],
  //   }));

  //   // setNewInfo({ id: Date.now(), description: '' });
  //   setNewInfo({ id: uuidv4(), description: '' });
  // };

  // const handleAddRegulatoryInfo = () => {
  //   if (newInfo.description.trim() === '') return;

  //   setKycData({
  //     ...kycData,
  //     regulatoryInformation: [...(kycData.regulatoryInformation || []), newInfo],
  //   });

  //   setNewInfo({ ...info, id: String(info.id) }); // ✅ force id to string
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewInfo((prev) => ({
  //     ...prev,
  //     description: e.target.value,
  //   }));
  // };

  const handleAddRegulatoryInfo = () => {
    if (newInfo.description.trim() === '') return;

    setKycData((prev) => ({
      ...prev,
      regulatoryInformation: [...(prev.regulatoryInformation || []), newInfo],
    }));

    setNewInfo({ id: uuidv4(), description: '' }); // ✅ clear input after add
  };

  const RegulatoryInformationhandleEdit = (index: number) => {
    setEditIndex(index);
  };

  const RegulatoryInformationhandleSave = (index: number) => {
    if (formData.regulatoryInformation) {
      const updated = [...formData.regulatoryInformation];
      updated[index] = { ...updated[index], description: newInfo.description };

      setFormData((prev) => ({
        ...prev,
        regulatoryInformation: updated,
      }));

      setEditIndex(null);
      setNewInfo({ id: Date.now(), description: '' }); // Clear after save
    }
  };

  const RegulatoryInformationhandleDelete = (index: number) => {
    const updated = formData.regulatoryInformation?.filter((_, i) => i !== index) || [];

    setFormData((prev) => ({
      ...prev,
      regulatoryInformation: updated,
    }));

    setEditIndex(null);
  };

  // const RegulatoryInformationhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewInfo((prev) => ({
  //     ...prev,
  //     description: e.target.value,
  //   }));
  // };
  // ;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewInfo({ ...newInfo, description: e.target.value });
  };

  const handleAssociationChange = (index: number, field: keyof Association, value: string) => {
    const updated = [...associations];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setAssociations(updated);
  };

  const handleEditAssociation = (index: number) => {
    const updated = [...associations];
    updated[index].isEditing = true;
    setAssociations(updated);
  };

  const handleSaveAssociation = (index: number) => {
    const updated = [...associations];
    updated[index].isEditing = false;
    setAssociations(updated);
  };

  const handleDeleteAssociation = (index: number) => {
    const updated = [...associations];
    updated.splice(index, 1);
    setAssociations(updated);
  };

  const handleAddAssociation = () => {
    setAssociations([...associations, { companyName: '', associationName: '', isEditing: true }]);
  };

  const handleOwnerChange = (index: number, field: EditableOwnerField, value: string) => {
    const updatedOwners = [...kycData.owners];
    updatedOwners[index][field] = value;
    setKycData({ ...kycData, owners: updatedOwners });
  };

  const handleAddOwner = () => {
    const updatedOwners = [
      ...kycData.owners,
      {
        name: '',
        nationality: '',
        contact: '',
        email: '',
        pep: '',
        isEditing: true,
      },
    ];
    setKycData({ ...kycData, owners: updatedOwners });
  };

  const handleEditOwner = (index: number) => {
    const updatedOwners = [...kycData.owners];
    updatedOwners[index].isEditing = true;
    setKycData({ ...kycData, owners: updatedOwners });
  };

  const handleSaveOwner = (index: number) => {
    const updatedOwners = [...kycData.owners];
    updatedOwners[index].isEditing = false;
    setKycData({ ...kycData, owners: updatedOwners });
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = [...kycData.owners];
    updatedOwners.splice(index, 1);
    // setKycData({ ...kycData, owners: updatedOwners });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save all owners before submit
    const updatedOwners = kycData.owners.map((owner) => ({ ...owner, isEditing: false }));
    setKycData({ ...kycData, owners: updatedOwners });

    if (step === 1) return setStep(2);
    if (loading) return;

    setLoading(true);
    const success = await submitKYC();
    setLoading(false);

    if (success) {
      toast.success('Form submitted successfully!', {
        position: 'bottom-right',
        theme: 'colored',
      });
      navigate('/kyc/next');
    }
  };

  const updateKYC = async (id: string): Promise<boolean> => {
    try {
      await axios.put(`${API_URL}/${id}`, kycData);
      return true;
    } catch (err) {
      toast.error('Failed to update KYC data.');
      return false;
    }
  };

  const deleteKYC = async () => {
    if (!kycData._id) return;
    try {
      await axios.delete(`${API_URL}/${kycData._id}`);

      toast.success('KYC record deleted.', { position: 'bottom-right' });
      resetForm();
      setEditMode(true);
    } catch (err) {
      toast.error('Failed to delete KYC data.');
    }
  };

  const handleSave = async () => {
    const success = kycData._id ? await updateKYC(kycData._id) : await submitKYC();
    if (success) {
      toast.success('Saved successfully!', { position: 'bottom-right' });
      setEditMode(false);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    const lineHeight = 10;

    doc.setFillColor(0, 102, 204);
    doc.rect(10, y - 10, 190, 15, 'F');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('KYC FORM SUBMISSION', 105, y, { align: 'center' });

    y += lineHeight + 5;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const sections = [
      {
        title: 'Company Name',
        fields: [{ label: 'Company Name', value: kycData.name }],
      },
      {
        title: 'Business Address',
        fields: [
          { label: 'Office No', value: kycData.office_no },
          { label: 'Building Name', value: kycData.building_name },
          { label: 'Street Address', value: kycData.street_address },
          { label: 'City', value: kycData.city },
          { label: 'State', value: kycData.state },
          { label: 'Country', value: kycData.country },
          { label: 'Zip', value: kycData.zip },
        ],
      },
      {
        title: 'Contact Information',
        fields: [
          { label: 'Telephone No', value: kycData.telephone_no },
          { label: 'Fax Number', value: kycData.fax_number },
          { label: 'Email', value: kycData.email },
          { label: 'Expected Annual Business Turnover', value: kycData.annual_business },
        ],
      },
    ];

    // Draw all sections except Owners
    sections.forEach((section) => {
      doc.setFillColor(0, 102, 204);
      doc.rect(10, y - 7, 190, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(section.title, 105, y, { align: 'center' });
      y += lineHeight;

      section.fields.forEach((field) => {
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text(`${field.label}:`, 14, y);
        doc.setFont('helvetica', 'normal');
        doc.text(field.value || '-', 70, y);
        y += lineHeight;
      });

      y += 5;
    });

    // ✅ Now add the Owners table
    if (kycData.owners.length > 0) {
      doc.setFillColor(0, 102, 204);
      doc.rect(10, y, 190, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text('Owners', 105, y + 7, { align: 'center' });
      y += 15;

      // Table Headers
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('Name', 12, y);
      doc.text('Nationality', 52, y);
      doc.text('Contact', 92, y);
      doc.text('Email', 132, y);
      doc.text('PEP', 182, y);
      y += 7;

      // Table Rows
      doc.setFont('helvetica', 'normal');
      kycData.owners.forEach((owner) => {
        doc.text(owner.name || '-', 12, y);
        doc.text(owner.nationality || '-', 52, y);
        doc.text(owner.contact || '-', 92, y);
        doc.text(owner.email || '-', 132, y);
        doc.text(owner.pep || '-', 182, y);
        y += 7;
      });

      y += 5;
    }

    doc.setDrawColor(0, 102, 204);
    doc.rect(10, y + 2, 190, 10);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('This is a system-generated form.', 105, y + 9, { align: 'center' });

    doc.save('KYC_Form.pdf');
    toast.info('PDF downloaded successfully!', { position: 'bottom-right', theme: 'colored' });

    if (associations.length > 0) {
      doc.setFillColor(0, 102, 204);
      doc.rect(10, y, 190, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text('Group Company / Association Information', 105, y + 7, { align: 'center' });
      y += 15;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('Company Name', 14, y);
      doc.text('Association Name', 114, y);
      y += 7;

      doc.setFont('helvetica', 'normal');
      associations.forEach((assoc) => {
        doc.text(assoc.companyName || '-', 14, y);
        doc.text(assoc.associationName || '-', 114, y);
        y += 7;
      });

      y += 5;
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Box
        mt={4}
        mb={6}
        p={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                KYC (KNOW YOUR CUSTOMER) FORM / KYS (KNOW YOUR SUPPLIER OR VENDOR)
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">
                  {step === 1
                    ? 'Section 1 – General Information'
                    : 'Section 2 – Ownership Information'}
                </Typography>
                <Box>
                  <IconButton onClick={handleExportPDF}>
                    <PictureAsPdf />
                  </IconButton>
                  <IconButton onClick={() => setEditMode(true)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={handleSave} disabled={!editMode}>
                    <Save />
                  </IconButton>
                  <IconButton onClick={deleteKYC} disabled={!kycData._id}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            {step === 1 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6">Company Name</Typography>
                  <TextField
                    name="name"
                    placeholder="Company Name"
                    fullWidth
                    required
                    variant="outlined"
                    value={kycData.name || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{
                      style: {
                        backgroundColor: editMode ? theme.palette.background.default : '#f0f0f0',
                      },
                    }}
                    sx={{ mt: 2 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Business Address</Typography>
                </Grid>
                {addressFields.map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <Typography variant="subtitle2">{field.heading}</Typography>
                    <TextField
                      name={field.name}
                      fullWidth
                      variant="outlined"
                      value={kycData[field.name as keyof typeof kycData] || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Typography variant="h6">Contact Information</Typography>
                </Grid>
                {contactFields.map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <Typography variant="subtitle2">{field.heading}</Typography>
                    <TextField
                      name={field.name}
                      fullWidth
                      variant="outlined"
                      value={kycData[field.name as keyof typeof kycData] || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Grid>
                ))}
              </>
            )}

            {step === 2 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 2 }}>
                    Please state below the details of the owners/partners/managers of the Company.
                  </Typography>
                </Grid>

                {kycData.owners.map((owner, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2, borderRadius: 2, p: 2 }}>
                    <Grid item xs={12}>
                      <TextField
                        label="Full Name"
                        value={owner.name}
                        onChange={(e) => handleOwnerChange(index, 'name', e.target.value)}
                        fullWidth
                        variant="outlined"
                        disabled={!owner.isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Nationality"
                        value={owner.nationality}
                        onChange={(e) => handleOwnerChange(index, 'nationality', e.target.value)}
                        fullWidth
                        variant="outlined"
                        disabled={!owner.isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Contact No"
                        value={owner.contact}
                        onChange={(e) => handleOwnerChange(index, 'contact', e.target.value)}
                        fullWidth
                        variant="outlined"
                        disabled={!owner.isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        value={owner.email}
                        onChange={(e) => handleOwnerChange(index, 'email', e.target.value)}
                        fullWidth
                        variant="outlined"
                        disabled={!owner.isEditing}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="PEP"
                        value={owner.pep}
                        onChange={(e) => handleOwnerChange(index, 'pep', e.target.value)}
                        fullWidth
                        variant="outlined"
                        disabled={!owner.isEditing}
                      />
                    </Grid>

                    {/* Action Buttons */}
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                      {owner.isEditing ? (
                        <IconButton onClick={() => handleSaveOwner(index)} color="success">
                          <Save />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleEditOwner(index)} color="primary">
                          <Edit />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleRemoveOwner(index)} color="error">
                        <Delete />
                      </IconButton>
                      <IconButton onClick={handleAddOwner}>
                        <Add />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Ownership Information
                  </Typography>

                  <Table sx={{ border: '1px solid #ccc' }}>
                    <TableBody>
                      {associations.map((assoc, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                            Company Name
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="companyName"
                              label="Company Name"
                              fullWidth
                              variant="outlined"
                              value={assoc.companyName}
                              onChange={(e) =>
                                handleAssociationChange(index, 'companyName', e.target.value)
                              }
                              disabled={!assoc.isEditing}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>
                            Association Name
                          </TableCell>
                          <TableCell>
                            <TextField
                              name="associationName"
                              label="Association Name"
                              fullWidth
                              variant="outlined"
                              value={assoc.associationName}
                              onChange={(e) =>
                                handleAssociationChange(index, 'associationName', e.target.value)
                              }
                              disabled={!assoc.isEditing}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {assoc.isEditing ? (
                              <IconButton
                                onClick={() => handleSaveAssociation(index)}
                                color="success"
                              >
                                <Save />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => handleEditAssociation(index)}
                                color="primary"
                              >
                                <Edit />
                              </IconButton>
                            )}
                            <IconButton
                              onClick={() => handleDeleteAssociation(index)}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={handleAddAssociation}
                      sx={{
                        bgcolor: '#1976d2',
                        color: 'white',
                        '&:hover': { bgcolor: '#115293' },
                      }}
                    >
                      Add Association
                    </Button>
                  </Box>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Regulatory Information</Typography>
                  </Grid>

                  {formData.regulatoryInformation?.map((info, index) => (
                    <Grid item xs={12} key={info.id} container spacing={1} alignItems="center">
                      <Grid item xs={10}>
                        {editIndex === index ? (
                          <TextField
                            fullWidth
                            value={newInfo.description}
                            onChange={RegulatoryInformationhandleChange}
                          />
                        ) : (
                          <Typography>{info.description}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        {editIndex === index ? (
                          <IconButton onClick={() => RegulatoryInformationhandleSave(index)}>
                            <Save />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => {
                              setNewInfo(info);
                              RegulatoryInformationhandleEdit(index);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        )}
                        <IconButton onClick={() => RegulatoryInformationhandleDelete(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}

                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label="Add Regulatory Info"
                      value={newInfo.description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" onClick={handleAddRegulatoryInfo}>
                      Add
                    </Button>
                  </Grid>

                  <Grid item xs={12} container justifyContent="space-between">
                    <Button
                      variant="outlined"
                      startIcon={<ArrowBackIcon />}
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => setStep(step + 1)}
                    >
                      Continue
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            {step === 2 && (
              <Button variant="contained" onClick={() => setStep(1)}>
                Back
              </Button>
            )}
            {step === 3 && (
              <Button variant="contained" onClick={() => setStep(2)}>
                Back
              </Button>
            )}
            {step === 1 && (
              <Button variant="contained" onClick={() => setStep(2)}>
                Continue
              </Button>
            )}
            {step === 2 && (
              <Button variant="contained" onClick={() => setStep(3)}>
                Continue
              </Button>
            )}

            {step === 3 && (
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </Grid>
        </form>
      </Box>
    </Container>
  );
};
// };

export default KYCForm;

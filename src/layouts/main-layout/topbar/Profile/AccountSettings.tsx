// import { useState, useEffect, ChangeEvent } from 'react';
// import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// const AccountSettings = () => {
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [showProfile, setShowProfile] = useState<boolean>(false);

//   // Load saved data on component mount
//   useEffect(() => {
//     const savedImage = localStorage.getItem('profileImage');
//     const savedName = localStorage.getItem('name');
//     const savedEmail = localStorage.getItem('email');

//     if (savedName || savedEmail || savedImage) {
//       setName(savedName || '');
//       setEmail(savedEmail || '');
//       setProfileImage(savedImage || null);
//       // ❌ DO NOT call setShowProfile here
//     }
//   }, []);

//   const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   const handleSave = () => {
//     localStorage.setItem('profileImage', profileImage || '');
//     localStorage.setItem('name', name);
//     localStorage.setItem('email', email);
//     setShowProfile(true); // ✅ Show profile only after saving
//     alert('Profile updated successfully!');
//   };

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       minHeight="100vh"
//       bgcolor="#fff"
//       py={6}
//       px={2}
//     >
//       <Typography variant="h3" marginBottom="16px" gutterBottom>
//         Account Settings
//       </Typography>

//       {/* Avatar + Upload Button */}
//       <Box position="relative" mb={4}>
//         <Avatar
//           src={profileImage || ''}
//           sx={{ width: 140, height: 140, border: '3px solid #3e4095' }}
//         />
//         <label htmlFor="upload-photo">
//           <input
//             accept="image/*"
//             id="upload-photo"
//             type="file"
//             hidden
//             onChange={handleImageChange}
//           />
//           <IconButton
//             component="span"
//             sx={{
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//               bgcolor: 'white',
//               border: '2px solid #3e4095',
//               color: '#3e4095',
//               '&:hover': { bgcolor: '#e0f0ff' },
//             }}
//           >
//             <PhotoCamera />
//           </IconButton>
//         </label>
//       </Box>

//       {/* Input Fields */}
//       <Box display="flex" flexDirection="column" alignItems="center" gap={2} px={2} py={4}>
//         <Box width="100%" maxWidth="600px">
//           <TextField
//             fullWidth
//             label="Full Name"
//             variant="outlined"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </Box>

//         <Box width="100%" maxWidth="600px">
//           <TextField
//             fullWidth
//             label="Email Address"
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Box>

//         <Box width="100%" maxWidth="600px">
//           <Button
//             type="submit"
//             variant="contained"
//             size="medium"
//             onClick={handleSave}
//             sx={{
//               backgroundColor: 'primary.main',
//               color: '#fff',
//               border: '2px solid',
//               borderColor: 'primary.main',
//               boxShadow: 4,
//               marginTop: 2,
//               '&:hover': {
//                 backgroundColor: '#fff',
//                 color: 'primary.main',
//                 border: '2px solid',
//                 borderColor: 'primary.main',
//                 boxShadow: 4,
//               },
//             }}
//           >
//             Save Changes
//           </Button>
//         </Box>
//       </Box>

//       {/* Saved Profile Display */}
//       {showProfile && (
//         <Box
//           mt={4}
//           p={3}
//           width="100%"
//           maxWidth="600px"
//           border="1px solid #ccc"
//           borderRadius="12px"
//           textAlign="center"
//           bgcolor="#f9f9f9"
//         >
//           <Typography variant="h5" gutterBottom>
//             Saved Profile
//           </Typography>
//           <Avatar
//             src={profileImage || ''}
//             sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
//           />
//           <Typography variant="body1">
//             <strong>Name:</strong> {name}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Email:</strong> {email}
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default AccountSettings;

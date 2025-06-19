// import React, { useState } from 'react';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Badge from '@mui/material/Badge';
// import Toolbar from '@mui/material/Toolbar';
// import TextField from '@mui/material/TextField';
// import ButtonBase from '@mui/material/ButtonBase';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconifyIcon from 'components/base/IconifyIcon';
// import ProfileMenu from './ProfileMenu';
// import Image from 'components/base/Image';
// import LogoImg from 'assets/images/Short-logo.png';
// import './index.css';

// interface TopbarProps {
//   isClosing: boolean;
//   mobileOpen: boolean;
//   setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
//   const [mode, setMode] = useState<'light' | 'dark'>('light');

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const toggleThemeMode = () => {
//     const newMode = mode === 'light' ? 'dark' : 'light';
//     setMode(newMode);
//     // You can integrate this with context or MUI theme switcher
//     document.body.setAttribute('data-theme', newMode); // Example usage
//   };

//   return (
//     <Stack
//       py={3.5}
//       alignItems="center"
//       justifyContent="space-between"
//       bgcolor="transparent"
//       zIndex={1200}
//       direction="row"
//     >
//       <Stack spacing={{ xs: 2, sm: 3 }} alignItems="center" direction="row">
//         <ButtonBase
//           component={Link}
//           href="/"
//           disableRipple
//           sx={{ lineHeight: 0, display: { xs: 'none', sm: 'block', lg: 'none' } }}
//         >
//           <Image src={LogoImg} alt="logo" height={40} width={40} />
//         </ButtonBase>

//         <Toolbar sx={{ display: { xm: 'block', lg: 'none' } }}>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={handleDrawerToggle}
//           >
//             <IconifyIcon icon="ic:baseline-menu" />
//           </IconButton>
//         </Toolbar>

//         <Toolbar sx={{ ml: -1.5, display: { xm: 'block', md: 'none' } }}>
//           <IconButton size="large" edge="start" color="inherit" aria-label="search">
//             <IconifyIcon icon="eva:search-fill" />
//           </IconButton>
//         </Toolbar>

//         <TextField
//           variant="filled"
//           placeholder="Search"
//           sx={{ width: 340, display: { xs: 'none', md: 'flex' } }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconifyIcon icon="eva:search-fill" />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center" direction="row">
//         {/* Toggle Light/Dark Mode Button */}
//         <IconButton size="large" onClick={toggleThemeMode}>
//           <IconifyIcon icon={mode === 'light' ? 'ic:round-dark-mode' : 'ic:round-light-mode'} />
//         </IconButton>

//         {/* Notification Icon */}
//         <IconButton size="large">
//           <Badge badgeContent={2} color="error">
//             <IconifyIcon icon="ic:outline-notifications-none" />
//           </Badge>
//         </IconButton>

//         {/* Profile Menu */}
//         <ProfileMenu />
//       </Stack>
//     </Stack>
//   );
// };

// export default Topbar;

// import React, { useState } from 'react';
// import {
//   Menu,
//   Link,
//   Box,
//   Stack,
//   Badge,
//   Toolbar,
//   Avatar,
//   Typography,
//   TextField,
//   ButtonBase,
//   IconButton,
//   InputAdornment,
// } from '@mui/material';

// import MoreVertIcon from '@mui/icons-material/MoreVert';

// import IconifyIcon from 'components/base/IconifyIcon';
// import ProfileMenu from './ProfileMenu';
// import Image from 'components/base/Image';
// import LogoImg from 'assets/images/Short-logo.png';
// import './index.css';

// interface TopbarProps {
//   isClosing: boolean;
//   mobileOpen: boolean;
//   setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
//   const [mode, setMode] = useState<'light' | 'dark'>('light');
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleNotificationClose = () => {
//     setAnchorEl(null);
//   };

//   const toggleThemeMode = () => {
//     const newMode = mode === 'light' ? 'dark' : 'light';
//     setMode(newMode);
//     document.body.setAttribute('data-theme', newMode);
//   };

//   const notifications = [
//     {
//       name: 'Jackie Monroe',
//       message: 'requests permission to change',
//       boldPart: 'Design System',
//       type: 'Project',
//       time: '5 min ago',
//       avatar: '/path/to/avatar1.jpg', // or use initials
//       bgColor: '#e6f4ff',
//     },
//     {
//       name: 'Chris Graham',
//       message: 'has added a new employee',
//       type: 'Employee',
//       time: '28 min ago',
//       avatar: '/path/to/avatar2.jpg',
//       bgColor: '#e6fffa',
//     },
//     {
//       name: 'Paul Miller',
//       message: 'has added a new project',
//       boldPart: 'Mobile App',
//       type: 'Project',
//       time: '12 hours ago',
//       avatar: '/path/to/avatar3.jpg',
//       bgColor: '#fff3f0',
//     },
//     // Add more...
//   ];

//   return (
//     <Stack
//       py={3.5}
//       alignItems="center"
//       justifyContent="space-between"
//       bgcolor="transparent"
//       zIndex={1200}
//       direction="row"
//     >
//       <Stack spacing={{ xs: 2, sm: 3 }} alignItems="center" direction="row">
//         <ButtonBase
//           component={Link}
//           href="/"
//           disableRipple
//           sx={{ lineHeight: 0, display: { xs: 'none', sm: 'block', lg: 'none' } }}
//         >
//           <Image src={LogoImg} alt="logo" height={40} width={40} />
//         </ButtonBase>

//         <Toolbar sx={{ display: { xs: 'block', lg: 'none' } }}>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={handleDrawerToggle}
//           >
//             <IconifyIcon icon="ic:baseline-menu" />
//           </IconButton>
//         </Toolbar>

//         <Toolbar sx={{ ml: -1.5, display: { xs: 'block', md: 'none' } }}>
//           <IconButton size="large" edge="start" color="inherit" aria-label="search">
//             <IconifyIcon icon="eva:search-fill" />
//           </IconButton>
//         </Toolbar>

//         <TextField
//           variant="filled"
//           placeholder="Search"
//           sx={{ width: 340, display: { xs: 'none', md: 'flex' } }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconifyIcon icon="eva:search-fill" />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center" direction="row">
//         {/* Toggle Light/Dark Mode Button */}
//         <IconButton size="large" onClick={toggleThemeMode}>
//           <IconifyIcon icon={mode === 'light' ? 'ic:round-dark-mode' : 'ic:round-light-mode'} />
//         </IconButton>

//         {/* Notification Icon */}
//         <IconButton size="large" onClick={handleNotificationClick}>
//           <Badge badgeContent={notifications.length} color="error">
//             <IconifyIcon icon="ic:outline-notifications-none" />
//           </Badge>
//         </IconButton>

//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleNotificationClose}
//           PaperProps={{
//             sx: {
//               width: 400,
//               Height: 600,
//               overflowY: 'auto',
//               overflowX: 'auto',
//               borderRadius: 2,
//               mt: 1,
//               boxShadow: 4,
//             },
//           }}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//           transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//           <Typography fontWeight="bold" variant="subtitle1" color="#2f348b">
//             Notifications
//           </Typography>
//           <Stack px={2} py={2} spacing={2}>
//             <Stack spacing={1.5}>
//               <Stack spacing={2}>
//                 {notifications.map((item, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       backgroundColor: item.bgColor || '#f0f4ff',
//                       px: 2,
//                       py: 2,
//                       borderRadius: 2,
//                       display: 'flex',
//                       flexDirection: 'column',
//                       justifyContent: 'space-between',
//                       alignItems: 'flex-start',
//                     }}
//                   >
//                     {/* Left Side: Avatar + Text */}
//                     <Box display="inline-block" width="300px" gap={2}>
//                       <Avatar
//                         alt={item.name}
//                         src={item.avatar}
//                         sx={{ width: 42, height: 42, bgcolor: '#c5c5c5' }}
//                       >
//                         {item.name.charAt(0)}
//                       </Avatar>
//                       <Box>
//                         <Typography variant="body2">
//                           <Box component="span" fontWeight="bold">
//                             {item.name}
//                           </Box>{' '}
//                           {item.message}{' '}
//                           {item.boldPart && (
//                             <Box component="span" fontWeight="bold">
//                               {item.boldPart}
//                             </Box>
//                           )}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {item.type} • {item.time}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Right Side: More Icon */}
//                     <IconButton size="small">
//                       <MoreVertIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 ))}
//               </Stack>
//             </Stack>
//           </Stack>
//         </Menu>

//         {/* Profile Menu */}
//         <ProfileMenu />
//       </Stack>
//     </Stack>
//   );
// };

// export default Topbar;

import React from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import ProfileMenu from './ProfileMenu';
import Image from 'components/base/Image';
import LogoImg from 'assets/images/logo.png';
import './index.css';

interface TopbarProps {
  isClosing: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Stack
      py={3.5}
      alignItems="center"
      justifyContent="space-between"
      bgcolor="transparent"
      zIndex={1200}
      direction="row"
    >
      <Stack spacing={{ xs: 2, sm: 3 }} alignItems="center" direction="row">
        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ lineHeight: 0, display: { xs: 'none', sm: 'block', lg: 'none' } }}
        >
          <Image src={LogoImg} alt="logo" height={40} width={40} />
        </ButtonBase>

        <Toolbar sx={{ display: { xm: 'block', lg: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <IconifyIcon icon="ic:baseline-menu" />
          </IconButton>
        </Toolbar>

        <Toolbar sx={{ ml: -1.5, display: { xm: 'block', md: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="search">
            <IconifyIcon icon="eva:search-fill" />
          </IconButton>
        </Toolbar>

        <TextField
          variant="filled"
          placeholder="Search"
          sx={{ width: 340, display: { xs: 'none', md: 'flex' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center" direction="row">
        {/* Notification Icon */}
        <IconButton size="large">
          <Badge badgeContent={2} color="error">
            <IconifyIcon icon="ic:outline-notifications-none" />
          </Badge>
        </IconButton>

        {/* Profile Menu */}
        <ProfileMenu />
      </Stack>
    </Stack>
  );
};

export default Topbar;

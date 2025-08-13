// import React, { useState } from 'react';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Badge from '@mui/material/Badge';
// import Toolbar from '@mui/material/Toolbar';
// import TextField from '@mui/material/TextField';
// import ButtonBase from '@mui/material/ButtonBase';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// import IconifyIcon from 'components/base/IconifyIcon';
// import ProfileMenu from './ProfileMenu';
// import Image from 'components/base/Image';
// import LogoImg from 'assets/images/logo.png';
// import './index.css';

// import { useNotifications } from 'context/Notification'; // ✅ import context

// interface TopbarProps {
//   isClosing: boolean;
//   mobileOpen: boolean;
//   setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

//   const { unreadCount, markAsRead, notifications } = useNotifications();

//   // 🔔 Notification menu
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//     markAsRead(); // ✅ mark all as read
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
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
//       {/* === Left: Logo + Search === */}
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

//       {/* === Right: Notifications + Profile === */}
//       <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center" direction="row">
//         {/* 🔔 Notification bell icon */}
//         <IconButton size="large" onClick={handleNotificationClick}>
//           <Badge badgeContent={unreadCount} color="error">
//             <IconifyIcon icon="ic:outline-notifications-none" />
//           </Badge>
//         </IconButton>

//         {/* 🔽 Notification dropdown menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleMenuClose}
//           PaperProps={{ style: { maxHeight: 300, width: 300 } }}
//         >
//           {notifications.length === 0 ? (
//             <MenuItem disabled>No notifications</MenuItem>
//           ) : (
//             notifications.map((n) => (
//               <MenuItem key={n.id}>
//                 <Box>
//                   <Typography variant="body2">{n.message}</Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {n.createdAt?.toDate().toLocaleString()}
//                   </Typography>
//                 </Box>
//               </MenuItem>
//             ))
//           )}
//         </Menu>

//         {/* 👤 Profile dropdown */}
//         <ProfileMenu />
//       </Stack>
//     </Stack>
//   );
// };

// export default Topbar;

import React, { useState, useEffect, useRef } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';

import IconifyIcon from 'components/base/IconifyIcon';
import ProfileMenu from './ProfileMenu';
import Image from 'components/base/Image';
import LogoImg from 'assets/images/logo.png';
import './index.css';

import { useNotifications } from 'context/Notification';

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

  const { unreadCount, markAsRead, notifications } = useNotifications();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    markAsRead();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 🔔 Popup Toast on New Notification
  const lastNotificationId = useRef<string | null>(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      if (latest.id && latest.id !== lastNotificationId.current) {
        toast.success(latest.message);
        lastNotificationId.current = latest.id;
      }
    }
  }, [notifications]);

  return (
    <Stack
      py={3.5}
      alignItems="center"
      justifyContent="space-between"
      bgcolor="transparent"
      zIndex={1200}
      direction="row"
    >
      {/* === Left: Logo + Search === */}
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
          <IconButton size="large" edge="start" color="inherit" onClick={handleDrawerToggle}>
            <IconifyIcon icon="ic:baseline-menu" />
          </IconButton>
        </Toolbar>

        <Toolbar sx={{ ml: -1.5, display: { xm: 'block', md: 'none' } }}>
          <IconButton size="large" edge="start" color="inherit">
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

      {/* === Right: Notifications + Profile === */}
      <Stack spacing={{ xs: 1, sm: 2 }} alignItems="center" direction="row">
        {/* 🔔 Notification bell */}
        <IconButton size="large" onClick={handleNotificationClick}>
          <Badge badgeContent={unreadCount} color="error">
            <IconifyIcon icon="ic:outline-notifications-none" />
          </Badge>
        </IconButton>

        {/* 🔽 Dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{ style: { maxHeight: 300, width: 300 } }}
        >
          {notifications.length === 0 ? (
            <MenuItem disabled>No notifications</MenuItem>
          ) : (
            notifications.map((n) => (
              <MenuItem key={n.id}>
                <Box>
                  <Typography variant="body2">{n.message}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {n.createdAt?.toDate().toLocaleString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </Menu>

        <ProfileMenu />
      </Stack>
    </Stack>
  );
};

export default Topbar;

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

// import React from 'react';
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
//   theme: 'light' | 'dark';
//   setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
//   isClosing: boolean;
//   mobileOpen: boolean;
//   setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Topbar = ({ theme, setTheme, isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
//   const toggleThemeMode = () => {
//     const newMode = theme === 'light' ? 'dark' : 'light';
//     setTheme(newMode);
//     document.body.setAttribute('data-theme', newMode); // Optional
//   };

//   const toggleThemeMode = () => {
//     const newMode = theme === 'light' ? 'dark' : 'light';
//     setTheme(newMode);
//     document.body.setAttribute('data-theme', newMode); // Optional, if you also style body
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
//         {/* ✅ Toggle Light/Dark Mode */}
//         <IconButton size="large" onClick={toggleThemeMode}>
//           <IconifyIcon icon={theme === 'light' ? 'ic:round-dark-mode' : 'ic:round-light-mode'} />
//         </IconButton>

//         {/* Notification */}
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

import React, { useState } from 'react';
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
import LogoImg from 'assets/images/Short-logo.png';
import './index.css';

interface TopbarProps {
  isClosing: boolean;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar = ({ isClosing, mobileOpen, setMobileOpen }: TopbarProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const toggleThemeMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    // You can integrate this with context or MUI theme switcher
    document.body.setAttribute('data-theme', newMode); // Example usage
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
        {/* Toggle Light/Dark Mode Button */}
        <IconButton size="large" onClick={toggleThemeMode}>
          <IconifyIcon icon={mode === 'light' ? 'ic:round-dark-mode' : 'ic:round-light-mode'} />
        </IconButton>

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

import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ButtonBase from '@mui/material/ButtonBase';
import Image from 'components/base/Image';
import Logo from 'assets/images/logo.png';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      component="main"
      alignItems="center"
      justifyContent="center"
      px={1}
      pt={4}
      pb={4}
      width={1}
      minHeight="100vh"
      position="relative"
    >
      {/* Logo Centered at the Top */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ position: 'absolute', top: 24 }}
      >
        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={Logo}
            alt="Logo"
            height={120} // Make it bigger
            width="100%"
            sx={{ mr: 0 }}
          />
        </ButtonBase>
      </Stack>

      {/* Login/Register Card */}
      <Paper
        elevation={3}
        sx={{
          px: { xs: 2, sm: 3.5 },
          py: 4,
          width: 1,
          maxWidth: 460,
          mt: 8, // Push down to create space for the logo
        }}
      >
        {children}
      </Paper>
    </Stack>
  );
};

export default AuthLayout;

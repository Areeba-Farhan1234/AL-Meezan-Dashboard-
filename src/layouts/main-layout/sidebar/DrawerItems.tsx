import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';

import ListItem from './list-items/ListItem';
import CollapseListItem from './list-items/CollapseListItem';
import Image from 'components/base/Image';
import IconifyIcon from 'components/base/IconifyIcon';
import LogoImg from 'assets/images/logo.png';
import sitemap from 'routes/sitemap';

const DrawerItems = () => {
  return (
    <>
      <Stack
        pt={2.5}
        pb={1.5}
        px={2.5}
        fontSize="16px"
        position="sticky"
        top={0}
        bgcolor="info.light"
        alignItems="center"
        justifyContent="flex-start"
        borderBottom={1}
        borderColor="info.main"
        zIndex={1000}
      >
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <ButtonBase component={Link} href="/" disableRipple>
            <Image
              src={LogoImg}
              alt="AL Meezan Logo"
              sx={{ mr: 0, width: '100%', height: '100px', px: 0, mx: 0, py: 0 }}
            />
          </ButtonBase>
        </Box>
      </Stack>
      <List
        component="nav"
        sx={{
          mt: 0.5,
          mb: 0.5,
          pl: 1,
          pr: 1.5,
          '& .MuiTypography-root': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '100%',
            textOverflow: 'ellipsis',
          },
        }}
      >
        {sitemap.map((route) =>
          route.items ? (
            <CollapseListItem key={route.id} {...route} />
          ) : (
            <ListItem key={route.id} {...route} />
          ),
        )}
      </List>

      <Box mt="auto" px={6} pb={6}>
        <Button
          variant="text"
          startIcon={<IconifyIcon icon="ic:baseline-logout" />}
          href="https://almeezan.net/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            border: 1,
            borderColor: 'grey.300', // Adjust the shade as needed
            borderRadius: 1, // Optional: adds slight rounding to the corners
          }}
        >
          Website
        </Button>
      </Box>
    </>
  );
};

export default DrawerItems;

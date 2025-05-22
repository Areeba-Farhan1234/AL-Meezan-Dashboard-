import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useTheme } from '@mui/material/styles';
interface UserData {
  username: string;
  password: string;
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState<UserData>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Users without role
  const users = [
    { username: 'Muhammad_Tahir', password: 'AlMeezan1' },
    { username: 'Abdul_Rahman', password: 'AlMeezan1' },
    { username: 'Saqib_Riaz', password: 'AlMeezan1' },
    { username: 'Mehtab_Abbas', password: 'AlMeezan1' },
    { username: 'Fawad_ul_Haq', password: 'AlMeezan1' },
    { username: 'Muhammad_Muzammil', password: 'AlMeezan1' },
    { username: 'Athesham_Hussain', password: 'AlMeezan1' },
    { username: 'Noman', password: 'AlMeezan1' },
    { username: 'Ali', password: 'AlMeezan1' },
    { username: 'Tanveer_ul_Haq', password: 'AlMeezan1' },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundUser = users.find(
      (u) => u.username === user.username && u.password === user.password,
    );

    if (foundUser) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', foundUser.username);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Typography align="center" variant="h3" fontWeight={700} sx={{ mb: 2 }}>
        Sign In
      </Typography>
      <Typography mt={1.5} align="center" variant="body2" sx={{ mb: 3 }}>
        Welcome back! Let's continue with,
      </Typography>

      <Stack
        component="form"
        onSubmit={handleSubmit}
        direction="column"
        gap={2}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          pt: 2,
          pb: 4,
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
      >
        <TextField
          id="username"
          name="username"
          type="text"
          value={user.username}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Your UserName"
          autoComplete="username"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="mdi:account" />
              </InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.info.main,
              paddingBottom: '6px',
            },
          }}
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:outline-lock" />
              </InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.info.main,
              paddingBottom: '6px',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ border: 'none', bgcolor: 'transparent !important' }}
                >
                  <IconifyIcon
                    icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                    color="neutral.light"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack mt={-1.25} alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox size="medium" color="primary" />}
            label="Remember me"
            sx={{ ml: -0.75 }}
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: 'primary.main',
            color: '#fff',
            border: '2px solid',
            borderColor: 'primary.main',
            boxShadow: 4,
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#fff',
              color: 'primary.main',
              border: '2px solid',
              borderColor: 'primary.main',
              boxShadow: 4,
              marginTop: 2,
            },
          }}
        >
          Sign In
        </Button>
      </Stack>

      {error && (
        <Typography mt={2} align="center" color="error">
          {error}
        </Typography>
      )}
    </>
  );
};

export default Signin;

import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  // Clear authentication data
  localStorage.removeItem('isAuthenticated');

  // Redirect to SignIn page after logout
  navigate('/auth/signin');

  return null; // No need to render anything during logout
};

export default Logout;

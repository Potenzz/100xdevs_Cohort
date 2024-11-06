import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateToken } from '../utils/auth';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      validateToken(token).then((isValidToken) => {
        setIsValid(isValidToken);

        if (isValidToken) {
          if (location.pathname === '/signin' || location.pathname === '/signup') {
            navigate('/dashboard');
          }
        } else {
          if (location.pathname !== '/signup') {
            navigate('/signup');
          }
        }
      });
    } else {
      setIsValid(false); // No token, redirect to signup
      if (location.pathname !== '/signup' && location.pathname !== '/signin') {
        navigate('/signup');
      }
    }
  }, [navigate, location]);

  return isValid;
};

export default useAuthRedirect;

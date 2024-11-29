'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate session check (replace with actual session validation logic)
    const userSession = localStorage.getItem('user'); // Or fetch from an API
    setIsLoggedIn(!!userSession);
  }, []);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Krispy Kreme
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          Delicious donuts, just a click away!
        </Typography>
        {!isLoggedIn ? (
          <Box>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Please register or log in to start exploring our products.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{ mr: 2 }}>
              Log In
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleRegisterClick}>
              Register
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/customer')}
          >
            View Products
          </Button>
        )}
      </Box>
    </Container>
  );
}

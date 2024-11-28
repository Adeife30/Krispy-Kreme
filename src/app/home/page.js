'use client';

import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
} from '@mui/material';
import React from 'react';

const HomePage = () => {
  const router = useRouter();

  const handlePageNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            Krispy Kreme
          </Typography>
          <Box>
            {/* Add Customer Page and Manager Dashboard to the Navbar */}
            <Button color="inherit" onClick={() => handlePageNavigation('/customer')}>
              Customer Page
            </Button>
            <Button color="inherit" onClick={() => handlePageNavigation('/manager')}>
              Manager Dashboard
            </Button>
            <Button color="inherit" onClick={() => handlePageNavigation('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handlePageNavigation('/register')}>
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 8, // Adjust margin to account for fixed AppBar height
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#FF5733',
          }}
        >
          Krispy Kreme
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Welcome to the world of delicious donuts and coffee.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;



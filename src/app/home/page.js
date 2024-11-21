'use client';

import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, Drawer } from '@mui/material';
import React from 'react';

const drawerWidth = 240; // Width of the left sidebar

const HomePage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Left Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', textAlign: 'center', padding: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF5733' }}>
            Krispy Kreme
          </Typography>
        </Box>
      </Drawer>

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
          height: '100vh',
          textAlign: 'center',
        }}
      >
        {/* Navbar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap>
              Krispy Kreme
            </Typography>
            <Box>
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
              <Button color="inherit" onClick={handleRegisterClick}>
                Register
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Centerpiece */}
        <Box sx={{ mt: 10 }}>
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
    </Box>
  );
};

export default HomePage;



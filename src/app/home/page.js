'use client';

import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, Drawer, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';

const drawerWidth = 240; // Width of the left sidebar

const HomePage = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null); // Replace with actual role fetching logic

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handlePageNavigation = (path) => {
    router.push(path);
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
        {/* Add navigation options */}
        <List>
          <ListItem button onClick={() => handlePageNavigation('/')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => handlePageNavigation('/customer')}>
            <ListItemText primary="Customer Page" />
          </ListItem>
          <ListItem button onClick={() => handlePageNavigation('/manager')}>
            <ListItemText primary="Manager Dashboard" />
          </ListItem>
        </List>
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



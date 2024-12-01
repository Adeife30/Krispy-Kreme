import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

const NavBar = ({ cartCount }) => {
  return (
    <AppBar position="static" color="default" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/">Krispy Kreme</Link>
        </Typography>
        <Button color="inherit">
          <Link href="/customer">Products</Link>
        </Button>
        <Button color="inherit">
          <Link href="/manager">Manager Dashboard</Link>
        </Button>
        <Button color="inherit">
          <Link href="/register">Register</Link>
        </Button>
        <Button color="inherit">
          <Link href="/login">Login</Link>
        </Button>
        <IconButton color="inherit" sx={{ ml: 1 }}>
          <Badge badgeContent={cartCount} color="secondary">
            <Link href="/view_cart">
              <ShoppingCartIcon />
            </Link>
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

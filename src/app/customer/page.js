'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CssBaseline,
  Badge,
  IconButton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const mockProducts = [
  {
    id: 1,
    name: "Cookie Doughnut",
    price: 1.5,
    image: "/images/cookies-doughnut.png",
  },
  {
    id: 2,
    name: "Nutella Doughnut",
    price: 2.0,
    image: "/images/nutella-doughnut.png",
  },
  {
    id: 3,
    name: "Cinnamon Doughnut",
    price: 2.0,
    image: "/images/cinamon-doughnut.png",
  },
  {
    id: 4,
    name: "Brown Cookies Doughnut",
    price: 3.5,
    image: "/images/brown-cookie-doughnut.jpg",
  },
];

const CustomerPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]); // Local cart state

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Update quantity if product already in cart
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Calculate total cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
            {/* Cart Icon */}
            <IconButton color="inherit" onClick={() => handlePageNavigation('/putincart')}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: 3, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={3}>
          {mockProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    €{product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomerPage;

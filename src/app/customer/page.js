'use client';

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';

const mockProducts = [
  {
    id: 1,
    name: 'Cookie Doughnut',
    price: 1.5,
    image: '/images/cookies-doughnut.png',
  },
  {
    id: 2,
    name: 'Nutella Doughnut',
    price: 2.0,
    image: '/images/nutella-doughnut.png',
  },
  {
    id: 3,
    name: 'Cinnamon Doughnut',
    price: 2.0,
    image: '/images/cinamon-doughnut.png',
  },
  {
    id: 4,
    name: 'Brown Cookies Doughnut',
    price: 3.5,
    image: '/images/brown-cookie-doughnut.jpg',
  },
];

export default function CustomerPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Container>
      {/* Cart Icon */}
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <IconButton color="primary" onClick={() => router.push('/view_cart')}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Product Listing */}
      <Typography variant="h4" align="center" gutterBottom>
        Our Products
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
    </Container>
  );
}

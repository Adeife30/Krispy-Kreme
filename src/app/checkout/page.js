'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from '@mui/material';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); // State for order confirmation
  const [deliveryEstimate, setDeliveryEstimate] = useState("");

  useEffect(() => {
    // Fetch the cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    // Clear the cart from localStorage
    localStorage.removeItem('cart');
    setCart([]);
    
    // Generate a random delivery estimate
    const estimate = Math.floor(Math.random() * (60 - 20 + 1)) + 20; // Random number between 20-60 minutes
    setDeliveryEstimate(`${estimate} minutes`);
    
    // Show order confirmation
    setOrderPlaced(true);
  };

  return (
    <Container>
      {orderPlaced ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Order Placed!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Thank you for shopping with us.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Your delivery will arrive in approximately <strong>{deliveryEstimate}</strong>.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="h6">Your cart is empty.</Typography>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>€{item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>€{(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                Total: €{total.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
}

'use client';

import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useCart } from '../../context/CartContext';

const PutInCart = () => {
  const { cart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
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
            Total: €{totalPrice.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default PutInCart;

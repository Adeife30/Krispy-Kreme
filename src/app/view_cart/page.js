'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const ViewCartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch('/api/viewCart?userId=guest'); // Replace 'guest' with dynamic user ID
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const totalPrice = cart.reduce((total, item) => {
    const itemTotal = item.price ? item.price * item.quantity : 0;
    return total + itemTotal;
  }, 0);
  
  if (loading) {
    return <Typography align="center">Loading your cart...</Typography>;
  }

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
                <TableRow key={item._id}>
                  <TableCell>{item.pname}</TableCell>
                  <TableCell>€{item.price ? item.price.toFixed(2) : "N/A"}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>€{item.price ? (item.price * item.quantity).toFixed(2) : "0.00"}</TableCell>

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

export default ViewCartPage;

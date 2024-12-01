'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material';

export default function ViewCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState({ email: null, role: null });
  const [checkoutMessage, setCheckoutMessage] = useState(null); // State to handle the success message

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/getData'); // Fetch session data
        const data = await res.json();
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    const fetchCart = async () => {
      if (!session.email) return; // Wait for session to load
      try {
        const res = await fetch(`/api/view_cart?userId=${session.email}`); // Use logged-in user's email
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
    if (session.email) {
      fetchCart();
    }
  }, [session.email]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6">Loading cart...</Typography>
      </Container>
    );
  }

  if (!checkoutMessage && cartItems.length === 0) {
    return (
      <Container>
        <Typography variant="h6">Your cart is empty.</Typography>
      </Container>
    );
  }

  const handleCheckout = async () => {
    if (!session.email) {
      alert("You must be logged in to checkout.");
      return;
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.email,
          customerName: session.email.split('@')[0], // Extract username from email
          customerEmail: session.email,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        const deliveryTime = `${Math.ceil(Math.random() * 5) + 1} days`; // Random delivery time
        setCheckoutMessage(`Order placed! Thank you for shopping with us. Estimated delivery: ${deliveryTime}`);
        setCartItems([]); // Clear the cart in the UI
      } else {
        console.error(data.error);
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      {checkoutMessage ? (
        <Typography variant="h5" color="primary" align="center" sx={{ my: 5 }}>
          {checkoutMessage}
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
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
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.pname}</TableCell>
                  <TableCell>€{item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>€{(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box textAlign="right" sx={{ mt: 2 }}>
            <Typography variant="h6">Total: €{total.toFixed(2)}</Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
}

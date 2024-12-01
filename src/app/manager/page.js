'use client';

import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Box } from "@mui/material";

export default function ManagerPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6" align="center">
          Loading orders...
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container>
        <Typography variant="h6" align="center">
          No orders found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {order.customerName} <br /> {order.customerEmail}
              </TableCell>
              <TableCell>
                {order.products.map((product, index) => (
                  <div key={index}>
                    {product.quantity}x {product.name}
                  </div>
                ))}
              </TableCell>
              <TableCell>€{order.total.toFixed(2)}</TableCell>
              <TableCell>{new Date(order.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

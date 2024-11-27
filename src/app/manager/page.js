// app/manager/page.js
"use client";

import { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, Grid } from "@mui/material";

export default function ManagerPage() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
      setTotalOrders(data.length);
      setTotalRevenue(data.reduce((sum, order) => sum + order.totalCost, 0));
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4">{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">${totalRevenue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Order Time</TableCell>
            <TableCell>Customer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.products.map((p) => p.name).join(", ")}</TableCell>
              <TableCell>{new Date(order.orderTime).toLocaleString()}</TableCell>
              <TableCell>{order.customerName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// app/customer/page.js
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";

export default function CustomerPage() {
  const [products, setProducts] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    }

    async function fetchWeather() {
      const apiKey = "YOUR_WEATHER_API_KEY"; // Replace with your API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=YOUR_CITY&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeather(data);
    }

    fetchProducts();
    fetchWeather();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Available Products
      </Typography>

      {/* Weather Display */}
      {weather && (
        <Typography variant="subtitle1">
          Current Weather: {weather.main.temp}°C, {weather.weather[0].description}
        </Typography>
      )}

      {/* Product Cards */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h5">${product.price.toFixed(2)}</Typography>
                <Button variant="contained" color="primary">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

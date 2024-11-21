'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';


const PRODUCTS_API_URL = '/api/products';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric';

const CustomerPage = () => {
  const [products, setProducts] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const res = await fetch(PRODUCTS_API_URL);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.products || []); // Assumes products come under `data.products`
      } catch (err) {
        setError('Could not load products. Please try again later.');
      }
    };

    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const res = await fetch(WEATHER_API_URL);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          city: data.name,
        });
      } catch (err) {
        setError('Could not load weather information.');
      }
    };

    fetchProducts();
    fetchWeather();
  }, []);

  const handleAddToCart = (product) => {
    // Placeholder function for adding items to the cart
    console.log(`Added ${product.title} to the cart`);
    alert(`${product.title} has been added to your cart!`);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Weather Widget */}
      {weather && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h6">
            Weather in {weather.city}: {weather.temperature}°C, {weather.description}
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {/* Product Listing */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image || '/placeholder.png'} // Default placeholder image
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerPage;

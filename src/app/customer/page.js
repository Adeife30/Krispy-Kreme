'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';

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
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = 'ac55b0a25e2c9dfa9c83bfb1882f68d6'; // Replace with your API key
      const city = 'Dublin'; // Replace with your desired city
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) {
          setWeather({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          });
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Container>
      {/* Weather Info */}
      <Box sx={{ textAlign: 'center', my: 2 }}>
        {weather ? (
          <>
            <Typography variant="h6">
              Current Weather in {weather.city}: {weather.temperature}°C, {weather.description}
            </Typography>
            <img src={weather.icon} alt={weather.description} />
          </>
        ) : (
          <Typography variant="h6">Loading weather data...</Typography>
        )}
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

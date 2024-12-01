'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box, AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const mockProducts = [
  {
    id: 1,
    name: "Cookie Doughnut",
    price: 1.5,
    image: "/images/cookies-doughnut.png",
  },
  {
    id: 2,
    name: "Nutella Doughnut",
    price: 2.0,
    image: "/images/nutella-doughnut.png",
  },
  {
    id: 3,
    name: "Cinnamon Doughnut",
    price: 2.0,
    image: "/images/cinamon-doughnut.png",
  },
  {
    id: 4,
    name: "Brown Cookies Doughnut",
    price: 3.5,
    image: "/images/brown-cookie-doughnut.jpg",
  },
];

export default function CustomerPage() {
  const router = useRouter();
  const [session, setSession] = useState({ email: null, role: null });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/getData");
      const data = await res.json();
      setSession(data);

      if (!data.email) {
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);

  const addToCart = async (pname) => {
    try {
      const res = await fetch(`/api/putInCart?userId=${session.email}&pname=${pname}`);
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setCartCount((prevCount) => prevCount + 1);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <Container>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Krispy Kreme
          </Typography>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/view_cart" passHref>
            <IconButton color="inherit">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link href="/checkout" passHref>
            <Button color="inherit">Checkout</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Product List */}
      <Typography variant="h4" align="center" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" height="250" image={product.image} alt={product.name} />
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
                  onClick={() => addToCart(product.name)}
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
